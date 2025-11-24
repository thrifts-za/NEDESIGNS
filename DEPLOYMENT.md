# Deployment Guide

This guide will walk you through deploying your NE Designs portfolio to Vercel and setting up all necessary services.

## Prerequisites

Before deploying, make sure you have:
- [ ] A GitHub account
- [ ] A Vercel account (sign up at vercel.com)
- [ ] A Sanity account (sign up at sanity.io)
- [ ] (Optional) A Resend account for contact form emails
- [ ] (Optional) A Google Analytics account

## Step 1: Set Up Sanity CMS

### 1.1 Create a Sanity Project

1. Go to https://sanity.io and log in
2. Click "Create New Project"
3. Choose a name for your project (e.g., "nedesigns-portfolio")
4. Select a dataset name (use "production")
5. Copy your Project ID

### 1.2 Initialize Sanity in Your Project

```bash
# Make sure you're in your project directory
cd /Users/nkosinathindwandwe/DevOps/NEDESIGNS

# Login to Sanity (if you haven't already)
npx sanity login

# Initialize Sanity (use your project ID from above)
# When prompted, use the existing configuration
```

### 1.3 Deploy Sanity Studio

```bash
npm run sanity:deploy
```

Choose a unique studio hostname (e.g., `nedesigns-studio`)

Your Sanity Studio will be available at: `https://nedesigns-studio.sanity.studio`

## Step 2: Push Code to GitHub

### 2.1 Create a GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it something like "nedesigns-portfolio"
3. Don't initialize with README (we already have one)

### 2.2 Push Your Code

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/nedesigns-portfolio.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Connect Repository

1. Go to https://vercel.com and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### 3.2 Configure Environment Variables

In Vercel's deployment settings, add these environment variables:

**Required:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Optional (but recommended):**
```
NEXT_PUBLIC_GA_ID=your-google-analytics-id
RESEND_API_KEY=your-resend-api-key
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your site will be live at `your-project.vercel.app`

## Step 4: Configure Custom Domain

### 4.1 Add Domain in Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add `nkosidesigns.com`
4. Also add `www.nkosidesigns.com` (optional)

### 4.2 Update DNS Settings

In your domain registrar (where you bought nkosidesigns.com):

**For root domain (nkosidesigns.com):**
- Type: A
- Name: @ (or leave blank)
- Value: 76.76.21.21

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

**Wait for DNS propagation** (can take up to 48 hours, usually much faster)

## Step 5: Set Up Additional Services

### 5.1 Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Create a new property for your website
3. Copy your Measurement ID (starts with G-)
4. Add it to Vercel environment variables as `NEXT_PUBLIC_GA_ID`
5. Redeploy your site

### 5.2 Resend (Email Service)

1. Go to https://resend.com and sign up
2. Verify your sending domain or use the test domain
3. Create an API key
4. Add it to Vercel environment variables as `RESEND_API_KEY`
5. Update the email recipient in `src/app/api/contact/route.ts`:
   ```typescript
   to: ['your-email@example.com'], // Change this to your email
   ```
6. Commit and push the change

## Step 6: Add Content to Sanity

### 6.1 Access Sanity Studio

Go to your deployed Sanity Studio: `https://nedesigns-studio.sanity.studio`

### 6.2 Add Your Content

1. **Graphic Design Projects**
   - Add your design work
   - Upload images
   - Set categories and descriptions

2. **Web Projects**
   - Add your development projects
   - Include screenshots
   - Add live URLs and GitHub links
   - List technologies used

3. **Clients**
   - Upload client logos
   - Add testimonials (optional)

4. **Skills & Tools**
   - Add software and tools you use
   - Upload icons/logos
   - Organize by category

## Step 7: Test Everything

### 7.1 Test Checklist

- [ ] Visit your live site at nkosidesigns.com
- [ ] Check all sections are displaying correctly
- [ ] Test category filtering in graphic design gallery
- [ ] Click on project links to ensure they work
- [ ] Test the contact form
- [ ] Check Calendly booking link
- [ ] Test on mobile devices
- [ ] Verify Google Analytics is tracking (check Real-time in GA)
- [ ] Test all social media links in footer

### 7.2 Performance Check

Use these tools to verify your site's performance:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

## Step 8: Maintenance

### Adding New Content

1. Go to your Sanity Studio
2. Add/edit content
3. Changes appear immediately on your live site (no redeployment needed!)

### Updating Code

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically redeploys

### Monitoring

- Check Vercel dashboard for deployment status and analytics
- Monitor Google Analytics for traffic insights
- Check contact form submissions (emails)

## Troubleshooting

### Images Not Loading
- Verify Sanity project ID is correct in environment variables
- Check that `cdn.sanity.io` is in next.config.js domains

### Contact Form Not Working
- Check Resend API key is set correctly
- Verify the recipient email is configured
- Check Vercel function logs for errors

### Domain Not Working
- DNS changes can take time, be patient
- Verify DNS records are set correctly
- Check Vercel domain configuration

### Content Not Updating
- Clear browser cache
- Check Sanity Studio for published content
- Verify Sanity project ID matches

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Review Sanity Studio for content issues
4. Refer to documentation:
   - Next.js: https://nextjs.org/docs
   - Sanity: https://www.sanity.io/docs
   - Vercel: https://vercel.com/docs

## Next Steps

After deployment:
- [ ] Update social media links in Footer component
- [ ] Add your actual social media URLs
- [ ] Create custom 404 page (optional)
- [ ] Add blog section (optional future feature)
- [ ] Set up email notifications for contact form submissions
- [ ] Consider adding a newsletter signup
- [ ] Implement dark mode toggle (optional)

Congratulations! Your portfolio is now live at nkosidesigns.com! 🎉
