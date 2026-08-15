import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/** Small FR/AR toggle. Sets <html lang/dir> and persists the choice. */
export function LanguageSwitcher() {
  const { lang, toggleLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t("lang.switchTo")}
      title={t("lang.switchTo")}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
    >
      <span className="relative">
        <Languages className="h-4 w-4" />
        <span className="absolute -top-1.5 -right-2 rounded-full bg-gold px-1 text-[8px] font-semibold text-accent-foreground uppercase">
          {lang}
        </span>
      </span>
    </button>
  );
}
