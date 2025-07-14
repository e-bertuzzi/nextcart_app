import { SideNavigationProps } from "@cloudscape-design/components";

export const navigationItems: SideNavigationProps.Item[] = [
  {
    type: "section",
    text: "User",
    items: [
      { type: "link", text: "Personal data", href: "/dashboard/profile" },
      { type: "link", text: "Health", href: "/dashboard/health" },
      { type: "link", text: "Diet", href: "/dashboard/diet" },
      { type: "link", text: "Family", href: "/dashboard/family" },
    ],
  },
  {
    type: "section",
    text: "Products",
    items: [
      { type: "link", text: "Purchases", href: "/dashboard/purchases" },
      { type: "link", text: "Physical activity", href: "/dashboard/fitness" },
      { type: "link", text: "Body composition", href: "/dashboard/body" },
    ],
  },
  {
    type: "section",
    text: "Analytics",
    items: [
      { type: "link", text: "Analytics 1", href: "/dashboard/analytics1" },
      { type: "link", text: "Analytics 2", href: "/dashboard/analytics2" },
      { type: "link", text: "Analytics 3", href: "/dashboard/analytics3" },
    ],
  },
];
