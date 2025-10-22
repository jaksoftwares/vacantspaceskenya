'use client';

import { Home, Building, Warehouse, MapPin, Calendar, Star, ShoppingBag, Briefcase } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    {
      name: 'Residential',
      icon: Home,
      count: '1,200+',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
      description: 'Apartments, houses & residential units'
    },
    {
      name: 'Commercial',
      icon: Building,
      count: '850+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
      description: 'Offices & commercial buildings'
    },
    {
      name: 'Industrial',
      icon: Warehouse,
      count: '320+',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
      description: 'Warehouses & factories'
    },
    {
      name: 'Land',
      icon: MapPin,
      count: '540+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
      description: 'Plots & land parcels'
    },
    {
      name: 'Retail Spaces',
      icon: ShoppingBag,
      count: '680+',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
      description: 'Shops & retail outlets'
    },
    {
      name: 'Event Spaces',
      icon: Calendar,
      count: '180+',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2a6?w=400&q=80',
      description: 'Venues & event halls'
    },
    {
      name: 'Co-working',
      icon: Briefcase,
      count: '240+',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80',
      description: 'Shared workspaces'
    },
    {
      name: 'Specialty',
      icon: Star,
      count: '290+',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
      description: 'Unique & specialty spaces'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thousands of verified vacant spaces across Kenya in various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-40 transition-opacity`} />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`p-3 ${category.bgColor} rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90`}>
                      <category.icon className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>

                  {/* Count Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                      <span className="font-bold text-gray-900">{category.count}</span>
                      <span className="text-gray-600 text-sm ml-1">listings</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;