'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import { searchMovies } from '../../store/movieSlice';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import { verifyApiKey } from '../../utils/api';

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { movies, loading, error, searchQuery, totalResults } = useAppSelector(
    (state) => state.movies
  );
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Verify API key
    const checkApiKey = async () => {
      const isValid = await verifyApiKey();
      setApiKeyValid(isValid);
      
      // Only search if API key is valid
      if (isValid && movies.length === 0 && !searchQuery) {
        dispatch(searchMovies({ query: 'avengers' }));
      }
    };
    
    checkApiKey();
  }, [dispatch, movies.length, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Movie Search
        </h1>
        <SearchBar />
      </div>

      {apiKeyValid === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">API Key Error: </strong>
          <span className="block sm:inline">
            Your OMDB API key appears to be invalid or unauthorized. 
            Please check your .env.local file and make sure you've added a valid API key.
          </span>
        </div>
      )}

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

      {!loading && !error && movies.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No movies found for "{searchQuery}"</p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">Try a different search term</p>
        </div>
      )}

      {movies.length > 0 && (
        <div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Found {totalResults} results for "{searchQuery || 'avengers'}"
          </p>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
} 