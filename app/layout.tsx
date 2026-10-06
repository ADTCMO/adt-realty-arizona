import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import OpenAIAdsPixel from "./OpenAIAdsPixel";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adtrealtyaz.com"),
  title: {
    default: "Arizona Real Estate | Buy, Sell & Local Guides | ADT Realty",
    template: "%s | ADT Realty Arizona",
  },
  description:
    "Buy or sell a home in Chandler, Gilbert and the Phoenix East Valley with ADT Realty Arizona. Use mortgage calculators, get a home value estimate and explore local guides.",
  alternates: { canonical: "/" },
  keywords: [
    "Arizona real estate",
    "Chandler AZ real estate",
    "Gilbert AZ real estate",
    "Phoenix East Valley homes",
    "buy a home in Arizona",
    "sell a home in Arizona",
    "Arizona real estate agents",
  ],
  icons: {
    icon: [{ url: "/favicon-96.png", type: "image/png", sizes: "96x96" }],
    shortcut: "/favicon-96.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ADT Realty Arizona",
    title: "Arizona Real Estate | Buy, Sell & Local Guides | ADT Realty",
    description:
      "Explore Arizona real estate with local guidance for buyers, sellers and agents in Chandler, Gilbert and the Phoenix East Valley.",
    images: [
      {
        url: "/social-share-home.jpg",
        width: 1920,
        height: 819,
        alt: "Arizona home and landscape featured by ADT Realty Arizona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona Real Estate | Buy, Sell & Local Guides | ADT Realty",
    description:
      "Local real estate guidance for buyers, sellers and agents across Arizona's East Valley.",
    images: ["/social-share-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"/>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "ADT Realty Arizona",
              url: "https://www.adtrealtyaz.com/",
              logo: "https://www.adtrealtyaz.com/adt-realty-arizona-outline.png",
              image: "https://www.adtrealtyaz.com/social-share-home.jpg",
              email: "mikedingman@adthomes.com",
              areaServed: [
                { "@type": "State", name: "Arizona" },
                { "@type": "City", name: "Chandler" },
                { "@type": "City", name: "Gilbert" },
                { "@type": "AdministrativeArea", name: "Phoenix East Valley" },
              ],
              parentOrganization: { "@type": "Organization", name: "ADT Realty" },
            }),
          }}
        />
        {children}
        <Analytics />
        <OpenAIAdsPixel />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','267997290538675');fbq('track','PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=267997290538675&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
