import React from 'react';
import { api } from '../services/api';
import { Award, Target, Heart } from 'lucide-react';

export const About = () => {
  const members = api.getMembers();

  return (
    <div className="bg-stone-50 min-h-screen">
       <div className="bg-dragon-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6"><span className="text-dragon-red">Our</span> Story</h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Founded in 1995, Dragon Fist started as a small group of enthusiasts in a basement gym. Today, we are the university's largest martial arts collective, dedicated to the pursuit of excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:bg-dragon-black hover:text-white transition-all duration-300 group">
            <div className="w-16 h-16 bg-red-100 text-dragon-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dragon-red group-hover:text-white transition-colors">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Mission</h3>
            <p className="text-gray-500 group-hover:text-gray-300">To empower students through the physical and mental discipline of martial arts, fostering confidence that extends beyond the dojo.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:bg-dragon-black hover:text-white transition-all duration-300 group">
             <div className="w-16 h-16 bg-yellow-100 text-dragon-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dragon-gold group-hover:text-black transition-colors">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Vision</h3>
            <p className="text-gray-500 group-hover:text-gray-300">To create a supportive, inclusive community where every belt level is respected and every member is challenged to grow.</p>
          </div>
           <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:bg-dragon-black hover:text-white transition-all duration-300 group">
             <div className="w-16 h-16 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-dragon-black transition-colors">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Values</h3>
            <p className="text-gray-500 group-hover:text-gray-300">Respect, Integrity, Perseverance, and Humility. These are the cornerstones of the Dragon Fist philosophy.</p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-black uppercase text-center mb-16 relative">
            Meet The <span className="text-dragon-red">Team</span>
            <span className="block w-20 h-1 bg-dragon-gold mx-auto mt-4"></span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {members.map(member => (
              <div key={member.id} className="group relative overflow-hidden rounded-xl shadow-xl bg-white">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dragon-black to-transparent p-6 pt-24 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-dragon-gold font-bold uppercase text-xs mb-1">{member.role}</div>
                  <h3 className="text-2xl font-bold leading-none mb-2">{member.name}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                     <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">{member.bio}</p>
                     <p className="text-xs text-dragon-red mt-2 font-mono">Member since {member.joinYear}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};