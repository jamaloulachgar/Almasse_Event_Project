import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategoryId } from "@/data/catalog";

export const Route = createFileRoute("/produits/")({
  head: () => ({
    meta: [
      { title: "Collections — Almasse Events" },
      {
        name: "description",
        content:
          "Découvrez les collections Almasse Events : miroirs personnalisés, coffrets signature, panneaux acryliques et créations sur mesure.",
      },
      { property: "og:title", content: "Collections — Almasse Events" },
      {
        property: "og:description",
        content: "Miroirs, coffrets et décorations personnalisés faits main au Maroc.",
      },
      { property: "og:url", content: "/produits" },
    ],
    links: [{ rel: "canonical", href: "/produits" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (active === "all" || p.category === active) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)),
    );
  }, [active, query]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Collections"
        title="Chaque pièce, une histoire à écrire."
        intro="Filtrez par univers ou cherchez une création. Tous nos modèles sont déclinables dans vos couleurs et vos formats."
      />

      <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={active === c.id}
              className={`rounded-full border px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${
                active === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="relative w-full lg:w-72">
          <span className="sr-only">Rechercher une création</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 60))}
            placeholder="Rechercher…"
            className="w-full rounded-full border border-border bg-card py-3 pr-4 pl-11 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-20 text-center text-sm text-muted-foreground">
          Aucune création ne correspond à cette recherche.
        </p>
      ) : (
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
