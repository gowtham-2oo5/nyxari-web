import {
  UsersThree,
  ShieldCheck,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const quirks = [
  { icon: UsersThree, title: "No Solo Runs" },
  { icon: ShieldCheck, title: "Back Every Member" },
  { icon: Lightning, title: "Plus Ultra, Together" },
];

export default function OurQuirk() {
  return (
    <section
      id="our-quirk"
      className="py-24 px-8 relative border-b-2 border-primary-container/20"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left column */}
          <ScrollReveal className="col-span-1 md:col-span-4" direction="left">
            <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-primary-container" /> This is our
              Quirk.
            </h2>
            <p className="font-body text-base leading-relaxed text-on-surface-variant max-w-sm">
              Nyxari is a coalition of operatives dedicated to absolute
              supremacy. We operate under the cover of night, striking with
              lethal efficiency. Born in darkness. Built for battle.
            </p>
          </ScrollReveal>

          {/* Cards */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quirks.map((quirk, i) => {
              const Icon = quirk.icon;
              return (
                <ScrollReveal key={quirk.title} delay={i * 0.1}>
                  <div className="bg-surface-container-lowest border border-outline-variant p-8 glow-hover group relative overflow-hidden h-full">
                    <Icon
                      size={40}
                      weight="duotone"
                      className="text-primary-container mb-6 block"
                    />
                    <h3 className="font-display font-bold text-inverse-surface uppercase text-xl">
                      {quirk.title}
                    </h3>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
