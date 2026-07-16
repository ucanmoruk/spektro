"use client";

import { motion } from "framer-motion";

// template.tsx her gezinmede yeniden monte edilir → sayfa girişinde yumuşak geçiş.
// Not: Yalnızca opacity animasyonu; transform kullanmıyoruz çünkü transform,
// fixed konumlu Navbar/sepet butonu için içeren-blok oluşturup onları bozar.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
