import { cosmic, hasStatus } from '@/lib/cosmic'
import { Service } from '@/types'
import ServiceCard from '@/components/ServiceCard'

async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to drive your business forward
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No services available at the moment.</p>
        )}
      </div>
    </div>
  )
}