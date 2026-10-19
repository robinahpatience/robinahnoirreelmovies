import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isSaved = (id, type) =>
    watchlist.some((i) => i.id === id && i.media_type === type);

  const add = (item, type) =>
    setWatchlist((prev) => [...prev, { ...item, media_type: type }]);

  const remove = (id, type) =>
    setWatchlist((prev) => prev.filter((i) => !(i.id === id && i.media_type === type)));

  return (
    <WatchlistContext.Provider value={{ watchlist, isSaved, add, remove }}>
      {children}
    </WatchlistContext.Provider>
  );
}