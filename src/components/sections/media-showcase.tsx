"use client";

import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MediaShowcaseConfig } from "@/config/site.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type MediaShowcaseSectionProps = {
  media: MediaShowcaseConfig;
};

export function MediaShowcaseSection({ media }: MediaShowcaseSectionProps) {
  const hasMedia = media.enabled && media.slides.length > 0;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const slides = useMemo(() => (hasMedia ? media.slides : []), [hasMedia, media]);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (!hasMedia || !media.autoplay || isPaused || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, Math.max(2000, media.intervalMs));

    return () => window.clearInterval(timer);
  }, [hasMedia, isPaused, media.autoplay, media.intervalMs, slides.length]);

  if (!hasMedia) return null;

  const title = media.title;
  const subtitle = media.subtitle;

  const goNext = () => {
    if (!slides.length) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    if (!slides.length) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <MotionSection
      id="media-showcase"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative border-b border-border/60"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_55%)]" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <MotionDiv variants={sectionVariants} className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-serif md:text-4xl">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </MotionDiv>

        <div className="mt-10">
          {hasMedia ? (
            <MotionDiv variants={sectionVariants}>
              <Card
                className="relative overflow-hidden border-border/60 bg-card/80 shadow-xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative aspect-[21/9] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeSlide ? (
                      <motion.div
                        key={`${activeSlide.src}-${activeIndex}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Image
                          src={activeSlide.src}
                          alt={activeSlide.alt}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="space-y-3 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {activeSlide?.label}
                    </span>
                    {activeSlide?.tags?.map((tag) => (
                      <Badge key={tag} variant="subtle">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activeSlide?.description}
                  </p>
                </div>

                {slides.length > 1 ? (
                  <>
                    <div className="absolute right-4 top-4 flex gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        onClick={goPrev}
                        aria-label={`${media.title} prev`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        onClick={goNext}
                        aria-label={`${media.title} next`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 px-6 pb-6">
                      {slides.map((slide, index) => (
                        <button
                          key={`${slide.label}-${index}`}
                          type="button"
                          aria-label={`${media.title} ${index + 1}`}
                          onClick={() => setActiveIndex(index)}
                          className={`h-2 w-6 rounded-full transition ${
                            index === activeIndex
                              ? "bg-brand-primary"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </Card>
            </MotionDiv>
          ) : null}
        </div>
      </div>
    </MotionSection>
  );
}
