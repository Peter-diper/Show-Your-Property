import Image from "next/image";
import logo from "@/assets/images/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950/80 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image src={logo} alt="Logo" className="h-7 w-auto opacity-70" />

        <p className="text-white/30 text-xs text-center">
          &copy; {currentYear} PropertyPulse. All rights reserved by{" "}
          <span className="text-white/50 font-semibold">Rasool Fada</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
