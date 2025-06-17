import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import LayoutManager from "@/components/page/LayoutManager";
import SessionProvider from "@/providers/session-provider";

const geistSans = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalSpots",
  description: "Discover top-rated car boot sales in the UK.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={geistSans.className}>
        <SessionProvider>
          <QueryProvider>
            <LayoutManager>{children}</LayoutManager>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
