'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Skill } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  design: 'Design Software',
  development: 'Development Tools',
  frameworks: 'Frameworks & Libraries',
  plugins: 'Plugins & Extensions',
  other: 'Other Tools',
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Section
      id="skills"
      title="Skills & Tools"
      subtitle="Technologies and software I work with"
      className="bg-gray-50"
    >
      {skills.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Skills and tools will appear here.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-8 text-center text-black">
                {categoryLabels[category] || category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    {skill.icon && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={urlFor(skill.icon).url()}
                          alt={skill.name || 'Skill icon'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-sm font-medium text-center text-gray-700">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
