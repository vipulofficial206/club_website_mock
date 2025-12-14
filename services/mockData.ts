import { Event, Member, Review, Inquiry } from '../types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Beginner Self-Defense Workshop',
    date: new Date(Date.now() + 86400000 * 5).toISOString(),
    description: 'Learn the fundamentals of self-defense, situational awareness, and basic striking techniques. Open to all students!',
    location: 'University Gym - Hall A',
    image: 'https://picsum.photos/seed/martial1/800/600',
    type: 'Workshop',
    isUpcoming: true,
  },
  {
    id: '2',
    title: 'Dragon Fist Annual Tournament',
    date: new Date(Date.now() + 86400000 * 20).toISOString(),
    description: 'Our biggest event of the year! Competitors from 5 universities face off in forms and sparring.',
    location: 'Main Sports Complex',
    image: 'https://picsum.photos/seed/martial2/800/600',
    type: 'Tournament',
    isUpcoming: true,
  },
  {
    id: '3',
    title: 'Beach Training Session',
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    description: 'A grueling but rewarding endurance training session on the sand followed by a BBQ.',
    location: 'Sunset Beach',
    image: 'https://picsum.photos/seed/martial3/800/600',
    type: 'Training',
    isUpcoming: false,
  },
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Sarah "Viper" Jenkins',
    role: 'President',
    bio: 'Specializing in Muay Thai and Taekwondo, Sarah has led the club for 2 years.',
    image: 'https://picsum.photos/seed/person1/400/400',
    joinYear: '2021',
  },
  {
    id: '2',
    name: 'Kenji Sato',
    role: 'Head Instructor',
    bio: '3rd Dan Black Belt in Karate. Focuses on discipline and perfect form.',
    image: 'https://picsum.photos/seed/person2/400/400',
    joinYear: '2020',
  },
  {
    id: '3',
    name: 'Mike Ross',
    role: 'Events Coordinator',
    bio: 'Ensures all our workshops run smoothly. Loves Brazilian Jiu-Jitsu.',
    image: 'https://picsum.photos/seed/person3/400/400',
    joinYear: '2022',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Emily Chen',
    role: 'Yellow Belt - Freshman',
    text: 'Joining Dragon Fist changed my college life. I feel stronger and more confident!',
    rating: 5,
  },
  {
    id: '2',
    author: 'David Kim',
    role: 'Alumni',
    text: 'Great community. The instructors really care about your personal growth.',
    rating: 5,
  },
  {
    id: '3',
    author: 'Jessica Alva',
    role: 'Blue Belt - Junior',
    text: 'Hard work, but so worth it. The annual tournament is a blast.',
    rating: 4,
  },
];

export const INITIAL_INQUIRIES: Inquiry[] = [];