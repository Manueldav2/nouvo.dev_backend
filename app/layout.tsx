import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nouvo API Backend',
  description: 'Backend API for Nouvo website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 