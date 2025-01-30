"use client";

import Image from "next/image";
import Link from "next/link";
import { useMenuStore } from "@/store/toggleMenuStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Logo() {
  const { isOpen } = useMenuStore();
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src={"/eco-logo.png"} width={40} height={40} alt="logo icon" />
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.h1
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold max-md:hidden whitespace-nowrap"
          >
            Eco Water
          </motion.h1>
        )}
      </AnimatePresence>
    </Link>
  );
}
