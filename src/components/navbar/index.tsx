"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { f_inter_700 } from "@/styles/fonts";
import {
  FaHouse,
  FaPeopleGroup,
  FaRegFileLines,
  FaEnvelope,
} from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import NavLinks from "./navlinks";

const navIcons = {
  Home: <FaHouse />,
  About: <FaRegFileLines />,
  Team: <FaPeopleGroup />,
  Contact: <FaEnvelope />,
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-30 px-5 transition-all duration-300 ${
        isScrolled || menuOpen ? "bg-black/90 shadow-lg" : "bg-neutral-950/85"
      }`}
    >
      <div className="flex items-center justify-between py-3 md:px-20 px-5">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/Logo.png"
            alt="Jugaad Robotics Club Logo"
            width={400}
            height={100}
            className="m-1 w-20 md:w-28 transition-transform duration-300 hover:scale-105"
            priority
          />
          <h1
            className={`text-white text-sm md:text-base tracking-wider font-bold uppercase text-center ${f_inter_700.className}`}
          >
            Jugaad
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className={`relative group flex flex-col items-center justify-center`}
            >
              <span
                className={`text-white text-xl transition-all duration-300 group-hover:opacity-0 ${
                  pathname === link.to ? "text-yellow-400" : ""
                }`}
              >
                {navIcons[link.name as keyof typeof navIcons]}
              </span>
              <span
                className={`text-sm absolute top-1/2 opacity-0 font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:top-0 ${
                  pathname === link.to ? "text-yellow-400" : "text-white"
                }`}
              >
                {link.name}
              </span>
              {pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 h-0.5 w-full bg-yellow-400"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col py-3 space-y-3">
              {NavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.to}
                  className={`py-2 px-4 rounded-md flex items-center transition-colors ${
                    pathname === link.to
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-3">
                    {navIcons[link.name as keyof typeof navIcons]}
                  </span>
                  <span className={f_inter_700.className}>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
