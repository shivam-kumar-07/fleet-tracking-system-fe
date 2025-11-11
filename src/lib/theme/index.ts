
'use client';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

// Define our custom theme with the additional properties
interface CustomTheme extends Theme {
    fontWeight: {
      xl2: number;
      xl3: number;
      xl6: number;
      xs: number;
    };
    typography: {
      fontWeight600: number;
      fontWeight700: number;
      lineHeight?: number | string;
    } & Theme['typography'];
  }
  
  // Define the options for our custom theme
  interface CustomThemeOptions extends ThemeOptions {
    fontWeight?: {
      xl2?: number;
      xl3?: number;
      xl6?: number;
      xs?: number;
    };
    typography?: {
      fontWeight600?: number;
      fontWeight700?: number;
      lineHeight?: number | string;
    } & ThemeOptions['typography'];
  }
  
  // Create a custom theme factory function
  const createCustomTheme = (options: CustomThemeOptions): CustomTheme => {
    return createTheme(options) as CustomTheme;
  };

  declare module '@mui/material/styles' {
    interface Palette {
      vehicle: {
        moving: string;
        idle: string;
        stopped: string;
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
      };
      accent?: {
        ai: string;
      };
    }
  }

const theme = createCustomTheme({
  palette: {...palette },
  typography,
  fontWeight: {
    xl2: 800,
    xl3: 900,
    xl6: 950,
    xs: 300,
  },
});

export default theme;
