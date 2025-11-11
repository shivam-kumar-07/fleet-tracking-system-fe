import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Metadata } from 'next';
import ClientLayout from './layout.client';

export const metadata: Metadata = {
  description: 'DMM Portals Application',
  // icons: {
  //   apple: S3_BASE_URL + '/icons/dmm-logo.svg',
  //   icon: S3_BASE_URL + '/icons/dmm-logo.svg',
  //   shortcut: S3_BASE_URL + '/icons/dmm-logo.svg',
  // },
  title: 'DMM Admin Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}

