import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/catalog";
import { useFavorites } from "@/lib/favorites";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes favoris — Almasse Events" },
      {
        name: "description",
        content:
          "Retrouvez les créations Almasse Events que vous avez enregistrées et envoyez votre sélection directement sur WhatsApp.",
      },
      { property: "og:title", content: "Mes favoris — Almasse Events" },
      {
        property: "og:description",
        content: "Votre sélection de créations personnalisées Almasse Events.",
      },
      { property: "og:url", content: "/favoris" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/favoris" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, clear, ready } = useFavorites();
  const selected = products.filter((p) => favorites.includes(p.slug));

  const sendList = () =>
    openWhatsApp(
      `Bonjour Almasse Events 👋\n\nVoici ma sélection de favoris :\n\n${selected
        .map((p, i) => `${i + 1}. ${p.name} — ${p.categoryLabel}`)
        .join("\n")}\n\nMerci de me communiquer les prix et les délais.`,
    );

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Favoris"
        title="Votre sélection."
        intro="Enregistrez les créations qui vous inspirent, puis envoyez-nous la liste complète en un geste."
      />

      {!ready ? null : selected.length === 0 ? (
        <div className="mt-16 rounded-lg border border-border/70 bg-card p-14 text-center shadow-soft">
          <p className="font-display text-2xl text-primary">Aucun favori pour l'instant.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Parcourez les collections et touchez le cœur sur les pièces qui vous plaisent.
          </p>
          <Link
            to="/produits"
            className="mt-9 inline-block rounded-full bg-primary px-8 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
          >
            Voir les collections
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={sendList}
              className="rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
            >
              Commander mes favoris
            </button>
            <button
              type="button"
              onClick={clear}
              className="rounded-full border border-border px-9 py-4 text-[11px] tracking-[0.24em] text-primary uppercase transition-colors duration-500 hover:border-gold"
            >
              Vider la liste
            </button>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
