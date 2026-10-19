import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { searchTitles } from "../services/tmdb";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError("");
    searchTitles(query)
      .then(setResults)
      .catch(() => setError("Search failed. Please check your connection and try again."))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Search results for "{query}"
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && query && results.length === 0 && (
        <Typography color="text.secondary">No matches found for "{query}".</Typography>
      )}

      <Grid container spacing={2}>
        {results.map((item) => (
          <Grid key={`${item.media_type}-${item.id}`} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}