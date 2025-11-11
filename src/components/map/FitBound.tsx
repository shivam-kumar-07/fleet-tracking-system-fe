'use client';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import { Vehicle } from '@/lib/types';

const PADDING = 80;
const DURATION = 1.2;

export default function FitBounds({
  vehicles,
  active,
}: {
  vehicles: Vehicle[];
  active: boolean;
}) {
  const map = useMap();
  const hasFittedOnce = useRef(false);

  useEffect(() => {
    if (!active) {
      hasFittedOnce.current = false;
      return;
    }

    // ✅ Only use vehicles that have valid coordinates
    const validVehicles = vehicles.filter(
      (v) => v && typeof v.lat === 'number' && typeof v.lng === 'number'
    );

    if (validVehicles.length === 0) return;

    if (hasFittedOnce.current) return;
    hasFittedOnce.current = true;

    const bounds = validVehicles.map((v) => [v.lat, v.lng]) as [number, number][];

    map.flyToBounds(bounds, {
      padding: [PADDING, PADDING],
      duration: DURATION,
    });
  }, [active, vehicles, map]);

  return null;
}
