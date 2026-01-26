"use client";

import { UseCasesConfig } from "@/config/site.types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type UseCasesProps = {
  data: UseCasesConfig;
};

export function UseCasesSection({ data }: UseCasesProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="use-cases"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="border-b border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <MotionDiv variants={sectionVariants} className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
        </MotionDiv>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {data.items.map((item) => (
            <MotionDiv key={item.title} variants={sectionVariants}>
              <Card className="h-full border-border/60 bg-card/80 shadow-md">
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="subtle">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
