import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react'

import theme from '@/lib/theme';

export function Providers({ children }: PropsWithChildren) {
  // For SSR, we need to ensure the component is only rendered on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </MUIThemeProvider>
  );
}
