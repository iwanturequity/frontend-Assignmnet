'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Use a placeholder image if the poster is not available
  const posterUrl = movie.Poster === 'N/A' ? 
    '/placeholder.jpg' : 
    movie.Poster;

  return (
    <Link href={`/movies/${movie.imdbID}`} passHref>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full cursor-pointer transition-shadow hover:shadow-xl"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-[400px]">
          <Image
            src={posterUrl}
            alt={`${movie.Title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
            unoptimized={posterUrl !== '/placeholder.jpg' && !posterUrl.startsWith('/')}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {movie.Year}
          </p>
        </div>
      </motion.div>
    </Link>
  );
} 