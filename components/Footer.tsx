import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Professional Services</h3>
            <p className="text-orange-100">
              Transforming businesses through expert services and innovative solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-orange-100 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-orange-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-orange-100 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-orange-100 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-orange-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-orange-100 mb-2">
              Email: info@professionalservices.com
            </p>
            <p className="text-orange-100">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-orange-700 mt-8 pt-8 text-center text-orange-100">
          <p>&copy; {new Date().getFullYear()} Professional Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}