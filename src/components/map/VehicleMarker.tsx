'use client';
import { CircleMarker, Tooltip } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import { Vehicle } from '@/lib/types';

export default function VehicleMarker({
  v,
  onClick,
  selected,
}: {
  v: Vehicle;
  onClick?: () => void;
  selected?: boolean;
}) {
  const theme = useTheme();
  const color = selected ? theme.palette.vehicle.idle : theme.palette.vehicle[v.status];

  return (
    <CircleMarker
      center={[v.lat, v.lng]}
      radius={selected ? 12 : 8}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: selected ? 1 : 0.9,
      }}
      eventHandlers={{
        click: () => onClick?.(),
      }}
    >
      {/* @ts-ignore Leaflet tooltip direction typing */}
      <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent={false}>
        <div
          style={{
            padding: '6px 8px',
            background: 'white',
            borderRadius: 6,
            border: `1px solid ${theme.palette.divider}`,
            minWidth: 140,
          }}
        >
          {/* Vehicle ID */}
          <div style={{ width:'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>
              {v.id}
            </div>

            {/* Status */}
            <div style={{ color: theme.palette.vehicle[v.status], fontWeight: 600, fontSize: 12, marginBottom: 4 }}>
              {v.status.toUpperCase()}
            </div>
          </div>

          {/* Speed */}
          {v.speed !== undefined && (
            <div style={{ fontSize: 12 }}>
              Speed: <strong>{v.speed} km/h</strong>
            </div>
          )}

          {/* Distance */}
          {v.distance_travelled_km !== undefined &&
            v.planned_distance_km !== undefined && (
              <div style={{ fontSize: 12, marginTop: 2 }}>
                Distance: {v.distance_travelled_km.toFixed(1)} km / {v.planned_distance_km.toFixed(1)} km
              </div>
            )}

          {v.eta && (
            <div style={{ fontSize: 12, marginTop: 2 }}>
              ETA: <strong>{v.eta}</strong>
            </div>
          )}

          {/* Progress Bar */}
          {v.progress !== undefined && (
            <div style={{ marginTop: 6, width: '100%', background: 'lightgray', height: 6, borderRadius: 4 }}>
              <div
                style={{
                  width: `${v.progress}%`,
                  height: '100%',
                  borderRadius: 4,
                  background: 'black',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          )}
        </div>
      </Tooltip>
    </CircleMarker>
  );
}
