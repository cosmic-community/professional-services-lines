import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const photo = testimonial.metadata?.client_photo
  const rating = testimonial.metadata?.rating?.key ? parseInt(testimonial.metadata.rating.key) : 5

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Star Rating */}
      <div className="flex text-yellow-400 mb-4">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < rating ? 'text-yellow-400' : 'text-gray-300'
          return (
            <svg
              key={index}
              className={`w-5 h-5 ${filled}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                clipRule="evenodd"
              />
            </svg>
          )
        })}
      </div>
      
      <p className="text-gray-700 mb-6 italic">
        "{testimonial.metadata?.testimonial}"
      </p>
      
      <div className="flex items-center gap-4">
        {photo && (
          <img
            src={`${photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={testimonial.metadata?.client_name || ''}
            className="w-12 h-12 rounded-full object-cover"
            width={60}
            height={60}
          />
        )}
        <div>
          <p className="font-semibold text-primary">
            {testimonial.metadata?.client_name}
          </p>
          <p className="text-sm text-gray-600">
            {testimonial.metadata?.company}
          </p>
        </div>
      </div>
    </div>
  )
}