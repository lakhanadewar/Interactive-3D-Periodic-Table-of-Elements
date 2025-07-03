'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ElementData } from '@/lib/types';

interface ElementBlockProps {
  element: ElementData;
}

export default function ElementBlock({ element }: ElementBlockProps) {
  const glowColor = 'hsl(var(--primary))';

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
            'bg-card/50 border dark:border-border/30 hover:border-transparent backdrop-blur-sm',
            'dark:text-card-foreground text-card-foreground border-black/10 dark:border-border/30'
          )}
          style={{
            '--glow-color': glowColor,
          } as React.CSSProperties}
        >
          <div 
            className="absolute -inset-px rounded-lg bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
            aria-hidden="true"
          ></div>
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
              boxShadow: `inset 0 0 10px 2px var(--glow-color)`
            }}
          ></div>
          
          <div className="relative flex justify-between items-start">
            <div className="text-base font-bold text-muted-foreground">{element.number}</div>
          </div>
          <div className="relative text-center">
            <div className="text-xl md:text-3xl font-bold tracking-tighter font-headline">{element.symbol}</div>
            <div className="text-[9px] md:text-xs text-muted-foreground">
              {element.name}
            </div>
          </div>
          <div className="h-1"></div>
        </div>
      </Link>
    </motion.div>
  );
}
