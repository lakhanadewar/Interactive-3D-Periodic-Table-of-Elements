'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cube } from "lucide-react";
import { motion } from "framer-motion";

interface ElementModelViewerProps {
  name: string;
  imageUrl: string | null;
  modelUrl: string | null;
}

export default function ElementModelViewer({ name, imageUrl, modelUrl }: ElementModelViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm overflow-hidden group">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Atomic Model</CardTitle>
        </CardHeader>
        <CardContent>
          {imageUrl ? (
            <div className="aspect-square relative bg-gray-900/50 rounded-lg overflow-hidden border border-border/20 shadow-inner">
              <Image
                src={imageUrl}
                alt={`Bohr model of ${name}`}
                fill
                className="object-contain"
                unoptimized
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-accent/30 group-hover:ring-accent/70 transition-all duration-300 shadow-[inset_0_0_20px_hsl(var(--accent)/0.2)]"/>
            </div>
          ) : (
            <div className="aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Model not available</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {modelUrl ? (
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={modelUrl} target="_blank" rel="noopener noreferrer">
                <Cube className="mr-2 h-4 w-4" />
                View in 3D / AR
              </Link>
            </Button>
          ) : (
            <Button className="w-full" disabled>
              <Cube className="mr-2 h-4 w-4" />
              3D Model Unavailable
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
