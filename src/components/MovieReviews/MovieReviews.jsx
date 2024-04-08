import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../api";

import Loader from "../Loader/Loader";

import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieReviews(movieId);
        setReviews(movieData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Reviews</h2>
      {loading && <Loader />}
      {reviews.length === 0 && <div>Sorry, we don&apos;t have any reviews yet.</div>}
      <ul>
        {reviews !== null &&
          reviews.map((el) => (
            <li key={el.id}>
              <h3 className={css.author}>{el.author}</h3>
              <p className={css.text}>{el.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
