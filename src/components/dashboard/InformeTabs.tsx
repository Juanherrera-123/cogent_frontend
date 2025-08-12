import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  buildIntroduccion,
  type IntroduccionData,
} from "@/report/introduccion";
import TablaSociodemo from "@/components/TablaSociodemo";
import { ReportPayload } from "@/types/report";
import Generalidades from "./Generalidades";
import Metodologia from "./Metodologia";

interface Props {
  tabClass: string;
  introduccionData: IntroduccionData;
  narrativaSociodemo?: string;
  recomendacionesSociodemo?: string;
  payload: ReportPayload;
}

export default function InformeTabs({
  tabClass,
  introduccionData,
  narrativaSociodemo,
  recomendacionesSociodemo,
  payload,
}: Props) {
  const [value, setValue] = useState("introduccion");
  const intro = buildIntroduccion(introduccionData);
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
          {intro.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="generalidades">
        <Generalidades />
      </TabsContent>
      <TabsContent value="metodologia">
        <Metodologia />
      </TabsContent>
      <TabsContent value="resultados">
        {narrativaSociodemo && (
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4 mb-6">
            <h3 className="text-lg font-semibold">Descripción sociodemográfica</h3>
            <p>{narrativaSociodemo}</p>
            {recomendacionesSociodemo && <p>{recomendacionesSociodemo}</p>}
          </div>
        )}
        <TablaSociodemo payload={payload} />
      </TabsContent>
      <TabsContent value="estrategias" />
    </Tabs>
  );
}

