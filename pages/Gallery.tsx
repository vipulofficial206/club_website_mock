import React, { useState } from 'react';
import { X } from 'lucide-react';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Generate some dummy images
  const images = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/martial_art_${i}/800/800`,
    caption: `Event Highlight #${i + 1}`
  }));

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black uppercase text-center mb-4">Dojo Gallery</h1>
        <p className="text-center text-gray-500 mb-12">Moments of sweat, triumph, and brotherhood.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img.src)}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            >
              <img 
                src={img.src} 
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold uppercase tracking-wider border-2 border-dragon-gold px-4 py-2">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-dragon-red transition-colors"
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-2xl border-4 border-dragon-black"
          />
        </div>
      )}
    </div>
  );
};