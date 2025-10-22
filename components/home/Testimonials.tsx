'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'David Mwangi',
      role: 'Business Owner',
      location: 'Nairobi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      rating: 5,
      text: 'VacantSpacesKenya helped me find the perfect retail location for my store in Westlands. The process was smooth, and the agent was very professional. Within two weeks, I had signed my lease!',
      category: 'Commercial Space'
    },
    {
      name: 'Grace Achieng',
      role: 'Event Planner',
      location: 'Kisumu',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
      rating: 5,
      text: 'As an event planner, I need different venues regularly. This platform has become my go-to resource. The variety of event spaces available across Kenya is impressive. Highly recommend!',
      category: 'Event Space'
    },
    {
      name: 'James Kamau',
      role: 'Property Agent',
      location: 'Mombasa',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
      rating: 5,
      text: 'Since joining VacantSpacesKenya as an agent, my business has grown by 300%. The platform connects me with serious clients, and the dashboard makes property management effortless.',
      category: 'Agent Experience'
    },
    {
      name: 'Sarah Njeri',
      role: 'Startup Founder',
      location: 'Nakuru',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
      rating: 5,
      text: 'Finding affordable office space for my tech startup was challenging until I discovered this platform. The filters helped me find exactly what I needed within my budget. Thank you!',
      category: 'Office Space'
    },
    {
      name: 'Peter Omondi',
      role: 'Warehouse Manager',
      location: 'Eldoret',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
      rating: 5,
      text: 'We needed a large warehouse for our logistics operations. VacantSpacesKenya had multiple options in Eldoret. The verification process gave us confidence in our choice.',
      category: 'Industrial Space'
    },
    {
      name: 'Lucy Wanjiku',
      role: 'Restaurant Owner',
      location: 'Thika',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      rating: 5,
      text: 'Opening my restaurant was a dream come true, thanks to VacantSpacesKenya. I found a prime location with high foot traffic. The platform made everything so easy!',
      category: 'Retail Space'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who found their perfect space with us
          </p>
        </div>

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8 px-2">
                    {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                      >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 relative">
                          <Quote className="absolute top-4 right-4 h-12 w-12 text-white/20" />
                          <div className="flex items-start gap-4 relative z-10">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                              <p className="text-orange-100 text-sm">{testimonial.role}</p>
                              <p className="text-orange-200 text-xs mt-1">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Rating */}
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>

                          {/* Category Badge */}
                          <div className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold mb-4">
                            {testimonial.category}
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-gray-600 leading-relaxed">
                            {testimonial.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-orange-500'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">2,500+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">12K+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;