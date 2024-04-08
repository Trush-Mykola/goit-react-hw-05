import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBar/SearchBar";
import { fetchMovieBySearch } from "../../components/api";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get("query");

  useEffect(() => {
    if (!params) {
      return;
    }
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await fetchMovieBySearch(params);
        setMovies(moviesData);

        if (moviesData.length === 0) {
          toast("Sorry, we have not found the films for your request. Try to write another one.", {
            duration: 4000,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [params]);

  const onFormSubmit = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBox onSearch={onFormSubmit} />
      {loading && <Loader />}
      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;
