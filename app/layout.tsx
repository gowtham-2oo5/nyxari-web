import type { Metadata } from "next";
import { Epilogue, Manrope, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CircleCursor from "./components/CircleCursor";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Nyxari | Tactical Gaming Clan",
  description:
    "Nyxari is a coalition of operatives dedicated to absolute supremacy. Born in darkness. Built for battle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", epilogue.variable, manrope.variable, spaceGrotesk.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-screen noise-bg">
        <CircleCursor />
        {children}
      </body>
    </html>
  );
}
