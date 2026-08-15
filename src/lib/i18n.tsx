import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "ar";

const STORAGE_KEY = "almasse.lang";

/**
 * Translation dictionary. Keys are grouped by area of the site.
 * Add a key here + use t("your.key") anywhere to translate more content —
 * this covers the site chrome (nav, hero, footer) and homepage section
 * headings today; product descriptions remain French-only for now and can
 * be extended the same way.
 */
const dict = {
  fr: {
    "nav.home": "Accueil",
    "nav.collections": "Collections",
    "nav.gallery": "Galerie",
    "nav.order": "Commander",
    "nav.quote": "Devis",
    "nav.contact": "Contact",
    "nav.favorites": "Favoris",
    "nav.faq": "FAQ",
    "brand.tagline": "Events · Maroc",

    "hero.eyebrow": "Créations personnalisées · Fait main au Maroc",
    "hero.title": "Transformez vos plus beaux moments en souvenirs inoubliables.",
    "hero.subtitle":
      "Créations personnalisées haut de gamme pour mariages, remises de diplôme, henné, cadeaux et événements.",
    "hero.cta.order": "Commander",
    "hero.cta.collections": "Voir les Collections",

    "footer.about":
      "Créations personnalisées haut de gamme, dessinées et façonnées à la main pour vos plus beaux moments.",
    "footer.house": "Maison",
    "footer.order": "Commande",
    "footer.reach": "Nous joindre",
    "footer.rights": "Tous droits réservés.",
    "footer.handmade": "Fait main au Maroc",

    "section.categories.eyebrow": "Découvrez",
    "section.categories.title": "Nos Créations",

    "section.about.eyebrow": "Notre histoire",
    "section.about.title": "Un atelier, deux mains, une obsession du détail.",

    "section.services.eyebrow": "Services",
    "section.services.title": "Pour chaque célébration, une écriture différente.",

    "section.products.eyebrow": "Collections",
    "section.products.title": "Nos créations les plus demandées.",
    "section.products.seeAll": "Voir toute la collection",

    "section.gallery.eyebrow": "Galerie",
    "section.gallery.title": "Le détail, encore et toujours.",
    "section.gallery.cta": "Explorer la galerie",

    "section.howto.eyebrow": "Comment commander",
    "section.howto.title": "Quatre étapes, aucune friction.",
    "section.howto.cta": "Ouvrir le configurateur",

    "section.faq.eyebrow": "FAQ",
    "section.faq.title": "Les questions que l'on nous pose.",

    "section.closing.eyebrow": "Votre projet",
    "section.closing.title": "Racontez-nous le moment que vous voulez rendre éternel.",
    "section.closing.cta.order": "Commander",
    "section.closing.cta.quote": "Demander un devis",

    "whatsapp.cta": "Commander sur WhatsApp",

    "lang.switchTo": "العربية",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.collections": "المجموعات",
    "nav.gallery": "المعرض",
    "nav.order": "اطلب الآن",
    "nav.quote": "طلب عرض سعر",
    "nav.contact": "اتصل بنا",
    "nav.favorites": "المفضلة",
    "nav.faq": "الأسئلة الشائعة",
    "brand.tagline": "Events · المغرب",

    "hero.eyebrow": "إبداعات مخصصة · صناعة يدوية في المغرب",
    "hero.title": "حوّلوا أجمل لحظاتكم إلى ذكريات لا تُنسى.",
    "hero.subtitle": "إبداعات فاخرة ومخصصة لحفلات الزفاف، التخرج، الحناء، الهدايا والمناسبات.",
    "hero.cta.order": "اطلب الآن",
    "hero.cta.collections": "اكتشف المجموعات",

    "footer.about": "إبداعات فاخرة ومخصصة، مصمّمة ومصنوعة يدويًا لأجمل لحظاتكم.",
    "footer.house": "الموقع",
    "footer.order": "الطلب",
    "footer.reach": "تواصلوا معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.handmade": "صناعة يدوية في المغرب",

    "section.categories.eyebrow": "اكتشفوا",
    "section.categories.title": "إبداعاتنا",

    "section.about.eyebrow": "قصتنا",
    "section.about.title": "ورشة، يدان، وشغف بالتفاصيل.",

    "section.services.eyebrow": "الخدمات",
    "section.services.title": "لكل احتفال، لمسة مختلفة.",

    "section.products.eyebrow": "المجموعات",
    "section.products.title": "إبداعاتنا الأكثر طلبًا.",
    "section.products.seeAll": "شاهدوا كل المجموعة",

    "section.gallery.eyebrow": "المعرض",
    "section.gallery.title": "التفاصيل، دائمًا وأبدًا.",
    "section.gallery.cta": "استكشفوا المعرض",

    "section.howto.eyebrow": "كيفية الطلب",
    "section.howto.title": "أربع خطوات، بكل سهولة.",
    "section.howto.cta": "افتحوا نموذج الطلب",

    "section.faq.eyebrow": "الأسئلة الشائعة",
    "section.faq.title": "الأسئلة التي تُطرح علينا غالبًا.",

    "section.closing.eyebrow": "مشروعكم",
    "section.closing.title": "احكوا لنا عن اللحظة التي تريدون تخليدها.",
    "section.closing.cta.order": "اطلب الآن",
    "section.closing.cta.quote": "طلب عرض سعر",

    "whatsapp.cta": "اطلبوا عبر واتساب",

    "lang.switchTo": "Français",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["fr"];

type I18nContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "ar") setLangState(saved);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, ready]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === "fr" ? "ar" : "fr")), []);

  const t = useCallback((key: TranslationKey) => dict[lang][key] ?? dict.fr[key] ?? key, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
