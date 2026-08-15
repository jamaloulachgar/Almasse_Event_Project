import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import heroImage from "@/assets/products/miroir/2.jpeg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-32 sm:pt-40">
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="Miroir personnalisé fait main, calligraphie dorée sur soie crème"
          width={1920}
          height={1280}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10 dark:from-background dark:via-background/90 dark:to-background/30" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 pb-24 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="eyebrow"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="display-hero mt-7 max-w-3xl text-[2.6rem] text-primary sm:text-6xl lg:text-[4.6rem]"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1 }}
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            to="/commander"
            className="rounded-full bg-primary px-9 py-4 text-center text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-all duration-500 hover:bg-gold hover:text-accent-foreground"
          >
            {t("hero.cta.order")}
          </Link>
          <Link
            to="/produits"
            className="rounded-full border border-primary/25 px-9 py-4 text-center text-[11px] tracking-[0.24em] text-primary uppercase transition-all duration-500 hover:border-gold hover:bg-secondary/60"
          >
            {t("hero.cta.collections")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
