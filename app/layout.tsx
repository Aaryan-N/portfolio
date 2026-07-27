import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaryan.is-a.dev"),
  title: "Aaryan Narayan",
  description:
    "Product software, connected hardware and agent-assisted engineering by Aaryan Narayan in Melbourne.",
  openGraph: {
    title: "Aaryan Narayan",
    description: "Product software, connected hardware and agent-assisted engineering from Melbourne.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 896, alt: "Aaryan Narayan portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaryan Narayan",
    description: "Product software, connected hardware and agent-assisted engineering from Melbourne.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
