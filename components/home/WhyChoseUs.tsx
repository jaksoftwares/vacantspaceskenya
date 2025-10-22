'use client';

import { ShieldCheck, MapPin, TrendingUp, Users, Clock, CheckCircle, Zap, HeartHandshake } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Listings',
      description: 'All properties are thoroughly verified and inspected to ensure authenticity, quality, and accurate information.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80'
    },
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Access vacant spaces across all 47 counties in Kenya, from Mombasa to Turkana and everywhere in between.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing with transparent fee structure. No hidden costs, just honest business.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    },
    {
      icon: Users,
      title: 'Trusted Agents',
      description: 'Work with verified, professional, and experienced property agents committed to your success.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get instant responses from property agents. Connect and schedule viewings within 24 hours.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80'
    },
    {
      icon: CheckCircle,
      title: 'Easy Process',
      description: 'Streamlined process from search to deal closure. We simplify every step of your journey.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
    },
    {
      icon: Zap,
      title: 'Advanced Search',
      description: 'Powerful filters and search tools to find exactly what you need in seconds.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Support',
      description: 'Dedicated support team ready to assist you every step of the way. Your success is our priority.',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold mb-4">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose VacantSpacesKenya?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make finding and advertising vacant spaces easier, faster, and more affordable than ever before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                {/* Background Image with Overlay */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-80`} />
                  
                  {/* Floating Icon */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <div className={`p-4 ${feature.bgColor} rounded-2xl shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">99.5%</div>
              <div className="text-orange-100 text-lg">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-orange-100 text-lg">Platform Availability</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">48hrs</div>
              <div className="text-orange-100 text-lg">Average Listing Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;