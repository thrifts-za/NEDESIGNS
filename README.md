# NE Designs Portfolio

A modern, minimalistic portfolio website for showcasing graphic design and web development work. Built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Content Management**: Sanity CMS for easy content management
- **Responsive Design**: Mobile-first, fully responsive design
- **Smooth Animations**: Framer Motion for elegant animations
- **SEO Optimized**: Comprehensive meta tags, sitemap, and robots.txt
- **Analytics**: Google Analytics integration
- **Contact Form**: Integrated contact form with email service (Resend)
- **Performance**: Optimized images and lazy loading

## Portfolio Sections

1. **Hero Section**: Eye-catching introduction with CTA
2. **Graphic Design Gallery**: Filterable showcase of design projects
3. **Web Projects**: Detailed showcase of web development work
4. **Clients**: Display trusted clients and testimonials
5. **Skills & Tools**: Categorized display of technical skills
6. **Contact**: Contact form and Calendly integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Sanity account (for CMS)
- Resend account (for contact form emails, optional)
- Google Analytics ID (optional)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd NEDESIGNS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Email Service (optional)
RESEND_API_KEY=your-resend-api-key
```

4. Run the development server:
```bash
npm run dev
```

5. Run Sanity Studio (in a separate terminal):
```bash
npm run sanity
```

The portfolio will be available at `http://localhost:3000`
Sanity Studio will be available at `http://localhost:3333`

## Sanity CMS Setup

### Creating a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project
3. Copy your Project ID and add it to `.env.local`

### Content Types

The portfolio uses four main content types:

1. **Graphic Design Projects**: Showcase design work with categories
2. **Web Projects**: Display web development projects with live links
3. **Clients**: Client logos and testimonials
4. **Skills & Tools**: Technologies and software expertise

### Deploying Sanity Studio

To deploy your Sanity Studio:
```bash
npm run sanity:deploy
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Custom Domain

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain (nkosidesigns.com)
3. Follow DNS configuration instructions
4. Wait for DNS propagation

## Project Structure

```
NEDESIGNS/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   ├── lib/                  # Utilities and configs
│   │   ├── sanity.client.ts  # Sanity client
│   │   └── sanity.types.ts   # TypeScript types
│   └── utils/                # Helper functions
├── sanity/                   # Sanity configuration
│   └── schemas/              # Content schemas
├── public/                   # Static files
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity` - Start Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## Technologies Used

### Frontend
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)

### CMS
- Sanity CMS
- Sanity Studio

### Services
- Vercel (Hosting)
- Resend (Email)
- Google Analytics

## Customization

### Updating Content
1. Access Sanity Studio at `/studio` (when deployed) or `localhost:3333` (local)
2. Add/edit your projects, clients, and skills
3. Changes will reflect immediately on the live site

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Edit component files for specific styling

### Contact Form Email
Update the recipient email in `src/app/api/contact/route.ts`:
```typescript
to: ['your-email@example.com'],
```

## License

This project is private and proprietary.

## Contact

Nkosi Ndwandwe - [Book a Call](https://calendly.com/nedesigns/nedesigns-intro)

Portfolio: [nkosidesigns.com](https://nkosidesigns.com)
