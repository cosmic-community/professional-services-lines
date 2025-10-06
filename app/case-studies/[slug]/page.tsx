import { cosmic, hasStatus } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import Link from 'next/link'

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'case-studies',
        slug 
      })
      .depth(1)
    return response.object as CaseStudy
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function CaseStudyPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Case Study Not Found</h1>
          <Link href="/case-studies" className="text-primary-light hover:underline">
            ← Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  const featuredImage = caseStudy.metadata?.featured_image
  const projectImages = caseStudy.metadata?.project_images || []
  const relatedService = caseStudy.metadata?.related_service

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <Link href="/case-studies" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Case Studies
        </Link>

        {/* Hero Section */}
        {featuredImage && (
          <div className="mb-12">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={caseStudy.title}
              className="w-full h-96 object-cover rounded-lg"
              width={1200}
              height={600}
            />
          </div>
        )}

        <h1 className="text-5xl font-bold text-primary mb-4">
          {caseStudy.metadata?.project_title || caseStudy.title}
        </h1>
        
        <div className="mb-8">
          <p className="text-xl text-gray-600">
            Client: <span className="font-semibold">{caseStudy.metadata?.client_name}</span>
          </p>
          {relatedService && (
            <p className="text-lg text-gray-600">
              Service: <span className="text-primary font-semibold">{relatedService.title}</span>
            </p>
          )}
        </div>

        {/* Challenge Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">The Challenge</h2>
          <div 
            className="prose-cosmic"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata?.challenge || '' }} 
          />
        </div>

        {/* Solution Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Solution</h2>
          <div 
            className="prose-cosmic"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata?.solution || '' }} 
          />
        </div>

        {/* Project Images */}
        {projectImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectImages.map((image, index) => (
                <img
                  key={index}
                  src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={`${caseStudy.title} - Image ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                  width={800}
                  height={600}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-4">The Results</h2>
          <div 
            className="prose-cosmic"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata?.results || '' }} 
          />
        </div>
      </div>
    </div>
  )
}