"use client";

import '../app/globals.css'
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  id: string;
};

export const PageWrapper = ({ children, className, id }: Props) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`${className} w-full md:w-3/5`}
    id={id}
  >
    {children}
  </motion.section>
);
