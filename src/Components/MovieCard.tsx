import { TData } from "../pages/Home";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

interface Props {
  movie: TData;
  showLink: boolean;
}

const MovieCard: React.FC<Props> = ({ movie, showLink }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar />
        {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
