import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photo = member.metadata?.photo

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {photo && (
        <img
          src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={member.metadata?.name || member.title}
          className="w-full h-80 object-cover"
          width={300}
          height={400}
        />
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-1">
          {member.metadata?.name || member.title}
        </h3>
        
        <p className="text-primary-light font-semibold mb-4">
          {member.metadata?.role}
        </p>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {member.metadata?.bio}
        </p>
        
        <div className="flex gap-3">
          {member.metadata?.linkedin_url && (
            <a
              href={member.metadata.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              LinkedIn
            </a>
          )}
          {member.metadata?.twitter_handle && (
            <a
              href={`https://twitter.com/${member.metadata.twitter_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  )
}