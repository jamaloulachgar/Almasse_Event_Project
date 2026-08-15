/**
 * Single source of truth for all editorial content.
 * Swap these arrays for CMS / database queries later without touching the UI:
 * every component consumes the exported types below.
 *
 * All images below are real Almasse Events creations (no stock/AI photos).
 * Prices are intentionally not modeled here: every product is quoted on
 * request via WhatsApp — see PRICE_ON_REQUEST / "Prix sur demande" in the UI.
 */

// ---- Buffet ----
import buffet1 from "@/assets/products/buffet/1.jpeg";
import buffet3 from "@/assets/products/buffet/3.jpeg";
import buffet4 from "@/assets/products/buffet/4.jpeg";
import buffet5 from "@/assets/products/buffet/5.jpeg";
import buffet6 from "@/assets/products/buffet/6.jpeg";
import buffet7 from "@/assets/products/buffet/7.jpeg";
import buffet8 from "@/assets/products/buffet/buffet2.jpg";

// ---- Graduation ----
import graduation1 from "@/assets/products/graduation/1.jpeg";
import graduation2 from "@/assets/products/graduation/2.jpeg";
import graduation3 from "@/assets/products/graduation/3.jpeg";
import graduation4 from "@/assets/products/graduation/4.jpeg";
import graduation5 from "@/assets/products/graduation/graduation2.jpg";

// ---- Henné ----
import henne1 from "@/assets/products/henne/1.jpeg";
import henne2 from "@/assets/products/henne/2.jpeg";
import henne3 from "@/assets/products/henne/3.jpeg";
import henne4 from "@/assets/products/henne/4.jpeg";
import henne5 from "@/assets/products/henne/5.jpeg";
import henne6 from "@/assets/products/henne/6.jpeg";
import henne7 from "@/assets/products/henne/7.jpeg";
import henne8 from "@/assets/products/henne/8.jpeg";
import henne9 from "@/assets/products/henne/9.jpeg";
import henne10 from "@/assets/products/henne/10.jpeg";

// ---- Miroirs ----
import miroir1 from "@/assets/products/miroir/1.jpeg";
import miroir2 from "@/assets/products/miroir/2.jpeg";
import miroir3 from "@/assets/products/miroir/3.jpeg";
import miroir4 from "@/assets/products/miroir/4.jpeg";
import miroir5 from "@/assets/products/miroir/5.jpeg";

// ---- Tawzi3at & Naissance ----
import naissance2 from "@/assets/products/naissance/2.jpeg";
import naissance3 from "@/assets/products/naissance/3.jpeg";
import naissance4 from "@/assets/products/naissance/4.jpeg";
import naissanceFille from "@/assets/products/naissance/tawzi3at_fille.jpg";
import naissanceGarcon from "@/assets/products/naissance/tawzi3at_garcon.jpg";

export type CategoryId = "graduation" | "henne" | "miroirs" | "naissance" | "buffet";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  /** Always "Prix sur demande" — no invented pricing. Kept as a field so the
   *  UI has a single place to render it, and so a real price list can be
   *  dropped in later without touching components. */
  price: string;
  short: string;
  description: string;
  personalization: string[];
  delivery: string;
  images: string[];
};

export const categories: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "graduation", label: "Graduation" },
  { id: "henne", label: "Henné" },
  { id: "miroirs", label: "Miroirs Personnalisés" },
  { id: "naissance", label: "Tawzi3at & Naissance" },
  { id: "buffet", label: "Buffet" },
];

export const PRICE_ON_REQUEST = "Prix sur demande";

export const products: Product[] = [
  {
    slug: "miroirs-personnalises",
    name: "Miroirs Personnalisés",
    category: "miroirs",
    categoryLabel: "Miroirs Personnalisés",
    price: PRICE_ON_REQUEST,
    short: "Un miroir unique pour un moment qui ne ressemble à aucun autre.",
    description:
      "Notre pièce signature. Chaque miroir est personnalisé avec vos prénoms, une date, un message ou un verset, puis composé avec fleurs, perles ou calligraphie selon le thème de votre événement. Votre histoire, notre création.",
    personalization: [
      "Prénom",
      "Noms",
      "Date",
      "Message",
      "Calligraphie",
      "Fleurs",
      "Perles",
      "Couleurs",
      "Thème de l'événement",
    ],
    delivery:
      "Délai de fabrication communiqué avec le devis, selon la complexité de la personnalisation.",
    images: [miroir1, miroir2, miroir3, miroir4, miroir5],
  },
  {
    slug: "graduation",
    name: "Graduation",
    category: "graduation",
    categoryLabel: "Graduation",
    price: PRICE_ON_REQUEST,
    short: "Célébrez votre réussite avec une création à votre image.",
    description:
      "Coffrets souvenir, bouteilles et étiquettes personnalisées, accessoires photo : des créations pensées pour marquer une remise de diplôme avec élégance, à votre nom et à votre promotion.",
    personalization: ["Prénom", "Nom", "Date", "Message", "Promotion", "Faculté / établissement"],
    delivery: "Délai de fabrication communiqué avec le devis.",
    images: [graduation1, graduation2, graduation3, graduation4, graduation5],
  },
  {
    slug: "henne",
    name: "Henné",
    category: "henne",
    categoryLabel: "Henné",
    price: PRICE_ON_REQUEST,
    short: "Des créations élégantes pour célébrer vos traditions avec raffinement.",
    description:
      "Décoration personnalisée, sachets de fleurs séchées, accessoires et mise en scène pour une nuit de henné à la fois traditionnelle et raffinée.",
    personalization: ["Prénoms", "Date", "Message", "Motifs", "Finitions décoratives"],
    delivery: "Délai de fabrication communiqué avec le devis.",
    images: [henne1, henne2, henne3, henne4, henne5, henne6, henne7, henne8, henne9, henne10],
  },
  {
    slug: "tawzi3at-naissance",
    name: "Tawzi3at & Naissance",
    category: "naissance",
    categoryLabel: "Tawzi3at & Naissance",
    price: PRICE_ON_REQUEST,
    short: "Des petites attentions pensées pour les grands moments.",
    description:
      'Coffrets et bouteilles "Welcome Baby", cadeaux invités et packaging personnalisé pour célébrer une naissance ou organiser vos tawzi3at avec douceur.',
    personalization: ["Prénom", "Date", "Coloris", "Packaging"],
    delivery:
      "Prévoir un délai de préparation ; contactez-nous à l'avance pour les événements proches.",
    images: [naissanceGarcon, naissanceFille, naissance2, naissance3, naissance4],
  },
  {
    slug: "buffet",
    name: "Buffet",
    category: "buffet",
    categoryLabel: "Buffet",
    price: PRICE_ON_REQUEST,
    short: "Une présentation élégante jusque dans les moindres détails.",
    description:
      "Mise en scène, décoration et présentation sur mesure de votre table ou buffet : accessoires assortis, arche florale et personnalisation selon le thème de votre événement.",
    personalization: [
      "Thème de l'événement",
      "Palette de couleurs",
      "Accessoires",
      "Mise en scène",
    ],
    delivery: "Délai de fabrication communiqué avec le devis.",
    images: [buffet1, buffet3, buffet4, buffet5, buffet6, buffet7, buffet8],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: CategoryId;
  span: "tall" | "normal";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: miroir2,
    alt: "Miroir personnalisé avec roses et perles",
    category: "miroirs",
    span: "normal",
  },
  {
    id: "g2",
    src: miroir1,
    alt: "Miroir personnalisé rond, liseré de perles",
    category: "miroirs",
    span: "tall",
  },
  {
    id: "g3",
    src: miroir3,
    alt: "Miroir personnalisé, composition élégante",
    category: "miroirs",
    span: "normal",
  },
  {
    id: "g4",
    src: graduation5,
    alt: "Accessoire photo Graduation personnalisé",
    category: "graduation",
    span: "normal",
  },
  {
    id: "g5",
    src: graduation1,
    alt: "Coffret souvenir Graduation",
    category: "graduation",
    span: "tall",
  },
  {
    id: "g6",
    src: graduation3,
    alt: "Étiquettes et bouteille Graduation personnalisées",
    category: "graduation",
    span: "normal",
  },
  {
    id: "g7",
    src: henne1,
    alt: "Mise en scène pour une nuit de henné",
    category: "henne",
    span: "normal",
  },
  {
    id: "g8",
    src: henne5,
    alt: "Sachets de fleurs séchées pour henné",
    category: "henne",
    span: "tall",
  },
  {
    id: "g9",
    src: henne8,
    alt: "Décoration personnalisée henné",
    category: "henne",
    span: "normal",
  },
  {
    id: "g10",
    src: naissanceGarcon,
    alt: "Coffret Welcome Baby personnalisé",
    category: "naissance",
    span: "tall",
  },
  {
    id: "g11",
    src: naissance3,
    alt: "Cadeaux invités personnalisés naissance",
    category: "naissance",
    span: "normal",
  },
  {
    id: "g12",
    src: buffet8,
    alt: "Table de réception dorée pour buffet",
    category: "buffet",
    span: "normal",
  },
  {
    id: "g13",
    src: buffet4,
    alt: "Mise en scène buffet à thème",
    category: "buffet",
    span: "tall",
  },
];

/**
 * No client testimonials yet — do not fill this with invented names or
 * quotes. Add real reviews here (with the client's permission) as they
 * come in; the Testimonials section hides itself when this is empty.
 */
export const testimonials: {
  name: string;
  event: string;
  rating: number;
  quote: string;
}[] = [];

export const faqs = [
  {
    q: "Quels sont les délais de fabrication ?",
    a: "Le délai dépend de la création et du niveau de personnalisation. Écrivez-nous sur WhatsApp avec votre date d'événement : nous vous confirmons un délai précis avant de valider la commande.",
  },
  {
    q: "Comment se passe la livraison ?",
    a: "Livraison partout au Maroc ; remise en main propre possible selon la ville. Les modalités exactes sont confirmées avec vous au moment du devis.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Les moyens de paiement acceptés sont confirmés directement avec vous sur WhatsApp au moment de la commande.",
  },
  {
    q: "Jusqu'où va la personnalisation ?",
    a: "Prénom, date, message, couleurs, thème de l'événement : chaque création est personnalisable. Envoyez-nous une image de référence et nous vous proposons une composition avant fabrication.",
  },
  {
    q: "Comment sont fixés les prix ?",
    a: "Chaque création est unique : le prix dépend du format et du degré de personnalisation. Contactez-nous sur WhatsApp avec votre demande pour recevoir un prix précis.",
  },
];

export const services = [
  {
    title: "Graduation",
    text: "Coffrets, bouteilles et attentions personnalisées pour célébrer un diplôme comme il le mérite.",
  },
  {
    title: "Henné",
    text: "Décoration, sachets parfumés et mise en scène pour une nuit de henné raffinée.",
  },
  {
    title: "Miroirs Personnalisés",
    text: "Notre pièce signature : un miroir unique gravé à vos prénoms, votre date et votre message.",
  },
  {
    title: "Tawzi3at & Naissance",
    text: 'Coffrets "Welcome Baby" et cadeaux invités personnalisés pour les grands moments.',
  },
];

export const steps = [
  {
    title: "Racontez-nous",
    text: "Un message WhatsApp, une inspiration, une date. Nous écoutons votre projet.",
  },
  {
    title: "Personnalisation",
    text: "Nous validons ensemble le style, les couleurs et le texte de votre création.",
  },
  {
    title: "Fabrication",
    text: "Chaque pièce est réalisée avec soin, contrôlée puis emballée avant l'envoi.",
  },
  {
    title: "Livraison",
    text: "Votre création arrive protégée, prête à être offerte ou installée.",
  },
];
