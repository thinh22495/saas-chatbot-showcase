"use client";

import Image from "next/image";

import { ArchitectureConfig } from "@/config/site.types";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";
import { Card } from "@/components/ui/card";

type ArchitectureProps = {
  data: ArchitectureConfig;
};

export function ArchitectureSection({ data }: ArchitectureProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="architecture"
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

        <MotionDiv variants={sectionVariants} className="mt-10">
          <Card className="border-border/60 bg-card/80 p-6 shadow-lg">
            {data.diagram.type === "text" && (
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {data.diagram.content}
              </pre>
            )}
            {data.diagram.type === "image" && data.diagram.content && (
              <Image
                src={data.diagram.content}
                alt={data.title}
                width={1200}
                height={700}
                className="h-auto w-full rounded-lg"
              />
            )}
            {data.diagram.type === "svg" && (
              <div
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: data.diagram.content }}
              />
            )}
          </Card>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
