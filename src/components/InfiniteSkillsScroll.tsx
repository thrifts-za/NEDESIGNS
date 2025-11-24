'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const skills = [
  { name: 'WordPress', logo: '/logos/wordpress-icon-seeklogo.png' },
  { name: 'WooCommerce', logo: '/logos/woocommerce-seeklogo.png' },
  { name: 'Shopify', logo: '/logos/shopify-seeklogo.png' },
  { name: 'MemberPress', logo: '/logos/memberpress-seeklogo.png' },
];

export default function InfiniteSkillsScroll() {
  // Duplicate the skills array to create seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full bg-white border-y border-gray-200 py-8 overflow-hidden">
      <div className="relative flex">
        {/* First set of logos */}
        <motion.div
          className="flex gap-16 items-center px-8"
          animate={{
            x: [0, -100 * skills.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Second set for seamless loop */}
        <motion.div
          className="flex gap-16 items-center px-8 absolute left-full"
          animate={{
            x: [0, -100 * skills.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`duplicate-${skill.name}-${index}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4 font-medium">
        Technologies I Work With
      </p>
    </div>
  );
}
