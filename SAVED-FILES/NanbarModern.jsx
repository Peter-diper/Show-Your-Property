"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import {
  Bell,
  Plus,
  Menu,
  X,
  User,
  Bookmark,
  LogOut,
  ChevronDown
} from "lucide-react";

import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";

// Modern Brand Icons
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Navbar = () => {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const profileRef = useRef(null);
  const pathname = usePathname();

  // Fetch NextAuth Providers
  useEffect(() => {
    const setProvidersValue = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setProvidersValue();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reusable NavLink Component
  const NavLink = ({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
          isActive
            ? "text-white bg-zinc-800/80 shadow-sm ring-1 ring-white/10"
            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
              <Image className="h-7 w-auto" src={logo} alt="PropertyPulse Logo" priority />
            </div>
            <span className="hidden md:block text-white text-base font-semibold tracking-tight group-hover:text-zinc-200 transition-colors">
              PropertyPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/50 border border-zinc-800/50">
            <NavLink href="/" label="Home" />
            <NavLink href="/properties" label="Properties" />
            {status === "authenticated" && (
              <NavLink href="/properties/add" label="Add Property" />
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">

            {/* Unauthenticated View */}
            {status !== "loading" && status !== "authenticated" && (
              <div className="hidden md:flex items-center gap-2">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        provider.id === "github"
                          ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm"
                          : "bg-white hover:bg-zinc-100 text-zinc-900 shadow-sm"
                      }`}
                    >
                      {provider.id === "google" && <GoogleIcon />}
                      {provider.id === "github" && <GithubIcon />}
                      <span>Sign in</span>
                    </button>
                  ))}
              </div>
            )}

            {/* Authenticated View */}
            {status === "authenticated" && (
              <div className="flex items-center gap-3">

                {/* Messages Link */}
                <Link
                  href="/messages"
                  className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all duration-200"
                  aria-label="View Messages"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-600 text-[9px] font-bold text-white items-center justify-center">
                      2
                    </span>
                  </span>
                </Link>

                {/* Add Property Quick Action Button */}
                <Link
                  href="/properties/add"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-sm shadow-blue-500/20 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Listing</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1 p-0.5 rounded-full ring-2 ring-zinc-800 hover:ring-zinc-700 transition-all duration-200"
                    aria-expanded={isProfileMenuOpen}
                  >
                    <Image
                      src={profileImage || profileDefault}
                      alt="User Profile"
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/80 py-1.5 z-50 transition-all duration-200 animate-in fade-in-0 zoom-in-95">
                      <div className="px-4 py-2.5 border-b border-zinc-800/80 mb-1">
                        <p className="text-zinc-100 text-sm font-semibold truncate">
                          {session?.user?.name}
                        </p>
                        <p className="text-zinc-400 text-xs truncate">
                          {session?.user?.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                      >
                        <User className="w-4 h-4 text-zinc-400" />
                        <span>Your Profile</span>
                      </Link>

                      <Link
                        href="/properties/saved"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-zinc-400" />
                        <span>Saved Properties</span>
                      </Link>

                      <div className="border-t border-zinc-800/80 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-all duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer/Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 transition-all animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/properties" label="Properties" />
            {status === "authenticated" && (
              <NavLink href="/properties/add" label="Add Property" />
            )}
          </div>

          {status !== "authenticated" && providers && (
            <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    provider.id === "github"
                      ? "bg-zinc-900 border border-zinc-800 text-white"
                      : "bg-white text-zinc-900 font-semibold"
                  }`}
                >
                  {provider.id === "google" && <GoogleIcon />}
                  {provider.id === "github" && <GithubIcon />}
                  <span>Sign in with {provider.name}</span>
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
