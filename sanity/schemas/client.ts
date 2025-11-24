import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Client Website',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'role',
      title: 'Client Role/Position',
      type: 'string',
      description: 'e.g., CEO, Marketing Director, etc.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
});
