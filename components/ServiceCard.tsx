import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const featuredImage = service.metadata?.featured_image
  const category = service.metadata?.service_category

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
          alt={service.title}
          className="w-full h-48 object-cover"
          width={300}
          height={200}
        />
      )}
      
      <div className="p-6">
        {category && (
          <span className="inline-block bg-primary-light text-white text-xs px-3 py-1 rounded-full mb-3">
            {category.value}
          </span>
        )}
        
        <h3 className="text-2xl font-bold text-primary mb-3">
          {service.metadata?.service_name || service.title}
        </h3>
        
        <div 
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: service.metadata?.description || '' }}
        />
        
        {service.metadata?.pricing && (
          <p className="text-primary font-semibold text-lg">
            {service.metadata.pricing}
          </p>
        )}
      </div>
    </div>
  )
}