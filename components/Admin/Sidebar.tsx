"use client";

import { SIDE_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={cn(
        "min-h-screen bg-blue-600 transition-all duration-300 relative",
        sidebarOpen ? "md:w-72 w-44" : "md:w-20 w-11"
      )}
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          "bg-blue-600 text-white rounded-full absolute -right-4 top-13 border-2 border-white cursor-pointer p-1",
          !sidebarOpen && "rotate-180"
        )}
      >
        <ArrowLeftIcon className="size-5" />
      </button>

      <div className="pt-6 pl-4 flex flex-col justify-center items-center gap-8 place-content-center w-full">
        {sidebarOpen ? (
          <div
            className={cn(
              "flex justify-center items-center",
              sidebarOpen && "gap-2"
            )}
          >
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="md:text-3xl text-2xl font-bold">IMMAJ</h1>
          </div>
        ) : (
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full mx-auto"
          />
        )}
        <ul className="flex flex-col gap-4 w-full">
          {SIDE_LINK.map((side) =>
            side.subMenuList ? (
              <DropdownMenu key={side.title}>
                <DropdownMenuTrigger>
                  <Link
                    href={side.href}
                    className={cn(
                      "flex gap-2 items-center text-white hover:bg-gray-50 hover:rounded-l-full hover:text-gray-900 duration-200 transition-all relative",
                      pathname === side.href &&
                        "bg-gray-50 rounded-l-full text-gray-900",
                      sidebarOpen && "py-3 px-10",
                      !sidebarOpen && "py-2 px-4 justify-center rounded-l-full"
                    )}
                  >
                    <Image
                      src={side.icon}
                      alt={side.title}
                      width={25}
                      height={25}
                    />
                    {sidebarOpen && (
                      <p className="text-md font-semibold">
                        {side.title}
                        <span className="absolute right-4 top-4">
                          <ChevronDown className="size-5" />
                        </span>
                      </p>
                    )}
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  {side.subMenuList.map((submenu) => (
                    <DropdownMenuItem key={submenu.title}>
                      <Link
                        href={submenu.href}
                        className="flex gap-2 items-center p-2 hover:bg-blue-600 w-full hover:rounded-md transition-all duration-300"
                      >
                        <Image
                          src={submenu.icon}
                          alt={submenu.title}
                          width={25}
                          height={25}
                        />
                        <p className="text-md font-semibold">{submenu.title}</p>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={side.href}
                key={side.title}
                className={cn(
                  "flex gap-2 items-center text-white hover:bg-gray-50 hover:rounded-l-full hover:text-gray-900 duration-200 transition-all",
                  pathname === side.href &&
                    "bg-gray-100 rounded-l-full text-gray-900",
                  sidebarOpen && "py-3 px-10",
                  !sidebarOpen && "py-2 px-4 justify-center rounded-l-full"
                )}
              >
                <Image
                  src={side.icon}
                  alt={side.title}
                  width={25}
                  height={25}
                />
                {sidebarOpen && (
                  <p className="text-md font-semibold">{side.title}</p>
                )}
              </Link>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
