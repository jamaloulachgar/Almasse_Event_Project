import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  GENERAL_MESSAGE,
  waLink,
} from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/70 bg-secondary/60">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <span className="block font-display text-2xl tracking-[0.28em] text-primary uppercase">
              Almasse
            </span>
            <span className="eyebrow mt-1 block text-[9px]">{t("brand.tagline")}</span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.about")}
            </p>
          </div>

          <nav aria-label="Navigation" className="text-sm">
            <p className="eyebrow">{t("footer.house")}</p>
            <ul className="mt-5 space-y-3">
              {[
                { to: "/produits", label: t("nav.collections") },
                { to: "/galerie", label: t("nav.gallery") },
                { to: "/favoris", label: t("nav.favorites") },
                { to: "/faq", label: t("nav.faq") },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-foreground/80">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Commande" className="text-sm">
            <p className="eyebrow">{t("footer.order")}</p>
            <ul className="mt-5 space-y-3">
              {[
                { to: "/commander", label: t("nav.order") },
                { to: "/devis", label: t("nav.quote") },
                { to: "/contact", label: t("nav.contact") },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-foreground/80">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <p className="eyebrow">{t("footer.reach")}</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={waLink(GENERAL_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-foreground/80 transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 break-all text-foreground/80 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-foreground/80 transition-colors hover:text-primary"
                >
                  <Instagram className="h-4 w-4 text-gold" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-16" />
        <div className="mt-8 flex flex-col gap-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Almasse Events. {t("footer.rights")}
          </p>
          <p>{t("footer.handmade")}</p>
        </div>
      </div>
    </footer>
  );
}
