import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/catalog";
import { GENERAL_MESSAGE, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Délais, livraison et personnalisation | Almasse Events" },
      {
        name: "description",
        content:
          "Délais de fabrication, livraison au Maroc, moyens de paiement, personnalisation et prix : toutes les réponses sur les créations Almasse Events.",
      },
      { property: "og:title", content: "FAQ — Almasse Events" },
      {
        property: "og:description",
        content: "Délais, livraison, paiement, personnalisation et prix.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Tout ce qu'il faut savoir." />
          <Reveal delay={0.1}>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-primary px-8 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
            >
              Poser une question
            </a>
          </Reveal>
        </div>
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-border/70">
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
    </div>
  );
}
