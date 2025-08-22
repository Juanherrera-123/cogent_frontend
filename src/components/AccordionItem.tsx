import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  id,
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const panelId = `panel-${id}`;

  return (
    <div className="rounded-2xl border border-slate-200 shadow-sm bg-white avoid-break">
      <button
        id={id}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-[#313B4A]"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className="overflow-hidden transition-[height] duration-300 ease-in-out print:!block avoid-break"
        style={{ height: isOpen ? 'auto' : 0 }}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

