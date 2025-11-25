import Link from 'next/link';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook, FaBehance, FaDribbble } from 'react-icons/fa';

interface FooterProps {
  siteTitle?: string;
  description?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

const iconMap = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Behance: FaBehance,
  Dribbble: FaDribbble,
};

export default function Footer({
  siteTitle = 'NEDESIGNS',
  description = 'Crafting beautiful digital experiences through\ngraphic design and web development.',
  socialLinks = [
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'GitHub', url: 'https://github.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'Instagram', url: 'https://instagram.com' },
  ],
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Description - Left Side */}
          <div className="max-w-xs">
            <h3 className="text-2xl font-bold mb-4">{siteTitle}</h3>
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Connect - Right Side */}
          <div className="md:text-right">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform as keyof typeof iconMap];
                return Icon ? (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} {siteTitle}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
