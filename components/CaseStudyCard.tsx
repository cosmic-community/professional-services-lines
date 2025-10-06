import { CaseStudy } from '@/types'
import Link from 'next/link'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const featuredImage = caseStudy.metadata?.featured_image
  const relatedService = caseStudy.metadata?.related_service

  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        {featuredImage && (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={caseStudy.title}
            className="w-full h-64 object-cover"
            width={400}
            height={250}
          />
        )}
        
        <div className="p-6">
          {relatedService && (
            <span className="inline-block bg-primary-light text-white text-xs px-3 py-1 rounded-full mb-3">
              {relatedService.title}
            </span>
          )}
          
          <h3 className="text-2xl font-bold text-primary mb-2">
            {caseStudy.metadata?.project_title || caseStudy.title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            Client: <span className="font-semibold">{caseStudy.metadata?.client_name}</span>
          </p>
          
          <div 
            className="text-gray-700 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata?.challenge || '' }}
          />
          
          <p className="text-primary-light font-semibold mt-4">
            Read Case Study →
          </p>
        </div>
      </div>
    </Link>
  )
}