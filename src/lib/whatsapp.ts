export const WHATSAPP_NUMBER = "212713743269";
export const WHATSAPP_DISPLAY = "+212 713 743 269";
export const EMAIL = "almasse_events@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/almasse_events";
export const INSTAGRAM_HANDLE = "@almasse_events";

/** Build a wa.me link with a pre-formatted, URL-encoded message. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Open WhatsApp in a new tab. */
export function openWhatsApp(message: string) {
  if (typeof window === "undefined") return;
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

export const GENERAL_MESSAGE =
  "Bonjour 👋\n\nJe souhaite avoir plus d'informations concernant vos créations.";

/** Compose a labelled block, skipping empty values. */
export function block(entries: [string, string | undefined | null][]) {
  return entries
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(([label, v]) => `${label} :\n${String(v).trim()}`)
    .join("\n\n");
}
