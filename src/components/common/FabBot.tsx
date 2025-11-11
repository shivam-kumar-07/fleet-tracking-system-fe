'use client';
import { Fab, SvgIcon } from '@mui/material';
export default function FabBot() {
  return (
    <Fab sx={{ position: 'absolute', left: 16, bottom: 16, bgcolor: t => 'blue' }}>
      <SvgIcon>
        <circle cx="12" cy="12" r="10" fill="white" />
        <circle cx="9" cy="11" r="1.4" />
        <circle cx="15" cy="11" r="1.4" />
        <rect x="9" y="14" width="6" height="1.6" rx="0.8" />
      </SvgIcon>
    </Fab>
  );
}
