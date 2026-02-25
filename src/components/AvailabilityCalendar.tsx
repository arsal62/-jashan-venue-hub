import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Venue } from '@/data/venues';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  venue: Venue;
  onDateSelect?: (date: Date, eventType: 'day' | 'night') => void;
  isOwnerView?: boolean;
  onAvailabilityChange?: (date: string, type: 'day' | 'night', available: boolean) => void;
}

export function AvailabilityCalendar({ 
  venue, 
  onDateSelect,
  isOwnerView = false,
  onAvailabilityChange 
}: AvailabilityCalendarProps) {
  const [eventType, setEventType] = useState<'day' | 'night'>('day');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    onDateSelect?.(date, eventType);
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDateAvailability = (date: Date) => {
    const dateKey = formatDateKey(date);
    const avail = venue.availability[dateKey];
    if (!avail) return true; // Default to available
    return eventType === 'day' ? avail.day : avail.night;
  };

  const handleOwnerToggle = () => {
    if (!selectedDate || !onAvailabilityChange) return;
    const dateKey = formatDateKey(selectedDate);
    const currentAvail = getDateAvailability(selectedDate);
    onAvailabilityChange(dateKey, eventType, !currentAvail);
  };

  return (
    <div className="space-y-6">
      {/* Day/Night Toggle */}
      <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-full">
        <Button
          variant={eventType === 'day' ? 'gold' : 'ghost'}
          size="sm"
          onClick={() => setEventType('day')}
          className="rounded-full flex-1"
        >
          <Sun className="w-4 h-4 mr-2" />
          Day Event
        </Button>
        <Button
          variant={eventType === 'night' ? 'gold' : 'ghost'}
          size="sm"
          onClick={() => setEventType('night')}
          className="rounded-full flex-1"
        >
          <Moon className="w-4 h-4 mr-2" />
          Night Event
        </Button>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-available" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-booked" />
          <span className="text-muted-foreground">Booked</span>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-xl border border-border p-4 bg-card pointer-events-auto"
        modifiers={{
          available: (date) => getDateAvailability(date),
          booked: (date) => !getDateAvailability(date),
        }}
        modifiersClassNames={{
          available: 'bg-available/20 text-available hover:bg-available/30',
          booked: 'bg-booked/20 text-booked hover:bg-booked/30',
        }}
        disabled={(date) => date < new Date()}
      />

      {/* Selected Date Info */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-muted rounded-xl"
        >
          <p className="text-center">
            <span className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="mx-2">•</span>
            <span className="capitalize">{eventType} Event</span>
            <span className="mx-2">•</span>
            <span className={cn(
              'font-semibold',
              getDateAvailability(selectedDate) ? 'text-available' : 'text-booked'
            )}>
              {getDateAvailability(selectedDate) ? 'Available' : 'Booked'}
            </span>
          </p>

          {isOwnerView && (
            <Button
              variant={getDateAvailability(selectedDate) ? 'destructive' : 'gold'}
              className="w-full mt-4"
              onClick={handleOwnerToggle}
            >
              Mark as {getDateAvailability(selectedDate) ? 'Booked' : 'Available'}
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
