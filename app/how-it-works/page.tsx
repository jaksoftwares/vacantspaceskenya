import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Search, UserPlus, MessageSquare, CheckCircle, Building, TrendingUp } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-br from-primary to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How VacantSpacesKenya Works</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Simple, transparent, and efficient platform for finding and advertising vacant spaces across Kenya
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">For Space Seekers</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <div className="text-6xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-3">Search & Filter</h3>
                <p className="text-muted-foreground">
                  Browse thousands of listings or use our advanced filters to find exactly what you need - by location, category, price, and amenities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div className="text-6xl font-bold text-primary mb-2">2</div>
                <h3 className="text-xl font-semibold mb-3">Contact & Inquire</h3>
                <p className="text-muted-foreground">
                  Found something you like? Send an inquiry directly to the agent or property owner through our platform or contact them directly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="text-6xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-3">Visit & Secure</h3>
                <p className="text-muted-foreground">
                  Schedule a viewing, negotiate terms, and secure your perfect space. We connect you directly with verified agents for a seamless experience.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/browse">Start Searching Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">For Property Agents</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-6xl font-bold text-secondary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-3">Sign Up & Verify</h3>
                <p className="text-muted-foreground">
                  Create your agent account, complete your profile, and get verified to build trust with potential clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-6xl font-bold text-secondary mb-2">2</div>
                <h3 className="text-xl font-semibold mb-3">List Your Spaces</h3>
                <p className="text-muted-foreground">
                  Add detailed listings with photos, descriptions, pricing, and amenities. Manage everything from your comprehensive dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-6xl font-bold text-secondary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-3">Connect & Close</h3>
                <p className="text-muted-foreground">
                  Receive inquiries from interested clients, manage communications, and close deals faster with nationwide visibility.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?role=agent">Become an Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Is VacantSpacesKenya free to use?</h3>
                <p className="text-muted-foreground">
                  Yes! Browsing and searching for spaces is completely free. Agents pay a small fee to list their properties and access premium features.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Are all listings verified?</h3>
                <p className="text-muted-foreground">
                  We verify agent identities and conduct spot checks on listings. Look for the "Verified" badge for additional assurance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How do I contact a property owner?</h3>
                <p className="text-muted-foreground">
                  Each listing has contact details and an inquiry form. You can send a message through the platform or call/email the agent directly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What areas does VacantSpacesKenya cover?</h3>
                <p className="text-muted-foreground">
                  We cover all 47 counties in Kenya, from Nairobi to Mombasa, Kisumu to Eldoret, and everywhere in between.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}