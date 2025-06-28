'use client';

import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../store';
import { searchMovies, setSearchQuery, clearMovies } from '../store/movieSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.movies);
  const [inputValue, setInputValue] = useState(searchQuery || '');
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // Perform the search when the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setSearchQuery(debouncedSearchTerm));
      dispatch(searchMovies({ query: debouncedSearchTerm }));
    } else {
      dispatch(clearMovies());
      dispatch(setSearchQuery(''));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm border rounded-lg bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for movies..."
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Search for movies"
        />
      </div>
    </div>
  );
} 