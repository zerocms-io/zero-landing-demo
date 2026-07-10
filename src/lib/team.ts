import { getCollection, type CollectionEntry } from "astro:content";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

// Astro's getCollection() returns entries sorted by id, not by their position in
// team.yaml. To make the authored list order the source of truth (without adding an
// `order` field to the content schema), we read the id sequence straight from the
// YAML and rank by it. Runs once at build time.
const source = readFileSync(
  join(process.cwd(), "src/content/team/team.yaml"),
  "utf-8",
);
const authored = (yaml.load(source) ?? []) as Array<{ id: string }>;
const rankById = new Map(authored.map((person, index) => [person.id, index]));

/** Team members in authored (team.yaml) order. */
export async function getTeam(): Promise<CollectionEntry<"team">[]> {
  const people = await getCollection("team");
  return [...people].sort(
    (a, b) => (rankById.get(a.id) ?? 0) - (rankById.get(b.id) ?? 0),
  );
}
