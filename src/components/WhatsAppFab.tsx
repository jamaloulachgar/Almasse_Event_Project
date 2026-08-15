import { motion } from "motion/react";
import { GENERAL_MESSAGE, waLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <motion.a
      href={waLink(GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à Almasse Events sur WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      className="pulse-gold fixed right-4 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift sm:right-6 sm:bottom-7 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.12-.41-2.14-1.32-.79-.71-1.32-1.58-1.47-1.88-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.35.71.28 1.26.44 1.69.57.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.43-4.99c0-5.17 4.22-9.38 9.4-9.38a9.34 9.34 0 0 1 6.64 2.75 9.3 9.3 0 0 1 2.75 6.64c0 5.17-4.22 9.39-9.39 9.39zm7.99-17.38A11.28 11.28 0 0 0 12.04 1C5.83 1 .78 6.04.78 12.24c0 1.98.52 3.92 1.5 5.63L.5 23.5l5.79-1.51a11.2 11.2 0 0 0 5.74 1.55h.01c6.2 0 11.25-5.04 11.25-11.25 0-3-1.17-5.83-3.26-7.92z" />
      </svg>
    </motion.a>
  );
}
