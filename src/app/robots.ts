import { siteConfig } from "@/config/site.loader";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.site.domain}/sitemap.xml`,
  };
}
