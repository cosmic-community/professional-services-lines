import { cosmic, hasStatus } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import TeamMemberCard from '@/components/TeamMemberCard'

async function getTeam(): Promise<TeamMember[]> {
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
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented professionals who make it all happen
          </p>
        </div>

        {team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No team members available at the moment.</p>
        )}
      </div>
    </div>
  )
}