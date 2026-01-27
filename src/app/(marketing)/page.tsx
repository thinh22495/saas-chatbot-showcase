import { ArchitectureSection } from "@/components/sections/architecture";
import { BackToTop } from "@/components/sections/back-to-top";
import { BackgroundFx } from "@/components/sections/background-fx";
import { ContactSection } from "@/components/sections/contact";
import { DemoSection } from "@/components/sections/demo";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { FooterSection } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MediaShowcaseSection } from "@/components/sections/media-showcase";
import { PricingSection } from "@/components/sections/pricing";
import { TrustSection } from "@/components/sections/trust";
import { UseCasesSection } from "@/components/sections/use-cases";
import { siteConfig } from "@/config/site.loader";

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundFx data={siteConfig.backgroundFx} />
      <div className="relative z-10">
        <Header brand={siteConfig.brand} nav={siteConfig.nav} site={siteConfig.site} />
        <HeroSection
          data={siteConfig.hero}
          tagline={siteConfig.site.tagline}
          video={siteConfig.productVideo}
        />
        <MediaShowcaseSection media={siteConfig.mediaShowcase} />
        <TrustSection data={siteConfig.trust} />
        <FeaturesSection data={siteConfig.features} />
        <HowItWorksSection data={siteConfig.howItWorks} />
        <ArchitectureSection data={siteConfig.architecture} />
        <DemoSection data={siteConfig.demo} />
        <UseCasesSection data={siteConfig.useCases} />
        <PricingSection data={siteConfig.pricing} />
        <FaqSection data={siteConfig.faq} />
        <ContactSection data={siteConfig.contact} />
        <FooterSection data={siteConfig.footer} />
      </div>
      <BackToTop data={siteConfig.backToTop} />
    </main>
  );
}
