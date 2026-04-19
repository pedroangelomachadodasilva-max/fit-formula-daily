import { ReactNode } from "react";
import { ArrowLeft, X } from "lucide-react";

interface SkinLayoutProps {
  title: string;
  emoji?: string;
  onBack?: () => void;
  onClose: () => void;
  children: ReactNode;
}

// Layout integrado: ocupa o espaço do main, NÃO usa fixed inset-0,
// para preservar o AppHeader e o BottomNav globais do app.
export const SkinLayout = ({ title, emoji, onBack, onClose, children }: SkinLayoutProps) => (
  <div className="animate-slide-up">
    <div className="sticky top-[57px] z-30 flex items-center justify-between px-4 py-3 border-b border-border bg-card/90 backdrop-blur">
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-full hover:bg-muted shrink-0">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <h2 className="font-heading font-bold text-foreground text-base truncate">
          {emoji && <span className="mr-1.5">{emoji}</span>}
          {title}
        </h2>
      </div>
      <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted shrink-0">
        <X className="w-5 h-5 text-foreground" />
      </button>
    </div>
    <div className="px-4 py-4 pb-28 space-y-4">{children}</div>
  </div>
);
