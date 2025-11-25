import { Metadata } from 'next';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { client, urlFor } from '@/lib/sanity.client';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Transformations',
  description: 'Before and after showcase of design transformations and improvements',
};

interface Transformation {
  _id: string;
  title?: string;
  slug?: { current: string };
  description?: string;
  beforeImage?: any;
  afterImage?: any;
  category?: string;
  client?: string;
  year?: number;
  featured?: boolean;
  order?: number;
}

async function getTransformations() {
  try {
    const transformations = await client.fetch<Transformation[]>(
      `*[_type == "transformation"] | order(order asc, _createdAt desc){
        _id,
        title,
        slug,
        description,
        beforeImage,
        afterImage,
        category,
        client,
        year,
        featured,
        order
      }`
    );
    return transformations;
  } catch (error) {
    console.error('Error fetching transformations:', error);
    return [];
  }
}

export default async function TransformationsPage() {
  const transformations = await getTransformations();

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            TRANSFORMATIONS
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            See the before and after of design projects I&apos;ve worked on.
            Drag the slider to compare the transformations.
          </p>
        </div>

        {/* Transformations Grid */}
        {transformations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No transformations available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-24">
            {transformations.map((transformation, index) => {
              if (!transformation.beforeImage || !transformation.afterImage) return null;

              const beforeImageUrl = urlFor(transformation.beforeImage).url();
              const afterImageUrl = urlFor(transformation.afterImage).url();

              return (
                <div
                  key={transformation._id}
                  className="space-y-6"
                >
                  {/* Transformation Info */}
                  <div className="max-w-3xl mx-auto text-center">
                    {transformation.title && (
                      <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                        {transformation.title}
                      </h2>
                    )}
                    {transformation.description && (
                      <p className="text-gray-600 text-lg mb-4">
                        {transformation.description}
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      {transformation.category && (
                        <span className="px-3 py-1 bg-gray-100 rounded-full">
                          {transformation.category}
                        </span>
                      )}
                      {transformation.client && <span>Client: {transformation.client}</span>}
                      {transformation.year && <span>•</span>}
                      {transformation.year && <span>{transformation.year}</span>}
                    </div>
                  </div>

                  {/* Before/After Slider */}
                  <div className="max-w-5xl mx-auto">
                    <BeforeAfterSlider
                      beforeImage={beforeImageUrl}
                      afterImage={afterImageUrl}
                      alt={transformation.title || 'Transformation'}
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
