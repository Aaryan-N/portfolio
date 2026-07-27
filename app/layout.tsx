import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaryan Narayan",
  description:
    "A small collection of software, hardware and other things Aaryan has been working on.",
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
