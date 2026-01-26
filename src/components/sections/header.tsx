"use client";

import Image from "next/image";
import Link from "next/link";

import { BrandConfig, NavConfig, SiteInfo } from "@/config/site.types";
import { Button } from "@/components/ui/button";
import { MotionDiv, sectionVariants } from "@/components/sections/section-motion";
import { ThemeToggle } from "@/components/sections/theme-toggle";
import { cn } from "@/lib/utils";

type HeaderProps = {
  brand: BrandConfig;
  nav: NavConfig;
  site: SiteInfo;
};

export function Header({ brand, nav, site }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <MotionDiv
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4"
      >
        <Link href={site.domain} className="flex items-center gap-3">
          {brand.logoImage ? (
            <Image
              src={brand.logoImage}
              alt={brand.logoText}
              width={36}
              height={36}
              className="rounded-lg"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
              <span className="text-lg font-semibold">{brand.logoText[0]}</span>
            </div>
          )}
          <span className="text-base font-semibold tracking-tight">
            {brand.logoText}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {nav.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground",
                item.external && "inline-flex items-center gap-1"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle ariaLabel={site.name} />
          <Button asChild variant="brand">
            <Link href={nav.cta.href}>{nav.cta.label}</Link>
          </Button>
        </div>
      </MotionDiv>
    </header>
  );
}
