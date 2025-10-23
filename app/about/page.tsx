'use client';

import { Header } from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Shield, TrendingUp, Heart, Zap, CheckCircle2, ArrowRight, Star, Award, Globe, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section with Enhanced Design */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-slate-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              About VacantSpacesKenya
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Revolutionizing Kenya&apos;s Property Market
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We&apos;re transforming how Kenyans discover and advertise vacant spaces, connecting property seekers with verified opportunities across all 47 counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/browse">
                  Explore Spaces
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Born from a Simple Vision</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                VacantSpacesKenya (VSK) is a flagship product of <strong>Dovepeak Digital Solutions</strong>, born from the vision to simplify the complex process of finding and advertising vacant spaces in Kenya.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">The Problem We Solved</h3>
                    <p className="text-muted-foreground">
                      Property seekers struggled to find comprehensive, reliable listings, while property agents lacked an affordable platform to reach their target audience nationwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Solution</h3>
                    <p className="text-muted-foreground">
                      VSK bridges this gap with cutting-edge technology and user-focused design, making property discovery seamless and efficient.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Nationwide Impact</h3>
                    <p className="text-muted-foreground">
                      Today, we&apos;re proud to serve thousands of users across all 47 counties, from Nairobi&apos;s bustling CBD to the growing towns in every corner of Kenya.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-80 bg-gradient-to-br from-primary/5 to-slate-100 rounded-2xl overflow-hidden">
                  <Image
                    src="/ddslogo.jpg"
                    alt="Dovepeak Digital Solutions"
                    fill
                    className="object-contain p-8"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Trusted by</div>
                      <div className="text-2xl font-bold text-primary">10,000+</div>
                      <div className="text-xs text-muted-foreground">Happy Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Innovation Section */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Powered by Innovation</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  At Dovepeak Digital Solutions, we leverage the latest technologies to create products that solve real problems.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Latest Technology</h4>
                  <p className="text-sm text-muted-foreground">
                    Cutting-edge web technologies and modern development practices
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Expert Team</h4>
                  <p className="text-sm text-muted-foreground">
                    Experienced developers, designers, and real estate experts
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Continuous Growth</h4>
                  <p className="text-sm text-muted-foreground">
                    We&apos;re committed to continuous improvement based on user feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Purpose</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission & Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving the future of property discovery in Kenya and East Africa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Our Mission</h3>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To provide an accessible, affordable, and reliable platform that connects property seekers with vacant spaces across Kenya, making the search process simple, transparent, and efficient for everyone.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Making property search effortless</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Our Vision</h3>
                    <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become East Africa&apos;s leading platform for vacant space listings, empowering individuals and businesses to find their perfect space and helping agents maximize their reach and revenue.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">Regional leadership in property tech</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Principles</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The core principles that guide everything we do at VacantSpacesKenya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Trust & Integrity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We verify agents and listings to ensure our users have access to legitimate, quality spaces that meet the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Customer First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every feature and decision is made with our users&apos; needs and experience at the forefront. Your success is our success.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We constantly evolve our platform with new technologies and features to stay ahead of market demands.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Accessibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe everyone deserves access to affordable, quality space listings nationwide, regardless of location or budget.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re committed to growing alongside our users and the Kenyan property market, adapting to new opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Target className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We strive for excellence in everything we do, from user experience to customer support and platform reliability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Dovepeak Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Company</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Dovepeak Digital Solutions</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The innovative force behind VacantSpacesKenya, powering digital transformation across Africa
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Leading Technology Company</h3>
                    <p className="text-muted-foreground">
                      Dovepeak Digital Solutions is a leading technology company specializing in creating innovative digital products for African markets. Our team combines deep technical expertise with market insight to build solutions that make a real difference.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Services</h3>
                    <p className="text-muted-foreground">
                      Beyond VacantSpacesKenya, we offer custom software development, web and mobile app development, and digital transformation consulting for businesses of all sizes across Africa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Future-Focused</h3>
                    <p className="text-muted-foreground">
                      Building the future of digital solutions, one product at a time. We&apos;re committed to driving innovation and creating lasting impact in the African tech ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 bg-gradient-to-br from-primary/5 to-slate-100 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/ddslogo.jpg"
                    alt="Dovepeak Digital Solutions"
                    fill
                    className="object-contain p-12"
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">5+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">50+</div>
                      <div className="text-xs text-muted-foreground">Projects Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Let Dovepeak Digital Solutions help you build the next generation of digital products for the African market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="https://dovepeak.co.ke" target="_blank">
                    Visit Our Website
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}