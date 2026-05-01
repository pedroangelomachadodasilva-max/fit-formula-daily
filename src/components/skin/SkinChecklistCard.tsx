import { Check } from "lucide-react";

export interface SkinChecklistItem {
  code: string;
  icon: string;
  title: string;
  desc: string;
}

interface Props {
  items: SkinChecklistItem[];
  checked: string[];
  onToggle: (code: string) => void;
}

export const SkinChecklistCard = ({ items, checked, onToggle }: Props) => {
  const completed = items.filter((i) => checked.includes(i.code)).length;
  const pct = Math.round((completed / items.length) * 100);
  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading font-bold text-foreground">Seu foco de hoje</h3>
        <span className="text-xs font-bold text-primary">{completed}/{items.length}</span>
      </div>
      <div className="progress-bar mb-3">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2">
        {items.map((it) => {
          const isChecked = checked.includes(it.code);
          return (
            <button
              key={it.code}
              onClick={() => onToggle(it.code)}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                isChecked ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <span className="text-xl shrink-0">{it.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{it.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{it.desc}</p>
              </div>
              <div
                className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isChecked ? "bg-primary border-primary" : "border-muted-foreground/30"
                }`}
              >
                {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
