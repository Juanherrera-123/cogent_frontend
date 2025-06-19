import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GraficaBarraCategorias from "../GraficaBarraCategorias";

export type CategoriaFicha = { key: string; label: string };

export default function FichaTecnicaTabs({
  categorias,
  categoria,
  onChange,
  conteos,
  chartType,
  tabClass,
}: {
  categorias: CategoriaFicha[];
  categoria: string;
  onChange: (value: string) => void;
  conteos: Record<string, any[]>;
  chartType: "bar" | "histogram" | "pie";
  tabClass: string;
}) {
  return (
    <Tabs value={categoria} onValueChange={onChange} className="w-full">
      <TabsList className="mb-6 py-2 pl-4 pr-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        {categorias.map((c) => (
          <TabsTrigger className={tabClass} key={c.key} value={c.key}>
            {c.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {categorias.map((c) => (
        <TabsContent key={c.key} value={c.key}>
          <div className="grid gap-4">
            <GraficaBarraCategorias
              datos={conteos[c.key]}
              titulo={c.label}
              chartType={chartType}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
