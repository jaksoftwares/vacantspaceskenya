'use client';

import { CheckCircle2, ArrowRight, Search, BarChart, Users, Zap, Shield, Clock } from 'lucide-react';

const TargetAudienceSection = () => {
  const spaceSeekers = [
    {
      icon: Search,
      title: 'Search Nationwide',
      description: 'Browse spaces across all 47 counties with advanced filters'
    },
    {
      icon: Zap,
      title: 'Advanced Filters',
      description: 'Find exactly what you need with precise search capabilities'
    },
    {
      icon: Users,
      title: 'Direct Contact',
      description: 'Connect directly with verified agents and property owners'
    },
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All listings are inspected and verified for authenticity'
    },
    {
      icon: Clock,
      title: 'Quick Responses',
      description: 'Get instant feedback and schedule viewings within 24 hours'
    }
  ];

  const propertyAgents = [
    {
      icon: BarChart,
      title: 'Reach More Clients',
      description: 'Nationwide visibility for your listings to thousands of users'
    },
    {
      icon: Zap,
      title: 'Easy Management',
      description: 'Comprehensive dashboard to manage all your properties'
    },
    {
      icon: Users,
      title: 'Lead Generation',
      description: 'Get qualified leads directly interested in your spaces'
    },
    {
      icon: Shield,
      title: 'Build Credibility',
      description: 'Verified badge and reviews system to build trust'
    },
    {
      icon: CheckCircle2,
      title: 'Affordable Pricing',
      description: 'Competitive rates with transparent fee structure'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold mb-4">
            Who We Serve
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built For Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re looking for space or offering one, we&apos;ve got the perfect solution for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Space Seekers */}
          <div className="group">
            <div className="h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              {/* Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Space Seekers"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold mb-3">
                    For Individuals & Businesses
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    For Space Seekers
                  </h3>
                  <p className="text-blue-100">
                    Find your perfect space in minutes
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-5 mb-8">
                  {spaceSeekers.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group/item hover:translate-x-2 transition-transform">
                      <div className="p-2 bg-blue-50 rounded-lg shrink-0 group-hover/item:bg-blue-100 transition-colors">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Start Searching
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Property Agents */}
          <div className="group">
            <div className="h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              {/* Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
                  alt="Property Agents"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-800/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold mb-3">
                    For Professionals
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    For Property Agents
                  </h3>
                  <p className="text-orange-100">
                    Grow your business with us
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-5 mb-8">
                  {propertyAgents.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group/item hover:translate-x-2 transition-transform">
                      <div className="p-2 bg-orange-50 rounded-lg shrink-0 group-hover/item:bg-orange-100 transition-colors">
                        <feature.icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Become an Agent
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Not sure which option is right for you?
          </p>
          <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
            Learn More About Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;