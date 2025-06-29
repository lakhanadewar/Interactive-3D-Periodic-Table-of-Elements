'use client';

import type { ElementData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import ElementDetails from "@/components/ElementDetails";
import ElementModelViewer from "@/components/ElementModelViewer";
import ElementRecommendations from "@/components/ElementRecommendations";
import { categoryColors } from "@/lib/category-colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ElementPageContentProps {
  element: ElementData;
}

export default function ElementPageContent({ element }: ElementPageContentProps) {
  const colorInfo = categoryColors[element.category] || categoryColors['unknown'];

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Table
      </Link>
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <h1 className="font-headline text-5xl md:text-7xl font-bold" style={{ color: colorInfo.hex }}>
            {element.name}
          </h1>
          <span className="font-headline text-5xl md:text-7xl text-muted-foreground">{element.symbol}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            className="text-sm"
            style={{ 
              backgroundColor: `${colorInfo.hex}20`, 
              color: colorInfo.hex, 
              borderColor: `${colorInfo.hex}80` 
            }}
          >
            {element.category}
          </Badge>
          <p className="text-muted-foreground">Atomic Number: {element.number}</p>
        </div>
      </motion.header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <ElementModelViewer 
            name={element.name}
            modelUrl={element.bohr_model_3d}
          />
          <ElementRecommendations element={element} />
        </div>
        <div className="lg:col-span-2">
          <ElementDetails element={element} />
        </div>
      </div>
    </motion.div>
  );
}
