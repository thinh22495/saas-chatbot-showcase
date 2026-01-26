"use client";

import Link from "next/link";

import { DemoConfig } from "@/config/site.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type DemoProps = {
  data: DemoConfig;
};

export function DemoSection({ data }: DemoProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="demo"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionDiv variants={sectionVariants} className="space-y-4">
          <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
          <p className="text-muted-foreground">{data.subtitle}</p>
          <Button asChild variant="brand">
            <Link href={data.openDemoCta.href}>{data.openDemoCta.label}</Link>
          </Button>
        </MotionDiv>

        <MotionDiv variants={sectionVariants}>
          <Card className="border-border/60 bg-card/80 p-6 shadow-xl">
            {data.widget.mode === "iframe" && data.widget.iframeUrl ? (
              <iframe
                src={data.widget.iframeUrl}
                title={data.title}
                className="h-96 w-full rounded-lg border border-border/60"
              />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="space-y-3">
                  {data.widget.mockMessages?.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={
                        message.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[80%] rounded-2xl bg-brand-primary px-4 py-3 text-sm text-background"
                            : "max-w-[80%] rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground"
                        }
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
                <Input
                  aria-label={data.title}
                  placeholder={data.title}
                  disabled
                />
              </div>
            )}
          </Card>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
