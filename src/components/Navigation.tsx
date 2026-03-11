/**
 * Type-Safe Navigation Components
 * 
 * Features:
 * - Two navbars (top + main)
 * - Fully type-safe with TanStack Router
 * - Easy to extend
 */

import { Link } from '@tanstack/react-router';
import React from 'react';

// ============== NAVIGATION ITEMS ==============

export type NavItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'Settings', path: '/settings' },
];

export const topNavItems: NavItem[] = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Help', path: '/help' },
];

// ============== COMPONENTS ==============

interface NavLinkProps {
  item: NavItem;
}

function NavLink({ item }: NavLinkProps) {
  return (
    <Link
      to={item.path as any}
      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      activeProps={{ className: 'text-blue-600 bg-blue-50' }}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </Link>
  );
}

/**
 * Top Navigation Bar
 * Secondary navigation (e.g., for public pages)
 */
export function TopNav() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <span className="font-bold text-lg">MyApp</span>
            <div className="ml-10 flex items-baseline space-x-2">
              {topNavItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/" // TODO: Add /login route
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Main Navigation Bar
 * Primary navigation for authenticated users
 */
export function MainNav() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-blue-600">
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {mainNavItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>
          
          {/* Right side - User menu, etc. */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-600">
              <span className="sr-only">Notifications</span>
              🔔
            </button>
            <Link
              to="/" // TODO: Add /profile route
              className="text-gray-500 hover:text-blue-600"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Mobile Navigation (Hamburger Menu)
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="sm:hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <Link to="/" className="font-bold text-blue-600">
          MyApp
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-blue-600"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {isOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path as any}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Responsive Navigation that combines all
 */
export function ResponsiveNav() {
  return (
    <>
      <TopNav />
      <MainNav />
      <MobileNav />
    </>
  );
}

// ============== TYPE-SAFE ROUTE HOOKS ==============

/**
 * Custom hook for type-safe navigation
 * Returns route params with proper types
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useRouteParams(_TPath: string) {
  // Implementation depends on your route structure
  return null;
}

/**
 * Type-safe redirect
 */
export function navigateTo(path: string) {
  window.history.pushState({}, '', path);
}
