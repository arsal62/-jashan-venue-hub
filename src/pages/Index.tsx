import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import heroImage from '@/assets/hero-wedding.jpg';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxurious wedding venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6"
            >
              Karachi's Premier Venue Platform
            </motion.span>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-gradient-gold mt-2">Wedding Venue</span>
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Discover and book the most exquisite marriage halls and banquet venues in Karachi. 
              Your dream celebration starts here.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <SearchBar variant="hero" />
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/venues">
                  Explore All Venues
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/venues?openDatePicker=true">
                  <Calendar className="mr-2 w-5 h-5" />
                  Search by Date
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient-gold">JashanVenue</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make finding your perfect wedding venue effortless and enjoyable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Smart Search',
                description: 'Find venues instantly by name, area, budget, or date with our intelligent search.',
              },
              {
                icon: Calendar,
                title: 'Real-Time Availability',
                description: 'Check day and night availability with our interactive calendar system.',
              },
              {
                icon: MapPin,
                title: 'All Karachi Areas',
                description: 'Browse venues across Karachi East, West, and Central in one place.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-card rounded-2xl border border-border hover:shadow-elegant transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-gold flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-gold p-12 md:p-20 text-center"
          >
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Find Your Dream Venue?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Browse our curated collection of premium venues and start planning your perfect celebration today.
              </p>
              <Button 
                size="xl" 
                className="bg-background text-primary hover:bg-background/90"
                asChild
              >
                <Link to="/venues">
                  Browse Venues
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="font-display text-2xl font-bold mb-4">
            <span className="text-gradient-gold">Jashan</span>
            <span className="text-primary">Venue</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Karachi's Premier Wedding Venue Platform
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JashanVenue. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
