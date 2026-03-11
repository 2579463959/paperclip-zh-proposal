import type { ReactNode } from "react";
import { useI18n } from "../context/I18nContext";

interface SidebarSectionProps {
  label: string;
  children: ReactNode;
}

export function SidebarSection({ label, children }: SidebarSectionProps) {
  const { t } = useI18n();

  return (
    <div>
      <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest font-mono text-muted-foreground/60">
        {t(label)}
      </div>
      <div className="flex flex-col gap-0.5 mt-0.5">{children}</div>
    </div>
  );
}
