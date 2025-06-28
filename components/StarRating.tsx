'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  movieId: string;
  initialRating?: number;
  onChange?: (rating: number) => void;
}

export default function StarRating({ movieId, initialRating = 0, onChange }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Load rating from localStorage on component mount
  useEffect(() => {
    const storedRating = localStorage.getItem(`movie-rating-${movieId}`);
    if (storedRating) {
      setRating(parseInt(storedRating, 10));
    }
  }, [movieId]);

  // Update rating in localStorage and trigger onChange callback
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem(`movie-rating-${movieId}`, newRating.toString());
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <span
            className={`cursor-pointer text-2xl ${
              (hover || rating) > i
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRatingChange(i + 1)}
          >
            ★
          </span>
        </motion.div>
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
        {rating > 0 ? `${rating}/5` : ''}
      </span>
    </div>
  );
} 