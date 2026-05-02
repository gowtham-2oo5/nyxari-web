import Link from "next/link";
import { CheckSquare } from "@phosphor-icons/react/dist/ssr";

const requirements = [
  "Active in HBG",
  "Respect the code",
  "Back your clan",
];

const steps = [
  { num: "1", label: "Join Discord", active: false },
  { num: "2", label: "Read the rules", active: false },
  { num: "3", label: "Pass vibe check", active: false },
  { num: "4", label: "You're in", active: true },
];

export default function Enlist() {
  return (
    <section id="enlist" className="py-24 px-8 relative">
      <div className="max-w-4xl mx-auto border border-outline-variant bg-surface-container-lowest p-12 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.05)_0%,transparent_100%)]" />

        {/* Headline */}
        <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.1] tracking-[-0.04em] text-inverse-surface uppercase mb-12 relative z-10">
          Can you keep up?
        </h2>

        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10 text-left border-y border-primary-container/20 py-8">
          {requirements.map((req) => (
            <div key={req} className="flex items-start gap-4">
              <CheckSquare
                size={24}
                weight="duotone"
                className="text-primary-container flex-shrink-0 mt-0.5"
              />
              <span className="font-display font-bold text-lg uppercase text-on-surface">
                {req}
              </span>
            </div>
          ))}
        </div>

        {/* Steps — square indicators, no rounded-full */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-16 relative z-10 font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              {i > 0 && (
                <div className="hidden md:block w-8 h-px bg-outline-variant mr-4" />
              )}
              <span
                className={`w-6 h-6 border flex items-center justify-center text-xs ${
                  step.active
                    ? "border-primary-container bg-primary-container text-white"
                    : "border-primary-container text-primary-container"
                }`}
              >
                {step.num}
              </span>
              {step.label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#"
          className="inline-block relative z-10 bg-primary-container text-[#E8E0D0] font-display font-bold uppercase py-6 px-16 text-2xl border border-primary-container transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8B0000] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(139,0,0,0.3)] active:scale-[0.97] active:translate-y-0"
        >
          Enlist in Nyxari
        </Link>
      </div>
    </section>
  );
}
