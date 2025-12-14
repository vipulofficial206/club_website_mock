import { Event, Member, Review, Inquiry, AuthResponse } from '../types';
import { INITIAL_EVENTS, INITIAL_MEMBERS, INITIAL_REVIEWS, INITIAL_INQUIRIES } from './mockData';

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------
// Set this to true if you are running the Node.js backend on localhost:5000
// For the preview environment, we must keep it FALSE to use LocalStorage.
const USE_REAL_BACKEND = false; 
const API_URL = 'http://localhost:5000/api';

// ----------------------------------------------------------------------------
// MOCK IMPLEMENTATION (LocalStorage)
// ----------------------------------------------------------------------------

// Keys for LocalStorage
const STORAGE_KEYS = {
  EVENTS: 'dragon_events',
  MEMBERS: 'dragon_members',
  REVIEWS: 'dragon_reviews',
  INQUIRIES: 'dragon_inquiries',
  AUTH: 'dragon_auth_token',
};

// Helper to init storage if empty
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }
};

initStorage();

// Generic CRUD helpers for Mock
const getMock = <T>(key: string): T[] => JSON.parse(localStorage.getItem(key) || '[]');
const saveMock = <T>(key: string, data: T[]) => localStorage.setItem(key, JSON.stringify(data));


// ----------------------------------------------------------------------------
// API SERVICE
// ----------------------------------------------------------------------------

export const api = {
  // --- Auth ---
  login: async (password: string): Promise<AuthResponse> => {
    if (USE_REAL_BACKEND) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.AUTH, data.token);
        return data;
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password === 'dragonfist') {
                    const token = 'fake-jwt-token-' + Date.now();
                    localStorage.setItem(STORAGE_KEYS.AUTH, token);
                    resolve({ token, user: { username: 'admin', role: 'admin' } });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  isAuthenticated: () => !!localStorage.getItem(STORAGE_KEYS.AUTH),

  getToken: () => localStorage.getItem(STORAGE_KEYS.AUTH),

  // --- Events ---
  getEvents: (): Event[] => {
      // NOTE: For Real Backend, this would be async. 
      // Current Frontend UI expects sync return for simplicity in preview.
      // To fully switch, you would update components to use useEffect + useState.
      return getMock<Event>(STORAGE_KEYS.EVENTS); 
  },
  
  // Example of Async Real Backend call structure for reference:
  // fetchEvents: async () => {
  //     const res = await fetch(`${API_URL}/events`);
  //     return await res.json();
  // },

  addEvent: (event: Omit<Event, 'id'>) => {
      if (USE_REAL_BACKEND) {
          // fetch(`${API_URL}/events`, { method: 'POST', body: JSON.stringify(event), headers: ... })
      }
      const items = getMock<Event>(STORAGE_KEYS.EVENTS);
      const newItem = { ...event, id: Date.now().toString() };
      saveMock(STORAGE_KEYS.EVENTS, [newItem, ...items]);
      return newItem;
  },
  deleteEvent: (id: string) => {
    const items = getMock<Event>(STORAGE_KEYS.EVENTS);
    saveMock(STORAGE_KEYS.EVENTS, items.filter(i => i.id !== id));
  },

  // --- Members ---
  getMembers: () => getMock<Member>(STORAGE_KEYS.MEMBERS),
  addMember: (member: Omit<Member, 'id'>) => {
    const items = getMock<Member>(STORAGE_KEYS.MEMBERS);
    const newItem = { ...member, id: Date.now().toString() };
    saveMock(STORAGE_KEYS.MEMBERS, [...items, newItem]);
    return newItem;
  },
  deleteMember: (id: string) => {
    const items = getMock<Member>(STORAGE_KEYS.MEMBERS);
    saveMock(STORAGE_KEYS.MEMBERS, items.filter(i => i.id !== id));
  },

  // --- Reviews ---
  getReviews: () => getMock<Review>(STORAGE_KEYS.REVIEWS),
  addReview: (review: Omit<Review, 'id'>) => {
    const items = getMock<Review>(STORAGE_KEYS.REVIEWS);
    const newItem = { ...review, id: Date.now().toString() };
    saveMock(STORAGE_KEYS.REVIEWS, [newItem, ...items]);
    return newItem;
  },
  deleteReview: (id: string) => {
    const items = getMock<Review>(STORAGE_KEYS.REVIEWS);
    saveMock(STORAGE_KEYS.REVIEWS, items.filter(i => i.id !== id));
  },

  // --- Inquiries ---
  getInquiries: () => getMock<Inquiry>(STORAGE_KEYS.INQUIRIES),
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const items = getMock<Inquiry>(STORAGE_KEYS.INQUIRIES);
    const newItem: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New'
    };
    saveMock(STORAGE_KEYS.INQUIRIES, [newItem, ...items]);
    return newItem;
  },
};