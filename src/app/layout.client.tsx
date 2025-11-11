'use client';

import { memo, useEffect, useMemo, useState } from "react";
import { Inter, Urbanist } from 'next/font/google';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import LoadingScreen from "@/components/common/loading-screen";
import './globals.scss';
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] });
const urbanist = Urbanist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
});

const LayoutContent = memo(({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setMounted(true);
    }, []);
  
    // Memoize the main content styles
    const mainContentStyles = useMemo(
      () => ({
        bgcolor:'#111a2c',
        flexGrow: 1,
        margin: 0,
        height: '100%',
        // Add padding top on mobile to account for the app bar
        // ...(isMobile && { pt: '64px' }),
      }),
      [isMobile]
    );
  
    // Memoize the placeholder styles
    const placeholderStyles = useMemo(
      () => ({
        flexGrow: 1,
        minHeight: '100vh',
      }),
      []
    );
  
    // Memoize the content component to prevent unnecessary re-renders
    const contentComponent = useMemo(
      () =>
        mounted ? (
          <Box sx={{ display: 'flex', margin:0 }}>
            <Box
              component="main"
              sx={{
                ...mainContentStyles,
                // Only apply margin and width adjustment on desktop, not on mobile
                // marginLeft: !isMobile ? '120px' : 0,
                // padding:2,
                width: '100%',
              }}
            >
              {children}
            </Box>
          </Box>
        ) : (
          // Render a placeholder with the same structure to prevent layout shift
          <Box sx={{ display: 'flex', visibility: 'hidden' }}>
            {/* Placeholder for sidebar */}
            <Box sx={{ flexShrink: 0, width: '80px' }} />
            <Box
              component="main"
              sx={{
                ...placeholderStyles,
                // Only apply margin and width adjustment on desktop, not on mobile
                marginLeft: !isMobile ? '80px' : 0,
                width: !isMobile ? 'calc(100% - 80px)' : '100%',
              }}
            >
              <LoadingScreen fullScreen={false} type="splash" />
            </Box>
          </Box>
        ),
      // Only re-render when these dependencies change
      [children, isMobile, mainContentStyles, mounted, placeholderStyles]
    );
  
    return (
        <>
            {contentComponent}
        </>
    );
  });
  
  // Add display name for debugging
  LayoutContent.displayName = 'LayoutContent';

const ClientLayout = memo(({ children }: { children: React.ReactNode }) => {
    return (
      <html className={urbanist.variable} lang="en" suppressHydrationWarning>
        <body className={`${inter.className} ${urbanist.variable}`} suppressHydrationWarning>
          <Providers>
            <LayoutContent>{children}</LayoutContent>
          </Providers>
        </body>
      </html>
    );
  });
  
  // Add display name for debugging
  ClientLayout.displayName = 'ClientLayout';

  export default ClientLayout;