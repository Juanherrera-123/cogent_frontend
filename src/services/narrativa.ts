import Handlebars from "handlebars";
import es from "@/report/texts/es.json";
import { NarrativaContext, NarrativaTemplates } from "@/types/narrativa";

const templates: NarrativaTemplates = es as unknown as NarrativaTemplates;

function compile(key: keyof NarrativaTemplates) {
  const src = templates[key];
  return Handlebars.compile(src);
}

export function getNarrativaSociodemo(ctx: NarrativaContext): string {
  const tpl = compile("narrativa.sociodemo");
  return tpl(ctx);
}
