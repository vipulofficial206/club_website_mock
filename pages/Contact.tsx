import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'join'>('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.addInquiry({
      ...formData,
      type: activeTab === 'contact' ? 'General' : 'Join'
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-stone-50 min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Info Side */}
        <div className="md:w-1/3 bg-dragon-black p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black uppercase mb-8"><span className="text-dragon-red">Get In</span> Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-dragon-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold uppercase text-sm text-gray-400 mb-1">Visit Us</h3>
                  <p>University Student Center<br/>Room 304, East Wing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-dragon-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold uppercase text-sm text-gray-400 mb-1">Email Us</h3>
                  <p>info@dragonfist.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-dragon-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold uppercase text-sm text-gray-400 mb-1">Call Us</h3>
                  <p>(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-12">
            <p className="text-gray-500 text-sm">"The journey of a thousand miles begins with a single step."</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-12 bg-white">
          <div className="flex space-x-8 mb-8 border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('contact')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'contact' ? 'text-dragon-red border-b-2 border-dragon-red' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Contact Us
            </button>
            <button 
              onClick={() => setActiveTab('join')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'join' ? 'text-dragon-red border-b-2 border-dragon-red' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Join The Club
            </button>
          </div>

          <h3 className="text-2xl font-bold mb-2">
            {activeTab === 'contact' ? 'Have a Question?' : 'Ready to Start?'}
          </h3>
          <p className="text-gray-500 mb-8">
            {activeTab === 'contact' 
              ? 'Fill out the form below and we will get back to you shortly.' 
              : 'Sign up for our next orientation session. Beginners are welcome!'}
          </p>

          {submitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 animate-pulse">
              <Send size={20} /> Message sent successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dragon-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dragon-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                  placeholder="john@university.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dragon-red focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
                  placeholder={activeTab === 'contact' ? "How can we help?" : "Tell us about your previous experience (if any)..."}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-dragon-red text-white font-bold uppercase py-4 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 group"
              >
                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};