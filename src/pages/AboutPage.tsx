import { Award, Scissors, Star, Users, Heart, Zap, ArrowRight, MessageCircle, Phone } from 'lucide-react';

const WHATSAPP_NUM = '2348142805347';
const CALL_NUM = '08142805347';

const SKILLS = [
  { name: 'Bridal Couture', level: 98 },
  { name: 'Traditional Attire', level: 95 },
  { name: 'Aso Ebi Coordination', level: 97 },
  { name: 'Corporate Tailoring', level: 92 },
  { name: 'Color Consulting', level: 96 },
  { name: 'Embroidery & Beadwork', level: 90 },
];

const ACHIEVEMENTS = [
  { icon: Users, label: '500+', desc: 'Happy Clients' },
  { icon: Heart, label: '200+', desc: 'Weddings Styled' },
  { icon: Award, label: '8+', desc: 'Years Experience' },
  { icon: Star, label: '5.0', desc: 'Average Rating' },
];

const SERVICES = [
  { icon: Scissors, title: 'Custom Bridal Gowns', desc: 'Handcrafted wedding gowns tailored to your dream vision with premium fabrics.' },
  { icon: Zap, title: 'Traditional Attire', desc: 'Authentic Yoruba, Igbo, and Hausa traditional outfits with exquisite detailing.' },
  { icon: Users, title: 'Aso Ebi Packages', desc: 'Coordinated Aso Ebi sets for wedding parties — from 5 to 100+ guests.' },
  { icon: Award, title: 'Corporate Fashion', desc: 'Professional corporate attire that blends style with authority.' },
  { icon: Heart, title: 'Event Styling', desc: 'Complete styling service for birthdays, baby namings, and special occasions.' },
  { icon: Star, title: 'Color Consulting', desc: 'AI-powered color matching to help you find your perfect palette.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="relative bg-burgundy-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Samlad Fashion"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 text-sm tracking-widest uppercase font-medium mb-3">About The Designer</p>
              <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold leading-tight mb-5">
                Samlad<br />
                <span className="gold-text">Fashion Homes</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-6 max-w-lg">
                Based in Ilorin, Kwara State, Nigeria, Samlad Fashion Homes is a premier fashion design studio specializing in bespoke clothing, traditional attire, and Aso Ebi coordination. With over 8 years of experience dressing clients for life's most important moments, we bring creativity, precision, and passion to every stitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white font-semibold py-3 px-7 rounded-full hover:bg-[#1ebe5c] transition-colors text-sm justify-center"
                >
                  <MessageCircle size={16} />
                  Book a Consultation
                </a>
                <a
                  href="#services"
                  className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold py-3 px-7 rounded-full hover:bg-white/10 transition-colors text-sm justify-center"
                >
                  Our Services
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="w-72 h-80 md:w-80 md:h-96 mx-auto relative">
                <img
                  src="https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Samlad Fashion"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gold-500 text-burgundy-950 rounded-2xl p-4 shadow-lg">
                  <p className="font-serif font-bold text-2xl">8+</p>
                  <p className="text-xs font-medium">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white py-12 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map(({ icon: Icon, label, desc }) => (
              <div key={desc} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-burgundy-900" />
                </div>
                <p className="font-serif text-3xl font-bold text-burgundy-900">{label}</p>
                <p className="text-gray-500 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-3">
            {[
              'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/3943878/pexels-photo-3943878.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
            ].map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 1 ? 'mt-6' : ''}`}>
                <img src={img} alt="" className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-3">Our Story</p>
            <h2 className="section-title mb-5">Crafting Beauty, One Stitch at a Time</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Samlad Fashion Homes was born from a deep passion for Nigerian fashion and a dream to make every client feel extraordinary. What started as a small atelier in Lagos has grown into one of the most sought-after fashion houses for weddings, traditional ceremonies, and special events.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Our philosophy is simple: every person deserves to wear something that makes them feel like royalty. From the finest imported lace to hand-woven Aso-oke, we source only the best materials to create pieces that tell your unique story.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Lagos Based', 'Premium Fabrics', 'Custom Fit', 'Timely Delivery'].map(tag => (
                <span key={tag} className="badge bg-cream-100 text-burgundy-700 px-3 py-1.5">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-3">Expertise</p>
              <h2 className="section-title mb-8">Our Core Skills</h2>
              <div className="space-y-5">
                {SKILLS.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gold-600 font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #4A1020 0%, #C9A84C 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-3">Process</p>
              <h2 className="section-title mb-8">How We Work</h2>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Consultation', desc: 'We start with a detailed consultation to understand your vision, event type, and preferences.' },
                  { step: '02', title: 'Design & Fabric Selection', desc: 'We select premium fabrics and design your outfit with attention to every detail.' },
                  { step: '03', title: 'Fitting & Adjustments', desc: 'Multiple fittings ensure the perfect fit before final delivery.' },
                  { step: '04', title: 'Delivery', desc: 'Your completed outfit is delivered on time, ready to make a statement.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-burgundy-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 text-xs font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-2">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-burgundy-900 flex items-center justify-center mb-4">
                <Icon size={20} className="text-gold-400" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-burgundy-950 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-burgundy-950 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-4">
            Ready to Create Your Dream Outfit?
          </h2>
          <p className="text-white/60 mb-8">
            Contact us today to schedule your consultation and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center bg-[#25D366] text-white font-semibold py-3.5 px-8 rounded-full hover:bg-[#1ebe5c] transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <a
              href={`tel:${CALL_NUM}`}
              className="flex items-center gap-2 justify-center border-2 border-white/30 text-white font-semibold py-3.5 px-8 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone size={18} />
              {CALL_NUM}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
