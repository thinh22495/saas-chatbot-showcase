"use client";

import { FeaturesConfig } from "@/config/site.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/components/icon-map";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type FeaturesProps = {
  data: FeaturesConfig;
};

export function FeaturesSection({ data }: FeaturesProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="features"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="border-b border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <MotionDiv variants={sectionVariants} className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
          <p className="text-muted-foreground">{data.subtitle}</p>
        </MotionDiv>

        <MotionDiv
          variants={staggerContainer}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {data.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <MotionDiv key={item.title} variants={sectionVariants}>
                <Card className="h-full border-border/60 bg-card/80 shadow-md">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {item.description}
                  </CardContent>
                </Card>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
