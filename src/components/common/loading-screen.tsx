'use client';

import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import React, { memo, useMemo } from 'react';


interface LoadingScreenProps {
  fullScreen?: boolean;
  type?: 'circular' | 'linear' | 'splash';
}

const LoadingScreen: React.FC<LoadingScreenProps> = memo(
  ({ fullScreen = true, type = 'circular' }) => {

    // Memoize the styles to prevent recalculation on re-renders
    const boxStyles = useMemo(
      () => ({
        alignItems: 'center',
        backgroundColor:
          type === 'splash'
            ? 'background.default'
            : fullScreen
              ? 'rgba(255, 255, 255, 0.9)'
              : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        height: fullScreen ? '100vh' : '100%',
        justifyContent: 'center',
        left: 0,
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        width: '100%',
        zIndex: (theme: any) => (fullScreen ? theme.zIndex.modal + 1 : 1),
      }),
      [fullScreen, type]
    );

    // Simplified progress indicator to improve performance
    // Only use the splash screen when explicitly needed
    // if (type === 'splash') {
    //   return (
    //     <Box sx={boxStyles}>
    //       <Box
    //         sx={{
    //           // bgcolor: theme.palette.background.yaleBlue,
    //           borderRadius: '50%',
    //           height: '150px',
    //           mb: 4,
    //           width: '150px',
    //         }}
    //       />
    //       <Box sx={{ borderRadius: '50%', height: 150, overflow: 'hidden', width: 150 }}>
    //         <Lottie
    //           animationData={DMM_ANIMATED_LOGO}
    //           autoplay
    //           loop
    //           style={{ height: 150, marginBottom: '32px', width: 150 }}
    //         />
    //       </Box>
    //       <Typography
    //         sx={{
    //           color: theme.palette.text.goldenYellow,
    //           fontSize: '32px',
    //           fontWeight: 700,
    //           mb: SPACING.marginBottom24,
    //           textAlign: 'center',
    //         }}
    //       >
    //         {t('common.companyBrandName')}
    //       </Typography>
    //       {/* <CircularProgress color="primary" size={40} thickness={4} /> */}
    //     </Box>
    //   );
    // }

    // For circular type (default)
    if (type === 'circular' || !type) {
      return (
        <Box sx={boxStyles}>
          <CircularProgress color="primary" size={40} />
        </Box>
      );
    }

    // For linear type
    return (
      <Box sx={boxStyles}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="primary" />
        </Box>
      </Box>
    );
  }
);

// Add display name for debugging
LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
