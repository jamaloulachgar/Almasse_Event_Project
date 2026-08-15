import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/commander")({
  head: () => ({
    meta: [
      { title: "Commander — Configurateur sur mesure | Almasse Events" },
      {
        name: "description",
        content:
          "Configurez votre création personnalisée Almasse Events en 7 étapes : événement, produit, couleur, personnalisation, visuels, puis envoi sur WhatsApp.",
      },
      { property: "og:title", content: "Commander — Configurateur Almasse Events" },
      {
        property: "og:description",
        content: "Composez votre pièce sur mesure et recevez prix et délais sur WhatsApp.",
      },
      { property: "og:url", content: "/commander" },
    ],
    links: [{ rel: "canonical", href: "/commander" }],
  }),
  component: ConfiguratorPage,
});

const events = [
  "Graduation",
  "Mariage",
  "Henné",
  "Anniversaire",
  "Baby Shower",
  "Événement d'entreprise",
  "Cadeau",
  "Autre",
];
const productTypes = [
  "Miroir personnalisé",
  "Coffret cadeau",
  "Décoration acrylique",
  "Cadeau sur mesure",
  "Autre",
];
const colors = ["Blanc", "Or", "Noir", "Vert", "Rose", "Sur mesure"];

const stepTitles = [
  "Événement",
  "Produit",
  "Couleur",
  "Personnalisation",
  "Visuels",
  "Récapitulatif",
  "Envoi",
];

type Custom = {
  clientName: string;
  year: string;
  date: string;
  university: string;
  message: string;
  customText: string;
};

function ConfiguratorPage() {
  const [step, setStep] = useState(0);
  const [event, setEvent] = useState("");
  const [productType, setProductType] = useState("");
  const [color, setColor] = useState("");
  const [custom, setCustom] = useState<Custom>({
    clientName: "",
    year: "",
    date: "",
    university: "",
    message: "",
    customText: "",
  });
  const [files, setFiles] = useState<string[]>([]);

  const canNext =
    (step === 0 && event !== "") ||
    (step === 1 && productType !== "") ||
    (step === 2 && color !== "") ||
    step >= 3;

  const set = (key: keyof Custom, value: string) =>
    setCustom((c) => ({ ...c, [key]: value.slice(0, 400) }));

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const accepted = Array.from(list)
      .filter((f) => f.size <= 10 * 1024 * 1024)
      .slice(0, 6)
      .map((f) => f.name);
    if (accepted.length < list.length) {
      toast.error("Certains fichiers dépassent 10 Mo et ont été ignorés.");
    }
    setFiles((prev) => [...prev, ...accepted].slice(0, 6));
  };

  const buildMessage = () => {
    const lines = [
      "Bonjour Almasse Events 👋",
      "",
      "Je souhaite passer une commande.",
      "",
      `Événement :\n${event}`,
      "",
      `Produit :\n${productType}`,
      "",
      `Couleur :\n${color}`,
    ];
    const labels: [string, string][] = [
      ["Nom", custom.clientName],
      ["Promotion", custom.year],
      ["Date", custom.date],
      ["Université", custom.university],
      ["Message", custom.message],
      ["Texte personnalisé", custom.customText],
    ];
    labels.forEach(([label, value]) => {
      if (value.trim()) lines.push("", `${label} :\n${value.trim()}`);
    });
    if (files.length) lines.push("", `Fichiers à envoyer :\n${files.join("\n")}`);
    lines.push("", "Merci de me communiquer le prix et les délais.");
    return lines.join("\n");
  };

  const send = () => {
    openWhatsApp(buildMessage());
    toast.success("WhatsApp s'ouvre avec votre demande. Pensez à joindre vos images.");
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Configurateur"
        title="Composez votre pièce, étape par étape."
        intro="Sept étapes pour définir votre création. À la fin, votre demande part sur WhatsApp, parfaitement rédigée."
      />

      <ol className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
        {stepTitles.map((t, i) => (
          <li
            key={t}
            className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${
              i === step ? "text-primary" : i < step ? "text-gold" : "text-muted-foreground"
            }`}
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                i < step ? "border-gold bg-gold text-accent-foreground" : "border-current"
              }`}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {t}
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-lg border border-border/70 bg-card p-7 shadow-soft sm:p-11">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 ? (
              <Choices
                title="Quel est votre événement ?"
                options={events}
                value={event}
                onChange={setEvent}
              />
            ) : null}

            {step === 1 ? (
              <Choices
                title="Quelle création souhaitez-vous ?"
                options={productTypes}
                value={productType}
                onChange={setProductType}
              />
            ) : null}

            {step === 2 ? (
              <Choices
                title="Quelle couleur dominante ?"
                options={colors}
                value={color}
                onChange={setColor}
              />
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="font-display text-2xl text-primary sm:text-3xl">Personnalisation</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Nom du client"
                    value={custom.clientName}
                    onChange={(v) => set("clientName", v)}
                  />
                  <Field
                    label="Année de promotion"
                    value={custom.year}
                    onChange={(v) => set("year", v)}
                  />
                  <Field
                    label="Date de l'événement"
                    type="date"
                    value={custom.date}
                    onChange={(v) => set("date", v)}
                  />
                  <Field
                    label="Université / École"
                    value={custom.university}
                    onChange={(v) => set("university", v)}
                  />
                  <Field
                    label="Message personnel"
                    value={custom.message}
                    onChange={(v) => set("message", v)}
                    textarea
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Texte personnalisé (calligraphie)"
                    value={custom.customText}
                    onChange={(v) => set("customText", v)}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <h2 className="font-display text-2xl text-primary sm:text-3xl">
                  Photo, logo ou inspiration
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Ajoutez photo, logo, image de référence ou carton d'invitation (10 Mo max par
                  fichier). Les noms seront listés dans votre message ; joignez ensuite les fichiers
                  dans la conversation WhatsApp.
                </p>
                <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gold/50 bg-secondary/40 px-6 py-14 text-center transition-colors hover:bg-secondary">
                  <Upload className="h-5 w-5 text-gold" />
                  <span className="mt-4 text-sm text-primary">Choisir des fichiers</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG, PDF — 6 fichiers maximum
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="sr-only"
                    onChange={(e) => onFiles(e.target.files)}
                  />
                </label>
                {files.length > 0 ? (
                  <ul className="mt-6 space-y-2">
                    {files.map((f, i) => (
                      <li
                        key={`${f}-${i}`}
                        className="flex items-center justify-between rounded-md border border-border/70 px-4 py-3 text-sm"
                      >
                        <span className="truncate text-foreground/80">{f}</span>
                        <button
                          type="button"
                          aria-label={`Retirer ${f}`}
                          onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          className="ml-4 shrink-0 text-muted-foreground hover:text-primary"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {step === 5 ? (
              <div>
                <h2 className="font-display text-2xl text-primary sm:text-3xl">Récapitulatif</h2>
                <dl className="mt-8 divide-y divide-border/70">
                  <Row label="Événement" value={event} />
                  <Row label="Produit" value={productType} />
                  <Row label="Couleur" value={color} />
                  <Row label="Nom" value={custom.clientName} />
                  <Row label="Promotion" value={custom.year} />
                  <Row label="Date" value={custom.date} />
                  <Row label="Université" value={custom.university} />
                  <Row label="Message" value={custom.message} />
                  <Row label="Texte personnalisé" value={custom.customText} />
                  <Row label="Fichiers" value={files.join(", ")} />
                </dl>
              </div>
            ) : null}

            {step === 6 ? (
              <div className="text-center">
                <h2 className="font-display text-2xl text-primary sm:text-3xl">
                  Prêt à envoyer votre demande
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Votre message est déjà rédigé. Nous vous répondons généralement en moins de deux
                  heures avec prix et délais.
                </p>
                <pre className="mt-9 max-h-64 overflow-auto rounded-lg bg-secondary/60 p-6 text-left font-sans text-xs leading-relaxed whitespace-pre-wrap text-foreground/80">
                  {buildMessage()}
                </pre>
                <button
                  type="button"
                  onClick={send}
                  className="mt-9 w-full rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground sm:w-auto"
                >
                  Envoyer ma demande
                </button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-11 flex items-center justify-between border-t border-border/70 pt-7">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-primary uppercase disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(stepTitles.length - 1, s + 1))}
            disabled={!canNext || step === stepTitles.length - 1}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[11px] tracking-[0.2em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground disabled:opacity-30"
          >
            Continuer <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Choices({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-primary sm:text-3xl">{title}</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`rounded-lg border px-6 py-5 text-left text-sm transition-all duration-500 ${
              value === o
                ? "border-gold bg-secondary/70 text-primary"
                : "border-border text-foreground/75 hover:border-gold/60"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  className?: string;
}) {
  const shared =
    "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold";
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] gap-4 py-4">
      <dt className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</dt>
      <dd className="text-sm break-words text-foreground/85">{value || "—"}</dd>
    </div>
  );
}
