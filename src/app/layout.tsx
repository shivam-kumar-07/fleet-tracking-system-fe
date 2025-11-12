import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Metadata } from 'next';
import ClientLayout from './layout.client';

export const metadata: Metadata = {
  description: 'Fleet Tracking App',
  // icons: {
  //   apple: S3_BASE_URL + '/icons/dmm-logo.svg',
  //   icon: S3_BASE_URL + '/icons/dmm-logo.svg',
  //   shortcut: S3_BASE_URL + '/icons/dmm-logo.svg',
  // },
  title: 'Fleet Tracking APP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}

