import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { WatchlistProvider } from "./context/WatchlistContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Details from "./pages/Details";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Browse type="movie" />} />
              <Route path="/tv" element={<Browse type="tv" />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/details/:type/:id" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}