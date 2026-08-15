import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold"
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Revenir en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="glass-panel fixed bottom-5 left-4 z-50 grid h-11 w-11 place-items-center rounded-full text-primary sm:bottom-7 sm:left-6"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

/** Elegant one-shot loader shown on first paint. */
export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {done ? null : (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.28em" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl text-primary uppercase sm:text-3xl"
            >
              Almasse
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="gold-rule mx-auto mt-4 w-28 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
