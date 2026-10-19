import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
});

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Returns null when there is no poster, so the UI can show a placeholder
export const getImageUrl = (path) => (path ? `${IMG_BASE}${path}` : null);

// type is "movie" or "tv"
export const getTrending = async () =>
  (await api.get("/trending/all/week")).data.results;

export const getPopular = async (type, page = 1) =>
  (await api.get(`/${type}/popular`, { params: { page } })).data.results;

export const getByGenre = async (type, genreId, page = 1) =>
  (
    await api.get(`/discover/${type}`, {
      params: { with_genres: genreId, page },
    })
  ).data.results;

export const getGenres = async (type) =>
  (await api.get(`/genre/${type}/list`)).data.genres;

export const searchTitles = async (query) =>
  (await api.get("/search/multi", { params: { query } })).data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

export const getDetails = async (type, id) =>
  (await api.get(`/${type}/${id}`)).data;