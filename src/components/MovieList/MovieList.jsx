import { Link, useLocation } from "react-router-dom";

import img from "../../components/assets/img.jpg";

import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {Array.isArray(movies) &&
        movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link state={location} to={`/movies/${movie.id}`}>
                <div>
                  <img className={css.img} src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : img} alt={movie.original_title} />
                  <p className={css.title}>{movie.title}</p>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
