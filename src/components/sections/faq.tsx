"use client";

import { FaqConfig } from "@/config/site.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type FaqProps = {
  data: FaqConfig;
};

export function FaqSection({ data }: FaqProps) {
  if (!data.enabled) return null;

  return (
    <MotionSection
      id="faq"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="border-b border-border/60"
    >
      <div className="mx-auto max-w-4xl px-6 py-20">
        <MotionDiv variants={sectionVariants} className="space-y-3">
          <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
        </MotionDiv>

        <MotionDiv variants={sectionVariants} className="mt-8">
          <Accordion type="single" collapsible>
            {data.items.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
