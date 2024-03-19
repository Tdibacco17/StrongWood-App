import "./globals.css";
import type { Metadata, Viewport } from "next";
import { font } from "@/utils/fonts";
import { Toaster } from "sonner";
import { ResizableProvider } from "@/context/ResizableProvider";
import { SaveOptionsProvider } from "@/context/SavedOptionsContextProvider";

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
  return (
    <html lang="en">
      <body className={font.className}>
          <ResizableProvider>
            <SaveOptionsProvider>
              {children}
              <Toaster richColors theme="dark" />
            </SaveOptionsProvider>
          </ResizableProvider>
      </body>
    </html>
  );
}
