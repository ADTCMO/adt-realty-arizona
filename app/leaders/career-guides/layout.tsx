import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Agent Career Guides",
  description:
    "Choose an ADT Realty career guide for newly licensed, developing and productive agents or explore the path to real estate leadership.",
  alternates: { canonical: "/leaders/career-guides" },
};

export default function CareerGuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
