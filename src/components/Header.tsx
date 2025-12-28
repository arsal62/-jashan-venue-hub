import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/venues', label: 'Venues' },
    { href: '/owner', label: 'Owner Portal' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome 
          ? 'bg-transparent' 
          : 'bg-background/95 backdrop-blur-md border-b border-border shadow-soft'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-display text-2xl font-bold"
            >
              <span className={isHome ? 'text-primary-foreground' : 'text-gradient-gold'}>
                Jashan
              </span>
              <span className={isHome ? 'text-primary' : 'text-primary'}>
                Venue
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors ${
                  location.pathname === link.href
                    ? isHome 
                      ? 'text-primary-foreground' 
                      : 'text-primary'
                    : isHome
                      ? 'text-primary-foreground/70 hover:text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button 
              variant={isHome ? 'heroOutline' : 'gold'} 
              asChild
            >
              <Link to="/venues">Find Venues</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isHome ? 'text-primary-foreground' : 'text-foreground'} />
            ) : (
              <Menu className={isHome ? 'text-primary-foreground' : 'text-foreground'} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md rounded-2xl mb-4 p-4 border border-border"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" className="w-full mt-4" asChild>
              <Link to="/venues" onClick={() => setMobileMenuOpen(false)}>
                Find Venues
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
