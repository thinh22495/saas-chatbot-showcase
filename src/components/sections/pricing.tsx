"use client";

import Link from "next/link";

import { PricingConfig } from "@/config/site.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";
import { cn } from "@/lib/utils";

type PricingProps = {
  data: PricingConfig;
};

export function PricingSection({ data }: PricingProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="pricing"
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

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.plans.map((plan) => (
            <MotionDiv key={plan.name} variants={sectionVariants}>
              <Card
                className={cn(
                  "flex h-full flex-col border-border/60 bg-card/80 shadow-lg",
                  plan.highlighted && "border-brand-primary/60 shadow-xl"
                )}
              >
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.highlighted && (
                      <Badge variant="brand">{plan.name}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="space-y-1">
                    <div className="text-3xl font-semibold text-foreground">
                      {data.currency} {plan.priceMonthly}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {data.currency} {plan.priceYearly}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto p-6 pt-0">
                  <Button asChild variant={plan.highlighted ? "brand" : "outline"} className="w-full">
                    <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
