import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Mail, Clock, Send, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../lib/supabase';

const WHATSAPP_NUM = '2348142805347';
const CALL_NUM = '08142805347';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Submit to database
    await submitContactForm(form.name, form.email || '', form.phone || '', form.message);

    // Also send to WhatsApp
    const text = `New Message from Samlad Fashion Homes website:\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`, '_blank');

    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-burgundy-950 py-16 md:py-24 text-center px-4">
        <p className="text-gold-400 text-sm tracking-widest uppercase font-medium mb-2">Reach Out</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4">Contact Us</h1>
        <p className="text-white/60 text-base max-w-lg mx-auto">
          Have a question about an outfit, want to book a consultation, or need color advice for your event? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-burgundy-950 mb-6">Get In Touch</h2>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 border-2 border-[#25D366]/20 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Message Us on WhatsApp</p>
                  <p className="text-sm text-gray-500">Get instant replies from Samlad</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center bg-[#25D366] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1ebe5c] transition-colors w-full"
              >
                <MessageCircle size={16} />
                Start Conversation: {CALL_NUM}
              </a>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: [CALL_NUM, 'Mon – Sat: 8am – 8pm'],
                  action: `tel:${CALL_NUM}`,
                  actionLabel: 'Call Now',
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  lines: ['samlad@fashionhomes.com', 'We reply within 24 hours'],
                  action: 'mailto:samlad@fashionhomes.com',
                  actionLabel: 'Send Email',
                },
                {
                  icon: MapPin,
                  title: 'Our Location',
                  lines: ['Ilorin, Kwara State, Nigeria', 'Visit by appointment only'],
                  action: 'https://maps.google.com',
                  actionLabel: 'Get Directions',
                },
                {
                  icon: Clock,
                  title: 'Working Hours',
                  lines: ['Monday – Saturday: 8am – 8pm', 'Sunday: By appointment'],
                  action: null,
                  actionLabel: '',
                },
              ].map(({ icon: Icon, title, lines, action, actionLabel }) => (
                <div key={title} className="flex items-start gap-4 card p-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-burgundy-900" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{title}</p>
                    {lines.map((l, i) => (
                      <p key={i} className="text-gray-500 text-xs mt-0.5">{l}</p>
                    ))}
                  </div>
                  {action && (
                    <a
                      href={action}
                      target={action.startsWith('http') ? '_blank' : undefined}
                      rel={action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xs text-burgundy-900 font-medium hover:text-gold-600 transition-colors flex-shrink-0"
                    >
                      {actionLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Social media */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUM}`, color: 'bg-[#25D366]' },
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', color: 'bg-[#1877F2]' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${color} text-white text-xs font-medium py-2 px-4 rounded-full hover:opacity-90 transition-opacity`}
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="card p-6 md:p-8">
              <h3 className="font-serif text-2xl font-semibold text-burgundy-950 mb-2">Send a Message</h3>
              <p className="text-gray-500 text-sm mb-6">Fill in the form and we'll reply via WhatsApp</p>

              {submitted ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-500 text-sm">Your message has been sent via WhatsApp. We'll reply shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="input-field"
                      placeholder="e.g. 08012345678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Your Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      className="input-field resize-none"
                      rows={4}
                      placeholder="Tell us about your event, desired outfit, color preferences..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send via WhatsApp
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
