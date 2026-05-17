/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MapPin, ExternalLink, 
  ChevronRight, Star, Quote, ArrowUp, 
  ShieldCheck, Clock, Award, Hammer, 
  LayoutGrid, Bath, Home, Layers, 
  Paintbrush, Construction, MoveRight,
  Instagram, Facebook, Twitter, CheckCircle2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Collections', href: '#collections' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className={`text-2xl font-display font-bold leading-tight ${isScrolled ? 'text-black' : 'text-white'}`}>
            ALAMZEB
          </span>
          <span className={`text-[10px] uppercase tracking-[0.3em] font-accent font-medium ${isScrolled ? 'text-gold' : 'text-white/70'}`}>
            Tiles & Flooring
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-xs uppercase tracking-widest font-accent font-medium transition-colors hover:text-gold ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold px-6 py-2.5 rounded-full text-white text-xs uppercase tracking-widest font-accent font-bold"
          >
            Get Quote
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-black' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-black' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden border-b border-gray-100"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display text-black hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-dark text-white py-4 rounded-xl font-accent uppercase tracking-widest text-sm font-bold">
                Request a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gold z-[60] origin-left"
      style={{ scaleX }}
    />
  );
};

const Hero = () => {
  const titles = ["Premium Floor Tiles", "Bathroom Masterpieces", "Luxury Stone Designs", "Modern Interior Solutions"];
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop"
          alt="Luxury Bathroom"
          loading="lazy"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Shapes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] border-[1px] border-white/50 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] border-[1px] border-white/30 rounded-full"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-white/90 text-[10px] uppercase tracking-[0.4em] font-accent font-bold mb-8">
            Experience Excellence since 1998
          </span>
        </motion.div>

        <div className="h-[120px] md:h-[180px] overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIdx}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-none text-gradient"
            >
              {titles[titleIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-sans mb-6"
        >
          Elevate your living spaces with our curated collection of premium tiles and flooring. 
          Where artisanal craftsmanship meets modern sophistication.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="mb-12"
        >
          <a 
            href="https://wa.me/923482192280" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 hover:opacity-80 transition-all"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-accent font-bold">Expert Consultation</span>
            <span className="text-3xl md:text-5xl font-display font-medium text-white tracking-widest border-b border-white/10 pb-2">
              +92 348 2192280
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto bg-white text-dark px-10 py-5 rounded-full font-accent font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all duration-300">
            View Collection
          </button>
          <button className="w-full sm:w-auto glass hover:bg-white/20 px-10 py-5 rounded-full font-accent font-bold uppercase tracking-widest text-xs text-white transition-all duration-300">
            Get Free Quote
          </button>
        </motion.div>
      </div>

      {/* Social Icons Float */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-6 z-20"
      >
        <a href="#" className="text-white/50 hover:text-white transition-colors"><Instagram size={20} /></a>
        <a href="#" className="text-white/50 hover:text-white transition-colors"><Facebook size={20} /></a>
        <a href="#" className="text-white/50 hover:text-white transition-colors"><Twitter size={20} /></a>
        <div className="w-[1px] h-20 bg-white/30 mx-auto" />
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-accent">Scroll</span>
        <div className="w-[1px] h-10 bg-white/30" />
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ subtitle, title, alignment = 'center' }: { subtitle: string, title: string, alignment?: 'left' | 'center' }) => (
  <div className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-gold uppercase tracking-[0.5em] text-[10px] font-accent font-black mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-display font-medium text-dark italic lg:not-italic"
    >
      {title}
    </motion.h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 bg-marble overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow">
              <img 
                src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2574&auto=format&fit=crop"
                alt="Showroom"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-gold w-48 h-48 rounded-full flex flex-col items-center justify-center text-white text-center p-4 border-8 border-marble"
            >
              <span className="text-4xl font-display font-bold">25+</span>
              <span className="text-[10px] uppercase font-accent font-bold tracking-widest">Years of Craft</span>
            </motion.div>
          </motion.div>

          <div className="space-y-10">
            <SectionHeading 
              subtitle="Our Philosophy" 
              title="Defining Luxury Through Perfection" 
              alignment="left"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              For over two decades, Alamzeb Tiles & Flooring has been the cornerstone of luxury interior design. 
              We curate the world's most exquisite marble, porcelain, and ceramic collections to transform 
              your spaces into works of art.
            </motion.p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: <ShieldCheck className="text-gold" />, title: "Quality Guarantee", desc: "Rigorous standards for every tile." },
                { icon: <Award className="text-gold" />, title: "Expert Installers", desc: "Master craftsmen at your service." },
                { icon: <Clock className="text-gold" />, title: "On-time Delivery", desc: "Your schedule is our priority." },
                { icon: <Hammer className="text-gold" />, title: "Custom Solutions", desc: "Tailored to your unique vision." },
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white rounded-3xl luxury-shadow flex gap-5"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Collections = () => {
  const items = [
    { name: "Carrara Marble", category: "Marble", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop" },
    { name: "Zen Porcelain", category: "Porcelain", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2592&auto=format&fit=crop" },
    { name: "Royal Mosaic", category: "Mosaic", img: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?q=80&w=2574&auto=format&fit=crop" },
    { name: "Rustic Clay", category: "Ceramic", img: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?q=80&w=2600&auto=format&fit=crop" },
    { name: "Modern Slab", category: "Wall Tiles", img: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=2672&auto=format&fit=crop" },
    { name: "Gloss Granite", category: "Floor", img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2670&auto=format&fit=crop" },
  ];

  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Curated Selection" title="Eternal Collections" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="group relative h-[450px] rounded-[40px] overflow-hidden luxury-shadow cursor-pointer"
            >
              <img 
                src={item.img} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.name}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-10 left-10 right-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold font-accent text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{item.category}</span>
                <h3 className="text-white text-3xl font-display mb-4">{item.name}</h3>
                <div className="flex items-center gap-2 text-white/70 text-xs font-accent uppercase tracking-widest font-bold">
                  View Detail <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Bath', 'Kitchen', 'Living', 'Commercial'];
  const projects = [
    { title: "Ocean View Villa", cat: "Living", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2574&auto=format&fit=crop", before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop" },
    { title: "Modern Penthouse", cat: "Kitchen", img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2670&auto=format&fit=crop", before: "https://images.unsplash.com/photo-1556912170-4537da3659ad?q=80&w=2670&auto=format&fit=crop" },
    { title: "Spa Sanctuary", cat: "Bath", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2574&auto=format&fit=crop", before: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?q=80&w=2574&auto=format&fit=crop" },
    { title: "Luxe Office", cat: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop", before: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop" },
  ];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Success Stories" title="Project Showcase" />
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-8 py-3 rounded-full text-xs font-accent font-bold uppercase tracking-widest transition-all ${
                filter === c ? 'bg-gold text-white shadow-lg' : 'bg-marble text-gray-400 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden luxury-shadow bg-dark"
              >
                {/* Before Image (visible on hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <img src={p.before} loading="lazy" className="w-full h-full object-cover" alt="Before" />
                   <div className="absolute top-10 left-10 glass px-4 py-2 rounded-full text-white text-[10px] uppercase font-accent font-bold">Concept / Before</div>
                </div>
                
                {/* After Image (default) */}
                <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-700">
                  <img src={p.img} loading="lazy" className="w-full h-full object-cover" alt={p.title} />
                  <div className="absolute top-10 left-10 bg-gold px-4 py-2 rounded-full text-white text-[10px] uppercase font-accent font-bold">Finished Project</div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-white/60 text-[10px] uppercase tracking-widest font-accent font-bold mb-2 block">{p.cat}</span>
                  <h3 className="text-white text-3xl font-display">{p.title}</h3>
                  <p className="text-white/40 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Transforming ideas into reality with premium materials.</p>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-white italic font-display">View</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const list = [
    { icon: <Construction />, title: "Tile Installation", desc: "Precision fitting for bathroom, kitchen, and living areas." },
    { icon: <Bath />, title: "Bathroom Reno", desc: "Complete waterproof solutions and modern hardware setup." },
    { icon: <Layers />, title: "Floor Remodeling", desc: "Removing old flooring and preparing the base for new life." },
    { icon: <Paintbrush />, title: "Interior Design", desc: "Expert guidance in color matching and pattern selection." },
    { icon: <Home />, title: "Whole House", desc: "Seamless flooring transitions throughout your entire property." },
    { icon: <CheckCircle2 />, title: "Tile Repair", desc: "Fixing cracks, grout lines, and loose tiles efficiently." },
  ];

  return (
    <section id="services" className="py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="What We Offer" title="Comprehensive Solutions" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-10 glass-dark rounded-[30px] group transition-all duration-300 hover:bg-gold/10"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display mb-4">{service.title}</h3>
              <p className="text-white/60 mb-8 font-sans leading-relaxed">{service.desc}</p>
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-accent font-bold group-hover:text-gold transition-colors">
                Learn More <MoveRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Consultation", desc: "Understanding your lifestyle and design preferences." },
    { num: "02", title: "Material Selection", desc: "Picking the perfect texture, size, and grade from our showroom." },
    { num: "03", title: "Site Prep", desc: "Detailed measurements and surface preparation for longevity." },
    { num: "04", title: "Master Installation", desc: "Hand-crafted laying with laser precision alignment." },
    { num: "05", title: "Final Polish", desc: "Grouting, sealing, and cleanup for a ready-to-use brilliance." },
  ];

  return (
    <section className="py-24 bg-marble">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="The Journey" title="Our Precise Process" />
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-[34px] top-10 bottom-10 w-[2px] bg-gold/20 hidden md:block" />
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="w-[70px] h-[70px] shrink-0 rounded-full bg-white flex items-center justify-center text-xl font-display font-bold text-gold border-2 border-gold/20 luxury-shadow group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-500">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h4 className="text-2xl font-display mb-2 group-hover:text-gold transition-colors">{step.title}</h4>
                  <p className="text-gray-500 max-w-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Sarah Johnson", role: "Villa Owner", text: "The attention to detail in our bathroom renovation was incredible. The marble tiles look like a cohesive piece of art.", stars: 5 },
    { name: "Michael Chen", role: "Interior Architect", text: "As a professional, I appreciate technical accuracy. Alamzeb's installation team is the best I've ever worked with.", stars: 5 },
    { name: "David Miller", role: "Homeowner", text: "Timely delivery and professional behavior. They treated my home with respect and the results are stunning.", stars: 4.5 },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Endorsements" title="Client Love" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[40px] bg-marble relative flex flex-col items-center text-center"
            >
              <Quote className="text-gold/20 absolute top-10 left-10" size={40} />
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={14} className={idx < rev.stars ? "text-gold fill-gold" : "text-gray-300 fill-gray-300"} />
                ))}
              </div>
              <p className="text-lg italic text-gray-700 leading-relaxed mb-8">"{rev.text}"</p>
              <div className="mt-auto">
                <h5 className="font-display font-bold text-dark">{rev.name}</h5>
                <span className="text-[10px] uppercase tracking-widest font-accent text-gold">{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-marble overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeading subtitle="Get in Touch" title="Start Your Project" alignment="left" />
            <div className="space-y-12">
              {[
                { icon: <MapPin className="text-gold" />, title: "Showroom", detail: "Unit 25, Luxury Design Way, City Hub 4501" },
                { icon: <Phone className="text-gold" />, title: "Call Us", detail: "+1 (555) 987-6543" },
                { icon: <Mail className="text-gold" />, title: "Email", detail: "hello@alamzebtiles.com" },
                { icon: <Clock className="text-gold" />, title: "Hours", detail: "Mon-Sat: 9AM - 8PM, Sun: Closed" },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center luxury-shadow">{item.icon}</div>
                  <div>
                    <h5 className="text-sm font-accent uppercase tracking-widest font-black text-gray-400 mb-1">{item.title}</h5>
                    <p className="text-xl font-display text-dark">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map Placeholder */}
            <div className="mt-16 h-64 bg-gray-200 rounded-[40px] luxury-shadow overflow-hidden group">
               <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop')] bg-cover grayscale group-hover:grayscale-0 transition-all duration-1000 flex items-center justify-center">
                 <div className="glass px-6 py-3 rounded-full text-white text-xs uppercase tracking-widest font-accent font-bold">Open Google Maps</div>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[50px] luxury-shadow self-center"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-accent font-bold text-gray-400 ml-4">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-marble rounded-2xl p-5 border-none focus:ring-2 focus:ring-gold outline-hidden font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-accent font-bold text-gray-400 ml-4">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-marble rounded-2xl p-5 border-none focus:ring-2 focus:ring-gold outline-hidden font-sans" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-accent font-bold text-gray-400 ml-4">Service Type</label>
                <select className="w-full bg-marble rounded-2xl p-5 border-none focus:ring-2 focus:ring-gold outline-hidden font-sans">
                  <option>Bathroom Renovation</option>
                  <option>Kitchen Tiling</option>
                  <option>Commercial Flooring</option>
                  <option>Interior Consultation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-accent font-bold text-gray-400 ml-4">Message</label>
                <textarea rows={4} placeholder="Describe your dream project..." className="w-full bg-marble rounded-2xl p-5 border-none focus:ring-2 focus:ring-gold outline-hidden font-sans resize-none" />
              </div>
              <button className="w-full bg-dark text-white py-6 rounded-2xl font-accent uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold transition-all duration-300">
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
          <div className="space-y-8">
             <div>
              <span className="text-3xl font-display font-bold leading-tight block">ALAMZEB</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-accent font-medium text-gold">Tiles & Flooring</span>
             </div>
             <p className="text-white/40 leading-relaxed font-sans pr-4">
               Crafting timeless surfaces for the world's most beautiful homes since 1998.
             </p>
             <div className="flex gap-4">
               {[Instagram, Facebook, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-dark transition-all duration-300">
                   <Icon size={18} />
                 </a>
               ))}
             </div>
          </div>
          
          <div>
            <h5 className="font-display text-xl mb-8">The Gallery</h5>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:opacity-50 transition-all border border-white/5">
                   <img src={`https://picsum.photos/seed/${i + 50}/100/100`} className="w-full h-full object-cover" alt="Tile" />
                </div>
              ))}
            </div>
          </div>

          <div>
             <h5 className="font-display text-xl mb-8">Navigation</h5>
             <ul className="space-y-4">
               {['Collections', 'Services', 'Projects', 'Careers', 'Sitemap'].map(item => (
                 <li key={item}><a href="#" className="text-white/40 hover:text-gold transition-colors text-sm font-sans">{item}</a></li>
               ))}
             </ul>
          </div>

          <div>
             <h5 className="font-display text-xl mb-8">Newsletter</h5>
             <p className="text-white/40 text-sm mb-6 font-sans">Join for design tips and new collection early access.</p>
             <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
               <input type="email" placeholder="Email" className="bg-transparent border-none outline-hidden px-4 text-sm w-full" />
               <button className="bg-white text-dark px-4 py-2 rounded-lg text-xs font-bold font-accent"><ChevronRight size={16} /></button>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-accent">
            © {new Date().getFullYear()} Alamzeb Tiles & Flooring — All Rights Reserved.
          </p>
          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Environment'].map(item => (
               <a key={item} href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-accent">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/923482192280"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1, rotate: 10 }}
    className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl luxury-shadow"
  >
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </motion.a>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handle = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-28 right-12 z-[100] w-12 h-12 bg-white rounded-xl shadow-2xl border border-gray-100 flex items-center justify-center text-dark hover:bg-gold hover:text-white transition-all transform hover:-translate-y-2"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[1000] bg-dark flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
         <span className="text-4xl md:text-6xl font-display font-bold text-white mb-4 block tracking-tight">ALAMZEB</span>
         <div className="w-16 h-1 bg-gold mx-auto mb-4" />
         <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-accent">Curating Brilliance</span>
      </motion.div>
      <motion.div 
         className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden"
      >
        <motion.div 
           initial={{ x: '-100%' }}
           animate={{ x: '100%' }}
           transition={{ duration: 1, ease: 'easeInOut' }}
           onAnimationComplete={onComplete}
           className="w-full h-full bg-gold"
        />
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <main className="relative selection:bg-gold selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Collections />
      <Gallery />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
