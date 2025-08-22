import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function AccordionItem({ id, title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  const contentId = `${id}-content`;

  return (
    <div className="rounded-2xl border border-slate-200 shadow-sm bg-white">
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-[#313B4A]"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={id}
        className={open ? "block" : "hidden"}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

