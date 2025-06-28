import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, MovieState } from '../types/movie';
import { fetchMovies, fetchMovieById } from '../utils/api';

// Initial state
const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  searchQuery: '',
  totalResults: 0,
};

// Async thunks for API calls
export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }: { query: string; page?: number }, { rejectWithValue }) => {
    try {
      const response = await fetchMovies(query, page);
      if (response.Response === 'False') {
        return rejectWithValue(response.Error || 'Failed to fetch movies');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      const movie = await fetchMovieById(id);
      if (!movie) {
        return rejectWithValue('Movie not found');
      }
      return movie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Create the movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies cases
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults, 10) || 0;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Movie details cases
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setSearchQuery, clearSelectedMovie, clearMovies } = movieSlice.actions;
export default movieSlice.reducer; 