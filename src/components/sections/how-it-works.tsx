"use client";

import { HowItWorksConfig } from "@/config/site.types";
import { Card, CardContent } from "@/components/ui/card";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type HowItWorksProps = {
  data: HowItWorksConfig;
};

export function HowItWorksSection({ data }: HowItWorksProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="how-it-works"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <MotionDiv variants={sectionVariants} className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
        </MotionDiv>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {data.steps.map((step, index) => (
            <MotionDiv key={step.title} variants={sectionVariants}>
              <Card className="h-full border-border/60 bg-card/80 shadow-lg">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-background">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
