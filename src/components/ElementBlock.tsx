'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ElementData } from '@/lib/types';
import { categoryColors } from '@/lib/category-colors';

interface ElementBlockProps {
  element: ElementData;
}

export default function ElementBlock({ element }: ElementBlockProps) {
  const colorInfo = categoryColors[element.category] || categoryColors['unknown'];
  const glowColor = colorInfo.hex;

  return (
    <motion.div
      whileHover="hover"
      className="relative w-full z-0 hover:z-10"
      variants={{
        hover: { scale: 1.1 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <Link href={`/element/${element.name}`} className="block w-full">
        <div
          className={cn(
            'relative group w-full aspect-square p-1 sm:p-2 rounded-lg transition-all duration-300 cursor-pointer flex flex-col justify-between',
            'border dark:border-border/30 hover:border-transparent backdrop-blur-sm',
            'border-black/10'
          )}
          style={{
            '--glow-color': glowColor,
            backgroundColor: `${glowColor}33`, // 33 is approx 20% opacity
          } as React.CSSProperties}
        >
          <div 
            className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
            aria-hidden="true"
            style={{
              backgroundColor: glowColor
            }}
          ></div>
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
              boxShadow: `inset 0 0 10px 2px var(--glow-color)`
            }}
          ></div>
          
          <div className="relative flex justify-between items-start">
            <div className="text-sm font-bold text-muted-foreground">{element.number}</div>
          </div>
          <div className="relative text-center">
            <div className="text-xl md:text-3xl font-bold tracking-tighter font-headline text-card-foreground">{element.symbol}</div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {element.name}
            </div>
          </div>
          <div className="h-1"></div>
        </div>
      </Link>
    </motion.div>
  );
}
