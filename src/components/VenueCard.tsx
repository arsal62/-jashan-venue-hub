import { motion } from 'framer-motion';
import { MapPin, Users, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Venue } from '@/data/venues';

interface VenueCardProps {
  venue: Venue;
  index?: number;
  selectedDate?: string;
  eventType?: 'day' | 'night';
}

export function VenueCard({ venue, index = 0, selectedDate, eventType }: VenueCardProps) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} Lac`;
    }
    return price.toLocaleString();
  };

  const getAvailability = () => {
    if (!selectedDate || !eventType) return null;
    const dateAvail = venue.availability[selectedDate];
    if (!dateAvail) return true; // Default to available if no data
    return eventType === 'day' ? dateAvail.day : dateAvail.night;
  };

  const availability = getAvailability();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 border border-border"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {availability !== null && (
          <Badge
            className={`absolute top-4 right-4 ${
              availability 
                ? 'bg-available text-available-foreground' 
                : 'bg-booked text-booked-foreground'
            }`}
          >
            {availability ? (
              <>
                <Check className="w-3 h-3 mr-1" /> Available
              </>
            ) : (
              <>
                <X className="w-3 h-3 mr-1" /> Booked
              </>
            )}
          </Badge>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-xl font-semibold text-primary-foreground drop-shadow-lg">
            {venue.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{venue.area}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm">{venue.capacity} guests</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-semibold text-primary">
              PKR {formatPrice(venue.priceRange.min)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.facilities.ac && (
            <Badge variant="secondary" className="text-xs">AC</Badge>
          )}
          {venue.facilities.parking && (
            <Badge variant="secondary" className="text-xs">Parking</Badge>
          )}
          {venue.facilities.catering && (
            <Badge variant="secondary" className="text-xs">Catering</Badge>
          )}
        </div>

        <Button
          variant="gold"
          className="w-full"
          onClick={() => navigate(`/venue/${venue.id}`)}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
