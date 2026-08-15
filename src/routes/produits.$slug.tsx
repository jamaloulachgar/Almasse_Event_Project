import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Truck, Sparkles } from "lucide-react";
import { getProduct, products } from "@/data/catalog";
import { useFavorites } from "@/lib/favorites";
import { openWhatsApp } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/produits/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Création indisponible — Almasse Events" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Almasse Events` },
        { name: "description", content: product.short },
        { property: "og:title", content: `${product.name} — Almasse Events` },
        { property: "og:description", content: product.short },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produits/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produits/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const [imageIndex, setImageIndex] = useState(0);
  const liked = isFavorite(product.slug);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const order = () =>
    openWhatsApp(
      `Bonjour Almasse Events 👋\n\nJe souhaite commander :\n${product.name} (${product.categoryLabel})\n\nMerci de me communiquer le prix et les délais.`,
    );

  return (
    <div className="pt-32 pb-28 sm:pt-40 sm:pb-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <nav
          aria-label="Fil d'ariane"
          className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase"
        >
          <Link to="/produits" className="link-underline">
            Collections
          </Link>
          <span className="mx-3">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-lg bg-secondary shadow-soft"
            >
              <img
                src={product.images[imageIndex]}
                alt={`${product.name} — vue ${imageIndex + 1}`}
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.images.map((img: string, i: number) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Voir la vue ${i + 1}`}
                  className={`overflow-hidden rounded-lg border transition-colors duration-500 ${
                    i === imageIndex ? "border-gold" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    width={512}
                    height={512}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{product.categoryLabel}</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-primary sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 font-display text-2xl text-gold">{product.price}</p>
            <div className="gold-rule mt-9" />
            <p className="mt-9 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <dl className="mt-11 space-y-8">
              <Detail icon={<Sparkles className="h-4 w-4" />} label="Personnalisation possible">
                {product.personalization.join(" · ")}
              </Detail>
              <Detail icon={<Truck className="h-4 w-4" />} label="Délai">
                {product.delivery}
              </Detail>
            </dl>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={order}
                className="flex-1 rounded-full bg-primary px-8 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
              >
                Commander
              </button>
              <Link
                to="/commander"
                className="flex-1 rounded-full border border-border px-8 py-4 text-center text-[11px] tracking-[0.24em] text-primary uppercase transition-colors duration-500 hover:border-gold"
              >
                Personnaliser
              </Link>
              <button
                type="button"
                onClick={() => toggle(product.slug)}
                aria-pressed={liked}
                aria-label="Ajouter aux favoris"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border transition-colors duration-500 hover:border-gold"
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-gold text-gold" : "text-primary"}`} />
              </button>
            </div>
          </div>
        </div>

        <section className="mt-32">
          <Reveal>
            <p className="eyebrow">Vous aimerez aussi</p>
            <h2 className="mt-5 font-display text-3xl text-primary sm:text-4xl">
              Autres créations
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border/70 pt-6">
      <dt className="flex items-center gap-3 text-[11px] tracking-[0.2em] text-primary uppercase">
        <span className="text-gold">{icon}</span>
        {label}
      </dt>
      <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  );
}
