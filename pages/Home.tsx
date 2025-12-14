import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { api } from '../services/api';

export const Home = () => {
  const upcomingEvents = api.getEvents().filter(e => e.isUpcoming).slice(0, 3);
  const featuredReviews = api.getReviews().slice(0, 3);

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden clip-path-slant bg-dragon-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 hover:scale-105 transition-transform duration-[20s]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2000")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dragon-black via-transparent to-transparent"></div>
        
        {/* Added pb-32 to push content up and avoid overlap with stats box */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-32">
          <h2 className="text-dragon-gold font-bold tracking-widest uppercase text-sm mb-4 animate-bounce">University Club</h2>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-6 drop-shadow-2xl">
            Unleash <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dragon-red to-dragon-gold">Your Inner</span> <br/>
            Dragon
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-xl mb-10 font-light">
            Join the premier martial arts community on campus. Discipline, strength, and camaraderie await. Beginners welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="px-8 py-4 bg-dragon-red text-white font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors shadow-lg shadow-red-900/50 flex items-center justify-center gap-2">
              Join The Club <ArrowRight size={20} />
            </Link>
            <Link to="/events" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider rounded hover:bg-white hover:text-dragon-black transition-colors flex items-center justify-center">
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Users, label: 'Active Members', value: '150+' },
            { icon: Calendar, label: 'Events / Year', value: '45+' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-xl border-b-4 border-dragon-gold text-center hover:-translate-y-2 transition-transform duration-300">
              <stat.icon className="w-12 h-12 text-dragon-red mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Intro / Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dragon-black uppercase mb-4">The Way of the Fist</h2>
            <div className="w-24 h-1 bg-dragon-red mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We practice a hybrid style combining elements of Karate, Muay Thai, and Jiu-Jitsu. Our philosophy is built on respect, continuous improvement, and mental fortitude.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-dragon-gold/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800" 
                alt="Training" 
                className="relative rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-dragon-black text-white flex items-center justify-center font-bold text-xl shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Discipline First</h3>
                  <p className="text-gray-600">Mastery starts with showing up. We value consistency over intensity.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-dragon-red text-white flex items-center justify-center font-bold text-xl shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Respect All</h3>
                  <p className="text-gray-600">The dojo is a sanctuary. Leave your ego at the door and bow to your partner.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-dragon-gold text-dragon-black flex items-center justify-center font-bold text-xl shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Strength</h3>
                  <p className="text-gray-600">We train individually but grow together. Your partner's safety is your responsibility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-24 bg-zinc-900 text-white clip-path-slant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase text-white mb-2">Upcoming Events</h2>
              <div className="w-20 h-1 bg-dragon-red"></div>
            </div>
            <Link to="/events" className="text-dragon-gold hover:text-white transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="group bg-zinc-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-dragon-red/20 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-dragon-gold text-black font-bold px-3 py-1 rounded text-sm uppercase">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-dragon-red font-bold text-sm mb-2">{new Date(event.date).toLocaleDateString()}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-dragon-gold transition-colors">{event.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black uppercase text-center mb-16">Student Voices</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredReviews.map((review, i) => (
                <div key={i} className="bg-white p-8 rounded-br-3xl border-l-4 border-dragon-red shadow-lg">
                  <div className="flex text-dragon-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-dragon-gold" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                  <div>
                    <div className="font-bold text-gray-900">{review.author}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>
    </div>
  );
};