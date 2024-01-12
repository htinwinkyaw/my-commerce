import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "./_components/nav/NavBar";
import CartProvider from "./_providers/CartProvider";
import Loading from "./loading";
import Footer from "./_components/Footer";
import { Suspense } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "MYCOMM",
  description: "Ecommerce website in Myanmar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster
          toastOptions={{
            style: { background: "rgb(51 65 85)", color: "#fff" },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-grow">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
