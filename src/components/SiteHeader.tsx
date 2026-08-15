import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, Moon, Sun, X } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const nav = [
  { to: "/", key: "nav.home" },
  { to: "/produits", key: "nav.collections" },
  { to: "/galerie", key: "nav.gallery" },
  { to: "/commander", key: "nav.order" },
  { to: "/devis", key: "nav.quote" },
  { to: "/contact", key: "nav.contact" },
] as const satisfies { to: string; key: TranslationKey }[];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { favorites } = useFavorites();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? "glass-panel py-3 shadow-soft" : "border-b border-transparent py-6"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="min-w-0" aria-label="Almasse Events, accueil">
            <span className="block truncate font-display text-xl tracking-[0.28em] text-primary uppercase sm:text-2xl">
              Almasse
            </span>
            <span className="eyebrow block text-[9px]">{t("brand.tagline")}</span>
          </Link>

          <nav className="hidden items-center justify-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="link-underline text-[11px] font-normal tracking-[0.2em] text-foreground/80 uppercase transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/favoris"
              aria-label={t("nav.favorites")}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
            >
              <Heart className="h-4 w-4" />
              {favorites.length > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-medium text-primary-foreground">
                  {favorites.length}
                </span>
              ) : null}
            </Link>
            <Link
              to="/commander"
              className="hidden shrink-0 rounded-full bg-primary px-6 py-3 text-[10px] font-normal tracking-[0.22em] text-primary-foreground uppercase transition-all duration-500 hover:bg-gold hover:text-accent-foreground sm:inline-block"
            >
              {t("nav.order")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background px-6 py-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl tracking-[0.28em] text-primary uppercase">
                Almasse
              </span>
              <div className="flex items-center gap-1">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-5 font-display text-3xl text-primary"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/favoris"
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-5 font-display text-3xl text-primary"
              >
                {t("nav.favorites")}
              </Link>
              <Link
                to="/faq"
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-3xl text-primary"
              >
                {t("nav.faq")}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
