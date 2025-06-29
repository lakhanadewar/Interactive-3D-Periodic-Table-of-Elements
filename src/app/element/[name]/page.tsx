import { notFound } from "next/navigation";
import { getElementByName, getElements } from "@/lib/elements";
import ElementPageContent from "@/components/ElementPageContent";

export async function generateStaticParams() {
  const elements = getElements();
  return elements.map((element) => ({
    name: element.name,
  }));
}

export default function ElementPage({ params }: { params: { name: string } }) {
  const element = getElementByName(decodeURIComponent(params.name));

  if (!element) {
    notFound();
  }

  return <ElementPageContent element={element} />;
}
