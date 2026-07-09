import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { file, glob } from "astro/loaders";
import { avatarColors } from "./lib/palette";

// ── Shared sub-schemas ────────────────────────────────────────────────────────
const link = z.object({ label: z.string(), href: z.string() });
const sectionHeader = z.object({ eyebrow: z.string(), title: z.string() });
const accent = z.enum(["Coral", "Grape", "Forest", "Ocean"]);
// Named avatar color picked from the shared site palette (see lib/palette.ts).
const avatarColor = z.enum(avatarColors);
const ctaBand = z.object({
  title: z.string(),
  body: z.string(),
  buttons: z.array(link),
  variant: z.enum(["accent", "dark"]).default("accent"),
  showMascot: z.boolean().default(false),
});

// ── 1. settings — global site config (singleton → `general`) ──────────────────
const settings = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/settings" }),
  schema: z.object({
    brand: z.object({ name: z.string(), tagline: z.string() }),
    contactEmail: z.email(),
    copyright: z.string(),
    theme: z.object({
      accent: accent.default("Coral"),
      showMascot: z.boolean().default(true),
    }),
    nav: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        variant: z.enum(["link", "button", "muted"]).default("link"),
      }),
    ),
    footer: z.object({
      groups: z.array(z.object({ title: z.string(), links: z.array(link) })),
      socials: z.array(link).default([]),
    }),
  }),
});

// ── 2. home — the entire landing page (singleton → `home`) ────────────────────
const home = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/home" }),
  schema: z.object({
    hero: z.object({
      badge: z.string(),
      title: z.string(), // supports an {emphasis} token for the highlight underline
      body: z.string(),
      primaryCta: link,
      secondaryCta: link,
      disclaimer: z.string(),
      rating: z.object({ stars: z.number().min(0).max(5), text: z.string() }),
    }),
    press: z.object({ eyebrow: z.string(), logos: z.array(z.string()) }),
    features: z.object({
      header: sectionHeader,
      items: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
          icon: z.string(),
          colSpan: z.number().default(1),
          rowSpan: z.number().default(1),
          tone: z.enum(["white", "accent", "cream"]).default("white"),
          illustration: z
            .enum(["bars", "mascot", "nudge", "growth", "routines", "none"])
            .default("none"),
          items: z.array(z.string()).optional(), // routine chips on the cream tile
        }),
      ),
    }),
    how: z.object({
      header: sectionHeader,
      steps: z.array(
        z.object({ number: z.number(), title: z.string(), body: z.string() }),
      ),
    }),
    stats: z.object({
      header: sectionHeader,
      items: z.array(z.object({ value: z.string(), label: z.string() })),
    }),
    testimonials: z.object({
      header: sectionHeader,
      items: z.array(
        z.object({
          quote: z.string(),
          name: z.string(),
          role: z.string(),
          initials: z.string(),
          avatarColor: avatarColor.default("Peach"),
          featured: z.boolean().default(false),
          rating: z.number().min(0).max(5).default(5),
        }),
      ),
    }),
    teamTeaser: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.string(),
      cta: link,
      avatarCount: z.number().default(4),
    }),
    faq: z.object({
      header: sectionHeader,
      items: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
          defaultOpen: z.boolean().default(false),
        }),
      ),
    }),
    learn: z.object({ eyebrow: z.string(), title: z.string(), allLink: link }),
    cta: ctaBand,
  }),
});

// ── 3. pages — composed marketing pages (MDX body of reusable blocks) ─────────
// Thin frontmatter (metadata only); the page is authored in the body as a stack
// of block components. One catch-all route (src/pages/[...slug].astro) renders
// any entry, so editors can add new pages without a developer.
const pages = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// ── 4. team — people (single list). Display order follows the authored list
// order in team.yaml, applied via the getTeam() helper — Astro's getCollection()
// returns entries sorted by id, so the schema itself carries no ordering field.
const team = defineCollection({
  loader: file("./src/content/team/team.yaml"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      department: z.enum([
        "Product",
        "Engineering",
        "Design",
        "Community",
        "Data",
        "Marketing",
        "Support",
        "Operations",
      ]),
      bio: z.string(),
      initials: z.string(),
      avatar: image().optional(), // optional photo; falls back to initials
      avatarColor: avatarColor.default("Peach"),
      group: z.enum(["leadership", "flock"]),
      socials: z.array(link).default([]),
    }),
});

// ── 5. guides — MDX articles ──────────────────────────────────────────────────
const guides = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.string(),
    categoryTone: z.enum(["accent", "green"]).default("accent"),
    readTime: z.string(),
    publishDate: z.coerce.date(),
    author: reference("team").meta({ collection: "team" }),
    heroVariant: z.enum(["accent", "forest", "grape"]).default("accent"),
    heroCaption: z.string().optional(), // present → render the large hero figure with this caption chip
    featured: z.boolean().default(false),
    related: reference("guides").meta({ collection: "guides" }).optional(),
  }),
});

export const collections = { settings, home, pages, team, guides };
