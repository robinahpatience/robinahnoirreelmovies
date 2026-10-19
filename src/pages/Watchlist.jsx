import { Box, Typography, Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        My Watchlist
      </Typography>

      {watchlist.length === 0 && (
        <Typography color="text.secondary">
          Your watchlist is empty. Open any movie or TV show and click "Add to Watchlist".
        </Typography>
      )}

      <Grid container spacing={2}>
        {watchlist.map((item) => (
          <Grid key={`${item.media_type}-${item.id}`} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}