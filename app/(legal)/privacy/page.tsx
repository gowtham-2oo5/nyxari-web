import { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy | Nyxari",
  description: "How Nyxie handles your data.",
};

export default function PrivacyPage() {
  return <Content />;
}
