import { Providers } from "@/Redux/Providers";
import "./globals.css";
import Navbar from "@/components/Nav";

import { getServerSession } from "next-auth";
import NextAuthProvider from "../utils/nextProviders";
NextAuthProvider;

export const metadata = {
  title: "Rupaiyan",
  description: "Finance-tracker using Next 14",
};

export default async function RcoootLayout({ children }) {
  const session = await getServerSession();
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
        </head>

        <body>
          <NextAuthProvider session={session}>
            <div className="main">
              <div className="gradient" />
            </div>

            <Navbar />
            <main className="flex justify-center items-center flex-col max-w-full mx-auto sm:px-16 px-6">
              {children}
            </main>
          </NextAuthProvider>
        </body>
      </html>
    </Providers>
  );
}
