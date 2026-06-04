import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../data/palettes';

const WHATSAPP_NUM = '2348142805347';
const CALL_NUM = '08142805347';

export default function ReviewSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % REVIEWS.length);
    }, 4000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  const prev = () => {
    stop();
    setCurrent(p => (p - 1 + REVIEWS.length) % REVIEWS.length);
    start();
  };

  const next = () => {
    stop();
    setCurrent(p => (p + 1) % REVIEWS.length);
    start();
  };

  return (
    <section className="bg-burgundy-950 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-medium mb-2">Client Reviews</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {REVIEWS.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">
                    {/* Image */}
                    <div className="relative h-48 md:h-80 overflow-hidden">
                      <img
                        src={review.mediaUrl}
                        alt={review.clientName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-burgundy-950/40" />
                      <div className="absolute bottom-4 left-4">
                        <span className="badge bg-gold-500/20 text-gold-300 border border-gold-400/30">
                          {review.eventType}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex mb-3">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      <blockquote className="text-white/80 text-sm md:text-base leading-relaxed mb-5 italic">
                        "{review.review}"
                      </blockquote>
                      <div>
                        <p className="font-serif font-semibold text-white">{review.clientName}</p>
                        <p className="text-gold-400/70 text-xs">{review.eventType} Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-gold-400' : 'w-2 h-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={`https://wa.me/${WHATSAPP_NUM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold py-3 px-7 rounded-full hover:bg-[#1ebe5c] transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Message on WhatsApp
          </a>
          <a
            href={`tel:${CALL_NUM}`}
            className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold py-3 px-7 rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            <Phone size={16} />
            Call Now: {CALL_NUM}
          </a>
        </div>
      </div>
    </section>
  );
}
