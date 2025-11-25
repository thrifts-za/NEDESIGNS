import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function updateAllSettings() {
  try {
    console.log('Updating Site Settings with all content...\n');

    // Fetch existing site settings
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);

    if (!settings) {
      console.error('No site settings found. Please run the seed script first.');
      process.exit(1);
    }

    // Update with all new content
    await client
      .patch(settings._id)
      .set({
        siteTitle: 'NEDESIGNS',
        navigation: {
          menuItems: [
            { label: 'Work', href: '/#work' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ],
          ctaButtonText: 'Book a Call',
          ctaButtonLink: 'https://calendly.com/nedesigns/nedesigns-intro',
        },
        skillsScrollText: 'Technologies I Work With',
        sectionTitles: {
          graphicDesign: {
            title: 'Graphic Design',
            subtitle: 'A showcase of my creative design work across various mediums',
          },
          webProjects: {
            title: 'Web Development',
            subtitle: 'Websites and web applications I\'ve designed and developed',
          },
          clients: {
            title: 'Trusted By',
            subtitle: 'Technologies and platforms I work with to bring your vision to life',
          },
          contact: {
            title: 'Let\'s Work Together',
            subtitle: 'Ready to bring your vision to life? Let\'s start a conversation',
          },
        },
        contactSection: {
          ctaHeading: 'Schedule a Free Consultation',
          ctaDescription: 'Book a 30-minute call to discuss your project goals, timeline, and how I can help you achieve them.',
          ctaButtonText: 'Book Your Call Now',
          ctaButtonLink: 'https://calendly.com/nedesigns/nedesigns-intro',
          formHeading: 'Send a Message',
          formDescription: 'Prefer email? Drop me a message and I\'ll respond within 24 hours.',
          successMessage: 'Message sent successfully! I\'ll get back to you soon.',
          errorMessage: 'Failed to send message. Please try again or email directly.',
        },
        footer: {
          description: 'Crafting beautiful digital experiences through\ngraphic design and web development.',
          socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'GitHub', url: 'https://github.com' },
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'Instagram', url: 'https://instagram.com' },
          ],
        },
      })
      .commit();

    console.log('✅ Site Settings updated with all content!');
  } catch (error) {
    console.error('Error updating site settings:', error);
    process.exit(1);
  }
}

updateAllSettings();
