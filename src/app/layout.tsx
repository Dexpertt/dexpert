import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalUI } from "@/components/layout/global-ui";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "D Expert | AI Automation, AI Voice Agents & Digital Marketing Agency",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name, url: `${site.url}/founder` }],
  creator: site.founder.name,
  publisher: site.name,
  keywords: [...site.keywords],
  category: "Business Services",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: "D Expert | AI Automation, AI Voice Agents & Digital Marketing",
    description: site.description,
    images: [{ url: "/og", width: 1200, height: 630, alt: "D Expert — Scale Your Business With AI Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: "D Expert | AI Automation & Digital Growth",
    description: site.description,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-background"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <GlobalUI />
        <Analytics />
      </body>
    </html>
  );
}
