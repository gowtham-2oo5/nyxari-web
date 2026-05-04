import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] noise-bg">
      {/* Simple top bar */}
      <nav className="border-b-2 border-outline-variant/20 px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/main-logo.gif"
              alt="NYXARI"
              width={24}
              height={24}
              unoptimized
              priority
              className="h-6 w-auto"
            />
            <span className="font-display font-black text-sm tracking-[0.2em] text-primary-container">
              NYXARI
            </span>
          </Link>
          <Link
            href="/"
            className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/40 hover:text-primary-container"
          >
            ← Back
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-8 py-16">{children}</main>

      <Footer />
    </div>
  );
}
