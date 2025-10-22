// 'use client';

// import { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown, Search, User, Heart, Phone, Mail } from 'lucide-react';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isListingsOpen, setIsListingsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const listingsCategories = [
//     { name: 'Residential', href: '/browse?category=residential' },
//     { name: 'Commercial', href: '/browse?category=commercial' },
//     { name: 'Industrial', href: '/browse?category=industrial' },
//     { name: 'Land', href: '/browse?category=land' },
//     { name: 'Retail Spaces', href: '/browse?category=retail' },
//     { name: 'Event Spaces', href: '/browse?category=events' }
//   ];

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="bg-gray-900 text-white py-2 text-sm">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <div className="flex items-center gap-6">
//               <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
//                 <Phone className="h-4 w-4" />
//                 <span className="hidden sm:inline">+254 700 000 000</span>
//               </a>
//               <a href="mailto:info@vacantspaceskenya.co.ke" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
//                 <Mail className="h-4 w-4" />
//                 <span className="hidden sm:inline">info@vacantspaceskenya.co.ke</span>
//               </a>
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <span className="text-gray-400">Covering all 47 Counties</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <header 
//         className={`sticky top-0 z-50 transition-all duration-300 ${
//           isScrolled 
//             ? 'bg-white shadow-lg' 
//             : 'bg-white/95 backdrop-blur-sm'
//         }`}
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <a href="/" className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
//                   <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
//               </div>
//               <div>
//                 <div className="font-bold text-xl text-gray-900 leading-tight">
//                   VacantSpaces<span className="text-orange-500">Kenya</span>
//                 </div>
//                 <div className="text-xs text-gray-500">by Dovepeak Digital</div>
//               </div>
//             </a>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-8">
//               <a href="/" className="text-gray-700 hover:text-orange-500 font-semibold transition-colors">
//                 Home
//               </a>
              
//               {/* Listings Dropdown */}
//               <div 
//                 className="relative"
//                 onMouseEnter={() => setIsListingsOpen(true)}
//                 onMouseLeave={() => setIsListingsOpen(false)}
//               >
//                 <button className="flex items-center gap-1 text-gray-700 hover:text-orange-500 font-semibold transition-colors">
//                   Listings
//                   <ChevronDown className={`h-4 w-4 transition-transform ${isListingsOpen ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {isListingsOpen && (
//                   <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in">
//                     {listingsCategories.map((category) => (
//                       <a
//                         key={category.name}
//                         href={category.href}
//                         className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
//                       >
//                         {category.name}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <a href="/about" className="text-gray-700 hover:text-orange-500 font-semibold transition-colors">
//                 About
//               </a>
//               <a href="/agents" className="text-gray-700 hover:text-orange-500 font-semibold transition-colors">
//                 For Agents
//               </a>
//               <a href="/contact" className="text-gray-700 hover:text-orange-500 font-semibold transition-colors">
//                 Contact
//               </a>
//             </nav>

//             {/* Right Side Actions */}
//             <div className="flex items-center gap-4">
//               <button className="hidden md:flex p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
//                 <Search className="h-5 w-5" />
//               </button>
//               <button className="hidden md:flex p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
//                 <Heart className="h-5 w-5" />
//               </button>
//               <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
//                 <User className="h-5 w-5" />
//                 <span className="font-semibold">Sign In</span>
//               </button>
//               <button className="hidden md:flex px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
//                 Post Listing
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
//               >
//                 {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
//               <nav className="flex flex-col gap-2">
//                 <a href="/" className="px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-semibold">
//                   Home
//                 </a>
//                 <a href="/browse" className="px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-semibold">
//                   All Listings
//                 </a>
//                 {listingsCategories.map((category) => (
//                   <a
//                     key={category.name}
//                     href={category.href}
//                     className="px-8 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors text-sm"
//                   >
//                     {category.name}
//                   </a>
//                 ))}
//                 <a href="/about" className="px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-semibold">
//                   About
//                 </a>
//                 <a href="/agents" className="px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-semibold">
//                   For Agents
//                 </a>
//                 <a href="/contact" className="px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-semibold">
//                   Contact
//                 </a>
//                 <div className="border-t border-gray-100 mt-2 pt-2">
//                   <a href="/login" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold">
//                     Sign In
//                   </a>
//                   <a href="/post-listing" className="block px-4 py-3 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg text-center">
//                     Post Listing
//                   </a>
//                 </div>
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;



// -------------------------------------------------------------------------------------------

// Vertion 2

// -------------------------------------------------------------------------------------------

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useAuth } from '@/lib/auth-context';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu, X, ChevronDown, Search, User, Heart, Phone, Mail, LogOut, LayoutDashboard, MessageSquare, Settings } from 'lucide-react';

// export function Header() {
//   const { user, profile, signOut } = useAuth();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isListingsOpen, setIsListingsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const getDashboardLink = () => {
//     if (!profile) return '/';
//     if (profile.role === 'admin') return '/admin';
//     if (profile.role === 'agent') return '/agent';
//     return '/dashboard';
//   };

//   const listingsCategories = [
//     { name: 'Residential', href: '/categories/residential' },
//     { name: 'Commercial', href: '/categories/commercial' },
//     { name: 'Industrial & Storage', href: '/categories/industrial' },
//     { name: 'Land', href: '/categories/land' },
//     { name: 'Event & Public Spaces', href: '/categories/events' },
//     { name: 'Specialty Spaces', href: '/categories/specialty' }
//   ];

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="bg-gray-900 text-white py-2 text-sm">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <div className="flex items-center gap-6">
//               <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
//                 <Phone className="h-4 w-4" />
//                 <span className="hidden sm:inline">+254 XXX XXX XXX</span>
//               </a>
//               <a href="mailto:info@vacantspaceskenya.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
//                 <Mail className="h-4 w-4" />
//                 <span className="hidden sm:inline">info@vacantspaceskenya.com</span>
//               </a>
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <Link href="/how-it-works" className="hidden md:inline hover:text-orange-400 transition-colors">
//                 How It Works
//               </Link>
//               <Link href="/pricing" className="hidden md:inline hover:text-orange-400 transition-colors">
//                 Pricing
//               </Link>
//               <Link href="/contact" className="hover:text-orange-400 transition-colors">
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <header 
//         className={`sticky top-0 z-50 transition-all duration-300 border-b ${
//           isScrolled 
//             ? 'bg-white shadow-lg' 
//             : 'bg-white/95 backdrop-blur-sm'
//         }`}
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-3 group">
//               <div className="relative">
//                 <Image
//                   src="/ddslogo.jpg"
//                   alt="VacantSpacesKenya"
//                   width={50}
//                   height={50}
//                   className="rounded-full shadow-lg group-hover:shadow-xl transition-all"
//                 />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
//               </div>
//               <div>
//                 <div className="font-bold text-xl text-gray-900 leading-tight">
//                   VacantSpaces<span className="text-orange-500">Kenya</span>
//                 </div>
//                 <div className="text-xs text-gray-500">Powered by Dovepeak Digital Solutions</div>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-1">
//               <Link
//                 href="/browse"
//                 className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-orange-50 hover:text-orange-600"
//               >
//                 Browse Spaces
//               </Link>
              
//               {/* Categories Dropdown */}
//               <DropdownMenu open={isListingsOpen} onOpenChange={setIsListingsOpen}>
//                 <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-orange-50 hover:text-orange-600">
//                   Categories
//                   <ChevronDown className={`h-4 w-4 transition-transform ${isListingsOpen ? 'rotate-180' : ''}`} />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="start" className="w-56">
//                   {listingsCategories.map((category) => (
//                     <DropdownMenuItem key={category.name} asChild>
//                       <Link href={category.href} className="cursor-pointer">
//                         {category.name}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <Link
//                 href="/about"
//                 className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-orange-50 hover:text-orange-600"
//               >
//                 About Us
//               </Link>

//               {profile?.role === 'agent' && (
//                 <Link
//                   href="/agent"
//                   className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-orange-50 hover:text-orange-600"
//                 >
//                   My Listings
//                 </Link>
//               )}

//               {!user && (
//                 <Link
//                   href="/register?role=agent"
//                   className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-orange-50 text-orange-600 hover:text-orange-700"
//                 >
//                   Become an Agent
//                 </Link>
//               )}
//             </nav>

//             {/* Right Side Actions */}
//             <div className="flex items-center gap-4">
//               <Button variant="ghost" size="icon" asChild className="hidden md:flex hover:bg-orange-50 hover:text-orange-600">
//                 <Link href="/browse">
//                   <Search className="h-5 w-5" />
//                 </Link>
//               </Button>

//               {user ? (
//                 <>
//                   <Button variant="ghost" size="icon" asChild className="hidden md:flex hover:bg-orange-50 hover:text-orange-600">
//                     <Link href="/favorites">
//                       <Heart className="h-5 w-5" />
//                     </Link>
//                   </Button>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="rounded-full hover:bg-orange-50">
//                         {profile?.avatar_url ? (
//                           <Image
//                             src={profile.avatar_url}
//                             alt={profile.full_name || 'User'}
//                             width={32}
//                             height={32}
//                             className="rounded-full"
//                           />
//                         ) : (
//                           <User className="h-5 w-5" />
//                         )}
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-56">
//                       <DropdownMenuLabel>
//                         <div className="flex flex-col space-y-1">
//                           <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
//                           <p className="text-xs leading-none text-muted-foreground">
//                             {profile?.email}
//                           </p>
//                         </div>
//                       </DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem asChild>
//                         <Link href={getDashboardLink()} className="cursor-pointer">
//                           <LayoutDashboard className="mr-2 h-4 w-4" />
//                           Dashboard
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/favorites" className="cursor-pointer">
//                           <Heart className="mr-2 h-4 w-4" />
//                           Favorites
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/inquiries" className="cursor-pointer">
//                           <MessageSquare className="mr-2 h-4 w-4" />
//                           My Inquiries
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/settings" className="cursor-pointer">
//                           <Settings className="mr-2 h-4 w-4" />
//                           Settings
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
//                         <LogOut className="mr-2 h-4 w-4" />
//                         Log out
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </>
//               ) : (
//                 <div className="hidden md:flex items-center gap-2">
//                   <Button variant="ghost" asChild className="hover:bg-orange-50 hover:text-orange-600">
//                     <Link href="/login">Sign In</Link>
//                   </Button>
//                   <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all">
//                     <Link href="/register">Get Started</Link>
//                   </Button>
//                 </div>
//               )}

//               {/* Mobile Menu */}
//               <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="lg:hidden hover:bg-orange-50 hover:text-orange-600">
//                     <Menu className="h-6 w-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//                   <nav className="flex flex-col gap-4 mt-8">
//                     <Link
//                       href="/browse"
//                       className="px-4 py-3 text-lg font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       Browse Spaces
//                     </Link>
                    
//                     <div className="px-4 py-2 text-sm font-semibold text-gray-500">Categories</div>
//                     {listingsCategories.map((category) => (
//                       <Link
//                         key={category.name}
//                         href={category.href}
//                         className="px-8 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         {category.name}
//                       </Link>
//                     ))}

//                     <Link
//                       href="/about"
//                       className="px-4 py-3 text-lg font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       About Us
//                     </Link>

//                     {profile?.role === 'agent' && (
//                       <Link
//                         href="/agent"
//                         className="px-4 py-3 text-lg font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         My Listings
//                       </Link>
//                     )}

//                     <div className="border-t border-gray-100 mt-4 pt-4">
//                       {user ? (
//                         <>
//                           <Link
//                             href={getDashboardLink()}
//                             className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             <LayoutDashboard className="inline mr-2 h-4 w-4" />
//                             Dashboard
//                           </Link>
//                           <Link
//                             href="/favorites"
//                             className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             <Heart className="inline mr-2 h-4 w-4" />
//                             Favorites
//                           </Link>
//                           <Link
//                             href="/inquiries"
//                             className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             <MessageSquare className="inline mr-2 h-4 w-4" />
//                             My Inquiries
//                           </Link>
//                           <button
//                             onClick={() => {
//                               signOut();
//                               setIsMobileMenuOpen(false);
//                             }}
//                             className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
//                           >
//                             <LogOut className="inline mr-2 h-4 w-4" />
//                             Log out
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <Link
//                             href="/login"
//                             className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             Sign In
//                           </Link>
//                           <Link
//                             href="/register"
//                             className="block px-4 py-3 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg text-center"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             Get Started
//                           </Link>
//                         </>
//                       )}
//                     </div>
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }



//------------------------------------------------------------------------------


//Version 3



//-------------------------------------------------------------------------------

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  User, 
  Heart, 
  Phone, 
  Mail, 
  LogOut, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Home,
  Building,
  Warehouse,
  MapPin,
  Calendar,
  Star,
  ShoppingBag,
  Info,
  HelpCircle,
  DollarSign,
  Users,
  Building2,
  FileText,
  Bell
} from 'lucide-react';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    if (profile.role === 'admin') return '/admin';
    if (profile.role === 'agent') return '/agent';
    return '/dashboard';
  };

  const categories = [
    { 
      name: 'Residential', 
      href: '/categories/residential',
      icon: Home,
      description: 'Apartments, houses & homes',
      color: 'text-blue-600'
    },
    { 
      name: 'Commercial', 
      href: '/categories/commercial',
      icon: Building,
      description: 'Offices & business spaces',
      color: 'text-green-600'
    },
    { 
      name: 'Industrial & Storage', 
      href: '/categories/industrial',
      icon: Warehouse,
      description: 'Warehouses & factories',
      color: 'text-orange-600'
    },
    { 
      name: 'Retail Spaces', 
      href: '/categories/retail',
      icon: ShoppingBag,
      description: 'Shops & retail outlets',
      color: 'text-pink-600'
    },
    { 
      name: 'Land', 
      href: '/categories/land',
      icon: MapPin,
      description: 'Plots & land parcels',
      color: 'text-purple-600'
    },
    { 
      name: 'Event & Public Spaces', 
      href: '/categories/events',
      icon: Calendar,
      description: 'Venues & event halls',
      color: 'text-indigo-600'
    },
    { 
      name: 'Specialty Spaces', 
      href: '/categories/specialty',
      icon: Star,
      description: 'Unique properties',
      color: 'text-yellow-600'
    }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 text-sm border-b border-gray-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a 
                href="tel:+254700000000" 
                className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
              >
                <div className="p-1 bg-white/10 rounded group-hover:bg-orange-500/20 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="hidden sm:inline">+254 XXX XXX XXX</span>
              </a>
              <a 
                href="mailto:info@vacantspaceskenya.com" 
                className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
              >
                <div className="p-1 bg-white/10 rounded group-hover:bg-orange-500/20 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="hidden sm:inline">info@vacantspaceskenya.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link 
                href="/how-it-works" 
                className="hidden lg:inline hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                How It Works
              </Link>
              <Link 
                href="/pricing" 
                className="hidden md:inline hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                <DollarSign className="h-3.5 w-3.5" />
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-orange-400 transition-colors"
              >
                Contact
              </Link>
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-400/30 hidden sm:inline-flex">
                47 Counties
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white shadow-lg border-gray-200' 
            : 'bg-white/98 backdrop-blur-md border-gray-100'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                <Image
                  src="/ddslogo.jpg"
                  alt="VacantSpacesKenya"
                  width={50}
                  height={50}
                  className="rounded-full shadow-md group-hover:shadow-xl transition-all transform group-hover:scale-105 relative z-10 border-2 border-white"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white z-20" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-xl text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                  VacantSpaces<span className="text-orange-500">Kenya</span>
                </div>
                <div className="text-[10px] text-gray-500 leading-tight">
                  Powered by Dovepeak Digital Solutions
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

              <Link
                href="/browse"
                className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Browse Spaces
              </Link>
              
              {/* Categories Mega Dropdown */}
              <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:bg-orange-50 hover:text-orange-600">
                  <Building2 className="h-4 w-4" />
                  Categories
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[480px] p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.name} asChild>
                        <Link 
                          href={category.href} 
                          className="cursor-pointer p-3 rounded-lg hover:bg-orange-50 transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors ${category.color}`}>
                              <category.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {category.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                About Us
              </Link>

              {profile?.role === 'agent' && (
                <Link
                  href="/agent"
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  My Listings
                </Link>
              )}

              {!user && (
                <Link
                  href="/register?role=agent"
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Become an Agent
                </Link>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="hidden md:flex hover:bg-orange-50 hover:text-orange-600 rounded-lg"
              >
                <Link href="/browse">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>

              {user ? (
                <>
                  {/* Favorites Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild 
                    className="hidden md:flex hover:bg-orange-50 hover:text-orange-600 rounded-lg relative"
                  >
                    <Link href="/favorites">
                      <Heart className="h-5 w-5" />
                    </Link>
                  </Button>

                  {/* Notifications Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden md:flex hover:bg-orange-50 hover:text-orange-600 rounded-lg relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="rounded-full p-1 hover:bg-orange-50 border-2 border-transparent hover:border-orange-200 transition-all"
                      >
                        {profile?.avatar_url ? (
                          <Image
                            src={profile.avatar_url}
                            alt={profile.full_name || 'User'}
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2">
                      <DropdownMenuLabel className="p-3">
                        <div className="flex items-center gap-3">
                          {profile?.avatar_url ? (
                            <Image
                              src={profile.avatar_url}
                              alt={profile.full_name || 'User'}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold leading-none mb-1">{profile?.full_name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {profile?.email}
                            </p>
                            {profile?.role && (
                              <Badge variant="secondary" className="mt-2 w-fit text-xs capitalize">
                                {profile.role}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={getDashboardLink()} className="cursor-pointer p-2.5 rounded-md">
                          <LayoutDashboard className="mr-3 h-4 w-4 text-orange-600" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/favorites" className="cursor-pointer p-2.5 rounded-md">
                          <Heart className="mr-3 h-4 w-4 text-red-600" />
                          <span className="font-medium">Favorites</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/inquiries" className="cursor-pointer p-2.5 rounded-md">
                          <MessageSquare className="mr-3 h-4 w-4 text-blue-600" />
                          <span className="font-medium">My Inquiries</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer p-2.5 rounded-md">
                          <Settings className="mr-3 h-4 w-4 text-gray-600" />
                          <span className="font-medium">Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => signOut()} 
                        className="cursor-pointer p-2.5 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-medium">Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" asChild className="font-semibold hover:bg-orange-50 hover:text-orange-600">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all font-semibold">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden hover:bg-orange-50 hover:text-orange-600 rounded-lg"
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-xl font-bold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-1">
                    {/* User Info Section (Mobile) */}
                    {user && profile && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                        <div className="flex items-center gap-3">
                          {profile?.avatar_url ? (
                            <Image
                              src={profile.avatar_url}
                              alt={profile.full_name || 'User'}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-white shadow"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{profile.full_name}</p>
                            <p className="text-xs text-gray-600">{profile.email}</p>
                            {profile.role && (
                              <Badge variant="secondary" className="mt-1 text-xs capitalize">
                                {profile.role}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Navigation */}
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>

                    <Link
                      href="/browse"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Search className="h-5 w-5" />
                      Browse Spaces
                    </Link>
                    
                    <div className="my-3">
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Categories
                      </div>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors ml-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <category.icon className={`h-4 w-4 ${category.color}`} />
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/about"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Info className="h-5 w-5" />
                      About Us
                    </Link>

                    <Link
                      href="/how-it-works"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <HelpCircle className="h-5 w-5" />
                      How It Works
                    </Link>

                    <Link
                      href="/pricing"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <DollarSign className="h-5 w-5" />
                      Pricing
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Phone className="h-5 w-5" />
                      Contact
                    </Link>

                    {profile?.role === 'agent' && (
                      <Link
                        href="/agent"
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FileText className="h-5 w-5" />
                        My Listings
                      </Link>
                    )}

                    {/* User Actions */}
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      {user ? (
                        <>
                          <Link
                            href={getDashboardLink()}
                            className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-5 w-5 text-orange-600" />
                            Dashboard
                          </Link>
                          <Link
                            href="/favorites"
                            className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Heart className="h-5 w-5 text-red-600" />
                            Favorites
                          </Link>
                          <Link
                            href="/inquiries"
                            className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                            My Inquiries
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Settings className="h-5 w-5 text-gray-600" />
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                          >
                            <LogOut className="h-5 w-5" />
                            Log out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-3.5 text-center text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-3.5 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Get Started
                          </Link>
                          <Link
                            href="/register?role=agent"
                            className="block px-4 py-3.5 text-center mt-2 bg-orange-50 text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Users className="inline h-4 w-4 mr-2" />
                            Become an Agent
                          </Link>
                        </>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}