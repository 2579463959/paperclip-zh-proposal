import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translate, type Locale } from "../lib/i18n";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbContextValue {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (crumbs: Breadcrumb[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbsState] = useState<Breadcrumb[]>([]);

  const setBreadcrumbs = useCallback((crumbs: Breadcrumb[]) => {
    setBreadcrumbsState(crumbs);
  }, []);

  useEffect(() => {
    const storedLocale = typeof window !== "undefined" ? window.localStorage.getItem("paperclip.locale") : null;
    const locale: Locale = storedLocale === "zh-CN" || storedLocale === "en" ? storedLocale : "en";

    if (breadcrumbs.length === 0) {
      document.title = "Paperclip";
    } else {
      const parts = [...breadcrumbs].reverse().map((crumb) => translate(locale, crumb.label));
      document.title = `${parts.join(" · ")} · Paperclip`;
    }
  }, [breadcrumbs]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumbs must be used within BreadcrumbProvider");
  }
  return context;
}
