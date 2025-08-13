import { z } from "zod";

// Pokemon schemas based on PokéAPI structure
export const pokemonTypeSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const pokemonSpriteSchema = z.object({
  front_default: z.string().nullable(),
  front_shiny: z.string().nullable(),
  other: z.object({
    "official-artwork": z.object({
      front_default: z.string().nullable(),
    }),
  }).optional(),
});

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: pokemonSpriteSchema,
  types: z.array(z.object({
    slot: z.number(),
    type: pokemonTypeSchema,
  })),
  stats: z.array(pokemonStatSchema),
});

export const pokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonListItemSchema),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
export type PokemonListItem = z.infer<typeof pokemonListItemSchema>;
export type PokemonListResponse = z.infer<typeof pokemonListResponseSchema>;
export type PokemonType = z.infer<typeof pokemonTypeSchema>;
export type PokemonStat = z.infer<typeof pokemonStatSchema>;
