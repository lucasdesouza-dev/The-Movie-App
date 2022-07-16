import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import "./MoviesGrid.css";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export type TData = {
  adult: string;
  backdrop_path: string;
  genre_ids: {
    0: number;
    1: number;
  };
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  tagline: string;
  budget: number;
  revenue: number;
  runtime: string;
};

const Home = () => {
  const [topMovies, setTopMovies] = useState<TData[] | null>(null);

  const getTopRateMovies = async (url: string) => {
    const data = await fetch(url)
      .then((res) => res.json())
      .then((res) => setTopMovies(res.results))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    const topRateUrl = `${moviesUrl}top_rated?api_key=${apiKey}`;
    getTopRateMovies(topRateUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies?.length === 0 && <p>Carregando</p>}
        {topMovies != null &&
          topMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
      </div>
    </div>
  );
};

export default Home;
