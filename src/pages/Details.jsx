import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Chip, Button, CircularProgress, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { getDetails, getImageUrl } from "../services/tmdb";
import { useWatchlist } from "../context/WatchlistContext";

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { isSaved, add, remove } = useWatchlist();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getDetails(type, id)
      .then(setItem)
      .catch(() => setError("Could not load details."))
      .finally(() => setLoading(false));
  }, [type, id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!item) return null;

  const title = item.title || item.name || "Untitled";
  const poster = getImageUrl(item.poster_path);
  const date = item.release_date || item.first_air_date || "Unknown";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const saved = isSaved(item.id, type);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <Box sx={{ flexShrink: 0, width: { xs: "100%", sm: 300 }, maxWidth: 300 }}>
          {poster ? (
            <img src={poster} alt={title} style={{ width: "100%", borderRadius: 10 }} />
          ) : (
            <Box sx={{ aspectRatio: "2/3", bgcolor: "grey.900", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
              <Typography>No poster</Typography>
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold">{title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon sx={{ color: "gold", mr: 0.5 }} />
              <Typography>{rating}</Typography>
            </Box>
            <Typography color="text.secondary">Release date: {date}</Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {item.genres?.length ? (
              item.genres.map((g) => <Chip key={g.id} label={g.name} />)
            ) : (
              <Typography color="text.secondary">Genre not available</Typography>
            )}
          </Box>

          <Typography variant="h6" sx={{ mb: 1 }}>Overview</Typography>
          <Typography sx={{ mb: 3, maxWidth: 700 }}>
            {item.overview || "No overview available."}
          </Typography>

          <Button
            variant="contained"
            startIcon={saved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
            onClick={() => (saved ? remove(item.id, type) : add(item, type))}
          >
            {saved ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}