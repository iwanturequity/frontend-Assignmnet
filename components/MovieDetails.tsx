'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MovieDetails as MovieDetailsType } from '../types/movie';
import StarRating from './StarRating';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl = movie.Poster === 'N/A' ? '/placeholder.jpg' : movie.Poster;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="relative w-full h-[500px]">
            <Image
              src={posterUrl}
              alt={`${movie.Title} poster`}
              fill
              className="object-cover"
              priority
              unoptimized={posterUrl !== '/placeholder.jpg' && !posterUrl.startsWith('/')}
            />
          </div>
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {movie.Title} <span className="text-gray-600 dark:text-gray-400">({movie.Year})</span>
            </h1>
          </div>

          <div className="mb-4">
            <StarRating movieId={movie.imdbID} />
          </div>
          
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            {movie.Runtime !== 'N/A' && <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>}
            {movie.Rated !== 'N/A' && <p><span className="font-semibold">Rated:</span> {movie.Rated}</p>}
            {movie.Genre !== 'N/A' && (
              <p>
                <span className="font-semibold">Genre:</span>{' '}
                <span className="space-x-1">
                  {movie.Genre.split(', ').map((genre) => (
                    <span key={genre} className="inline-block px-2 py-1 mr-2 mb-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                      {genre}
                    </span>
                  ))}
                </span>
              </p>
            )}
            {movie.Released !== 'N/A' && <p><span className="font-semibold">Released:</span> {movie.Released}</p>}
          </div>
          
          {movie.Plot !== 'N/A' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Plot</h2>
              <p className="text-gray-700 dark:text-gray-300">{movie.Plot}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movie.Director !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Director</h3>
                <p className="text-gray-700 dark:text-gray-300">{movie.Director}</p>
              </div>
            )}
            
            {movie.Actors !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actors</h3>
                <p className="text-gray-700 dark:text-gray-300">{movie.Actors}</p>
              </div>
            )}
            
            {movie.Writer !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Writer</h3>
                <p className="text-gray-700 dark:text-gray-300">{movie.Writer}</p>
              </div>
            )}
            
            {movie.Awards !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Awards</h3>
                <p className="text-gray-700 dark:text-gray-300">{movie.Awards}</p>
              </div>
            )}
          </div>
          
          {movie.imdbRating !== 'N/A' && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-2 text-gray-800 dark:text-white font-bold">{movie.imdbRating}/10</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">({movie.imdbVotes} votes)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 