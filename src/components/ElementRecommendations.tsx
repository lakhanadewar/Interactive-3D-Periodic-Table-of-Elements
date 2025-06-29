'use client';

import { useState } from "react";
import Link from "next/link";
import { elementRecommendation, ElementRecommendationOutput } from "@/ai/flows/element-recommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import type { ElementData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/ui/loader";
import { motion } from "framer-motion";

interface ElementRecommendationsProps {
  element: ElementData;
}

export default function ElementRecommendations({ element }: ElementRecommendationsProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ElementRecommendationOutput | null>(null);
  const { toast } = useToast();

  const getRecommendations = async () => {
    setLoading(true);
    setResult(null);
    try {
      const elementProperties = `Atomic Mass: ${element.atomic_mass}, Category: ${element.category}, Electron Configuration: ${element.electron_configuration}`;
      const response = await elementRecommendation({
        elementName: element.name,
        elementSummary: element.summary,
        elementProperties: elementProperties,
      });
      setResult(response);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch AI recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wand2 className="text-primary w-6 h-6" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Discover chemically similar elements.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[120px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : result ? (
            <div>
              <p className="text-sm text-muted-foreground mb-4">{result.reasoning}</p>
              <div className="flex flex-wrap gap-2">
                {result.recommendations.map((rec) => (
                  <Button key={rec} asChild variant="outline" size="sm" className="bg-transparent hover:bg-primary/20 hover:text-primary-foreground border-primary/50 text-primary">
                    <Link href={`/element/${rec}`}>{rec}</Link>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Click the button to get AI-powered element recommendations based on chemical properties.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={getRecommendations} disabled={loading} className="w-full bg-primary hover:bg-primary/90">
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? "Thinking..." : "Suggest Related Elements"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
