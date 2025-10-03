"use client";

import { NAV_LINK_FRONTEND } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrolled = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScrolled);

    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  return (
    <header
      className={`fixed w-full left-1/2 py-5 px-5 md:px-20 -translate-x-1/2 z-[100] transition-all duration-300 ease-in-out ${
        isScrolled
          ? "top-0 bg-gradient-to-t from-blue-300 to-blue-500 text-slate-950 z-1"
          : "top-0 bg-gradient-to-b from-blue-300 to-blue-500 text-white"
      }`}
    >
      <div className="mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-white-50 text-xl md:text-2xl font-semibold transition-transform duration-300 hover:scale-105"
        >
          IMMAJ | FEB - UH
        </a>

        <nav className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {NAV_LINK_FRONTEND.map(({ title, href, subMenuList }) => (
              <li key={title} className="relative group">
                {subMenuList && subMenuList.length > 0 ? (
                  <Tooltip>
                    <TooltipTrigger className="transition-colors duration-300">
                      {title}
                    </TooltipTrigger>
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? "bg-slate-950" : "bg-white"
                      }`}
                    />
                    <TooltipContent className="w-48 z-10">
                      {subMenuList.map((subMenu) => (
                        <Link
                          key={subMenu.title}
                          className="flex p-2 gap-3 text-base transition-colors duration-300"
                          href={subMenu.href}
                        >
                          <div className="relative group">
                            {subMenu.title}
                            <span
                              className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isScrolled ? "bg-slate-950" : "bg-white"
                              }`}
                            />
                          </div>
                        </Link>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <a href={href}>
                    <span className="transition-colors duration-300">
                      {title}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? "bg-slate-500" : "bg-black"
                      }`}
                    />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Link href="/signin" className="flex group">
            <div className="px-5 py-2 rounded-lg bg-white text-blue-400 group-hover:bg-blue-400 transition-colors duration-300">
              <p className="group-hover:text-white transition-colors duration-300">
                Login
              </p>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
