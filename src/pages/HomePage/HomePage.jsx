import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../components/api";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesResponse = await fetchTrendingMovies();
        setMovies(moviesResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
