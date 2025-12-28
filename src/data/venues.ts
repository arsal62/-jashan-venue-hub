export interface Venue {
  id: string;
  name: string;
  area: 'Karachi East' | 'Karachi West' | 'Karachi Central';
  priceRange: {
    min: number;
    max: number;
  };
  capacity: number;
  image: string;
  images: string[];
  videoUrl?: string;
  facilities: {
    parking: boolean;
    ac: boolean;
    generator: boolean;
    catering: boolean;
    decoration: boolean;
    stage: boolean;
    soundSystem: boolean;
    photography: boolean;
  };
  whatsappNumber: string;
  description: string;
  availability: {
    [date: string]: {
      day: boolean;
      night: boolean;
    };
  };
}

export const venues: Venue[] = [
  {
    id: "1",
    name: "Royal Grand Marquee",
    area: "Karachi East",
    priceRange: { min: 250000, max: 500000 },
    capacity: 800,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: true,
      generator: true,
      catering: true,
      decoration: true,
      stage: true,
      soundSystem: true,
      photography: true
    },
    whatsappNumber: "+923001234567",
    description: "Experience luxury at its finest with our grand marquee featuring crystal chandeliers, elegant décor, and world-class amenities.",
    availability: {
      "2025-01-15": { day: true, night: false },
      "2025-01-16": { day: true, night: true },
      "2025-01-17": { day: false, night: false },
      "2025-01-18": { day: true, night: true },
      "2025-01-20": { day: false, night: true },
    }
  },
  {
    id: "2",
    name: "Pearl Continental Banquet",
    area: "Karachi Central",
    priceRange: { min: 400000, max: 800000 },
    capacity: 1200,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: true,
      generator: true,
      catering: true,
      decoration: true,
      stage: true,
      soundSystem: true,
      photography: true
    },
    whatsappNumber: "+923002345678",
    description: "The epitome of elegance and sophistication, offering premium services for your special day.",
    availability: {
      "2025-01-15": { day: true, night: true },
      "2025-01-16": { day: false, night: true },
      "2025-01-17": { day: true, night: true },
      "2025-01-18": { day: false, night: false },
      "2025-01-19": { day: true, night: false },
    }
  },
  {
    id: "3",
    name: "Garden View Hall",
    area: "Karachi West",
    priceRange: { min: 150000, max: 300000 },
    capacity: 500,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: false,
      generator: true,
      catering: true,
      decoration: false,
      stage: true,
      soundSystem: true,
      photography: false
    },
    whatsappNumber: "+923003456789",
    description: "A beautiful outdoor venue surrounded by lush gardens, perfect for intimate celebrations.",
    availability: {
      "2025-01-15": { day: false, night: true },
      "2025-01-16": { day: true, night: true },
      "2025-01-17": { day: true, night: false },
      "2025-01-18": { day: true, night: true },
      "2025-01-19": { day: false, night: false },
    }
  },
  {
    id: "4",
    name: "Sunset Celebrations",
    area: "Karachi East",
    priceRange: { min: 200000, max: 400000 },
    capacity: 600,
    image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: true,
      generator: true,
      catering: false,
      decoration: true,
      stage: true,
      soundSystem: true,
      photography: true
    },
    whatsappNumber: "+923004567890",
    description: "Modern venue with stunning sunset views, state-of-the-art facilities, and personalized service.",
    availability: {
      "2025-01-15": { day: true, night: true },
      "2025-01-16": { day: true, night: false },
      "2025-01-17": { day: false, night: true },
      "2025-01-18": { day: true, night: true },
      "2025-01-20": { day: true, night: true },
    }
  },
  {
    id: "5",
    name: "Elite Convention Center",
    area: "Karachi Central",
    priceRange: { min: 350000, max: 700000 },
    capacity: 1000,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: true,
      generator: true,
      catering: true,
      decoration: true,
      stage: true,
      soundSystem: true,
      photography: true
    },
    whatsappNumber: "+923005678901",
    description: "Premium convention center offering world-class amenities and customizable event spaces.",
    availability: {
      "2025-01-15": { day: false, night: false },
      "2025-01-16": { day: true, night: true },
      "2025-01-17": { day: true, night: true },
      "2025-01-18": { day: false, night: true },
      "2025-01-19": { day: true, night: true },
    }
  },
  {
    id: "6",
    name: "Moonlight Banquet",
    area: "Karachi West",
    priceRange: { min: 180000, max: 350000 },
    capacity: 450,
    image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
    ],
    facilities: {
      parking: true,
      ac: true,
      generator: false,
      catering: true,
      decoration: true,
      stage: true,
      soundSystem: false,
      photography: true
    },
    whatsappNumber: "+923006789012",
    description: "Intimate and romantic venue with beautiful lighting and cozy atmosphere.",
    availability: {
      "2025-01-15": { day: true, night: false },
      "2025-01-16": { day: false, night: true },
      "2025-01-17": { day: true, night: true },
      "2025-01-18": { day: true, night: false },
      "2025-01-19": { day: false, night: true },
    }
  }
];

export const areas = ['Karachi East', 'Karachi West', 'Karachi Central'] as const;

export const budgetRanges = [
  { label: 'Under 2 Lac', min: 0, max: 200000 },
  { label: '2-4 Lac', min: 200000, max: 400000 },
  { label: '4-6 Lac', min: 400000, max: 600000 },
  { label: 'Above 6 Lac', min: 600000, max: Infinity },
] as const;
