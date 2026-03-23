export interface Destination {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  experiences: {
    name: string;
    image_url: string;
  }[];
  why_visit_description?: string;
  why_visit_image_url?: string;
  recommended_packages?: string[];
  order_index?: number;
}

export interface Package {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  destination: string;
  description: string;
  price: number;
  duration_days: number;
  image_urls: string[];
  is_featured: boolean;
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
  features: {
    title: string;
    points: string[];
  }[];
  order_index?: number;
}

export interface Story {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  author_name: string;
  is_published: boolean;
  published_at?: string;
}
