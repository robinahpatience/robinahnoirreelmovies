import { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip, CircularProgress, Alert, Button } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { getPopular, getByGenre, getGenres } from "../services/tmdb";

export default function Browse({ type }) {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reset when switching between Movies and TV Shows
  useEffect(() => {
    setGenreId(null);
    setPage(1);
    setItems([]);
    getGenres(type).then(setGenres).catch(() => setGenres([]));
  }, [type]);

  // Load items whenever type, genre, or page changes
  useEffect(() => {
    setLoading(true);
    setError("");
    const request = genreId ? getByGenre(type, genreId, page) : getPopular(type, page);
    request
      .then((data) => setItems((prev) => (page === 1 ? data : [...prev, ...data])))
      .catch(() => setError("Could not load content. Please try again."))
      .finally(() => setLoading(false));
  }, [type, genreId, page]);

  const pickGenre = (id) => {
    setGenreId(id);
    setPage(1);
    setItems([]);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        {type === "movie" ? "Movies" : "TV Shows"}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        <Chip label="All" color={genreId === null ? "primary" : "default"} onClick={() => pickGenre(null)} />
        {genres.map((g) => (
          <Chip
            key={g.id}
            label={g.name}
            color={genreId === g.id ? "primary" : "default"}
            onClick={() => pickGenre(g.id)}
          />
        ))}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!loading && !error && items.length === 0 && (
        <Typography color="text.secondary">No results found.</Typography>
      )}

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={`${item.id}-${page}`} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} type={type} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          items.length > 0 && (
            <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
              Load more
            </Button>
          )
        )}
      </Box>
    </Box>
  );
}