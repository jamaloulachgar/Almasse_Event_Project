import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import {
  AboutStory,
  ClosingCta,
  FaqSection,
  FeaturedProducts,
  GalleryPreview,
  HowToOrder,
  InstagramSection,
  Services,
  Testimonials,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Almasse Events — Créations personnalisées haut de gamme au Maroc" },
      {
        name: "description",
        content:
          "Miroirs, coffrets et décorations faits main pour mariages, graduations, henné et cadeaux. Commande personnalisée en quelques minutes sur WhatsApp.",
      },
      { property: "og:title", content: "Almasse Events — Créations personnalisées haut de gamme" },
      {
        property: "og:description",
        content:
          "Transformez vos plus beaux moments en souvenirs inoubliables. Créations sur mesure faites main au Maroc.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <AboutStory />
      <Services />
      <FeaturedProducts />
      <GalleryPreview />
      <InstagramSection />
      <Testimonials />
      <HowToOrder />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
