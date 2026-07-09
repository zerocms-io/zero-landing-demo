# Zero Landing Demo

A public demo site for **[Zero](https://www.zerocms.io)** — the CMS that turns any Astro codebase into a fully editable site with no integration work.

This project is a marketing site (landing page, team page, and a set of MDX guides) built with [Astro 7](https://astro.build) and [content collections](https://docs.astro.build/en/guides/content-collections/). Every piece of content on the site — hero copy, features, testimonials, FAQs, team members, and long-form guides — is defined as a content collection and can be managed and updated through Zero.

## No integration required

Zero reads your existing content collections directly. There is:

- **No integration** to install
- **No plugins** to configure
- **No code changes** to make

Point Zero at the repo and your content collections become editable, with validation driven by the same Zod schemas the site already uses.

## Content collections

All content lives in `src/content/` and is typed in [`src/content.config.ts`](src/content.config.ts):

| Collection | Type | Content |
| :--------- | :--- | :------ |
| `settings` | Singleton (YAML) | Global site config — brand, nav, footer, theme |
| `home`     | Singleton (YAML) | The entire landing page |
| `teamPage` | Singleton (YAML) | The team page |
| `team`     | List (YAML)      | People, with photos and bios |
| `guides`   | MDX              | Long-form articles |

## Project structure

```text
/
├── public/                 # static assets
├── src/
│   ├── components/         # UI components (landing, team, mdx, shared)
│   ├── content/           # content collection data (YAML + MDX)
│   ├── content.config.ts  # collection schemas
│   ├── layouts/
│   ├── lib/
│   ├── pages/             # routes
│   └── styles/
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command             | Action                                       |
| :------------------ | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start the local dev server at `localhost:4321` |
| `npm run build`     | Build the production site to `./dist/`       |
| `npm run preview`   | Preview the build locally before deploying   |
| `npm run astro ...` | Run Astro CLI commands                       |

## Learn more

- [Zero](https://www.zerocms.io)
- [Astro documentation](https://docs.astro.build)

## License

[MIT](LICENSE)
