import { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Terms of Service | Nyxari",
  description: "Terms for using Nyxie bot.",
};

export default function TermsPage() {
  return <Content />;
}
