import { cosmic, hasStatus } from '@/lib/cosmic'
import { Service, TeamMember, Testimonial, CaseStudy } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import TeamMemberCard from '@/components/TeamMemberCard'
import TestimonialCard from '@/components/TestimonialCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import Link from 'next/link'

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

async function getFeaturedTeam(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const team = response.objects as TeamMember[]
    return team.sort((a, b) => {
      const orderA = a.metadata?.display_order || 999
      const orderB = b.metadata?.display_order || 999
      return orderA - orderB
    }).slice(0, 3)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    const testimonials = response.objects as Testimonial[]
    return testimonials.filter(t => t.metadata?.featured === true)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const caseStudies = response.objects as CaseStudy[]
    return caseStudies.slice(0, 2)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function Home() {
  const [services, team, testimonials, caseStudies] = await Promise.all([
    getServices(),
    getFeaturedTeam(),
    getFeaturedTestimonials(),
    getFeaturedCaseStudies(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Business with Expert Services
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              We deliver world-class solutions that drive growth and innovation. Our team of experts is dedicated to helping your business succeed.
            </p>
            <div className="flex gap-4">
              <Link
                href="/services"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Our Services
              </Link>
              <Link
                href="/case-studies"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No services available at the moment.</p>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Talented professionals dedicated to your success
            </p>
          </div>
          
          {team.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {team.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/team"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  View Full Team
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No team members available at the moment.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear what our clients have to say about working with us
            </p>
          </div>
          
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No testimonials available at the moment.</p>
          )}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real results from real clients
            </p>
          </div>
          
          {caseStudies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/case-studies"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  View All Case Studies
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No case studies available at the moment.</p>
          )}
        </div>
      </section>
    </>
  )
}