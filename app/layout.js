import { Providers } from "@/Redux/Providers";
import "./globals.css";
import Navbar from "@/components/Nav";
import nextAuthProvider from "../utils/nextProviders";
export const metadata = {
  title: "Rupaiyan",
  description: "Finance-tracker using Next 14",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
        </head>

        <body>
          <nextAuthProvider>
            <div className="main">
              <div className="gradient" />
            </div>

            <Navbar />
            <main className="z-10 flex justify-center items-center flex-col max-w-80 mx-auto sm:px-16 px-6">
              {children}
            </main>
          </nextAuthProvider>
        </body>
      </html>
    </Providers>
  );
}
