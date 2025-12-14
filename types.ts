export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  description: string;
  location: string;
  image: string;
  type: 'Workshop' | 'Tournament' | 'Social' | 'Training';
  isUpcoming: boolean;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  joinYear: string;
}

export interface Review {
  id: string;
  author: string;
  role: string; // e.g. "White Belt - Year 1"
  text: string;
  rating: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'General' | 'Join';
  date: string;
  status: 'New' | 'Read';
}

export interface AuthResponse {
  token: string;
  user: {
    username: string;
    role: 'admin';
  };
}