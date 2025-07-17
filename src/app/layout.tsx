import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bandar Tally App",
  description: "This is a Tally Calculate app Develop by Iftekhar Alam Mithu",
  icons: {
    icon: "/favicon.ico",
  },
};

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
