import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'NEDESIGNS',
      description: 'Your brand name (appears in header and footer)',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'object',
      fields: [
        defineField({
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string', title: 'Label' },
              { name: 'href', type: 'string', title: 'Link' },
            ],
          }],
          initialValue: [
            { label: 'Work', href: '/#work' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ],
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book a Call',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'url',
          initialValue: 'https://calendly.com/nedesigns/nedesigns-intro',
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section Content',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'NEDESIGNS',
          description: 'Large hero title (e.g., "NEDESIGNS")',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Graphic Designer & Web Developer',
          description: 'Your role or tagline',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Creating clean, modern designs and building powerful web experiences for clients and brands worldwide.',
          description: 'Short description below the subtitle',
        }),
        defineField({
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'View My Work',
        }),
        defineField({
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
          initialValue: '#work',
        }),
        defineField({
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Book a Call',
        }),
        defineField({
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'url',
          initialValue: 'https://calendly.com/nedesigns/nedesigns-intro',
        }),
      ],
    }),
    defineField({
      name: 'skillsScrollText',
      title: 'Skills Scroll Banner Text',
      type: 'string',
      initialValue: 'Technologies I Work With',
      description: 'Text displayed above the infinite logo scroll',
    }),
    defineField({
      name: 'sectionTitles',
      title: 'Section Titles & Subtitles',
      type: 'object',
      fields: [
        defineField({
          name: 'graphicDesign',
          title: 'Graphic Design Section',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Graphic Design' },
            { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'A showcase of my creative design work across various mediums' },
          ],
        }),
        defineField({
          name: 'webProjects',
          title: 'Web Projects Section',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Web Development' },
            { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Websites and web applications I\'ve designed and developed' },
          ],
        }),
        defineField({
          name: 'clients',
          title: 'Clients/Trusted By Section',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Trusted By' },
            { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Technologies and platforms I work with to bring your vision to life' },
          ],
        }),
        defineField({
          name: 'contact',
          title: 'Contact Section',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Let\'s Work Together' },
            { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Ready to bring your vision to life? Let\'s start a conversation' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Form Content',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaHeading',
          title: 'CTA Heading',
          type: 'string',
          initialValue: 'Schedule a Free Consultation',
        }),
        defineField({
          name: 'ctaDescription',
          title: 'CTA Description',
          type: 'text',
          initialValue: 'Book a 30-minute call to discuss your project goals, timeline, and how I can help you achieve them.',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book Your Call Now',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'url',
          initialValue: 'https://calendly.com/nedesigns/nedesigns-intro',
        }),
        defineField({
          name: 'formHeading',
          title: 'Contact Form Heading',
          type: 'string',
          initialValue: 'Send a Message',
        }),
        defineField({
          name: 'formDescription',
          title: 'Contact Form Description',
          type: 'text',
          initialValue: 'Prefer email? Drop me a message and I\'ll respond within 24 hours.',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          initialValue: 'Message sent successfully! I\'ll get back to you soon.',
        }),
        defineField({
          name: 'errorMessage',
          title: 'Error Message',
          type: 'text',
          initialValue: 'Failed to send message. Please try again or email directly.',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Footer Description',
          type: 'text',
          initialValue: 'Crafting beautiful digital experiences through\ngraphic design and web development.',
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'platform', type: 'string', title: 'Platform', options: { list: ['LinkedIn', 'GitHub', 'Twitter', 'Instagram', 'Facebook', 'Behance', 'Dribbble'] } },
              { name: 'url', type: 'url', title: 'URL' },
            ],
          }],
          initialValue: [
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'GitHub', url: 'https://github.com' },
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'Instagram', url: 'https://instagram.com' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'object',
      description: 'Search engine optimization and social media sharing settings',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (50-60 characters recommended)',
          validation: (Rule) => Rule.max(60).warning('Titles over 60 characters may be truncated in search results'),
          initialValue: 'NE Designs - Graphic Design & Web Development Portfolio',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'SEO description (150-160 characters recommended)',
          validation: (Rule) => Rule.max(160).warning('Descriptions over 160 characters may be truncated'),
          initialValue: 'Professional graphic designer and web developer creating modern, clean designs and powerful web experiences for brands worldwide.',
        }),
        defineField({
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Target keywords for SEO',
          initialValue: ['graphic design', 'web development', 'portfolio', 'branding', 'UI/UX design'],
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Social sharing image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'twitterImage',
          title: 'Twitter Card Image',
          type: 'image',
          description: 'Twitter sharing image (1200x600px recommended). Leave empty to use Open Graph image.',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Your Twitter username (without @)',
          placeholder: 'username',
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Site favicon (.ico, .png, or .svg - 32x32px or larger)',
          options: {
            accept: 'image/png,image/x-icon,image/svg+xml',
          },
        }),
        defineField({
          name: 'appleTouchIcon',
          title: 'Apple Touch Icon',
          type: 'image',
          description: 'iOS home screen icon (180x180px recommended)',
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      description: 'Third-party analytics and tracking scripts',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
          placeholder: 'G-XXXXXXXXXX',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'GTM Container ID (e.g., GTM-XXXXXXX)',
          placeholder: 'GTM-XXXXXXX',
        }),
        defineField({
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Facebook Pixel tracking ID',
        }),
        defineField({
          name: 'customHeadScripts',
          title: 'Custom Header Scripts',
          type: 'text',
          rows: 5,
          description: 'Additional scripts to inject in <head> (e.g., verification codes, custom analytics)',
          placeholder: '<script>...</script>',
        }),
        defineField({
          name: 'customBodyScripts',
          title: 'Custom Body Scripts',
          type: 'text',
          rows: 5,
          description: 'Additional scripts to inject at end of <body>',
          placeholder: '<script>...</script>',
        }),
      ],
    }),
    defineField({
      name: 'verification',
      title: 'Site Verification',
      type: 'object',
      description: 'Verification codes for search engines and third-party services',
      fields: [
        defineField({
          name: 'googleSiteVerification',
          title: 'Google Search Console',
          type: 'string',
          description: 'Google site verification code',
          placeholder: 'google-site-verification=...',
        }),
        defineField({
          name: 'bingSiteVerification',
          title: 'Bing Webmaster Tools',
          type: 'string',
          description: 'Bing site verification code',
        }),
        defineField({
          name: 'pinterestVerification',
          title: 'Pinterest',
          type: 'string',
          description: 'Pinterest site verification code',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Section Visibility',
      type: 'object',
      fields: [
        defineField({
          name: 'showHero',
          title: 'Show Hero Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the main hero banner with your name and tagline',
        }),
        defineField({
          name: 'showGraphicDesign',
          title: 'Show Graphic Design Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the graphic design portfolio gallery',
        }),
        defineField({
          name: 'showWebProjects',
          title: 'Show Web Development Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the web development projects',
        }),
        defineField({
          name: 'showClients',
          title: 'Show Trusted By Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display client logos and testimonials',
        }),
        defineField({
          name: 'showSkills',
          title: 'Show Skills & Tools Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display your skills and tools',
        }),
        defineField({
          name: 'showContact',
          title: 'Show Contact Form',
          type: 'boolean',
          initialValue: true,
          description: 'Display the contact form and booking section',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
