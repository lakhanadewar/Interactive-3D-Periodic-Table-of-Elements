'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Loader from '@/components/ui/loader';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // A larger scale to make the models more visible
  return <primitive object={scene} scale={3} />;
}

interface ElementModelViewerProps {
  name: string;
  modelUrl: string | null;
}

export default function ElementModelViewer({ name, modelUrl }: ElementModelViewerProps) {
  if (modelUrl) {
    useGLTF.preload(modelUrl);
  }

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
          <div className="aspect-square relative rounded-lg overflow-hidden bg-transparent border border-border/20 shadow-inner">
            {modelUrl ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-card/50">
                  <Loader />
                </div>
              }>
                <Canvas camera={{ fov: 45, position: [0, 0, 5] }}>
                  <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', opacity: 0.2, blur: 2 }}>
                    <Model url={modelUrl} />
                  </Stage>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                </Canvas>
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card/50">
                <p className="text-muted-foreground">Model not available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
