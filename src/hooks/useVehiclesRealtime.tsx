'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePlaybackController } from './usePlaybackController';
import type { Vehicle } from '@/lib/types';

export default function useVehiclesRealtime() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Merge updates into existing vehicles
  const handleUpdates = useCallback((updates: Vehicle[]) => {
    if (!updates) return;
    setVehicles(prev => {
      const map = new Map<string, Vehicle>(prev.map(v => [v.id, v]));
      updates.forEach(u => {
        const prevV = map.get(u.id) || ({} as Vehicle);
        map.set(u.id, { ...prevV, ...u });
      });
      return Array.from(map.values());
    });
  }, []);

  // Initial fetch
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`)
      .then(r => r.json())
      .then(setVehicles)
      .catch(console.error);
  }, []);

  // ✅ Control simulation with playback
  usePlaybackController(handleUpdates);

  return vehicles;
}
