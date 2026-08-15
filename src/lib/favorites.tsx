import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "almasse.favorites";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
  ready: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable */
    }
  }, [favorites, ready]);

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      ready,
      isFavorite: (slug) => favorites.includes(slug),
      toggle,
      clear: () => setFavorites([]),
    }),
    [favorites, ready, toggle],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
