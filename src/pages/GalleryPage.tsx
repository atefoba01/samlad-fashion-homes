import { useState, useEffect } from 'react';
import { MessageCircle, Grid, List, X, Loader } from 'lucide-react';
import { getGalleryPosts, getImageUrl } from '../lib/supabase';
import type { GalleryPost } from '../types';
import { localGalleryPosts } from '../data/localGalleryPosts';

const WHATSAPP_NUM = '2348142805347';
const CATEGORIES = ['All', 'Wedding', 'Traditional', 'Casual', 'Corporate', 'Birthday', 'Aso Ebi', 'Evening'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [gridView, setGridView] = useState(true);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const loadPosts = async () => {
    //   setLoading(true);
    //   const { data } = await getGalleryPosts();
    //   if (data) {
    //     setPosts(data as unknown as GalleryPost[]);
    //   }
    //   setLoading(false);
    // };


    const loadPosts = async () => {
  setLoading(true);
  const { data } = await getGalleryPosts();
  const supabasePosts = (data as unknown as GalleryPost[]) || [];
  
  // Merge — local posts show first, or change order as you like
  setPosts([...localGalleryPosts, ...supabasePosts]);
  setLoading(false);
};
    loadPosts();
  }, []);

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const chatUrl = (post: GalleryPost) =>
    `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(`Hi Samlad! I love your "${post.title}" design. I'd like to discuss a similar outfit for my event.`)}`;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-burgundy-950 py-16 md:py-24 text-center px-4">
        <p className="text-gold-400 text-sm tracking-widest uppercase font-medium mb-2">Our Portfolio</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4">Fashion Gallery</h1>
        <p className="text-white/60 text-base max-w-lg mx-auto">
          Explore Samlad's stunning fashion creations — from royal weddings to traditional ceremonies and everyday elegance.
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white sticky top-16 z-40 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-burgundy-900 text-white'
                      : 'bg-cream-100 text-gray-600 hover:bg-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setGridView(true)} className={`p-2 rounded-lg ${gridView ? 'bg-cream-100 text-burgundy-900' : 'text-gray-400'}`}>
                <Grid size={15} />
              </button>
              <button onClick={() => setGridView(false)} className={`p-2 rounded-lg ${!gridView ? 'bg-cream-100 text-burgundy-900' : 'text-gray-400'}`}>
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader size={24} className="text-burgundy-900 animate-spin" />
          </div>
        ) : gridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(post => (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-sm hover:shadow-md transition-all"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={getImageUrl(post.image_url)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-serif font-semibold text-white text-sm mb-1">{post.title}</p>
                  <span className="badge bg-gold-500/20 text-gold-300 border border-gold-400/20 text-[10px]">{post.category}</span>
                  <a
                    href={chatUrl(post)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold py-2 px-3 rounded-full w-full justify-center hover:bg-[#1ebe5c] transition-colors"
                  >
                    <MessageCircle size={12} />
                    Chat Us
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {filtered.map(post => (
              <div key={post.id} className="card flex gap-4 p-4 cursor-pointer" onClick={() => setSelectedPost(post)}>
                <img src={getImageUrl(post.image_url)} alt={post.title} className="w-24 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <span className="badge bg-cream-100 text-gray-600 text-[10px] mb-2">{post.category}</span>
                  <h3 className="font-serif font-semibold text-burgundy-950 mb-1">{post.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{post.description}</p>
                  <a
                    href={chatUrl(post)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold py-2 px-4 rounded-full hover:bg-[#1ebe5c] transition-colors"
                  >
                    <MessageCircle size={12} />
                    Chat Us
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={getImageUrl(selectedPost.image_url)} alt={selectedPost.title} className="w-full h-64 object-cover" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="badge bg-gold-500/20 text-gold-300 border border-gold-400/20">{selectedPost.category}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl font-semibold text-burgundy-950 mb-2">{selectedPost.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{selectedPost.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="badge bg-cream-100 text-gray-600">{tag}</span>
                ))}
              </div>
              <a
                href={chatUrl(selectedPost)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 px-6 rounded-2xl justify-center hover:bg-[#1ebe5c] transition-colors w-full"
              >
                <MessageCircle size={18} />
                Chat Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
