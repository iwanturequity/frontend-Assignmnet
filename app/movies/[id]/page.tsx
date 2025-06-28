'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getMovieDetails } from '../../../store/movieSlice';
import MovieDetails from '../../../components/MovieDetails';

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { selectedMovie, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={handleGoBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Movies
      </button>

      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {selectedMovie && !loading && !error && <MovieDetails movie={selectedMovie} />}

      {!selectedMovie && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Movie not found</p>
        </div>
      )}
    </div>
  );
} 