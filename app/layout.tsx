import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adtrealtyaz.com"),
  title: {
    default: "ADT Realty Arizona | Buy, Sell or Build Your Career",
    template: "%s | ADT Realty Arizona",
  },
  description: "Work with trusted Arizona real estate professionals to buy a home, sell your property or build a successful real estate career with ADT Realty.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/adt-realty-arizona-logo.png", type: "image/png" }],
    shortcut: "/adt-realty-arizona-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ADT Realty Arizona",
    title: "ADT Realty Arizona | Buy, Sell or Build Your Career",
    description: "Arizona real estate guidance for homebuyers, sellers and agents ready to grow their careers.",
    images: [{ url: "/hero-arizona-bright.png", alt: "ADT Realty Arizona" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADT Realty Arizona | Buy, Sell or Build Your Career",
    description: "Arizona real estate guidance for buyers, sellers and agents.",
    images: ["/hero-arizona-bright.png"],
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "ADT Realty Arizona",
              url: "https://adtrealtyaz.com/",
              logo: "https://adtrealtyaz.com/adt-realty-arizona-logo.png",
              image: "https://adtrealtyaz.com/hero-arizona-bright.png",
              email: "mikedingman@adthomes.com",
              areaServed: { "@type": "State", name: "Arizona" },
              parentOrganization: { "@type": "Organization", name: "ADT Realty" },
            }),
          }}
        />
        {children}
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
