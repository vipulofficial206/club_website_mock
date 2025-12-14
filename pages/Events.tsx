import React, { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { api } from '../services/api';
import { Event } from '../types';

export const Events = () => {
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const allEvents = api.getEvents();
  
  const displayedEvents = allEvents.filter(e => 
    filter === 'upcoming' ? e.isUpcoming : !e.isUpcoming
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-dragon-black py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">Events & Workshops</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Train, compete, and socialize. Check out what's happening at the dojo.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-lg shadow-md">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-md font-bold uppercase text-sm transition-all ${
                filter === 'upcoming' 
                ? 'bg-dragon-red text-white shadow-md' 
                : 'text-gray-500 hover:text-dragon-red'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2 rounded-md font-bold uppercase text-sm transition-all ${
                filter === 'past' 
                ? 'bg-dragon-red text-white shadow-md' 
                : 'text-gray-500 hover:text-dragon-red'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {displayedEvents.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-xl">No events found in this category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const dateObj = new Date(event.date);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row group border border-gray-100">
      <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
        <div className="absolute inset-0 bg-dragon-black/20 group-hover:bg-transparent transition-colors z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-center p-2 rounded shadow-lg min-w-[60px]">
          <div className="text-xs uppercase font-bold text-dragon-red">{dateObj.toLocaleString('default', { month: 'short' })}</div>
          <div className="text-2xl font-black text-dragon-black leading-none">{dateObj.getDate()}</div>
        </div>
      </div>
      
      <div className="p-8 md:w-2/3 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-dragon-black font-black text-9xl leading-none select-none pointer-events-none">
          DF
        </div>
        <div className="mb-2">
           <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded">
             {event.type}
           </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-dragon-red transition-colors">{event.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-dragon-gold" />
            {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-dragon-gold" />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
};