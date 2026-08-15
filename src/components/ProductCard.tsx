import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { Product } from "@/data/catalog";
import { useFavorites } from "@/lib/favorites";
import { openWhatsApp } from "@/lib/whatsapp";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isFavorite, toggle } = useFavorites();
  const liked = isFavorite(product.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group hover-lift relative flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link to="/produits/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-label={
            liked ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`
          }
          aria-pressed={liked}
          className="glass-panel absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${liked ? "fill-gold text-gold" : "text-primary"}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{product.categoryLabel}</p>
        <h3 className="mt-3 text-2xl text-primary">
          <Link to="/produits/$slug" params={{ slug: product.slug }} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.short}</p>
        <p className="mt-5 font-display text-lg text-gold">{product.price}</p>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                `Bonjour Almasse Events 👋\n\nJe souhaite commander cette création :\n${product.name} (${product.categoryLabel})\n\nMerci de me communiquer le prix et les délais.`,
              )
            }
            className="flex-1 rounded-full bg-primary px-5 py-3 text-[10px] tracking-[0.22em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
          >
            Commander
          </button>
          <Link
            to="/produits/$slug"
            params={{ slug: product.slug }}
            className="rounded-full border border-border px-5 py-3 text-[10px] tracking-[0.22em] text-primary uppercase transition-colors duration-500 hover:border-gold"
          >
            Détails
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
