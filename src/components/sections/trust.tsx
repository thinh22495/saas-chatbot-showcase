"use client";

import { TrustConfig } from "@/config/site.types";
import { Badge } from "@/components/ui/badge";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type TrustProps = {
  data: TrustConfig;
};

export function TrustSection({ data }: TrustProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="trust"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="border-b border-border/60"
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12">
        <MotionDiv variants={sectionVariants} className="flex flex-wrap gap-3">
          {data.badges.map((badge) => (
            <Badge key={badge} variant="brand">
              {badge}
            </Badge>
          ))}
        </MotionDiv>

        <MotionDiv
          variants={sectionVariants}
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
        >
          {data.logos.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-border/60 bg-background/80 px-4 py-2 font-medium"
            >
              {logo}
            </span>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
