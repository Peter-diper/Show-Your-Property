"use client";

import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaGoogle, FaGithub, FaBell, FaPlus } from "react-icons/fa";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import MessageCount from "./MessageCoun";

const Navbar = () => {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const profileRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const setProvidersValue = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setProvidersValue();
  }, []);

  // close profile menu on outside click

  const navLink = (href, label) => (
    <Link
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${
          pathname === href
            ? "text-white bg-white/15"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
    >
      {label}
      {pathname === href && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
      )}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image className="h-8 w-auto" src={logo} alt="PropertyPulse" />
            <span className="hidden md:block text-white text-lg font-bold tracking-tight">
              Property
              <span className="text-green-400 font-extrabold">Deal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLink("/", "Home")}
            {navLink("/properties", "Properties")}
            {status === "authenticated" &&
              navLink("/properties/add", "Add Property")}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Logged Out */}
            {status !== "loading" && status !== "authenticated" && (
              <div className="hidden md:flex items-center gap-2">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white
                        ${
                          provider.id === "github"
                            ? "bg-gray-800 hover:bg-gray-700 border border-white/10"
                            : "bg-blue-600 hover:bg-blue-500"
                        }`}
                    >
                      {provider.id === "google" && (
                        <FaGoogle className="text-sm" />
                      )}
                      {provider.id === "github" && (
                        <FaGithub className="text-sm" />
                      )}
                      Sign in
                    </button>
                  ))}
              </div>
            )}

            {/* Logged In */}
            {status === "authenticated" && (
              <div className="flex items-center gap-3">
                {/* Bell */}
                <Link href="/messages" className="relative">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-all duration-200">
                    <FaBell className="text-sm" />
                  </button>
                  {/* message counter */}
                  <MessageCount />
                </Link>

                {/* Add Property shortcut */}
                <Link
                  href="/properties/add"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200"
                >
                  <FaPlus className="text-xs" />
                  Add
                </Link>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-white/20 hover:ring-white/50 transition-all duration-200"
                  >
                    <Image
                      src={profileImage || profileDefault}
                      alt="profile"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 border border-white/10 shadow-xl shadow-black/40 py-1 z-50">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-white text-sm font-medium truncate">
                          {session?.user?.name}
                        </p>
                        <p className="text-white/40 text-xs truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                      {[
                        { href: "/profile", label: "Your Profile" },
                        {
                          href: "/properties/saved",
                          label: "Saved Properties",
                        },
                      ].map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {label}
                        </Link>
                      ))}
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            signOut();
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all duration-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLink("/", "Home")}
          {navLink("/properties", "Properties")}
          {status === "authenticated" &&
            navLink("/properties/add", "Add Property")}

          {status !== "authenticated" && providers && (
            <div className="pt-2 flex flex-col gap-2">
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all
                    ${provider.id === "github" ? "bg-gray-800" : "bg-blue-600"}`}
                >
                  {provider.id === "google" && <FaGoogle />}
                  {provider.id === "github" && <FaGithub />}
                  Sign in with {provider.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
