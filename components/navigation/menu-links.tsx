"use client";

import Link from "next/link";
import { House, Users, Map } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import LogOutButton from "../authenticate/logout-button";

const menuItems = [
  { href: "/users", label: "Usuarios", icon: Users },
  { href: "/mapa", label: "Mapa", icon: Map },
];

const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  const linkVariants = {
    active: {
      backgroundColor: "#2463EB",
      color: "#ffff",
      scale: 1.05,
    },
    inactive: {
      backgroundColor: "transparent",
      color: "inherit",
      scale: 1,
    },
  };

  return (
    <TooltipProvider>
      <ul className="flex flex-col justify-center gap-5 w-full p-4">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            (pathname.includes(href) && href.length > 1) || pathname === href;

          return (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={href}>
                    <motion.div
                      className="flex gap-2 items-center py-2 rounded-xl px-4"
                      variants={linkVariants}
                      animate={isActive ? "active" : "inactive"}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={18} />
                      <span
                        className={`max-md:hidden ${
                          isOpen && "hidden"
                        } text-sm`}
                      >
                        {label}
                      </span>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {isOpen && (
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </li>
          );
        })}
      </ul>
      <LogOutButton />
    </TooltipProvider>
  );
};

export default MenuLinks;
