import { cosmic, hasStatus } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import CaseStudyCard from '@/components/CaseStudyCard'

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as CaseStudy[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped our clients achieve remarkable results
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No case studies available at the moment.</p>
        )}
      </div>
    </div>
  )
}