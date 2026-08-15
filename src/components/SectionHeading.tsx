import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-4xl leading-[1.05] text-primary sm:text-5xl md:text-6xl">{title}</h2>
      {intro ? (
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
      ) : null}
      <div className={align === "center" ? "gold-rule mx-auto mt-8 w-24" : "gold-rule mt-8 w-24"} />
    </Reveal>
  );
}
