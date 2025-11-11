export type VehicleStatus = 'moving' | 'idle' | 'stopped';
export interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  speed: number;
  status: VehicleStatus;
  updatedAt?: string;
  planned_distance_km?: number;
  distance_travelled_km?: number;
  total_distance_km?: number;
  progress?: number; // computed %
  eta?: string;
}
