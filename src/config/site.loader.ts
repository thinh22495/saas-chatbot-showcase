import { z } from "zod";

import rawConfig from "./site.config.json";

export const siteConfigSchema = z.object({
  site: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    domain: z.string().url(),
    themeColor: z.string(),
    language: z.string(),
  }),
  brand: z.object({
    logoText: z.string(),
    logoImage: z.string().optional(),
    primaryColor: z.string().optional(),
    accentColor: z.string().optional(),
  }),
  nav: z.object({
    items: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().optional(),
      })
    ),
    cta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  hero: z.object({
    enabled: z.boolean(),
    headline: z.string(),
    subheadline: z.string(),
    bullets: z.array(z.string()),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    heroStats: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
  }),
  trust: z.object({
    enabled: z.boolean(),
    logos: z.array(z.string()),
    badges: z.array(z.string()),
  }),
  features: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
  }),
  howItWorks: z.object({
    enabled: z.boolean(),
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
  architecture: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    diagram: z.object({
      type: z.enum(["svg", "image", "text"]),
      content: z.string(),
    }),
  }),
  demo: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    widget: z.object({
      mode: z.enum(["mock", "iframe"]),
      iframeUrl: z.string().url().optional(),
      mockMessages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        )
        .optional(),
    }),
    openDemoCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  useCases: z.object({
    enabled: z.boolean(),
    title: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      })
    ),
  }),
  pricing: z.object({
    enabled: z.boolean(),
    title: z.string(),
    currency: z.string(),
    plans: z.array(
      z.object({
        name: z.string(),
        priceMonthly: z.number(),
        priceYearly: z.number(),
        description: z.string(),
        features: z.array(z.string()),
        highlighted: z.boolean(),
        ctaLabel: z.string(),
        ctaHref: z.string(),
      })
    ),
  }),
  faq: z.object({
    enabled: z.boolean(),
    title: z.string(),
    items: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),
  }),
  contact: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    fields: z.array(
      z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(["text", "email", "select", "textarea"]),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        options: z.array(z.string()).optional(),
      })
    ),
    submit: z.object({
      label: z.string(),
    }),
    successMessage: z.string(),
  }),
  footer: z.object({
    columns: z.array(
      z.object({
        title: z.string(),
        links: z.array(
          z.object({
            label: z.string(),
            href: z.string(),
          })
        ),
      })
    ),
    socials: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
    copyright: z.string(),
  }),
  legal: z.object({
    privacyUrl: z.string(),
    termsUrl: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawConfig);
