import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Shield, TrendingUp, Heart, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-br from-primary to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About VacantSpacesKenya</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Revolutionizing how Kenyans find and advertise vacant spaces
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              VacantSpacesKenya (VSK) is a flagship product of <strong>Dovepeak Digital Solutions</strong>, born from the vision to simplify the complex process of finding and advertising vacant spaces in Kenya.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We recognized that property seekers struggled to find comprehensive, reliable listings, while property agents lacked an affordable platform to reach their target audience nationwide. VSK bridges this gap with cutting-edge technology and user-focused design.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to serve thousands of users across all 47 counties, from Nairobi's bustling CBD to the growing towns in every corner of Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Powered by Innovation</h3>
              <p className="text-muted-foreground mb-4">
                At Dovepeak Digital Solutions, we leverage the latest technologies to create products that solve real problems. Our team of experienced developers, designers, and real estate experts work together to ensure VSK remains the premier platform for vacant spaces in Kenya.
              </p>
              <p className="text-muted-foreground">
                We're committed to continuous improvement, regularly adding new features based on user feedback and market needs.
              </p>
            </div>
            <div className="relative h-64 bg-slate-200 rounded-xl overflow-hidden">
              <Image
                src="/ddslogo.jpg"
                alt="Dovepeak Digital Solutions"
                fill
                className="object-contain p-12"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide an accessible, affordable, and reliable platform that connects property seekers with vacant spaces across Kenya, making the search process simple, transparent, and efficient.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become East Africa's leading platform for vacant space listings, empowering individuals and businesses to find their perfect space and helping agents maximize their reach and revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Trust & Integrity</h3>
                <p className="text-muted-foreground">
                  We verify agents and listings to ensure our users have access to legitimate, quality spaces.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  Every feature and decision is made with our users' needs and experience at the forefront.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly evolve our platform with new technologies and features to stay ahead.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe everyone deserves access to affordable, quality space listings nationwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Growth</h3>
                <p className="text-muted-foreground">
                  We're committed to growing alongside our users and the Kenyan property market.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from user experience to customer support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About Dovepeak Digital Solutions</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Dovepeak Digital Solutions is a leading technology company specializing in creating innovative digital products for African markets. Our team combines deep technical expertise with market insight to build solutions that make a real difference.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Beyond VacantSpacesKenya, we offer custom software development, web and mobile app development, and digital transformation consulting for businesses of all sizes.
            </p>
            <p className="text-lg font-semibold text-primary">
              Building the future of digital solutions, one product at a time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}