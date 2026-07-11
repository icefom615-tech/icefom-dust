import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAKE SOME TIME TO LIVE | 花·生 & 影子",
  description: "作品、影像，以及认真生活的片刻。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
