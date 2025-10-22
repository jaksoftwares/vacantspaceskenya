'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const slides = [
    {
      title: "Find Your Perfect Commercial Space",
      subtitle: "Prime retail and office locations across Kenya's major cities",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
      cta: "Browse Commercial",
      category: "commercial"
    },
    {
      title: "Discover Residential Properties",
      subtitle: "Apartments, houses, and residential spaces in all 47 counties",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
      cta: "Find Homes",
      category: "residential"
    },
    {
      title: "Industrial & Warehouse Solutions",
      subtitle: "Large-scale spaces for manufacturing and logistics operations",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80",
      cta: "View Warehouses",
      category: "industrial"
    },
    {
      title: "Event Spaces & Venues",
      subtitle: "Perfect locations for conferences, weddings, and corporate events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
      cta: "Explore Venues",
      category: "events"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <div className="max-w-3xl space-y-6 animate-fade-in">
                <div className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
                  Kenya&apos;s #1 Vacant Spaces Platform
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200">
                  {slide.subtitle}
                </p>
                
                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-2xl">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search location, category, or keyword..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-800 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Search
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 text-sm">
                    <span className="text-gray-500 font-medium">Popular:</span>
                    {['Retail Shops', 'Offices', 'Warehouses', 'Nairobi'].map((item) => (
                      <button
                        key={item}
                        className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-gray-700 rounded-full transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-orange-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;