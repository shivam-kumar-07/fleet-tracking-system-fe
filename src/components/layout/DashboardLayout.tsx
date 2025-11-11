'use client';
import { Grid, Box } from '@mui/material';
export default function DashboardLayout({ left, right }: { left: any; right: any }) {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} md={3}>
        <Box display="grid" gap={2}>
          {left}
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 480, md: 'calc(100vh - 50px)' },
            borderRadius: 3,
            overflow: 'hidden',
            border: t => `1px solid ${t.palette.divider}`,
          }}
        >
          {right}
        </Box>
      </Grid>
    </Grid>
  );
}
