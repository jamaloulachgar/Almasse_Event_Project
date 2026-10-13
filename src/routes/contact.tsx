import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import {
  EMAIL,
  GENERAL_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  openWhatsApp,
  waLink,
} from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Almasse Events" },
      {
        name: "description",
        content:
          "Contactez Almasse Events sur WhatsApp au +212 718 312 874, par email ou sur Instagram pour vos créations personnalisées au Maroc.",
      },
      { property: "og:title", content: "Contact — Almasse Events" },
      {
        property: "og:description",
        content: "WhatsApp, email et Instagram : nous répondons en quelques heures.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom").max(80),
  phone: z.string().trim().min(8, "Numéro trop court").max(20),
  subject: z.string().trim().min(2, "Indiquez un objet").max(100),
  message: z.string().trim().min(10, "Votre message est trop court").max(1000),
});
type Values = z.infer<typeof schema>;

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = (v: Values) => {
    openWhatsApp(
      `Bonjour Almasse Events 👋\n\nNom :\n${v.name}\n\nTéléphone :\n${v.phone}\n\nObjet :\n${v.subject}\n\nMessage :\n${v.message}`,
    );
    toast.success("WhatsApp s'ouvre avec votre message.");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <SectionHeading
        eyebrow="Contact"
        title="Parlons de votre événement."
        intro="Écrivez-nous sur WhatsApp pour une réponse immédiate, ou laissez-nous un message ci-dessous."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <Reveal>
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift block h-full rounded-lg border border-border/70 bg-card p-9 shadow-soft"
          >
            <MessageCircle className="h-5 w-5 text-gold" />
            <h2 className="mt-6 font-display text-2xl text-primary">WhatsApp</h2>
            <p className="mt-3 text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p>
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <a
            href={`mailto:${EMAIL}`}
            className="hover-lift block h-full rounded-lg border border-border/70 bg-card p-9 shadow-soft"
          >
            <Mail className="h-5 w-5 text-gold" />
            <h2 className="mt-6 font-display text-2xl text-primary">Email</h2>
            <p className="mt-3 text-sm break-all text-muted-foreground">{EMAIL}</p>
          </a>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift block h-full rounded-lg border border-border/70 bg-card p-9 shadow-soft"
          >
            <Instagram className="h-5 w-5 text-gold" />
            <h2 className="mt-6 font-display text-2xl text-primary">Instagram</h2>
            <p className="mt-3 text-sm text-muted-foreground">{INSTAGRAM_HANDLE}</p>
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-lg border border-border/70 bg-card p-7 shadow-soft sm:p-10"
          >
            <h2 className="font-display text-2xl text-primary">Envoyer un message</h2>
            <div className="mt-8 grid gap-6">
              <Field label="Nom" error={errors.name?.message} {...register("name")} />
              <Field label="Téléphone" error={errors.phone?.message} {...register("phone")} />
              <Field label="Objet" error={errors.subject?.message} {...register("subject")} />
              <div>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    Message
                  </span>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
                  />
                </label>
                {errors.message ? (
                  <p className="mt-2 text-xs text-destructive">{errors.message.message}</p>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="mt-9 w-full rounded-full bg-primary px-9 py-4 text-[11px] tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
            >
              Envoyer sur WhatsApp
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-lg border border-border/70 bg-secondary/60 p-9 shadow-soft">
            <div>
              <MapPin className="h-5 w-5 text-gold" />
              <h2 className="mt-6 font-display text-2xl text-primary">Atelier</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sur rendez-vous. Livraison partout au Maroc et expédition internationale sur
                demande.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="mt-8 grid h-48 place-items-center rounded-md border border-dashed border-gold/40 bg-background/60 text-[10px] tracking-[0.24em] text-muted-foreground uppercase"
            >
              Carte à intégrer
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const Field = ({
  label,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) => (
  <div>
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
      />
    </label>
    {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
  </div>
);
