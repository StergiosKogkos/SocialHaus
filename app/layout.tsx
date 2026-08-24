import type { Metadata, Viewport } from "next";
import { assetPath, siteUrl } from "../lib/site";
import "./globals.css";

const title = "SocialHaus | Creative Studio & Social Media στην Ελλάδα";
const description =
  "Creative studio για στρατηγική, branding, content creation και social media marketing σε Αθήνα, Μύκονο και Βόρεια Ελλάδα. Enter the SocialHaus.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "SocialHaus",
  keywords: [
    "creative studio",
    "social media marketing",
    "content creation",
    "branding",
    "Αθήνα",
    "Μύκονος",
  ],
  creator: "SocialHaus",
  publisher: "SocialHaus",
  category: "marketing",
  alternates: {
    canonical: siteUrl,
    languages: { "el-GR": siteUrl, "x-default": siteUrl },
  },
  manifest: assetPath("/manifest.webmanifest"),
  icons: {
    icon: [{ url: assetPath("/assets/brand/socialhaus-owl.png"), type: "image/png" }],
    apple: [{ url: assetPath("/assets/brand/socialhaus-owl.png"), type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: siteUrl,
    siteName: "SocialHaus",
    title,
    description,
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "SocialHaus — Enter the Haus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "8HsE0UpzBIqCWKVCP4wpf9DuNcx5S6uZIuvrqW_GOwE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SocialHaus",
      url: siteUrl,
      logo: `${siteUrl}/assets/brand/socialhaus-owl.png`,
      email: "mailto:aposskamnos@gmail.com",
      telephone: "+306980183236",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer inquiries",
        email: "aposskamnos@gmail.com",
        telephone: "+306980183236",
        availableLanguage: ["Greek", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SocialHaus",
      description,
      inLanguage: ["el", "en"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: "SocialHaus",
      url: siteUrl,
      image: `${siteUrl}/og.jpg`,
      email: "aposskamnos@gmail.com",
      telephone: "+306980183236",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Νήλεως 32",
        addressLocality: "Αθήνα",
        addressCountry: "GR",
      },
      areaServed: [
        { "@type": "City", name: "Αθήνα" },
        { "@type": "Place", name: "Μύκονος" },
        { "@type": "AdministrativeArea", name: "Βόρεια Ελλάδα" },
      ],
      parentOrganization: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
