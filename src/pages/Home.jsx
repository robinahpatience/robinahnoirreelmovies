import MovieRow from "../components/MovieRow";
import { getTrending, getPopular, getByGenre } from "../services/tmdb";

export default function Home() {
  return (
    <>
      <MovieRow title="Trending This Week" fetcher={getTrending} />
      <MovieRow title="Popular Movies" fetcher={() => getPopular("movie")} type="movie" />
      <MovieRow title="Action Movies" fetcher={() => getByGenre("movie", 28)} type="movie" />
      <MovieRow title="Popular TV Shows" fetcher={() => getPopular("tv")} type="tv" />
    </>
  );
}