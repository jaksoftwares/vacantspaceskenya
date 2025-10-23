'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  Building2,
  Home,
  Warehouse,
  Store,
  Factory,
  Hotel,
  School,
  Hospital,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  'residential': Home,
  'commercial': Store,
  'industrial': Factory,
  'warehouse': Warehouse,
  'retail': Store,
  'office': Building2,
  'hotel': Hotel,
  'school': School,
  'hospital': Hospital,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const [categoriesData, statsData] = await Promise.all([
      supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .order('sort_order'),
      supabase
        .from('listings')
        .select('category_id')
        .eq('status', 'active')
    ]);

    if (categoriesData.data) {
      setCategories(categoriesData.data);

      // Calculate stats
      const stats: Record<string, number> = {};
      statsData.data?.forEach((listing: any) => {
        stats[listing.category_id] = (stats[listing.category_id] || 0) + 1;
      });
      setCategoryStats(stats);
    }

    setLoading(false);
  };

  const getCategoryIcon = (slug: string) => {
    const IconComponent = categoryIcons[slug] || Building2;
    return IconComponent;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse by Category
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Discover vacant spaces across different property types in Kenya.
              Find the perfect space for your business or residential needs.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.slug);
            const listingCount = categoryStats[category.id] || 0;

            return (
              <Card key={category.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <Link href={`/categories/${category.id}`}>
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300"></div>
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}></div>
                    </div>

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-12 w-12 text-orange-600" />
                      </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-orange-700 font-semibold shadow-lg">
                        {listingCount} spaces
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {category.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>{listingCount} active listings</span>
                      </div>
                      <Button variant="outline" size="sm" className="group-hover:bg-orange-50 group-hover:border-orange-300">
                        View All
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Categories Found</h3>
            <p className="text-muted-foreground">
              Categories will be available once data is populated.
            </p>
          </div>
        )}

        {/* Stats Section */}
        {categories.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Property Categories Overview
              </h2>
              <p className="text-gray-600">
                Explore our comprehensive range of property categories across Kenya
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {Object.values(categoryStats).reduce((a: number, b: number) => a + b, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  47
                </div>
                <div className="text-sm text-gray-600">Counties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}