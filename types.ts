// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Service type
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    service_name?: string
    description?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    pricing?: string
    service_category?: {
      key: string
      value: string
    }
  }
}

// Team Member type
export interface TeamMember extends CosmicObject {
  type: 'team-members'
  metadata: {
    name?: string
    role?: string
    bio?: string
    photo?: {
      url: string
      imgix_url: string
    }
    linkedin_url?: string
    twitter_handle?: string
    display_order?: number
  }
}

// Testimonial type
export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    client_name?: string
    company?: string
    testimonial?: string
    rating?: {
      key: string
      value: string
    }
    client_photo?: {
      url: string
      imgix_url: string
    }
    featured?: boolean
  }
}

// Case Study type
export interface CaseStudy extends CosmicObject {
  type: 'case-studies'
  metadata: {
    project_title?: string
    client_name?: string
    challenge?: string
    solution?: string
    results?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    project_images?: Array<{
      url: string
      imgix_url: string
    }>
    related_service?: Service
    publication_date?: string
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}