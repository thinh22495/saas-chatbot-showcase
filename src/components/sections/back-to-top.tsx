"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { BackToTopConfig } from "@/config/site.types";
import { Button } from "@/components/ui/button";

type BackToTopProps = {
  data: BackToTopConfig;
};

export function BackToTop({ data }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > data.offset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [data.offset]);

  if (!data.enabled) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label={data.label}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="gap-2 rounded-full border-border/60 bg-background/80 backdrop-blur"
      >
        <ArrowUp className="h-4 w-4" />
        <span className="text-xs font-semibold">{data.label}</span>
      </Button>
    </div>
  );
}
