'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from './Section';

const trustedLogos = [
  { name: 'WordPress', logo: '/logos/wordpress-icon-seeklogo.png' },
  { name: 'WooCommerce', logo: '/logos/woocommerce-seeklogo.png' },
  { name: 'Shopify', logo: '/logos/shopify-seeklogo.png' },
  { name: 'MemberPress', logo: '/logos/memberpress-seeklogo.png' },
];

interface ClientsSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ClientsSection({
  title = 'Trusted By',
  subtitle = 'Technologies and platforms I work with to bring your vision to life',
}: ClientsSectionProps = {}) {
  return (
    <Section
      id="clients"
      title={title}
      subtitle={subtitle}
    >
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 py-8">
        {trustedLogos.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src={item.logo}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
