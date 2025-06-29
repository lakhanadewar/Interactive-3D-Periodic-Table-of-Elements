'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ElementData } from "@/lib/types";
import { motion } from "framer-motion";

interface ElementDetailsProps {
  element: ElementData;
}

export default function ElementDetails({ element }: ElementDetailsProps) {
  const properties = [
    { label: "Atomic Mass", value: `${element.atomic_mass} u` },
    { label: "Phase", value: element.phase },
    { label: "Discovered by", value: element.discovered_by },
    { label: "Electron Config", value: element.electron_configuration },
    { label: "Electronegativity", value: element.electronegativity_pauling },
    { label: "Electron Affinity", value: element.electron_affinity },
    { label: "Ionization Energies", value: Array.isArray(element.ionization_energies) ? element.ionization_energies.slice(0, 3).join(', ') : element.ionization_energies },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="bg-card/50 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Element Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4">
              <p className="text-muted-foreground leading-relaxed">{element.summary}</p>
            </TabsContent>
            <TabsContent value="properties" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {properties.map((prop) => (
                  prop.value ? (
                    <div key={prop.label}>
                      <p className="font-semibold text-foreground">{prop.label}</p>
                      <p className="text-muted-foreground text-sm">{prop.value}</p>
                    </div>
                  ) : null
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
