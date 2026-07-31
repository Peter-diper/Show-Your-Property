import { Inter } from "next/font/google";
import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter();

export const metadata = {
  title: "Property | find the perfect rental",
  description: " find you dream property",
  keywords: "rental, find rentals, find property",
};

const RootLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} `}>
          <Navbar />
          <main className=" h-full min-h-[66vh]"> {children}</main>
          <Footer />
        </body>
      </html>
      <ToastContainer />
    </AuthProvider>
  );
};

export default RootLayout;
