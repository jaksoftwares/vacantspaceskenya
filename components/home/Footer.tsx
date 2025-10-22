'use client';

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'For Agents', href: '/agents' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ];

  const categories = [
    { name: 'Residential Spaces', href: '/browse?category=residential' },
    { name: 'Commercial Spaces', href: '/browse?category=commercial' },
    { name: 'Industrial Spaces', href: '/browse?category=industrial' },
    { name: 'Retail Spaces', href: '/browse?category=retail' },
    { name: 'Event Spaces', href: '/browse?category=events' },
    { name: 'Land Parcels', href: '/browse?category=land' }
  ];

  const popularLocations = [
    { name: 'Nairobi', href: '/browse?county=nairobi' },
    { name: 'Mombasa', href: '/browse?county=mombasa' },
    { name: 'Kisumu', href: '/browse?county=kisumu' },
    { name: 'Nakuru', href: '/browse?county=nakuru' },
    { name: 'Eldoret', href: '/browse?county=eldoret' },
    { name: 'View All Counties', href: '/counties' }
  ];

  const legal = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay Updated with New Listings
              </h3>
              <p className="text-orange-100">
                Subscribe to get notifications about new vacant spaces in your area
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
                <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl text-white">
                  VacantSpaces<span className="text-orange-500">Kenya</span>
                </div>
                <div className="text-sm text-gray-400">by Dovepeak Digital Solutions</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Kenya&apos;s leading platform for discovering and advertising vacant spaces. 
              We connect property seekers with verified agents nationwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+254700000000" className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+254 700 000 000</span>
              </a>
              <a href="mailto:info@vacantspaceskenya.co.ke" className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <span>info@vacantspaceskenya.co.ke</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Nairobi, Kenya<br />Serving all 47 Counties</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all" />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Popular Locations</h4>
            <ul className="space-y-3">
              {popularLocations.map((location) => (
                <li key={location.name}>
                  <a 
                    href={location.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all" />
                    {location.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-semibold">Follow Us:</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-all transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-all transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-all transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-all transform hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legal.map((item, index) => (
                <span key={item.name} className="flex items-center gap-6">
                  <a href={item.href} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {item.name}
                  </a>
                  {index < legal.length - 1 && <span className="text-gray-700">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>© {currentYear} VacantSpacesKenya. All rights reserved.</p>
            <p className="mt-1">Powered by <span className="text-orange-500 font-semibold">Dovepeak Digital Solutions</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;