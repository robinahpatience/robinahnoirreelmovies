import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, TextField, InputAdornment, Box, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const drawerWidth = 220;

const navItems = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Movies", path: "/movies", icon: <MovieIcon /> },
  { label: "TV Shows", path: "/tv", icon: <TvIcon /> },
  { label: "My Watchlist", path: "/watchlist", icon: <BookmarkIcon /> },
];

export default function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "background.paper", backgroundImage: "none" }}>
        <Toolbar sx={{ gap: 1 }}>
          {!isDesktop && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ cursor: "pointer", mr: 2 }}
            onClick={() => navigate("/")}
          >
            NoirReel
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, maxWidth: 500 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search movies & TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: isDesktop ? drawerWidth : 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}