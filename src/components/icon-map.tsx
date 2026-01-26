import {
  BarChart3,
  Gauge,
  HelpCircle,
  Layers,
  Lock,
  PanelLeft,
  Search,
  Shield,
  Shuffle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Layers,
  Search,
  Shield,
  Shuffle,
  Gauge,
  BarChart3,
  PanelLeft,
  Lock,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}
