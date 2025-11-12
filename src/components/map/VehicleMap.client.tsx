'use client';

import Legend from './Legend';
import FabBot from '../common/FabBot';
import VehicleMarker from './VehicleMarker';
import FollowVehicle from './FollowVehicle';
import { Vehicle } from '@/lib/types';
import FitBounds from './FitBound';
import PlaybackControls from '../controls/PlaybackControls';
import dynamic from 'next/dynamic';
import { MapContainerProps } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';

const MapContainer = dynamic<MapContainerProps & React.RefAttributes<LeafletMap>>(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });

const INITIAL_CENTER: [number, number] = [20.5937, 78.9629];
const INITIAL_ZOOM = 5;

export default function VehicleMap({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}: {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <MapContainer
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* If no vehicle selected → Fit all */}
        <FitBounds vehicles={vehicles} active={!selectedVehicleId} />

        {/* If vehicle selected → Smooth follow */}
        {selectedVehicleId && (
          <FollowVehicle
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
          />
        )}

        {vehicles.map(v => (
          <VehicleMarker
            key={v.id}
            v={v}
            selected={selectedVehicleId === v.id}
            onClick={() => onSelectVehicle(selectedVehicleId === v.id ? null : v.id)}
          />
        ))}
      </MapContainer>

      <Legend />
      <FabBot />
      <PlaybackControls />
    </div>
  );
}
