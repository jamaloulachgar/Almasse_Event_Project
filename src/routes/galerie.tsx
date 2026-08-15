import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, gallery, type CategoryId } from "@/data/catalog";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Almasse Events" },
      {
        name: "description",
        content:
          "Galerie des créations Almasse Events : miroirs de graduation, décors de mariage, plateaux de henné et coffrets personnalisés.",
      },
      { property: "og:title", content: "Galerie — Almasse Events" },
      {
        property: "og:description",
        content: "Nos réalisations faites main pour mariages, graduations et hennés.",
      },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => gallery.filter((g) => active === "all" || g.category === active),
    [active],
  );

  const open = lightbox !== null ? items[lightbox] : null;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Galerie"
        title="Nos réalisations, dans le détail."
        intro="Chaque image est une commande réelle, pensée avec un client, réalisée à la main dans notre atelier."
      />

      <div className="mt-14 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setActive(c.id);
              setLightbox(null);
            }}
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

      <motion.div layout className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(i)}
              className="group block w-full overflow-hidden rounded-lg bg-secondary shadow-soft"
              aria-label={`Agrandir : ${g.alt}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={1024}
                height={1280}
                className={`w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
                  g.span === "tall" ? "aspect-[3/4]" : "aspect-square"
                }`}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-primary/95 p-5"
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Fermer"
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={open.src}
              alt={open.alt}
              className="max-h-[82vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-6 text-center text-xs tracking-[0.18em] text-primary-foreground/70 uppercase">
              {open.alt}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
