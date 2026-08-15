import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SectionHeading } from "@/components/SectionHeading";
import { openWhatsApp } from "@/lib/whatsapp";
import { useState } from "react";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Demande de devis — Almasse Events" },
      {
        name: "description",
        content:
          "Obtenez un devis personnalisé pour vos créations événementielles : quantités, budget, délais et références. Réponse rapide sur WhatsApp.",
      },
      { property: "og:title", content: "Demande de devis — Almasse Events" },
      {
        property: "og:description",
        content: "Un devis précis pour votre événement, en quelques heures.",
      },
      { property: "og:url", content: "/devis" },
    ],
    links: [{ rel: "canonical", href: "/devis" }],
  }),
  component: QuotePage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro trop court")
    .max(20)
    .regex(/^[0-9+\s().-]+$/, "Numéro invalide"),
  email: z.string().trim().email("Email invalide").max(160).or(z.literal("")),
  eventType: z.string().trim().min(2, "Précisez le type d'événement").max(80),
  quantity: z.string().trim().max(40),
  budget: z.string().trim().max(40),
  deadline: z.string().trim().max(40),
  description: z.string().trim().min(10, "Décrivez votre projet").max(1200),
});

type Values = z.infer<typeof schema>;

function QuotePage() {
  const [refs, setRefs] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: "",
      quantity: "",
      budget: "",
      deadline: "",
      description: "",
    },
  });

  const onSubmit = (v: Values) => {
    const lines = [
      "Bonjour Almasse Events 👋",
      "",
      "Je souhaite obtenir un devis.",
      "",
      `Nom :\n${v.name}`,
      "",
      `Téléphone :\n${v.phone}`,
    ];
    if (v.email) lines.push("", `Email :\n${v.email}`);
    lines.push("", `Type d'événement :\n${v.eventType}`);
    if (v.quantity) lines.push("", `Quantité :\n${v.quantity}`);
    if (v.budget) lines.push("", `Budget :\n${v.budget}`);
    if (v.deadline) lines.push("", `Date souhaitée :\n${v.deadline}`);
    lines.push("", `Description :\n${v.description}`);
    if (refs.length) lines.push("", `Références à envoyer :\n${refs.join("\n")}`);
    lines.push("", "Merci de me communiquer le prix et les délais.");
    openWhatsApp(lines.join("\n"));
    toast.success("WhatsApp s'ouvre avec votre demande de devis.");
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Devis"
        title="Un chiffrage précis, sans engagement."
        intro="Décrivez votre projet : nous revenons vers vous avec un devis détaillé, généralement en moins de deux heures ouvrées."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-14 rounded-lg border border-border/70 bg-card p-7 shadow-soft sm:p-11"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Input label="Nom complet" error={errors.name?.message} {...register("name")} />
          <Input label="Téléphone" error={errors.phone?.message} {...register("phone")} />
          <Input label="Email (optionnel)" error={errors.email?.message} {...register("email")} />
          <Input
            label="Type d'événement"
            error={errors.eventType?.message}
            {...register("eventType")}
          />
          <Input label="Quantité" error={errors.quantity?.message} {...register("quantity")} />
          <Input label="Budget indicatif" error={errors.budget?.message} {...register("budget")} />
          <Input
            label="Date limite"
            type="date"
            error={errors.deadline?.message}
            {...register("deadline")}
          />
          <div className="sm:col-span-2">
            <label className="block">
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Description du projet
              </span>
              <textarea
                rows={5}
                {...register("description")}
                className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
              />
            </label>
            {errors.description ? (
              <p className="mt-2 text-xs text-destructive">{errors.description.message}</p>
            ) : null}
          </div>

          <label className="sm:col-span-2">
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Images de référence (optionnel)
            </span>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) =>
                setRefs(
                  Array.from(e.target.files ?? [])
                    .filter((f) => f.size <= 10 * 1024 * 1024)
                    .slice(0, 6)
                    .map((f) => f.name),
                )
              }
              className="mt-3 block w-full cursor-pointer rounded-md border border-dashed border-gold/50 bg-secondary/40 px-4 py-4 text-sm"
            />
            {refs.length ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {refs.length} fichier(s) : {refs.join(", ")} — à joindre dans WhatsApp.
              </p>
            ) : null}
          </label>
        </div>

        <button
          type="submit"
          className="mt-11 w-full rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground sm:w-auto"
        >
          Demander un devis
        </button>
      </form>
    </div>
  );
}

const Input = ({
  label,
  error,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) => (
  <div>
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
      <input
        type={type}
        {...rest}
        className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
      />
    </label>
    {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
  </div>
);
