import { defineConfig, presets } from "sponsorkit";

export default defineConfig({
  // Providers configs
  github: {
    login: "sereneinserenade",
    type: "user",
  },

  // Rendering configs
  width: 800,
  formats: ["svg"],
  tiers: [
    {
      title: "Backers",
      preset: presets.base,
    },
    {
      title: "Sponsors",
      monthlyDollars: 45,
      preset: presets.small,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 135,
      preset: presets.medium,
    },
    {
      title: "Sold((silver + gold)/2) Sponsors",
      monthlyDollars: 200,
      preset: presets.large,
    },
    {
      title: "Gold",
      monthlyDollars: 405,
      preset: presets.xl,
    },
  ],
});
