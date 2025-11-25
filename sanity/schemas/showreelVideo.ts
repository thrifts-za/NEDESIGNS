import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'showreelVideo',
  title: 'Showreel Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name/description of the video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'Full Vimeo URL (e.g., https://vimeo.com/1140274315)',
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (!url) return true;
          if (url.includes('vimeo.com')) return true;
          return 'Must be a valid Vimeo URL';
        }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order in the showreel (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      vimeoUrl: 'vimeoUrl',
    },
    prepare({ title, order, vimeoUrl }) {
      return {
        title: `${order}. ${title}`,
        subtitle: vimeoUrl,
      };
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
