export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  name: string;
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  colors: ColorInfo[];
  category: 'wedding' | 'traditional' | 'birthday' | 'corporate' | 'casual' | 'party' | 'trending';
  likes: number;
  isTrending?: boolean;
  image?: string;
  tags?: string[];
}

export interface GalleryPost {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  date: string;
}

export interface Review {
  id: string;
  clientName: string;
  review: string;
  rating: number;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video';
  eventType: string;
  date: string;
}

export interface SavedPalette extends Palette {
  savedAt: string;
}

export type EventType =
  | 'Wedding'
  | 'Engagement'
  | 'Traditional Wedding'
  | 'Birthday'
  | 'Baby Naming'
  | 'Corporate'
  | 'Party'
  | 'Other';
