'use client';
import { Box, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { usePlaybackController } from '@/hooks/usePlaybackController';
import theme from '@/lib/theme/index';

export default function PlaybackControls() {
  const { isPlaying, play, pause, speed, setSpeed } = usePlaybackController();

  return (
    <Box sx={{
      position: 'absolute',
      bottom: 16,
      right: 16,
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(6px)',
      borderRadius: 2,
      display: 'flex',
      gap: 1,
      padding: 1,
      zIndex: 999,
    }}>
      <Box sx={{backgroundColor: theme.palette.primary.main, color: 'white', padding: '4px 8px', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14,}}>
        {'Speed'}
      </Box>

      <ToggleButtonGroup value={speed} exclusive onChange={(_, v) => v && setSpeed(v)}>
        <ToggleButton value={1}>1x</ToggleButton>
        <ToggleButton value={2}>2x</ToggleButton>
        <ToggleButton value={5}>5x</ToggleButton>
        <ToggleButton value={10}>10x</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
