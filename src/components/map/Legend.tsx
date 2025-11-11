'use client';
import { Box, Chip, Stack, useTheme } from '@mui/material';
export default function Legend() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        p: 2,
        borderRadius: 2,
        display:'flex',
        flexDirection:'row',
        zIndex: 999,
        bgcolor: t => t.palette.background.paper,
      }}
    >
      <Stack sx={{display:'flex', flexDirection:'row', gap:1}}>
        <Chip label="Moving" sx={t => ({ bgcolor: 'blue', color: '#fff' })} />
        {/* <Chip label="Focused" sx={t => ({ bgcolor: 'orange' })} /> */}
        <Chip label="Complete" sx={t => ({ bgcolor: theme.palette.vehicle.completed, color: '#fff' })} />
      </Stack>
    </Box>
  );
}
