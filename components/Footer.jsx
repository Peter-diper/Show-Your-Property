import Image from "next/image";
import logo from "@/assets/images/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <Image
          src={logo}
          alt="Logo"
          className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
        />

        <p className="text-white/40 text-xs text-center tracking-wide">
          &copy; {currentYear} Property Deal. All rights reserved by{" "}
          <span className="text-green-400 font-semibold">Rasool Fada</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
