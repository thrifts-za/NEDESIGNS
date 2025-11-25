'use client';

import Image from 'next/image';

const skills = [
  { name: 'WordPress', logo: '/logos/wordpress-seeklogo.png' },
  { name: 'WooCommerce', logo: '/logos/woocommerce-seeklogo.png' },
  { name: 'Shopify', logo: '/logos/shopify-seeklogo.png' },
  { name: 'MemberPress', logo: '/logos/memberpress-seeklogo.png' },
  { name: 'Adobe Creative Cloud', logo: '/logos/Adobe_Creative_Cloud_rainbow_icon.svg.png' },
  { name: 'HTML5', logo: '/logos/HTML-5-Badge-Logo.png' },
  { name: 'Mixpanel', logo: '/logos/Mixpanel-Wordmark-Purple@2x.png' },
  { name: 'Canva', logo: '/logos/canva-seeklogo.png' },
  { name: 'Eventbrite', logo: '/logos/eventbrite-seeklogo.svg' },
  { name: 'Figma', logo: '/logos/figma-seeklogo.svg' },
  { name: 'Framer', logo: '/logos/framer-icon-seeklogo.svg' },
  { name: 'Google Analytics', logo: '/logos/google-analytics-2014-seeklogo.png' },
  { name: 'HubSpot', logo: '/logos/hubspot-seeklogo.png' },
  { name: 'Jira', logo: '/logos/jira-seeklogo.png' },
  { name: 'Next.js', logo: '/logos/next-js-seeklogo.png' },
  { name: 'Ozow', logo: '/logos/ozow-pty-ltd-seeklogo.png' },
  { name: 'PayPal', logo: '/logos/paypal-seeklogo.png' },
  { name: 'Slack', logo: '/logos/slack-technologies-seeklogo.png' },
  { name: 'Stripe', logo: '/logos/stripe-seeklogo.png' },
  { name: 'Trello', logo: '/logos/trello-seeklogo.png' },
  { name: 'Typeform', logo: '/logos/typeform-seeklogo.png' },
  { name: 'Webflow', logo: '/logos/webflow-2023-seeklogo.png' },
];

interface InfiniteSkillsScrollProps {
  scrollText?: string;
}

export default function InfiniteSkillsScroll({ scrollText = 'Technologies I Work With' }: InfiniteSkillsScrollProps = {}) {
  return (
    <div className="w-full bg-white py-8">
      <div className="text-center mb-6">
        <p className="uppercase text-xs font-medium text-gray-500 tracking-wide">
          {scrollText}
        </p>
      </div>

      {/* Ticker Container with fade effect */}
      <div
        className="slider"
        style={{
          position: 'relative',
          width: '100%',
          height: '100px',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated Ticker Track */}
        <div className="slide-track">
          {/* Create two identical sets for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="slide-set">
              {skills.map((skill) => (
                <div
                  key={`${setIndex}-${skill.name}`}
                  className="slide"
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::before,
        .slider::after {
          position: absolute;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
          content: '';
          height: 100%;
          width: 15%;
          z-index: 2;
          pointer-events: none;
        }

        .slider::before {
          left: 0;
          top: 0;
        }

        .slider::after {
          right: 0;
          top: 0;
          transform: rotateZ(180deg);
        }

        .slide-track {
          width: calc(120px * 44);
          display: flex;
          animation: scroll 44s linear infinite;
        }

        .slide-set {
          display: flex;
          gap: 16px;
        }

        .slide {
          width: 120px;
          height: 80px;
          display: grid;
          place-items: center;
          transition: 0.3s;
          cursor: pointer;
        }

        .slide:hover {
          transform: scale(1.1);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(calc(-120px * 22));
          }
        }

        @media screen and (max-width: 768px) {
          .slide-track {
            width: calc(100px * 44);
          }

          .slide {
            width: 100px;
            height: 60px;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0px);
            }
            100% {
              transform: translateX(calc(-100px * 22));
            }
          }
        }
      `}</style>
    </div>
  );
}
