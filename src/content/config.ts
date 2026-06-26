{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}

import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };