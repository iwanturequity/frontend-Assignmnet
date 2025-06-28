import { MovieDetails, MovieSearchResponse } from '../types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '3ba0e4b3'; // Use the environment variable or fallback to hardcoded key
const API_URL = 'https://www.omdbapi.com/';

/**
 * Verify if the API key is valid
 */
export const verifyApiKey = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=test`);
    
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.Response === 'True';
  } catch (error) {
    return false;
  }
};

/**
 * Fetch movies from OMDB API by search term
 */
export const fetchMovies = async (
  searchTerm: string,
  page: number = 1
): Promise<MovieSearchResponse> => {
  if (!searchTerm.trim()) {
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: 'Please enter a search term'
    };
  }

  try {
    const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data: MovieSearchResponse = await response.json();

    if (data.Response === 'False') {
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: data.Error || 'No movies found'
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Fetch movie details from OMDB API by IMDB ID
 */
export const fetchMovieById = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }

    return data as MovieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}; 