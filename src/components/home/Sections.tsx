import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Star, Instagram as InstagramIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, gallery, products, services, steps, testimonials } from "@/data/catalog";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";
import atelier from "@/assets/products/henne/1.jpeg";

/* ---------------------------------- About --------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setValue(Math.round(to * eased));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-4xl text-primary sm:text-5xl">
      {value}
      {suffix}
    </span>
  );
}

export function AboutStory() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);

  return (
    <section id="histoire" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div ref={ref} className="relative overflow-hidden rounded-lg bg-secondary shadow-soft">
          <motion.img
            src={atelier}
            alt="Mise en scène Almasse Events, décoration personnalisée"
            loading="lazy"
            width={1600}
            height={1280}
            style={{ y }}
            className="h-[420px] w-full scale-110 object-cover sm:h-[560px]"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow={t("section.about.eyebrow")}
            title={t("section.about.title")}
            intro="Almasse Events est née d'une conviction simple : un souvenir mérite d'être aussi beau que le moment qu'il célèbre. Chaque miroir, chaque coffret, chaque panneau est dessiné puis façonné à la main, pièce unique après pièce unique."
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Nous travaillons en petit nombre, par choix. Cela nous permet de vous écouter
              longuement, de proposer une maquette avant fabrication et de contrôler chaque finition
              avant qu'elle ne quitte l'atelier.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-1 gap-6">
              {/* TODO(client): "Créations" and "Savoir-faire" counters removed —
                  provide real figures (nb. of creations made, years active)
                  and they can go right back in this grid as 3 columns. */}
              <div>
                <Counter to={100} suffix="%" />
                <p className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  Fait main
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Services -------------------------------- */

export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="bg-secondary/50 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow={t("section.services.eyebrow")}
          title={t("section.services.title")}
          align="center"
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group h-full bg-background p-9 transition-colors duration-700 hover:bg-primary">
                <p className="font-display text-sm text-gold">0{i + 1}</p>
                <h3 className="mt-6 text-2xl text-primary transition-colors duration-700 group-hover:text-primary-foreground">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-700 group-hover:text-primary-foreground/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Products -------------------------------- */

export function FeaturedProducts() {
  const { t } = useI18n();
  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("section.products.eyebrow")}
          title={t("section.products.title")}
          intro="Cinq univers signature, déclinables dans vos couleurs, vos formats et vos mots."
        />
        <Reveal delay={0.1}>
          <Link
            to="/produits"
            className="link-underline inline-block text-[11px] tracking-[0.22em] text-primary uppercase"
          >
            {t("section.products.seeAll")}
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Gallery -------------------------------- */

export function GalleryPreview() {
  const { t } = useI18n();
  return (
    <section className="bg-primary py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("section.gallery.eyebrow")}</p>
          <h2 className="mt-5 text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
            {t("section.gallery.title")}
          </h2>
          <div className="gold-rule mx-auto mt-8 w-24" />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {gallery.slice(0, 8).map((g, i) => (
            <Reveal key={g.id} delay={(i % 4) * 0.06}>
              <div className="group overflow-hidden rounded-lg">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="aspect-square w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            to="/galerie"
            className="inline-block rounded-full border border-primary-foreground/25 px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            {t("section.gallery.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Instagram -------------------------------- */

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        eyebrow="Instagram"
        title="Suivez l'atelier au quotidien."
        intro={`Coulisses, nouveautés et commandes livrées sur ${INSTAGRAM_HANDLE}.`}
        align="center"
      />
      <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {gallery.slice(0, 6).map((g, i) => (
          <Reveal key={`ig-${g.id}`} delay={i * 0.05}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-lg"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-square w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-primary/0 text-primary-foreground opacity-0 transition-all duration-500 group-hover:bg-primary/45 group-hover:opacity-100">
                <InstagramIcon className="h-5 w-5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
        >
          Voir Instagram
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

export function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  // No real reviews yet — hide the section rather than show empty/fake content.
  if (testimonials.length === 0) return null;

  const active = testimonials[index] ?? testimonials[0]!;

  return (
    <section className="bg-secondary/50 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="eyebrow">Ils nous font confiance</p>
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <div className="flex justify-center gap-1" aria-label={`${active.rating} étoiles sur 5`}>
            {Array.from({ length: active.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <p className="mt-8 font-display text-2xl leading-snug text-primary sm:text-3xl">
            « {active.quote} »
          </p>
          <footer className="mt-9 flex flex-col items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full bg-gold-soft font-display text-lg text-primary"
            >
              {active.name.charAt(0)}
            </span>
            <span className="text-sm text-primary">{active.name}</span>
            <span className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {active.event}
            </span>
          </footer>
        </motion.blockquote>

        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Avis de ${t.name}`}
              className={`h-[3px] w-8 transition-colors duration-500 ${
                i === index ? "bg-gold" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How to order ------------------------------ */

export function HowToOrder() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading eyebrow={t("section.howto.eyebrow")} title={t("section.howto.title")} />
      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="border-t border-gold/40 pt-7">
              <p className="font-display text-3xl text-gold">0{i + 1}</p>
              <h3 className="mt-4 text-xl text-primary">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} className="mt-16">
        <Link
          to="/commander"
          className="inline-block rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
        >
          {t("section.howto.cta")}
        </Link>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

export function FaqSection() {
  const { t } = useI18n();
  return (
    <section className="bg-secondary/50 py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={t("section.faq.eyebrow")} title={t("section.faq.title")} />
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border/70">
                <AccordionTrigger className="py-6 text-left font-display text-xl text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-7 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- CTA ---------------------------------- */

export function ClosingCta() {
  const { t } = useI18n();
  return (
    <section className="bg-primary py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{t("section.closing.eyebrow")}</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
            {t("section.closing.title")}
          </h2>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/commander"
              className="rounded-full bg-gold px-9 py-4 text-[11px] tracking-[0.24em] text-accent-foreground uppercase transition-opacity duration-500 hover:opacity-90"
            >
              {t("section.closing.cta.order")}
            </Link>
            <Link
              to="/devis"
              className="rounded-full border border-primary-foreground/25 px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              {t("section.closing.cta.quote")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
