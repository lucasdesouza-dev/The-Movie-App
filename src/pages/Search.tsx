import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../Components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

import type { TData } from "./Home";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<TData[] | null>(null);
  const query = searchParams.get("q");

  const getSearchMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `https://${searchURL}?api_key=${apiKey}&query=${query}`;
    getSearchMovies(searchWithQueryURL);
  }, [query]);
  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies?.length === 0 && <p>Carregando</p>}
        {movies != null &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
      </div>
    </div>
  );
};

export default Search;
