import { siteConfig } from "@/config/site.loader";

export default function sitemap() {
  return [
    {
      url: siteConfig.site.domain,
      lastModified: new Date().toISOString(),
    },
  ];
}
