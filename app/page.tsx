'use client';

// Import all components
import {Header} from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import HeroCarousel from '@/components/home/Hero';
import CategoriesSection from '@/components/home/Categories';
import FeaturesSection from '@/components/home/WhyChoseUs';
import StatisticsSection from '@/components/home/HomeStats';
import TargetAudienceSection from '@/components/home/TargetAudience';
import TestimonialsSection from '@/components/home/Testimonials';
import CTASection from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <HeroCarousel />
        
        {/* Categories Section */}
        <CategoriesSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Target Audience Section (For Space Seekers & Agents) */}
        <TargetAudienceSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Final CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}

// 'use client';

// import { Header } from '@/components/header';
// import { Footer } from '@/components/footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import Link from 'next/link';
// import {
//   Search,
//   MapPin,
//   Building,
//   Home,
//   Warehouse,
//   Calendar,
//   Star,
//   ShieldCheck,
//   TrendingUp,
//   Users,
//   ArrowRight,
//   CheckCircle2
// } from 'lucide-react';
// import { useState } from 'react';

// export default function HomePage() {
//   const [searchQuery, setSearchQuery] = useState('');

//   const categories = [
//     { name: 'Residential', icon: Home, count: '1,200+', color: 'bg-blue-100 text-blue-700' },
//     { name: 'Commercial', icon: Building, count: '850+', color: 'bg-green-100 text-green-700' },
//     { name: 'Industrial', icon: Warehouse, count: '320+', color: 'bg-orange-100 text-orange-700' },
//     { name: 'Land', icon: MapPin, count: '540+', color: 'bg-purple-100 text-purple-700' },
//     { name: 'Event Spaces', icon: Calendar, count: '180+', color: 'bg-pink-100 text-pink-700' },
//     { name: 'Specialty', icon: Star, count: '290+', color: 'bg-yellow-100 text-yellow-700' },
//   ];

//   const features = [
//     {
//       icon: ShieldCheck,
//       title: 'Verified Listings',
//       description: 'All listings are verified to ensure authenticity and quality'
//     },
//     {
//       icon: MapPin,
//       title: 'Nationwide Coverage',
//       description: 'Find spaces across all 47 counties in Kenya'
//     },
//     {
//       icon: TrendingUp,
//       title: 'Best Prices',
//       description: 'Competitive pricing and transparent fee structure'
//     },
//     {
//       icon: Users,
//       title: 'Trusted Agents',
//       description: 'Work with verified and professional property agents'
//     }
//   ];

//   const stats = [
//     { label: 'Active Listings', value: '3,400+' },
//     { label: 'Verified Agents', value: '580+' },
//     { label: 'Happy Clients', value: '12,000+' },
//     { label: 'Counties Covered', value: '47' }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <section className="relative bg-gradient-to-br from-primary via-primary to-slate-800 text-white py-20 md:py-32">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="max-w-3xl mx-auto text-center space-y-8">
//             <Badge variant="secondary" className="mb-4">
//               Kenya&apos;s #1 Vacant Spaces Platform
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//               Find Your Perfect Space in Kenya
//             </h1>
//             <p className="text-xl text-gray-200">
//               Discover thousands of vacant residential, commercial, and industrial spaces across all 47 counties.
//               From offices to warehouses, we&apos;ve got you covered.
//             </p>

//             <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl mx-auto">
//               <div className="flex gap-2">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     placeholder="Search by location, category, or keyword..."
//                     className="pl-10 h-12"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//                 <Button size="lg" className="h-12" asChild>
//                   <Link href={`/browse${searchQuery ? `?q=${searchQuery}` : ''}`}>
//                     Search
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               <span className="text-gray-300">Popular:</span>
//               <Link href="/browse?category=retail-shops" className="hover:text-secondary transition-colors">
//                 Retail Shops
//               </Link>
//               <span className="text-gray-600">•</span>
//               <Link href="/browse?category=offices" className="hover:text-secondary transition-colors">
//                 Offices
//               </Link>
//               <span className="text-gray-600">•</span>
//               <Link href="/browse?category=warehouses" className="hover:text-secondary transition-colors">
//                 Warehouses
//               </Link>
//               <span className="text-gray-600">•</span>
//               <Link href="/browse?county=nairobi" className="hover:text-secondary transition-colors">
//                 Nairobi
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map((category) => (
//               <Link
//                 key={category.name}
//                 href={`/browse?category=${category.name.toLowerCase()}`}
//               >
//                 <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
//                   <CardContent className="p-6 text-center">
//                     <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
//                       <category.icon className="h-6 w-6" />
//                     </div>
//                     <h3 className="font-semibold mb-1">{category.name}</h3>
//                     <p className="text-sm text-muted-foreground">{category.count}</p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-slate-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose VacantSpacesKenya?</h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               We make finding and advertising vacant spaces easier, faster, and more affordable than ever before.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature) => (
//               <Card key={feature.title} className="border-none shadow-sm">
//                 <CardContent className="p-6 text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
//                     <feature.icon className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-sm text-muted-foreground">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {stats.map((stat) => (
//               <div key={stat.label}>
//                 <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
//                 <div className="text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-slate-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-12">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6">For Space Seekers</h2>
//                 <ul className="space-y-4 mb-8">
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Search Nationwide</div>
//                       <div className="text-sm text-muted-foreground">Browse spaces across all 47 counties</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Advanced Filters</div>
//                       <div className="text-sm text-muted-foreground">Find exactly what you need with precise search</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Direct Contact</div>
//                       <div className="text-sm text-muted-foreground">Connect directly with verified agents</div>
//                     </div>
//                   </li>
//                 </ul>
//                 <Button size="lg" asChild>
//                   <Link href="/browse">
//                     Start Searching
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold mb-6">For Property Agents</h2>
//                 <ul className="space-y-4 mb-8">
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Reach More Clients</div>
//                       <div className="text-sm text-muted-foreground">Nationwide visibility for your listings</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Easy Management</div>
//                       <div className="text-sm text-muted-foreground">Comprehensive dashboard for all your spaces</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Affordable Pricing</div>
//                       <div className="text-sm text-muted-foreground">Advertise at competitive rates</div>
//                     </div>
//                   </li>
//                 </ul>
//                 <Button size="lg" variant="secondary" asChild>
//                   <Link href="/register?role=agent">
//                     Become an Agent
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-r from-primary to-slate-800 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
//             Join thousands of satisfied users finding and advertising vacant spaces across Kenya
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" variant="secondary" asChild>
//               <Link href="/register">
//                 Create Free Account
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary" asChild>
//               <Link href="/browse">
//                 Browse Listings
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
