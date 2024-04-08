import axios from "axios";

const API_KEY = "3672dc1cf19667f13800f9e71bb78b4d";

export const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchMovieBySearch = async (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page};`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};
