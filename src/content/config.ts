import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			// Transform date string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

const posts = defineCollection({
	schema: () =>
		z.object({
			title: z.string().max(99),
			excerpt: z.string().max(599),
			coverImage: z.string().max(99),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)), // z.coerce.date(), // z.isodate(),
			published: z.boolean().default(false),
			author: z.object({
				name: z.string().max(99),
				picture: z.string().max(99)
			}),
			ogImage: z.object({
				url: z.string().max(99)
			}),
			seoURL: z.string().optional().nullish()
		})
})

export const collections = { blog, posts }
