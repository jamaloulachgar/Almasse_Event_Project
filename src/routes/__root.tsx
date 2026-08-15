import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FavoritesProvider } from "@/lib/favorites";
import { I18nProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { BackToTop, Loader, ScrollProgress } from "@/components/ScrollUI";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-6 font-display text-5xl text-primary">Page introuvable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-9">
          <Link
            to="/"
            className="inline-block rounded-full bg-primary px-8 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-primary">Cette page n'a pas pu charger</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Un incident est survenu. Réessayez ou revenez à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-7 py-3 text-[11px] tracking-[0.2em] text-primary-foreground uppercase"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-full border border-border px-7 py-3 text-[11px] tracking-[0.2em] text-primary uppercase"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Almasse Events — Créations personnalisées haut de gamme" },
      {
        name: "description",
        content:
          "Miroirs, coffrets et décorations personnalisés faits main au Maroc pour mariages, graduations, henné et cadeaux.",
      },
      { name: "author", content: "Almasse Events" },
      { property: "og:site_name", content: "Almasse Events" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0E3B3C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@200;300;400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Almasse Events",
          description:
            "Créations personnalisées haut de gamme faites main : miroirs, coffrets, décorations acryliques pour mariages, graduations, henné et cadeaux.",
          telephone: "+212713743269",
          email: "almasse_events@gmail.com",
          areaServed: "MA",
          sameAs: ["https://www.instagram.com/almasse_events"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <FavoritesProvider>
          <Loader />
          <ScrollProgress />
          <SiteHeader />
          <main>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppFab />
          <BackToTop />
          <Toaster />
        </FavoritesProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
