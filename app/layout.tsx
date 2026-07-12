import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://take-some-time-to-live.icefom615.chatgpt.site"),
  title: "TAKE SOME TIME TO LIVE | 花·生 & 尘光",
  description: "作品、影像，以及认真生活的片刻。",
  openGraph: {
    title: "TAKE SOME TIME TO LIVE",
    description: "花·生 & 尘光的作品与生活影像空间。",
    url: "/",
    siteName: "TAKE SOME TIME TO LIVE",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1706, height: 907, alt: "TAKE SOME TIME TO LIVE — 花·生 & 尘光" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAKE SOME TIME TO LIVE",
    description: "花·生 & 尘光的作品与生活影像空间。",
    images: ["/og.png"],
  },
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
