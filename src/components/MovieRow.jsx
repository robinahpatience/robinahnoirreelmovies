import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, fetcher, type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetcher()
      .then((data) => setItems(data.slice(0, 12)))
      .catch(() => setError("Could not load this section."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} type={type} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}