'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/common/StatCard';
import { useEffect, useState, useMemo } from 'react';
import { Vehicle } from '@/lib/types';
import { getSocket } from '@/lib/socket';
import React from 'react';
import dynamic from 'next/dynamic';
import useVehiclesRealtime from '@/hooks/useVehiclesRealtime';
const VehicleMap = dynamic(() => import('@/components/map/VehicleMap.client'), {
  ssr: false, // <-- IMPORTANT
});
export default function Page() {
  const vehicles = useVehiclesRealtime();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const stats = useMemo(
    () => ({
      moving: vehicles.filter(v => v.status === 'moving').length,
      idle: vehicles.filter(v => v.status === 'idle').length,
      stopped: vehicles.filter(v => v.status === 'stopped').length,
    }),
    [vehicles]
  );
  return (
    <DashboardLayout
      left={
        <>
          <StatCard label="Active Vehicles" value={stats.moving} />
          {/* <StatCard label="Idle Vehicles" value={stats.idle} /> */}
          <StatCard label="Trip Completed" value={stats.stopped} />
        </>
      }
      right={
        <VehicleMap
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={setSelectedVehicleId}
        />
      }
    />
  );
}
