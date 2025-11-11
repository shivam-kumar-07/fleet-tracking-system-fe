'use client';

import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import type { Vehicle } from '@/lib/types';

const STREET_ZOOM = 8;
const OUT_DURATION = 0.9;
const IN_DURATION = 1.2;
const PADDING = 80;

export default function FollowVehicle({
  vehicles,
  selectedVehicleId,
}: {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
}) {
  const map = useMap();

  // ensure we only animate after map is ready (tiles/layers mounted)
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    map.whenReady(() => setMapReady(true));
  }, [map]);

  const lastFollowedId = useRef<string | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    if (!mapReady) return;              // wait for map
    if (!selectedVehicleId) {           // deselect → reset state
      lastFollowedId.current = null;
      return;
    }

    const target = vehicles.find(v => v?.id === selectedVehicleId);
    if (!target || typeof target.lat !== 'number' || typeof target.lng !== 'number') return;

    const changed = lastFollowedId.current !== selectedVehicleId;

    // build safe fleet bounds
    const valid = vehicles.filter(
      v => v && typeof v.lat === 'number' && typeof v.lng === 'number'
    );
    const bounds = valid.map(v => [v.lat, v.lng]) as [number, number][];

    // --- SWITCHING between vehicles: zoom out then in ---
    if (changed && lastFollowedId.current) {
      animating.current = true;
      if (bounds.length >= 1) {
        map.flyToBounds(bounds, { padding: [PADDING, PADDING], duration: OUT_DURATION });
      }
      // schedule zoom-in after the zoom-out finishes (+small buffer)
      window.setTimeout(() => {
        map.flyTo([target.lat, target.lng], STREET_ZOOM, { animate: true, duration: IN_DURATION });
        animating.current = false;
        lastFollowedId.current = selectedVehicleId;
      }, OUT_DURATION * 1000 + 80);
      return;
    }

    // --- FIRST SELECTION: do a single smooth zoom-in ---
    if (changed && !lastFollowedId.current) {
      // wait for next frame to ensure layout/tiles are ready
      requestAnimationFrame(() => {
        map.flyTo([target.lat, target.lng], STREET_ZOOM, { animate: true, duration: IN_DURATION });
        lastFollowedId.current = selectedVehicleId;
      });
      return;
    }

    // --- SAME vehicle moving: only pan (keep user's zoom) ---
    if (!animating.current) {
      map.panTo([target.lat, target.lng], { animate: true });
    }
  }, [mapReady, vehicles, selectedVehicleId, map]);

  return null;
}
