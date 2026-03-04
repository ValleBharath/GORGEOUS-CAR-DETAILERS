import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Star, 
  Zap, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES, GALLERY_IMAGES } from './constants';
import BookingForm from './components/BookingForm';
import AIChat from './components/AIChat';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-none shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <Star className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter gold-text-gradient">GORGEOUS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Services', 'Gallery', 'Booking', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-medium text-zinc-600 hover:text-gold-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('booking')}
              className="px-6 py-2 rounded-full gold-gradient text-white text-sm font-bold hover:scale-105 transition-transform"
            >
              Book Now
            </button>
          </div>

          <button className="md:hidden text-zinc-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-zinc-100 p-6 space-y-4 shadow-xl"
          >
            {['About', 'Services', 'Gallery', 'Booking', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left text-lg font-medium text-zinc-600"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Car"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 text-xs font-bold tracking-widest uppercase mb-6">
              Premium Automotive Care
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight text-zinc-900">
              Crafting <span className="gold-text-gradient italic">Perfection</span> <br />
              On Every Surface
            </h1>
            <p className="text-zinc-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Experience the pinnacle of automotive detailing. From ceramic coatings to deep interior restoration, we bring back the showroom shine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollTo('booking')}
                className="w-full sm:w-auto px-10 py-4 rounded-full gold-gradient text-white font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Book Your Detail <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollTo('services')}
                className="w-full sm:w-auto px-10 py-4 rounded-full border border-zinc-200 text-zinc-900 font-bold text-lg hover:bg-zinc-50 transition-colors"
              >
                View Services
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 left-0 w-full hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {[
              { label: 'Cars Detailed', value: '4,500+' },
              { label: 'Customer Rating', value: '4.8/5' },
              { label: 'Years Experience', value: '11+' },
              { label: 'Total Reviews', value: '1,077' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gold-text-gradient">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-zinc-900">
                About <span className="gold-text-gradient">Gorgeous</span>
              </h2>
              <p className="text-zinc-700 text-lg leading-relaxed mb-8">
                GORGEOUS CAR DETAILERS specializes in advanced car detailing services, including Graphene, Ceramic Coating, and Paint Protection Film (PPF), and has successfully serviced over 4,500 vehicles in 11 years. 
              </p>
              <p className="text-zinc-600 text-base leading-relaxed mb-8">
                Located in the GNR Prime Building, this detailer is easily accessible from notable destinations in Srimallenagar Colony, making it a convenient choice for car enthusiasts in Hyderabad. With a stellar rating of 4.8 from 1,077 reviews, customers praise their attention to detail and quality of work. For those seeking top-notch car care, reserving a service at GORGEOUS CAR DETAILERS ensures a stunning finish that protects and enhances vehicle appearance.
              </p>
              <div className="flex gap-4">
                <div className="p-4 glass-panel rounded-2xl text-center flex-1">
                  <div className="text-2xl font-bold gold-text-gradient">4.8</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest">Google Rating</div>
                </div>
                <div className="p-4 glass-panel rounded-2xl text-center flex-1">
                  <div className="text-2xl font-bold gold-text-gradient">1,077</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest">Reviews</div>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=1200" 
                  alt="Gorgeous Workshop"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800" 
                  alt="Detailing Work"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional at Work"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900">Our Signature <span className="gold-text-gradient">Services</span></h2>
              <p className="text-zinc-600 text-lg">We offer a range of premium detailing packages tailored to your vehicle's specific needs.</p>
            </div>
            <button className="text-gold-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Packages <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-3xl overflow-hidden group hover:border-gold-500/30 transition-all bg-white"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-zinc-900">{service.title}</h3>
                  <p className="text-zinc-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gold-600 font-bold">{service.price}</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {service.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="text-xs text-zinc-700 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-gold-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => scrollTo('booking')}
                    className="w-full py-3 rounded-xl border border-zinc-200 text-sm font-bold hover:bg-gold-500 hover:text-white transition-all text-zinc-900"
                  >
                    Select Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-zinc-900">
              Why Discerning Owners <br />
              Choose <span className="gold-text-gradient">Gorgeous</span>
            </h2>
            <div className="space-y-8">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Certified Protection',
                  desc: 'We are authorized installers for world-leading ceramic coating and PPF brands.'
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: 'Artisan Attention',
                  desc: 'We treat every car like a masterpiece, spending hours on details others miss.'
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: 'Advanced Tech',
                  desc: 'Using the latest in steam cleaning, paint correction, and chemical technology.'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 border border-gold-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-zinc-900">{item.title}</h4>
                    <p className="text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000" 
                alt="Detailing Process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-panel p-8 rounded-3xl hidden md:block">
              <div className="text-4xl font-bold gold-text-gradient mb-1">100%</div>
              <div className="text-sm font-bold uppercase tracking-widest">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900">The <span className="gold-text-gradient">Showroom</span> Gallery</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">Browse through our recent transformations and see the Gorgeous difference for yourself.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-zinc-900">Ready for a <span className="gold-text-gradient">Transformation?</span></h2>
            <p className="text-zinc-600 text-lg mb-8">
              Book your appointment today. Our team will review your request and contact you to finalize the details and provide a custom quote.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <span>GNR Prime Building, Srimallenagar Colony, Hyderabad</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-50 pt-20 pb-10 px-6 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 gold-gradient rounded flex items-center justify-center">
                <Star className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter gold-text-gradient">GORGEOUS</span>
            </div>
            <p className="text-zinc-600 max-w-sm mb-8">
              The premier destination for luxury automotive detailing and protection services. We bring excellence to every surface.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-gold-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-gold-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-zinc-900">Quick Links</h4>
            <ul className="space-y-4 text-zinc-600 text-sm">
              <li><button onClick={() => scrollTo('about')} className="hover:text-gold-600">About</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-gold-600">Services</button></li>
              <li><button onClick={() => scrollTo('gallery')} className="hover:text-gold-600">Gallery</button></li>
              <li><button onClick={() => scrollTo('booking')} className="hover:text-gold-600">Booking</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-zinc-900">Newsletter</h4>
            <p className="text-zinc-600 text-sm mb-4">Get car care tips and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-gold-500"
              />
              <button className="p-2 rounded-lg gold-gradient text-white">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs uppercase tracking-widest">
          <div>© 2026 Gorgeous Car Detailers. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>
      </footer>

      <AIChat />
      <WhatsAppButton phoneNumber="+919876543210" />
    </div>
  );
}
