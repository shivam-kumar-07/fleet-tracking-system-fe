
declare module '@mui/material/styles' {
  interface Palette {
    vehicle: {
      moving: string;
      idle: string;
      stopped: string;
      completed: string;
    };
    accent: {
      ai: string;
    };
  }
  interface PaletteOptions {
    vehicle?: {
      moving: string;
      idle: string;
      stopped: string;
      completed: string;
    };
    accent?: {
      ai: string;
    };
  }
}

const palette = {
  mode: 'dark' as const,
  background: { default: '#0b1220', paper: '#111a2c' },
  text: { primary: '#e6eefc', secondary: '#9fb0d0' },
  divider: '#1d2840',
  primary: { main: '#4C8DF6' },
  secondary: { main: '#20B0C9' },
  vehicle: { moving: '#3DA5FF', idle: '#FFA339', stopped: '#E74C3C', completed: '#4CAF50' },
  accent: { ai: '#1FA3D9' },
};
export default palette;
