import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../Components/MovieCard";

import "./Movie.css";
import { TData } from "./Home";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<TData>();

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrence = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);
  return (
    <div className="movie-page">
      {movie != null && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orcamento:
              <p>{formatCurrence(movie.budget)}</p>
            </h3>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
              <p>{formatCurrence(movie.revenue)}</p>
            </h3>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duracao:
              <p>{movie.runtime} minutos</p>
            </h3>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descricao:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
