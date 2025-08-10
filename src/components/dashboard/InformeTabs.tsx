import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { introduccion } from "@/report/introduccion";

export default function InformeTabs({ tabClass }: { tabClass: string }) {
  const [value, setValue] = useState("introduccion");
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabClass} value="introduccion">
          Introducción
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="generalidades">
          Generalidades
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="metodologia">
          Metodología
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="resultados">
          Resultados
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="estrategias">
          Estrategias
        </TabsTrigger>
      </TabsList>
      <TabsContent value="introduccion">
        <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4">
          {introduccion.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="generalidades" />
      <TabsContent value="metodologia" />
      <TabsContent value="resultados" />
      <TabsContent value="estrategias" />
    </Tabs>
  );
}

