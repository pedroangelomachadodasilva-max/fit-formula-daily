import { ReactNode } from "react";
import { ArrowLeft, X } from "lucide-react";

interface CompulsionLayoutProps {
  title: string;
  emoji?: string;
  onBack?: () => void;
  onClose: () => void;
  children: ReactNode;
}

export const CompulsionLayout = ({ title, emoji, onBack, onClose, children }: CompulsionLayoutProps) => (
  <div className="fixed inset-0 z-50 bg-background animate-slide-up">
    <div className="app-container h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur">
        <div className="flex items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="p-1.5 rounded-full hover:bg-muted">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          <h2 className="font-heading font-bold text-foreground text-lg">
            {emoji && <span className="mr-1.5">{emoji}</span>}
            {title}
          </h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">{children}</div>
    </div>
  </div>
);
