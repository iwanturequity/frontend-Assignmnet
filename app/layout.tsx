'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css';
import StoreProvider from './StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>MovieDB - Search and Explore Movies</title>
        <meta name="description" content="Search and explore movies using the OMDB API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 min-h-full">
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-800 py-4 shadow-inner">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} MovieDB. Data provided by OMDB API.</p>
              </div>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
} 