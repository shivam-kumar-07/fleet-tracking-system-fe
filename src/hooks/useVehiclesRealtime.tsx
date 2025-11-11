'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { Vehicle } from '@/lib/types';

export default function useVehiclesRealtime() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // ✅ Step 1 — Initial fetch from REST API
    fetch(`http://localhost:3000/api/vehicles`)
      .then(res => res.json())
      .then(setVehicles)
      .catch(console.error);

    // ✅ Step 2 — WebSocket real-time stream
    const socket = getSocket();

    socket.on('vehicle_updates', (updates: Vehicle[]) => {
      setVehicles(prev => {
        const map = new Map(prev.map(v => [v.id, v]));

        updates.forEach(u => {
          const existing = map.get(u.id) || {};

          // ✅ Flatten lat/lng in case WebSocket sends nested `location`
          const lat = u.lat ?? (u as any).location?.lat ?? existing.lat;
          const lng = u.lng ?? (u as any).location?.lng ?? existing.lng;

          // ✅ Compute progress if we have distance data
          const progress =
            u.distance_travelled_km && u.planned_distance_km
              ? (u.distance_travelled_km / u.planned_distance_km) * 100
              : existing.progress;

          map.set(u.id, {
            ...existing,
            ...u,
            lat,
            lng,
            progress,
          });
        });

        return Array.from(map.values());
      });
    });

    return () => {
      socket.off('vehicle_updates');
    };
  }, []);

  return vehicles;
}
