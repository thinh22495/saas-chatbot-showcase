export type SiteInfo = {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  themeColor: string;
  language: string;
};

export type BrandConfig = {
  logoText: string;
  logoImage?: string;
  primaryColor?: string;
  accentColor?: string;
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavConfig = {
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
};

export type HeroConfig = {
  enabled: boolean;
  headline: string;
  subheadline: string;
  bullets: string[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type TrustConfig = {
  enabled: boolean;
  logos: string[];
  badges: string[];
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export type FeaturesConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type HowItWorksConfig = {
  enabled: boolean;
  title: string;
  steps: HowItWorksStep[];
};

export type ArchitectureDiagram = {
  type: "svg" | "image" | "text";
  content: string;
};

export type ArchitectureConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  diagram: ArchitectureDiagram;
};

export type DemoMessage = {
  role: "user" | "assistant";
  content: string;
};

export type DemoWidget = {
  mode: "mock" | "iframe";
  iframeUrl?: string;
  mockMessages?: DemoMessage[];
};

export type DemoConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  widget: DemoWidget;
  openDemoCta: {
    label: string;
    href: string;
  };
};

export type BackgroundFxConfig = {
  enabled: boolean;
  mode: "glow-grid" | "particles";
  intensity: number;
  size: number;
  disableOnMobile: boolean;
  blur: number;
  colors: string[];
};

export type MediaSlide = {
  src: string;
  alt: string;
  label: string;
  description: string;
  tags: string[];
};

export type MediaShowcaseConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  slides: MediaSlide[];
  autoplay: boolean;
  intervalMs: number;
};

export type VideoSource = {
  src: string;
  type: string;
};

export type ProductVideoConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  poster: string;
  sources: VideoSource[];
  controls: boolean;
  loop: boolean;
  muted: boolean;
};

export type BackToTopConfig = {
  enabled: boolean;
  label: string;
  offset: number;
};

export type UseCaseItem = {
  title: string;
  description: string;
  tags: string[];
};

export type UseCasesConfig = {
  enabled: boolean;
  title: string;
  items: UseCaseItem[];
};

export type PricingPlan = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export type PricingConfig = {
  enabled: boolean;
  title: string;
  currency: string;
  plans: PricingPlan[];
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqConfig = {
  enabled: boolean;
  title: string;
  items: FaqItem[];
};

export type ContactField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  options?: string[];
};

export type ContactConfig = {
  enabled: boolean;
  title: string;
  subtitle: string;
  fields: ContactField[];
  submit: {
    label: string;
  };
  successMessage: string;
};

export type FooterColumn = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export type FooterSocial = {
  label: string;
  href: string;
};

export type FooterConfig = {
  columns: FooterColumn[];
  socials: FooterSocial[];
  copyright: string;
};

export type LegalConfig = {
  privacyUrl: string;
  termsUrl: string;
};

export type SiteConfig = {
  site: SiteInfo;
  brand: BrandConfig;
  nav: NavConfig;
  hero: HeroConfig;
  trust: TrustConfig;
  features: FeaturesConfig;
  howItWorks: HowItWorksConfig;
  architecture: ArchitectureConfig;
  demo: DemoConfig;
  backgroundFx: BackgroundFxConfig;
  mediaShowcase: MediaShowcaseConfig;
  productVideo: ProductVideoConfig;
  backToTop: BackToTopConfig;
  useCases: UseCasesConfig;
  pricing: PricingConfig;
  faq: FaqConfig;
  contact: ContactConfig;
  footer: FooterConfig;
  legal: LegalConfig;
};
