"use client";
import { useState } from 'react';
import {
  NavigationMenu,
  //NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const menuItems = [
  { title: 'Home', href: '/', description: 'Go to homepage' },
  { title: 'Services', href: '/Service', description: 'Explore our services' },
  { title: 'Community', href: '/community', description: 'Join our community' },
  { title: 'Contact Us', href: '/contact', description: 'Get in touch with us' },
  { title: 'About Us', href: '/About Us', description: 'Learn more about us' },
  { title: 'Faq', href: '/Faq', description: '' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-lime-400 to-lime-800 shadow-md">
      <div className="container mx-auto px-4 max-sm:px-2 max-md:px-3 py-3 flex items-center justify-between">
        <img src="/public/image.png" alt="SafePocket logo" className="h-10 " />

        {/* Hamburger for Mobile */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden sm:flex">
           <NavigationMenuList className="flex flex-row space-x-3">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                
                  <NavigationMenuLink
                    href={item.href}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-lime-100 hover:text-lime-800 rounded-md"
                  >
                    {item.title}
                  </NavigationMenuLink>
              
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-6 pt-2 space-y-2 bg-lime-700 text-white rounded-b-md">
            {menuItems.map((item) => (
              <div key={item.title}>
                <a
                  href={item.href}
                  className="block py-2 px-3 rounded-md hover:bg-lime-600 text-sm font-medium"
                >
                  {item.title}
                </a>
              
              </div>
            ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
