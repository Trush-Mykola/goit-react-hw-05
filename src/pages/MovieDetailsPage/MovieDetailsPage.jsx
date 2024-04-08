import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../components/api";
import { Link, useParams, Outlet, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import img from "../../components/assets/img.jpg";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movie = await fetchMovieDetails(movieId);
        setMovieDetails(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      <div className={css.wrapper}>
        <Link to={backLink.current} className={css.btn}>
          Go back
        </Link>
      </div>
      {movieDetails && (
        <div key={movieDetails.id} className={css.card}>
          <h2 className={css.title}>{movieDetails.title}</h2>
          <img className={css.img} src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}` : img} alt={movieDetails.original_title} />
          <div className={css.links}>
            <Link className={css.link} to="cast">
              Cast
            </Link>
            <Link className={css.link} to="reviews">
              Reviews
            </Link>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
