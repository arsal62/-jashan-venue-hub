import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { venues, type Venue } from '@/data/venues';
import { toast } from '@/hooks/use-toast';
import { 
  getStoredAvailability, 
  getAllVenueAvailability, 
  updateVenueAvailability 
} from '@/lib/venueAvailability';

export default function OwnerDashboard() {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [venueAvailability, setVenueAvailability] = useState<Record<string, Venue['availability']>>(() => {
    // Initialize with stored availability merged with default
    const stored = getStoredAvailability();
    return Object.fromEntries(
      venues.map(v => [
        v.id, 
        getAllVenueAvailability(v.id, v.availability)
      ])
    );
  });

  const selectedVenue = venues.find(v => v.id === selectedVenueId);

  // Load stored availability when venue changes
  useEffect(() => {
    if (selectedVenueId && selectedVenue) {
      const mergedAvailability = getAllVenueAvailability(selectedVenueId, selectedVenue.availability);
      setVenueAvailability(prev => ({
        ...prev,
        [selectedVenueId]: mergedAvailability,
      }));
    }
  }, [selectedVenueId]);

  const handleAvailabilityChange = (date: string, type: 'day' | 'night', available: boolean) => {
    // Update localStorage
    updateVenueAvailability(selectedVenueId, date, type, available);

    // Update local state
    setVenueAvailability(prev => {
      const venueAvail = prev[selectedVenueId] || {};
      const dateAvail = venueAvail[date] || { day: true, night: true };
      
      return {
        ...prev,
        [selectedVenueId]: {
          ...venueAvail,
          [date]: {
            ...dateAvail,
            [type]: available,
          },
        },
      };
    });

    toast({
      title: 'Availability Updated',
      description: `${date} ${type} event marked as ${available ? 'available' : 'booked'}`,
    });
  };

  const venueWithUpdatedAvailability: Venue | undefined = selectedVenue
    ? {
        ...selectedVenue,
        availability: venueAvailability[selectedVenueId] || selectedVenue.availability,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Owner <span className="text-gradient-gold">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your venue's availability. Mark dates as booked or available for day and night events.
            </p>
          </motion.div>

          {/* Venue Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-12"
          >
            <label className="block text-sm font-medium mb-2">Select Your Venue</label>
            <Select value={selectedVenueId} onValueChange={setSelectedVenueId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a venue" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {venues.map(venue => (
                  <SelectItem key={venue.id} value={venue.id}>
                    {venue.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Dashboard Content */}
          {venueWithUpdatedAvailability && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={venueWithUpdatedAvailability.image}
                    alt={venueWithUpdatedAvailability.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold">
                      {venueWithUpdatedAvailability.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {venueWithUpdatedAvailability.area}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Manage Availability
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Select a date and toggle between Day/Night to update availability. 
                    Click the button to mark dates as booked or available.
                  </p>

                  <AvailabilityCalendar
                    venue={venueWithUpdatedAvailability}
                    isOwnerView={true}
                    onAvailabilityChange={handleAvailabilityChange}
                  />
                </div>
              </div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-6 bg-muted rounded-xl"
              >
                <h4 className="font-semibold mb-2">Quick Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Toggle between Day and Night events using the buttons above the calendar</li>
                  <li>• Select a date to see its current status</li>
                  <li>• Click "Mark as Booked/Available" to update the status</li>
                  <li>• Green dates are available, red dates are booked</li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
