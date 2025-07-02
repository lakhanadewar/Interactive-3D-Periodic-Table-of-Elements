'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ElementData } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/element/${element.name}`} className="block w-full aspect-square" title={element.name}>
              <div
                className={cn(
                  'relative group w-full h-full rounded-lg transition-all duration-300 cursor-pointer',
                  'bg-secondary/50 border border-border text-foreground',
                  'dark:bg-card/50 dark:border-border/30 dark:hover:border-primary/50 dark:backdrop-blur-sm'
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
                
                <div className="relative flex flex-col h-full p-1">
                  <div className="text-left text-[10px] font-medium text-muted-foreground">{element.number}</div>
                  <div className="flex-grow flex flex-col items-center justify-center -mt-4 text-center">
                      <div className="text-xl sm:text-2xl font-bold tracking-tighter font-headline leading-none">{element.symbol}</div>
                      <div className="text-[10px] leading-tight text-muted-foreground truncate w-full px-1">
                          {element.name}
                      </div>
                  </div>
                </div>

              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{element.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
