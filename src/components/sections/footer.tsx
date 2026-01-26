"use client";

import Link from "next/link";

import { FooterConfig } from "@/config/site.types";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type FooterProps = {
  data: FooterConfig;
};

export function FooterSection({ data }: FooterProps) {
  return (
    <MotionSection
      id="footer"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-background"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16">
        <MotionDiv variants={sectionVariants} className="grid gap-8 md:grid-cols-3">
          {data.columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </MotionDiv>

        <MotionDiv
          variants={sectionVariants}
          className="flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
        >
          <span>{data.copyright}</span>
          <div className="flex flex-wrap gap-4">
            {data.socials.map((social) => (
              <Link key={social.label} href={social.href}>
                {social.label}
              </Link>
            ))}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
