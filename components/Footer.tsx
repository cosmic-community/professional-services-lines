export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Professional Services</h3>
            <p className="text-blue-100">
              Transforming businesses through expert services and innovative solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services" className="text-blue-100 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/team" className="text-blue-100 hover:text-white transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="/case-studies" className="text-blue-100 hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-blue-100 mb-2">
              Email: info@professionalservices.com
            </p>
            <p className="text-blue-100">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Professional Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}