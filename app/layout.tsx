import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADT Realty Arizona | Buy, Sell or Build Your Career",
  description: "Clear guidance, modern tools and trusted Arizona real estate professionals for buyers, sellers and agents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
