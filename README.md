# Professional Services Showcase

![App Preview](https://imgix.cosmicjs.com/657c0940-a2ea-11f0-8dcc-651091f6a7c0-photo-1552664730-d307ca884978-1759778803739.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive company website built with Next.js 15 and Cosmic CMS that showcases your professional services, team members, client testimonials, and case studies. Features a clean, professional design with smooth animations and optimal performance.

## ✨ Features

- 🎨 Modern, professional design with navy blue and white color scheme
- 📱 Fully responsive layout that works on all devices
- 🚀 Built with Next.js 15 App Router for optimal performance
- 💼 Services showcase with category filtering and detailed descriptions
- 👥 Team member profiles with photos, bios, and social links
- ⭐ Client testimonials with star ratings and featured highlights
- 📊 Comprehensive case studies with challenge-solution-results format
- 🖼️ Optimized images with imgix for fast loading
- ♿ Accessible design following WCAG guidelines
- 🔍 SEO-optimized with proper meta tags and semantic HTML

## 📋 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68e41766d8ba67536362f89a&clone_repository=68e418f7d8ba67536362f8bb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a company website with services, team members, testimonials, and case studies", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Image Optimization**: imgix
- **Font**: Inter (Google Fonts)
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with bucket access
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd professional-services-showcase
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Services with Categories

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all services with depth for related objects
const response = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const services = response.objects as Service[]
```

### Fetching Team Members Sorted by Display Order

```typescript
const response = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Manual sorting by display_order
const team = (response.objects as TeamMember[]).sort((a, b) => {
  const orderA = a.metadata?.display_order || 999
  const orderB = b.metadata?.display_order || 999
  return orderA - orderB
})
```

### Fetching Featured Testimonials

```typescript
const response = await cosmic.objects
  .find({ 
    type: 'testimonials',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)

const testimonials = response.objects as Testimonial[]
```

### Fetching Case Study with Related Service

```typescript
const response = await cosmic.objects
  .findOne({ 
    type: 'case-studies',
    slug: caseStudySlug 
  })
  .depth(1)

const caseStudy = response.object as CaseStudy
// Access related service directly
const relatedService = caseStudy.metadata?.related_service
```

## 🌐 Cosmic CMS Integration

This application uses the following Cosmic object types:

### Services
- **service_name**: Service title
- **description**: HTML content describing the service
- **featured_image**: Hero image for the service
- **pricing**: Pricing information
- **service_category**: Category (Consulting, Development, Design, Marketing)

### Team Members
- **name**: Team member's full name
- **role**: Job title/position
- **bio**: Biography and background
- **photo**: Professional headshot
- **linkedin_url**: LinkedIn profile link
- **twitter_handle**: Twitter username
- **display_order**: Sort order for display

### Testimonials
- **client_name**: Client's full name
- **company**: Client's company name
- **testimonial**: Testimonial text
- **rating**: Star rating (3-5 stars)
- **client_photo**: Client's photo
- **featured**: Boolean for homepage display

### Case Studies
- **project_title**: Project name
- **client_name**: Client company name
- **challenge**: Problem description (HTML)
- **solution**: Solution description (HTML)
- **results**: Measurable outcomes (HTML)
- **featured_image**: Project hero image
- **project_images**: Additional project images
- **related_service**: Connected service object
- **publication_date**: Project completion date

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For support with Cosmic CMS, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

<!-- README_END -->