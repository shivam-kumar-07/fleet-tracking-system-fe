
'use client';
import { Card, CardContent, Typography } from '@mui/material';
export default function StatCard({ label, value }: { label: string; value: any }) {
  return (<Card><CardContent><Typography variant="subtitle1">{label}</Typography><Typography variant="h2">{value}</Typography></CardContent></Card>);
}
