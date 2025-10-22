'use client';

import { useState, useEffect, useRef } from 'react';
import { Building2, Users, MapPin, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatItem[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [overviewRes, listingsRes, usersRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/stats/listings'),
          fetch('/api/stats/users')
        ]);

        const overview = await overviewRes.json();
        const listings = await listingsRes.json();
        const users = await usersRes.json();

        const statsData = [
          {
            icon: Building2,
            value: listings.data?.total || 0,
            suffix: '+',
            label: 'Active Listings',
            description: 'Verified vacant spaces',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            icon: Users,
            value: users.data?.by_role?.find((r: any) => r.role === 'agent')?.count || 0,
            suffix: '+',
            label: 'Verified Agents',
            description: 'Professional property experts',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
          },
          {
            icon: TrendingUp,
            value: overview.data?.total_users || 0,
            suffix: '+',
            label: 'Happy Clients',
            description: 'Satisfied customers',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50'
          },
          {
            icon: MapPin,
            value: listings.data?.by_location?.length || 0,
            suffix: '',
            label: 'Counties Covered',
            description: 'Nationwide coverage',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50'
          }
        ];

        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to hardcoded values if API fails
        setStats([
          {
            icon: Building2,
            value: 3400,
            suffix: '+',
            label: 'Active Listings',
            description: 'Verified vacant spaces',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            icon: Users,
            value: 580,
            suffix: '+',
            label: 'Verified Agents',
            description: 'Professional property experts',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
          },
          {
            icon: TrendingUp,
            value: 12000,
            suffix: '+',
            label: 'Happy Clients',
            description: 'Satisfied customers',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50'
          },
          {
            icon: MapPin,
            value: 47,
            suffix: '',
            label: 'Counties Covered',
            description: 'Nationwide coverage',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold mb-4">
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Across Kenya
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a growing community of successful space seekers and property agents
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="p-8 bg-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="p-4 bg-gray-300 rounded-2xl">
                      <div className="h-10 w-10 bg-gray-400 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-8 bg-gray-400 rounded mb-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group"
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                  </div>

                  {/* Icon Section */}
                  <div className={`relative p-8 bg-gradient-to-br ${stat.color} text-white`}>
                    <div className="flex justify-between items-start">
                      <div className={`p-4 ${stat.bgColor} bg-opacity-20 rounded-2xl backdrop-blur-sm`}>
                        <stat.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl md:text-5xl font-bold mb-1">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600">
                      {stat.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? '100%' : '0%',
                          transitionDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <div className="text-3xl font-bold text-blue-700 mb-2">95%</div>
            <div className="text-gray-700 font-semibold mb-1">Success Rate</div>
            <div className="text-sm text-gray-600">Clients find their perfect space</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">7 Days</div>
            <div className="text-gray-700 font-semibold mb-1">Average Time</div>
            <div className="text-sm text-gray-600">To close a deal</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
            <div className="text-3xl font-bold text-orange-700 mb-2">4.8/5</div>
            <div className="text-gray-700 font-semibold mb-1">User Rating</div>
            <div className="text-sm text-gray-600">Based on 2,500+ reviews</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default StatisticsSection;