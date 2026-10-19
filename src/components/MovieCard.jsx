import { Card, CardActionArea, CardMedia, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/tmdb";

export default function MovieCard({ item, type }) {
  const navigate = useNavigate();
  const mediaType = item.media_type || type || "movie";
  const title = item.title || item.name || "Untitled";
  const poster = getImageUrl(item.poster_path);
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  return (
    <Card
      sx={{
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
      }}
    >
      <CardActionArea onClick={() => navigate(`/details/${mediaType}/${item.id}`)}>
        {poster ? (
          <CardMedia component="img" image={poster} alt={title} sx={{ aspectRatio: "2/3" }} />
        ) : (
          <Box
            sx={{
              aspectRatio: "2/3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.900",
              p: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">No poster</Typography>
          </Box>
        )}
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" noWrap fontWeight="bold">
            {title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary">
              {year || "N/A"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon sx={{ fontSize: 14, color: "gold", mr: 0.3 }} />
              <Typography variant="caption">{rating}</Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}