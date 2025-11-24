import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'skill',
  title: 'Skills & Tools',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill/Tool Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Design Software', value: 'design' },
          { title: 'Development Tools', value: 'development' },
          { title: 'Frameworks & Libraries', value: 'frameworks' },
          { title: 'Plugins & Extensions', value: 'plugins' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Expert', value: 'expert' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Beginner', value: 'beginner' },
        ],
      },
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
      media: 'icon',
      category: 'category',
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        ...selection,
        subtitle: category,
      };
    },
  },
});
