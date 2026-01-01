import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, SlidersHorizontal, X, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { VenueCard } from '@/components/VenueCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { venues, areas, budgetRanges } from '@/data/venues';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function Venues() {
  // Calculate max capacity from venues
  const maxCapacity = useMemo(() => {
    return Math.max(...venues.map(v => v.capacity), 2000);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [eventType, setEventType] = useState<'day' | 'night'>('day');
  const [capacityRange, setCapacityRange] = useState<[number, number]>(() => [0, Math.max(...venues.map(v => v.capacity), 2000)]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // Search query filter (name and area)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesArea = venue.area.toLowerCase().includes(query);
        if (!matchesName && !matchesArea) {
          return false;
        }
      }

      // Area filter
      if (selectedArea !== 'all' && venue.area !== selectedArea) {
        return false;
      }

      // Budget filter
      if (selectedBudget !== 'all') {
        const budget = budgetRanges.find(b => b.label === selectedBudget);
        if (budget) {
          if (venue.priceRange.min > budget.max || venue.priceRange.max < budget.min) {
            return false;
          }
        }
      }

      // Capacity range filter
      if (venue.capacity < capacityRange[0] || venue.capacity > capacityRange[1]) {
        return false;
      }

      // Date and availability filter
      if (selectedDate) {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const avail = venue.availability[dateKey];
        if (avail) {
          const isAvailable = eventType === 'day' ? avail.day : avail.night;
          if (!isAvailable) return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedArea, selectedBudget, selectedDate, eventType, capacityRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDate(undefined);
    setSelectedArea('all');
    setSelectedBudget('all');
    setEventType('day');
    setCapacityRange([0, maxCapacity]);
  };

  const hasActiveFilters = 
    searchQuery.trim() || 
    selectedDate || 
    selectedArea !== 'all' || 
    selectedBudget !== 'all' || 
    capacityRange[0] !== 0 || 
    capacityRange[1] !== maxCapacity;

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
              Explore <span className="text-gradient-gold">Venues</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect venue for your special day from our curated collection.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search */}
              <div className="flex-1">
                <SearchBar 
                  variant="header" 
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>

              {/* Desktop Filters */}
              <div className={cn(
                "flex flex-col lg:flex-row gap-3",
                showFilters ? "flex" : "hidden lg:flex"
              )}>
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-[180px] justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>

                {/* Area Filter */}
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="min-w-[160px]">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Areas</SelectItem>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Budget Filter */}
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Any Budget</SelectItem>
                    {budgetRanges.map(budget => (
                      <SelectItem key={budget.label} value={budget.label}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Day/Night Toggle */}
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <Button
                    size="sm"
                    variant={eventType === 'day' ? 'default' : 'ghost'}
                    onClick={() => setEventType('day')}
                    className="rounded-md"
                  >
                    Day
                  </Button>
                  <Button
                    size="sm"
                    variant={eventType === 'night' ? 'default' : 'ghost'}
                    onClick={() => setEventType('night')}
                    className="rounded-md"
                  >
                    Night
                  </Button>
                </div>

                {/* Capacity Range Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-[180px] justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Capacity: {capacityRange[0]}-{capacityRange[1]}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-popover" align="start">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Capacity Range</label>
                          <span className="text-sm text-muted-foreground">
                            {capacityRange[0]} - {capacityRange[1]} guests
                          </span>
                        </div>
                        <Slider
                          value={capacityRange}
                          onValueChange={(value) => setCapacityRange(value as [number, number])}
                          min={0}
                          max={maxCapacity}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>{maxCapacity}</span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="ghost" size="icon" onClick={clearFilters}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredVenues.length}</span> venues
              {selectedDate && (
                <span> for {format(selectedDate, 'PPP')}</span>
              )}
            </p>
          </motion.div>

          {/* Venue Grid */}
          {filteredVenues.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue, index) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  index={index}
                  selectedDate={selectedDate?.toISOString().split('T')[0]}
                  eventType={eventType}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">No Venues Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
