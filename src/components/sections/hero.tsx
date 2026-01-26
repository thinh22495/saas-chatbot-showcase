"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { HeroConfig } from "@/config/site.types";
import { Button } from "@/components/ui/button";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type HeroProps = {
  data: HeroConfig;
  tagline?: string;
};

export function HeroSection({ data, tagline }: HeroProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="hero"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden border-b border-border/60"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%)]" />
      <div className="absolute right-0 top-0 -z-10 h-[380px] w-[380px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(34,197,94,0.2),_transparent_60%)] blur-2xl" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <MotionDiv variants={sectionVariants} className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {tagline ?? data.subheadline}
          </p>
          <h1 className="text-4xl font-serif text-foreground md:text-6xl">
            {data.headline}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {data.subheadline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href={data.primaryCta.href}>{data.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={data.secondaryCta.href}>{data.secondaryCta.label}</Link>
            </Button>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {data.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
                  <Check className="h-3 w-3" />
                </span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          variants={sectionVariants}
          className="grid gap-4 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur"
        >
          {data.heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
            >
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-2xl font-semibold text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
