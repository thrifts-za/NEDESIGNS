'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Client } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  return (
    <Section
      id="clients"
      title="Trusted By"
      subtitle="Brands and businesses I've had the pleasure to work with"
    >
      {clients.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Client logos will appear here.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
            {clients.map((client, index) => (
              <motion.div
                key={client._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-20">
                  <Image
                    src={urlFor(client.logo).url()}
                    alt={client.name}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {clients.some((client) => client.testimonial) && (
            <div className="mt-20">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
                What Clients Say
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clients
                  .filter((client) => client.testimonial)
                  .map((client, index) => (
                    <motion.div
                      key={client._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white p-8 rounded-lg shadow-md"
                    >
                      <p className="text-gray-600 mb-6 italic">
                        &ldquo;{client.testimonial}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={urlFor(client.logo).url()}
                            alt={client.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{client.name}</p>
                          {client.role && (
                            <p className="text-sm text-gray-500">
                              {client.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
