import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../api";

import Loader from "../Loader/Loader";
import img from "../../components/assets/img.jpg";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieCast(movieId);
        setCast(movieData);
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
      <h2>Cast</h2>
      {loading && <Loader />}
      {cast.length === 0 && <div>Sorry, we don&apos;t have any cast info yet.</div>}
      <ul className={css.list}>
        {cast !== null &&
          cast.map((el) => (
            <li key={el.id} className={css.item}>
              <img className={css.img} src={el.profile_path ? `https://image.tmdb.org/t/p/w200//${el.profile_path}` : img} alt={el.name} />
              <p className={css.name}>{el.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MovieCast;
