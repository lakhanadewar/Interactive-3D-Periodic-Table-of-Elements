'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { categoryColors } from '@/lib/category-colors';
import type { ElementData } from '@/lib/types';

interface ElementBlockProps {
  element: ElementData;
}

export default function ElementBlock({ element }: ElementBlockProps) {
  const colorInfo = categoryColors[element.category] || categoryColors['unknown'];
  const glowColor = colorInfo.hex;

  return (
    <motion.div
      whileHover="hover"
      className="w-full h-full transform-style-3d"
      variants={{
        hover: { scale: 1.1, z: 20 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <Link href={`/element/${element.name}`} className="block h-full w-full">
        <div
          className={cn(
            'relative group w-full aspect-square p-1 sm:p-2 rounded-lg text-white transition-all duration-300 transform-style-3d cursor-pointer flex flex-col justify-between',
            'bg-card/50 border border-border/30 hover:border-transparent backdrop-blur-sm'
          )}
          style={{
            '--glow-color': glowColor,
          } as React.CSSProperties}
        >
          <div 
            className="absolute -inset-px rounded-lg bg-gradient-to-br from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
            aria-hidden="true"
          ></div>
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
              boxShadow: `inset 0 0 10px 2px var(--glow-color)`
            }}
          ></div>
          
          <div className="relative flex justify-between items-start">
            <div className="text-xs font-bold text-white/70">{element.number}</div>
          </div>
          <div className="relative text-center">
            <div className="text-xl md:text-3xl font-bold tracking-tighter font-headline">{element.symbol}</div>
            <div className="relative text-[9px] md:text-xs text-white/70 h-4 overflow-hidden">
              <p className="truncate w-full h-full flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">{element.name}</p>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap flex items-center">
                <p className="animate-marquee">{element.name}</p>
              </div>
            </div>
          </div>
          <div className="h-1"></div>
        </div>
      </Link>
    </motion.div>
  );
}
