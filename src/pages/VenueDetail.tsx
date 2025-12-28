import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Car, 
  Wind, 
  Zap, 
  UtensilsCrossed, 
  Sparkles,
  Mic2,
  Camera,
  Theater
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';
import { venues } from '@/data/venues';
import heroImage from '@/assets/hero-wedding.jpg';

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<'day' | 'night'>('day');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const venue = venues.find(v => v.id === id);

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Venue Not Found</h1>
          <Button onClick={() => navigate('/venues')}>Back to Venues</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} Lac`;
    }
    return price.toLocaleString();
  };

  const facilities = [
    { key: 'parking', icon: Car, label: 'Parking' },
    { key: 'ac', icon: Wind, label: 'Air Conditioning' },
    { key: 'generator', icon: Zap, label: 'Generator Backup' },
    { key: 'catering', icon: UtensilsCrossed, label: 'Catering Service' },
    { key: 'decoration', icon: Sparkles, label: 'Decoration' },
    { key: 'stage', icon: Theater, label: 'Stage' },
    { key: 'soundSystem', icon: Mic2, label: 'Sound System' },
    { key: 'photography', icon: Camera, label: 'Photography' },
  ] as const;

  const handleDateSelect = (date: Date, type: 'day' | 'night') => {
    setSelectedDate(date);
    setSelectedEventType(type);
  };

  const getWhatsAppLink = () => {
    const message = selectedDate
      ? `Hi! I'm interested in booking ${venue.name} for a ${selectedEventType} event on ${selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}. Please let me know about availability and pricing.`
      : `Hi! I'm interested in booking ${venue.name}. Please share more details about availability and pricing.`;
    
    return `https://wa.me/${venue.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  };

  const allImages = [heroImage, ...venue.images];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={allImages[currentImageIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />

        {/* Back Button */}
        <Button
          variant="ghost"
          className="absolute top-24 left-4 text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        {/* Venue Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
                {venue.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {venue.area}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Up to {venue.capacity} guests
                </span>
                <Badge className="bg-primary text-primary-foreground">
                  PKR {formatPrice(venue.priceRange.min)} - {formatPrice(venue.priceRange.max)}
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {allImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === index 
                  ? 'border-primary scale-110' 
                  : 'border-primary-foreground/30 hover:border-primary-foreground/60'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-semibold mb-4">About This Venue</h2>
              <p className="text-muted-foreground leading-relaxed">
                {venue.description}
              </p>
            </motion.section>

            {/* Facilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-semibold mb-6">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {facilities.map(({ key, icon: Icon, label }) => {
                  const isAvailable = venue.facilities[key];
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        isAvailable
                          ? 'bg-card border-border hover:shadow-soft'
                          : 'bg-muted/50 border-border/50 opacity-50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        isAvailable ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <p className={`text-sm font-medium ${
                        isAvailable ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {label}
                      </p>
                      {!isAvailable && (
                        <span className="text-xs text-muted-foreground">Not Available</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Gallery */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-semibold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className="relative aspect-video rounded-xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={image}
                      alt={`${venue.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 space-y-6">
              {/* Availability Calendar */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Check Availability</h3>
                <AvailabilityCalendar
                  venue={venue}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Contact CTA */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Interested in This Venue?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {selectedDate
                    ? `Contact the venue about your ${selectedEventType} event on ${selectedDate.toLocaleDateString()}`
                    : 'Select a date above or contact the venue directly for inquiries'}
                </p>
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
