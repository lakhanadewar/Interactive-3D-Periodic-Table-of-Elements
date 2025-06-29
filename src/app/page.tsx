'use client';
import PeriodicTable from "@/components/PeriodicTable";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="container mx-auto px-4 py-8 perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2 text-glow">
          Quantum Table
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          An Interactive 3D Periodic Table of Elements
        </p>
      </div>
      <PeriodicTable />
    </motion.div>
  );
}
