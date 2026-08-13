import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const origin = `${protocol}://${host}`;

  return {
    title: "SocialHaus — Enter the Haus",
    description:
      "SocialHaus is a creative studio shaping presence across Athens, Mykonos and Northern Greece.",
    openGraph: {
      title: "SocialHaus — Enter the Haus",
      description: "We don't create content. We create presence.",
      images: [`${origin}/og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "SocialHaus — Enter the Haus",
      description: "We don't create content. We create presence.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
