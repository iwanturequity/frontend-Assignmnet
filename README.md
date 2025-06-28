# MovieDB - Movie Search App

A movie search application built with Next.js, TypeScript, Tailwind CSS, and Redux Toolkit, using the OMDB API.

## Features

- Search for movies using the OMDB API
- View movie details including plot, cast, genre, etc.
- Rate movies with a star rating system (stored in localStorage)
- Dark/light mode toggle (preference saved in localStorage)
- Responsive design with Tailwind CSS
- Client-side state management with Redux Toolkit
- Smooth animations with Framer Motion

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Framer Motion
- OMDB API

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root directory by copying the `.env.local.example` file:
   ```
   cp .env.local.example .env.local
   ```
4. Get your API key from [OMDB API](https://www.omdbapi.com/apikey.aspx) and add it to the `.env.local` file:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
your-movie-app/
├── app/                     # App Router pages
│   ├── layout.tsx           # Root layout (Navbar, ThemeProvider, etc.)
│   ├── globals.css          # Tailwind global styles
│   ├── movies/
│   │   ├── page.tsx         # Movie list page
│   │   └── [id]/
│   │       └── page.tsx     # Movie details page
│   │
│   └── page.tsx             # Redirects to movies page
│
├── components/              # UI components
│   ├── MovieCard.tsx
│   ├── MovieDetails.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── StarRating.tsx
│   └── ThemeToggle.tsx
│
├── store/                   # Redux Toolkit setup
│   ├── index.ts             # Root store
│   └── movieSlice.ts        # Movie-related state
│
├── hooks/                   # Custom React hooks
│   ├── useDebounce.ts       # Debounced input hook
│   └── useTheme.ts          # Dark mode theme toggle hook
│
├── types/                   # TypeScript interfaces/types
│   └── movie.ts             # Movie type definitions
│
├── utils/                   # Utility functions
│   └── api.ts               # OMDB API functions
│
├── public/                  # Static files
│   └── placeholder.jpg      # Placeholder for missing movie posters
│
├── .env.local               # Your OMDB API key (not committed)
├── tailwind.config.ts       # Tailwind config
├── package.json             # Project dependencies
└── README.md                # This file
```

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Runs the linter 