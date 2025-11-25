'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Section from './Section';

interface ContactFormProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  formHeading?: string;
  formDescription?: string;
  successMessage?: string;
  errorMessage?: string;
}

export default function ContactForm({
  sectionTitle = 'Let\'s Work Together',
  sectionSubtitle = 'Ready to bring your vision to life? Let\'s start a conversation',
  ctaHeading = 'Schedule a Free Consultation',
  ctaDescription = 'Book a 30-minute call to discuss your project goals, timeline, and how I can help you achieve them.',
  ctaButtonText = 'Book Your Call Now',
  ctaButtonLink = 'https://calendly.com/nedesigns/nedesigns-intro',
  formHeading = 'Send a Message',
  formDescription = 'Prefer email? Drop me a message and I\'ll respond within 24 hours.',
  successMessage = 'Message sent successfully! I\'ll get back to you soon.',
  errorMessage = 'Failed to send message. Please try again or email directly.',
}: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section
      id="contact"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      className="bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        {/* Primary CTA - Book a Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-black to-gray-800 text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.05)_1px,_transparent_0)] [background-size:40px_40px]"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {ctaHeading}
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                {ctaDescription}
              </p>
              <Link
                href={ctaButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {ctaButtonText}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Secondary Option - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-2 text-center text-black">{formHeading}</h3>
            <p className="text-gray-600 mb-8 text-center">
              {formDescription}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {submitStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 max-w-md"
          >
          <div
            className={`
              ${submitStatus === 'success' ? 'bg-green-600' : 'bg-red-600'}
              text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4
            `}
          >
            <div className="flex-shrink-0">
              {submitStatus === 'success' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold">
                {submitStatus === 'success' ? 'Message Sent!' : 'Error'}
              </p>
              <p className="text-sm text-white/90">
                {submitStatus === 'success' ? successMessage : errorMessage}
              </p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="flex-shrink-0 text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
