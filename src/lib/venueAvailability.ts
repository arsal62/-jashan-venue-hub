import type { Venue } from '@/data/venues';

const STORAGE_KEY = 'venue-availability';

export type VenueAvailability = Venue['availability'];

export interface StoredAvailability {
  [venueId: string]: VenueAvailability;
}

/**
 * Get all stored venue availability data from localStorage
 */
export function getStoredAvailability(): StoredAvailability {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading venue availability from localStorage:', error);
    return {};
  }
}

/**
 * Get availability for a specific venue, merging with default venue data
 */
export function getVenueAvailability(venueId: string, defaultAvailability: VenueAvailability): VenueAvailability {
  const stored = getStoredAvailability();
  const storedAvailability = stored[venueId];
  
  if (!storedAvailability) {
    return defaultAvailability;
  }
  
  // Merge stored availability with default (stored takes precedence)
  return {
    ...defaultAvailability,
    ...storedAvailability,
  };
}

/**
 * Update availability for a specific venue and date
 */
export function updateVenueAvailability(
  venueId: string,
  date: string,
  type: 'day' | 'night',
  available: boolean
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = getStoredAvailability();
    const venueAvailability = stored[venueId] || {};
    const dateAvailability = venueAvailability[date] || { day: true, night: true };
    
    stored[venueId] = {
      ...venueAvailability,
      [date]: {
        ...dateAvailability,
        [type]: available,
      },
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    console.error('Error updating venue availability in localStorage:', error);
  }
}

/**
 * Get all availability data for a venue (stored + default merged)
 */
export function getAllVenueAvailability(venueId: string, defaultAvailability: VenueAvailability): VenueAvailability {
  return getVenueAvailability(venueId, defaultAvailability);
}

/**
 * Clear all stored availability (useful for testing/reset)
 */
export function clearStoredAvailability(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}


