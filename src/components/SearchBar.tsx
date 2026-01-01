import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { venues } from '@/data/venues';

interface SearchBarProps {
  variant?: 'hero' | 'header';
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (query: string) => void;
}

export function SearchBar({ variant = 'hero', onSearch, value, onChange }: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof venues>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Use controlled value if provided, otherwise use internal state
  const query = value !== undefined ? value : internalQuery;
  const setQuery = (newQuery: string) => {
    if (onChange) {
      onChange(newQuery);
    } else {
      setInternalQuery(newQuery);
    }
    if (onSearch) {
      onSearch(newQuery);
    }
  };

  useEffect(() => {
    if (query.length > 0 && variant === 'hero') {
      const filtered = venues.filter(venue =>
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.area.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query, variant]);

  const handleSelect = (venueId: string) => {
    navigate(`/venue/${venueId}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex].id);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isHero = variant === 'hero';

  return (
    <div className="relative w-full">
      <div
        className={`
          flex items-center gap-3 rounded-full border transition-all duration-300
          ${isHero 
            ? 'bg-background/95 backdrop-blur-md border-border shadow-elegant px-6 py-4' 
            : 'bg-background border-border shadow-soft px-4 py-2.5'
          }
          focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary
        `}
      >
        <Search className={`text-primary ${isHero ? 'w-6 h-6' : 'w-5 h-5'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && variant === 'hero' && setIsOpen(true)}
          placeholder="Search venues by name or area..."
          className={`
            flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground
            ${isHero ? 'text-lg' : 'text-base'}
          `}
        />
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && variant === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-elegant overflow-hidden z-50"
          >
            {suggestions.map((venue, index) => (
              <motion.button
                key={venue.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(venue.id)}
                className={`
                  w-full flex items-center gap-4 p-4 text-left transition-colors
                  ${selectedIndex === index 
                    ? 'bg-primary/10' 
                    : 'hover:bg-muted'
                  }
                `}
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{venue.name}</p>
                  <p className="text-sm text-muted-foreground">{venue.area}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && variant === 'hero' && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
