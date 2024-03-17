import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { font } from "@/utils/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "StrongWood App®",
  description: 'Software de cotizaciones y gestión',
  applicationName: "StrongWood App®",
  authors: {
    name: 'Tomás Di Bacco',
    url: 'https://www.linkedin.com/in/tomas-di-bacco/'
  },
  // manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  userScalable: true,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //suppressHydrationWarning
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
            {children}
            <Toaster richColors theme="dark"/>
        </Providers>
      </body>
    </html>
  );
}
