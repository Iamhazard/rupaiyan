import { Providers } from "@/Redux/Providers";
import "./globals.css";
import Navbar from "@/components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
      </head>
      <Providers>
        <body>
          <NextAuthProvider session={session}>
            <div className="main">
              <div className="gradient" />
            </div>
            <ToastContainer />
            <Navbar />
            <main className="z-10 flex justify-center items-center flex-col max-w-80 mx-auto sm:px-16 px-6">
              {children}
            </main>
          </NextAuthProvider>
        </body>
      </Providers>
    </html>
  );
}
