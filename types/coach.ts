export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  qualifications: string[];
  social_links: {
    instagram?: string;
    youtube?: string;
    email?: string;
  };
  order_index: number;
  show: boolean;
}

export interface CoachDetail extends Coach {
  full_bio: {
    intro: string;
    background: string;
    present: string;
  };
  achievements: string[];
  images: string[];
} 