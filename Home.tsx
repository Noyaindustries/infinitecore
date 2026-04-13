import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { 
  Users, 
  FileSignature,
  MessageSquare,
  Wallet,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  ArrowRight,
  LayoutDashboard,
  Zap,
  Lock,
  TrendingUp,
  CircleDot,
  Check,
  Puzzle,
  Building2,
  Landmark,
  HardHat,
  Stethoscope,
  Globe2,
  Quote,
  Star
} from 'lucide-react';

const Counter = ({ value, accent }: { value: string, accent: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const numericValue = parseInt(value) || 0;
      const suffix = value.replace(/[0-9]/g, '');
      const prefix = value.match(/^[^\d]+/)?.[0] || '';
      
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Out expo
        onUpdate(latest) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, isInView]);

  return (
    <span ref={nodeRef} className={`text-[28px] sm:text-[36px] font-black tracking-tight mb-1 ${accent}`}>
      0
    </span>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Reduce particles on mobile for performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const particleCount = isMobile ? 15 : 40;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div ref={containerRef} className="font-sans text-text-primary bg-surface-primary selection:bg-[#6EA7EA]/30 relative overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB332] via-[#6EA7EA] to-[#FFB332] z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* Background with Grid & Particles */}
      <motion.div 
        style={{ y: backgroundY, rotate: backgroundRotate }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.8] mix-blend-screen"></div>
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#6EA7EA]/5 rounded-full blur-[100px] sm:blur-[150px] mix-blend-screen mix-blend-lighten"></div>
        <div className="absolute top-[20%] left-[-10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[#FFB332]/5 rounded-full blur-[80px] sm:blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#6EA7EA]/5 rounded-full blur-[100px] sm:blur-[150px] mix-blend-screen"></div>
        
        {/* Dense floating particles - Luminous Orbs */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full pointer-events-none`}
            style={{
              width: Math.random() * 5 + 2 + 'px',
              height: Math.random() * 5 + 2 + 'px',
              backgroundColor: i % 3 === 0 ? '#FFB332' : i % 3 === 1 ? '#F6A928' : '#6EA7EA',
              boxShadow: i % 3 === 2 ? '0 0 10px rgba(110, 167, 234, 0.8)' : '0 0 10px rgba(255, 179, 50, 0.8)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: `blur(${Math.random() * 2}px)`
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
          />
        ))}

        {/* Extra large distant glows along the height */}
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-[#FFB332]/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[60%] left-[5%] w-[600px] h-[600px] bg-[#6EA7EA]/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[80%] right-[5%] w-[400px] h-[400px] bg-[#FFB332]/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </motion.div>


      {/* HERO SECTION */}
      <main className="relative pt-24 pb-16 sm:pt-32 md:pt-44 md:pb-28 px-4 sm:px-6 z-10 w-full flex flex-col items-center justify-center">
        <div className="container mx-auto text-center max-w-[1100px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#0D1320]/60 backdrop-blur-md text-[10px] font-black tracking-[0.15em] text-[#8D98AA] mb-8 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EA7EA] animate-pulse shadow-[0_0_8px_rgba(110,167,234,0.8)]"></span>
            LE SYSTÈME D'EXPLOITATION DES ENTREPRISES AFRICAINES
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-black text-[#F2F4F8] tracking-[-0.03em] leading-[1.15] md:leading-[1.05] mb-6 sm:mb-8"
          >
            Gérez toute votre{' '}<span className="text-[#FFB332]">entreprise</span><br className="hidden sm:block"/>{' '}
            <span className="text-[#6EA7EA]">sans limites.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[15px] sm:text-[17px] md:text-[20px] text-[#8D98AA] mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-normal px-2"
          >
            Infinite Core unifie CRM, Finance, RH, Projets, Academy, Comms et Store dans un système unique — modulaire, personnalisable et pensé pour votre croissance.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-fit mx-auto"
          >
            <Link to="/signup" className="group flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FFB332] text-[#06080D] font-bold text-[14px] sm:text-[15px] rounded-full transition-all shadow-[0_0_20px_rgba(255,179,50,0.3)] hover:shadow-[0_0_30px_rgba(255,179,50,0.4)] w-full sm:w-auto">
              Créer mon compte gratuitement <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#system" className="group flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0A1020] text-[#F2F4F8] font-semibold text-[14px] sm:text-[15px] rounded-full transition-all border border-white/10 hover:border-white/20 hover:bg-[#111827] w-full sm:w-auto">
              <LayoutDashboard className="mr-2 w-4 h-4 text-[#8D98AA]" /> Infinite System
            </a>
          </motion.div>
        </div>

        {/* Stats Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="container mx-auto max-w-[1000px] mt-24"
        >
          <div className="bg-[#0D1320]/80 backdrop-blur-xl border border-white/5 p-0.5 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5 rounded-[19px] overflow-hidden bg-[#0A1020]">
              {[
                { val: "97+", label: "entreprises actives", accent: "text-[#F2F4F8]" },
                { val: "7", label: "modules intégrés", accent: "text-[#6EA7EA]" },
                { val: "5j", label: "déploiement", accent: "text-[#FFB332]" },
                { val: "24h", label: "Contact après inscription", accent: "text-[#F2F4F8]" }
              ].map((stat, i) => (
                <div key={i} className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center text-center">
                  <Counter value={stat.val} accent={stat.accent} />
                  <span className="text-[9px] sm:text-[10px] text-[#8D98AA] font-bold tracking-[0.1em]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mockup Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="container mx-auto max-w-5xl mt-20 perspective-[2000px] relative z-10"
        >
          {/* Subtle gold glow behind dashboard */}
          <div className="absolute inset-0 bg-[#FFB332]/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="bg-[#111827] rounded-[24px] border border-white/10 p-2 shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_80px_rgba(255,179,50,0.05)] transform rotate-x-2 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="bg-[#0A1020] rounded-[18px] overflow-hidden flex flex-col h-[500px]">
              <div className="bg-[#06080D]/60 backdrop-blur-md px-4 py-3 flex items-center border-b border-white/5 relative">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E15B64] border border-[#E15B64]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F5C04E] border border-[#F5C04E]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#2BC673] border border-[#2BC673]/50"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-6 py-1 rounded-full text-[10px] text-[#8D98AA] font-mono flex items-center gap-2">
                  <Lock size={10} className="text-[#6EA7EA]" /> app.infinitecore.ci / dashboard
                </div>
              </div>

              <div className="flex-1 flex p-4 gap-4">
                <div className="w-48 hidden md:flex flex-col gap-1.5">
                  <div className="px-3 py-2 bg-[#FFB332]/10 border border-[#FFB332]/20 rounded-lg text-[#FFB332] text-[12px] font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,179,50,0.1)]">
                    <Zap size={14} /> Tableau de bord
                  </div>
                  <div className="px-3 py-2 text-[#8D98AA] text-[12px] font-medium flex items-center gap-2 hover:text-[#F2F4F8] transition-colors"><Users size={14} /> CRM</div>
                  <div className="px-3 py-2 text-[#8D98AA] text-[12px] font-medium flex items-center gap-2 hover:text-[#F2F4F8] transition-colors"><Wallet size={14} /> Finance</div>
                  <div className="px-3 py-2 text-[#8D98AA] text-[12px] font-medium flex items-center gap-2 hover:text-[#F2F4F8] transition-colors"><FileSignature size={14} /> RH</div>
                  <div className="px-3 py-2 text-[#8D98AA] text-[12px] font-medium flex items-center gap-2 hover:text-[#F2F4F8] transition-colors"><Briefcase size={14} /> Projets</div>
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <h3 className="text-[#F2F4F8] font-bold text-lg md:text-xl">Bonjour, Client 👋</h3>
                    <div className="px-3 py-1 bg-[#2BC673]/10 border border-[#2BC673]/20 text-[#2BC673] text-[9px] md:text-[10px] rounded-full font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#2BC673] rounded-full animate-pulse"></span> ACTIF
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: "REVENUS MENSUELS", val: "18.4M", sub: "+12.5%", sign: "+" },
                      { label: "CLIENTS ACTIFS", val: "246", sub: "+15", sign: "+" },
                      { label: "TICKETS OUVERTS", val: "12", sub: "3 prioritaires", sign: "-" },
                      { label: "IMPAYÉS", val: "4", sub: "2.1M total", sign: "-" }
                    ].map((kpi, k) => (
                      <div key={k} className="bg-surface-secondary border border-border-medium p-4 rounded-xl shadow-sm hover-lift fade-in" style={{ animationDelay: `${k * 0.1}s` }}>
                        <p className="text-[9px] text-text-muted font-bold tracking-wider mb-2">{kpi.label}</p>
                        <p className="text-2xl font-bold text-text-primary mb-1">{kpi.val}</p>
                        <p className={`text-[10px] font-medium ${kpi.sign === '+' ? 'text-green-400' : 'text-red-400'}`}>{kpi.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 flex-1 h-[150px] md:h-auto">
                    <div className="flex-1 bg-[#111827] border border-white/5 rounded-[16px] p-4 md:p-5 flex flex-col">
                      <p className="text-[9px] md:text-[10px] text-[#8D98AA] font-bold tracking-wider mb-4 md:mb-6">ÉVOLUTION TRÉSORERIE</p>
                      <div className="flex-1 flex items-end justify-between gap-2 md:gap-3 relative">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                          <div className="border-t border-dashed border-white/20 w-full"></div>
                          <div className="border-t border-dashed border-white/20 w-full"></div>
                          <div className="border-t border-solid border-white/20 w-full"></div>
                        </div>
                        {[35, 50, 40, 65, 80, 100].map((h, i) => (
                          <div 
                            key={i} 
                            className={`w-1/6 rounded-t relative z-10 transition-all duration-700 ${i % 2 === 0 ? 'bg-gradient-to-t from-[#6EA7EA]/20 to-[#6EA7EA]' : 'bg-gradient-to-t from-[#FFB332]/20 to-[#FFB332]'}`} 
                            style={{ height: `${h}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* SECTION LE PROBLÈME */}
      <section className="py-24 md:py-32 relative z-10 bg-[#0A1020] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-14">
            <span className="text-[#FFB332] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 block flex items-center before:content-[''] before:w-6 before:h-[1px] before:bg-[#FFB332] before:mr-3">
              LE PROBLÈME
            </span>
            <h2 className="text-4xl md:text-[56px] font-bold text-[#F2F4F8] max-w-3xl leading-[1.05] tracking-tight">
              Votre entreprise mérite mieux que WhatsApp et Excel.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: MessageSquare, title: "Vos clients dans WhatsApp", desc: "Impossible de retrouver un historique clair. Chaque relance se perd dans des fils de conversation mélangés — perso et pro à la fois." },
              { icon: TrendingUp, title: "Votre trésorerie dans Excel", desc: "Vous ne savez jamais combien vous avez en caisse avant que votre comptable rappelle. La visibilité financière n'est pas un luxe." },
              { icon: Users, title: "Votre équipe sans structure", desc: "Les décisions se perdent dans des groupes WhatsApp. Personne ne sait qui fait quoi. Les deadlines glissent, les clients s'impatientent." },
              { icon: Briefcase, title: "Vos employés sans outils", desc: "Congés, paie, contrats gérés à la main. L'inspection du travail aujourd'hui vous mettrait en sérieuse difficulté." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#0D1320] p-8 md:p-10 rounded-[24px] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-[#F2F4F8] w-5 h-5" />
                </div>
                <h3 className="text-[19px] font-bold text-[#F2F4F8] mb-3">{item.title}</h3>
                <p className="text-[#8D98AA] text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-24 bg-gradient-to-br from-[#0D1320] to-[#0A1020] border border-white/5 rounded-[32px] p-10 md:p-16 text-center relative overflow-hidden group hover:border-[#FFB332]/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB332]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#F2F4F8] mb-6 leading-tight">
                Ces problèmes coûtent chaque jour du temps,<br className="hidden md:block" /> de l'argent et de la crédibilité.
              </h3>
              <p className="text-2xl md:text-[40px] font-black text-[#FFB332] leading-tight tracking-tight">
                Infinite Core les résout tous — <br className="md:hidden" />
                <span className="text-white md:text-[#FFB332]">dans un système modulaire et sans limites.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 SOLUTIONS */}
      <section id="solutions" className="py-24 relative z-10 bg-[#06080D]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#6EA7EA] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 block flex items-center before:content-[''] before:w-6 before:h-[1px] before:bg-[#6EA7EA] before:mr-3">
                SOLUTIONS
              </span>
              <h2 className="text-4xl md:text-[56px] font-bold text-[#F2F4F8] leading-[1.05] tracking-tight">
                Un système. Sept modules.
              </h2>
              <p className="text-[#8D98AA] text-[16px] md:text-[18px] mt-6 max-w-2xl leading-relaxed">
                Commencez avec ce dont vous avez besoin. Activez les autres modules en un clic — sans perdre de données, sans changer d'outil.
              </p>
              <p className="text-[#6EA7EA] text-xl font-bold mt-2">
                Zéro friction.
              </p>
            </div>
            <Link to="/signup" className="hidden md:flex items-center text-[14px] font-bold text-[#06080D] bg-[#FFB332] px-6 py-2.5 rounded-full hover:bg-[#F6A928] transition-all">
              Créer mon compte
            </Link>
          </div>
          
          {/* Solutions Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5"
          >
            
            {/* CRM Wide Card */}
            <motion.div 
              variants={itemVariants}
              className="group md:col-span-12 lg:col-span-8 bg-[#0D1320] border border-white/5 p-8 rounded-[24px] flex flex-col justify-between hover:border-[#FFB332]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,179,50,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB332]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 mb-8 md:mb-0">
                <div className="w-14 h-14 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFB332]/10 group-hover:scale-105 transition-all duration-500">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-3 group-hover:text-white transition-colors">Infinite CRM</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors mb-8">
                  Pipeline visuel, devis en 30 secondes, facturation automatique et signature électronique OHADA. Transformez vos prospects en clients fidèles.
                </p>
                <Link to="/infinite-crm" className="inline-flex items-center gap-2 text-[#FFB332] text-[14px] font-bold hover:gap-3 transition-all">
                  Découvrir le module <ArrowRight size={16} />
                </Link>
              </div>

              <div className="relative z-10 w-full mt-10 md:mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { cat: "PROSPECT", name: "Ets Koffi", amt: "1.2M FCFA", status: "Chaud", color: "text-[#F6A928] bg-[#F6A928]/10" },
                    { cat: "DEVIS", name: "Sté Coulibaly", amt: "2.4M FCFA", status: "En cours", color: "text-[#6EA7EA] bg-[#6EA7EA]/10" },
                    { cat: "GAGNÉ", name: "SARL Diomandé", amt: "4.1M FCFA", status: "Signé", color: "text-[#2BC673] bg-[#2BC673]/10" },
                    { cat: "FACTURÉ", name: "Groupe Ouattara", amt: "6.8M FCFA", status: "Payé", color: "text-[#2BC673] bg-[#2BC673]/10" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0A1020]/80 p-3 rounded-xl border border-white/5">
                      <p className="text-[9px] text-text-muted font-bold tracking-wider mb-2 uppercase">{item.cat}</p>
                      <p className="text-[11px] text-white font-bold mb-0.5">{item.name}</p>
                      <p className="text-[10px] text-text-muted mb-2">{item.amt}</p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Finance Card */}
            <motion.div 
              variants={itemVariants}
              className="group md:col-span-12 lg:col-span-4 bg-[#0D1320] border border-white/5 p-8 rounded-[24px] flex flex-col justify-between hover:border-[#6EA7EA]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(110,167,234,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6EA7EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6EA7EA]/10 group-hover:scale-105 transition-all duration-500">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-3 group-hover:text-white transition-colors">Infinite Finance</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed group-hover:text-gray-300 transition-colors mb-8">
                  Trésorerie en temps réel. Relances automatiques. Rapports P&L sans comptable.
                </p>
                <Link to="/infinite-finance" className="inline-flex items-center gap-2 text-[#6EA7EA] text-[14px] font-bold hover:gap-3 transition-all">
                  Découvrir le module <ArrowRight size={16} />
                </Link>
              </div>
              <div className="flex items-end gap-2 h-16 mt-12 px-2">
                {[30, 45, 35, 60, 85, 100].map((h, k) => (
                  <div 
                    key={k} 
                    className="flex-1 bg-gradient-to-t from-[#6EA7EA]/40 to-[#6EA7EA] rounded-t-sm" 
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </motion.div>

            {/* Row 2: RH, Projects, Academy */}
            {[
              { title: "Infinite RH", icon: "👔", desc: "Fiches employés, paie CNPS, congés et contrats selon le Code du Travail ivoirien.", link: "/rh" },
              { title: "Infinite Projects", icon: "📌", desc: "Kanban, assignation de tâches, deadlines et rapports de livraison automatiques.", link: "/projects" },
              { title: "Infinite Academy", icon: "🎓", desc: "Formations internes, quiz, certifications et bibliothèque de ressources d'entreprise.", link: "/academy" }
            ].map((m, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group md:col-span-6 lg:col-span-4 bg-[#0D1320] border border-white/5 p-8 rounded-[24px] hover:border-[#FFB332]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,179,50,0.15)] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB332]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFB332]/10 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl">{m.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F4F8] mb-3 relative z-10 group-hover:text-white transition-colors">{m.title}</h3>
                  <p className="text-[#8D98AA] text-[14px] leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors mb-8">{m.desc}</p>
                </div>
                <Link to={m.link} className="relative z-10 inline-flex items-center gap-2 text-[#FFB332] text-[13px] font-bold hover:gap-3 transition-all">
                  Découvrir le module <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}

            {/* Row 3: Store, Comms */}
            {[
              { title: "Infinite Store", icon: "🛒", desc: "Boutique connectée à votre CRM, vos stocks et Wave/Orange Money nativement.", link: "/store" },
              { title: "Infinite Comms", icon: "💬", desc: "Messagerie sécurisée d'entreprise. Canaux par projet, par client, par département. Remplacez WhatsApp professionnel par un outil intégré, archivé et contrôlé.", link: "/comms" }
            ].map((m, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group md:col-span-6 lg:col-span-6 bg-[#0D1320] border border-white/5 p-8 rounded-[24px] hover:border-[#FFB332]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,179,50,0.15)] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB332]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFB332]/10 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl">{m.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F4F8] mb-3 relative z-10 group-hover:text-white transition-colors">{m.title}</h3>
                  <p className="text-[#8D98AA] text-[14px] leading-relaxed max-sm relative z-10 group-hover:text-gray-300 transition-colors mb-8">{m.desc}</p>
                </div>
                <Link to={m.link} className="relative z-10 inline-flex items-center gap-2 text-[#FFB332] text-[13px] font-bold hover:gap-3 transition-all">
                  Découvrir le module <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION INFINITE SYSTEM - ENTERPRISE (REPOSITIONED) */}
      <section id="system" className="py-24 md:py-32 relative z-10 bg-[#06080D] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#6EA7EA] text-[12px] font-bold tracking-[0.15em] uppercase inline-block mb-6 px-4 py-2 rounded-full border border-[#6EA7EA]/30 bg-[#6EA7EA]/5"
            >
              ✨ INFINITE SYSTEM ✨
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-[64px] font-black text-[#F2F4F8] leading-[1.1] tracking-tight mt-8"
            >
              Personnalisation sur<br/>mesure et <span className="text-[#FFB332]">illimitée</span>
              <br/>pour les <span className="text-[#6EA7EA]">grandes<br/>entreprises et institutions.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[16px] md:text-[18px] text-[#8D98AA] mt-8 max-w-3xl mx-auto leading-relaxed"
            >
              Infinite System est la couche enterprise d'Infinite Core. Infrastructure dédiée, white label intégral, modules sur mesure et intégrations illimitées — pour les organisations qui n'acceptent pas les compromis.
            </motion.p>

            {/* NEW AUDIENCE GRID (MATCHING IMAGE) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-[800px] mx-auto"
            >
              {[
                { icon: "🏛️", text: "Institutions publiques" },
                { icon: "🏢", text: "Grandes entreprises" },
                { icon: "🏦", text: "Groupes financiers" },
                { icon: "🌍", text: "Multinationales africaines" },
                { icon: "🎓", text: "Universités et écoles" },
                { icon: "🏥", text: "Établissements de santé" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0A1020] border border-white/5 rounded-full px-6 py-4 flex items-center justify-start gap-4 hover:border-[#6EA7EA]/30 transition-all duration-300">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[#F2F4F8] text-[15px] font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Enterprise Features (REDESIGNED MATCHING MOCKUPS) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
          >
            
            {/* 0. White Label Intégral */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#211B14] border border-[#FFB332]/20 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">White Label Intégral</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-8">
                  Votre marque, vos couleurs, votre domaine. Vos clients et collaborateurs voient votre identité — pas celle de Noya. Du logo aux emails transactionnels, tout est à votre image.
                </p>

                <div className="px-6 py-3 bg-[#FFB332]/5 border border-[#FFB332]/20 rounded-full flex items-center gap-3 mb-8 w-fit">
                  <span className="text-[#FFB332] text-xs">★</span>
                  <span className="text-[#FFB332] text-[12px] font-bold tracking-wider uppercase">Personnalisation 100% illimitée</span>
                </div>

                {/* Mock UI Visual */}
                <div className="bg-[#06080D] border border-white/5 rounded-2xl p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 border border-dashed border-[#FFB332]/40 rounded bg-[#FFB332]/5 text-[10px] text-[#FFB332] font-bold">
                      VOTRE LOGO
                    </div>
                    <div className="text-[10px] text-[#4B5563]">votre-plateforme.ci</div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                       <div className="h-2 bg-[#1F2937] rounded col-span-1"></div>
                       <div className="h-2 bg-[#1F2937] rounded col-span-1"></div>
                       <div className="h-2 bg-[#1F2937] rounded col-span-1"></div>
                       <div className="h-2 bg-[#1F2937] rounded col-span-1"></div>
                    </div>
                    <div className="h-20 bg-[#111827] border border-white/5 rounded-xl flex items-end gap-2 p-3">
                       <div className="w-full bg-[#FFB332]/20 h-[30%] rounded-t-sm"></div>
                       <div className="w-full bg-[#FFB332]/40 h-[50%] rounded-t-sm"></div>
                       <div className="w-full bg-[#FFB332]/30 h-[40%] rounded-t-sm"></div>
                       <div className="w-full bg-[#FFB332]/60 h-[70%] rounded-t-sm"></div>
                       <div className="w-full bg-[#FFB332]/50 h-[60%] rounded-t-sm"></div>
                       <div className="w-full bg-[#FFB332] h-[90%] rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 0. Infrastructure Dédiée */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🖥️</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Infrastructure Dédiée</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-10">
                  Serveur VPS isolé, cloud privé ou déploiement on-premise sur vos propres serveurs. Vos données ne partagent aucune ressource avec d'autres clients.
                </p>

                {/* Server Visual */}
                <div className="bg-[#06080D] border border-white/5 rounded-2xl p-6 font-mono text-[11px] space-y-2">
                  <p><span className="text-green-500">server:</span> <span className="text-orange-400">"VPS-ENTERPRISE-DÉDIÉ"</span></p>
                  <p><span className="text-green-500">region:</span> <span className="text-orange-400">"Abidjan / Cloud privé"</span></p>
                  <p><span className="text-green-500">isolation:</span> <span className="text-blue-400">COMPLÈTE</span></p>
                  <p><span className="text-green-500">backup:</span> <span className="text-orange-400">"toutes les 2h"</span></p>
                  <p><span className="text-green-500">on_premise:</span> <span className="text-blue-400">disponible</span></p>
                  <p className="text-gray-600 mt-4">// Vos données, vos règles.</p>
                </div>
              </div>
            </motion.div>

            {/* 1. Formation & Change Management */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Formation & Change Management</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed">
                  Programme de formation sur mesure pour vos équipes. Sessions en présentiel à Abidjan ou en ligne. Certification Infinite System pour vos administrateurs internes.
                </p>
              </div>
            </motion.div>

            {/* 2. Modules Sur Mesure */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🧩</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Modules Sur Mesure</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-8">
                  Aucun logiciel du marché ne couvre votre métier exact ? Nous développons des modules spécifiques à votre secteur et les intégrons nativement dans votre Infinite System.
                </p>
                <button className="px-6 py-3 bg-[#FFB332]/5 border border-[#FFB332]/20 rounded-full flex items-center gap-3 group/btn hover:bg-[#FFB332]/10 transition-all">
                  <div className="w-2 h-2 rounded-full border border-[#FFB332] group-hover/btn:scale-125 transition-transform"></div>
                  <span className="text-[#FFB332] text-[12px] font-bold tracking-wider uppercase">Développement illimité</span>
                </button>
              </div>
            </motion.div>

            {/* 3. Multi-Sites & Multi-Entités */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Multi-Sites & Multi-Entités</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed">
                   Gérez toutes vos filiales, agences et départements depuis un seul panneau. Consolidation des données, reporting unifié, gouvernance centralisée.
                </p>
              </div>
            </motion.div>

            {/* 4. SLA Garanti 99.9% */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🛰️</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">SLA Garanti 99.9%</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-10">
                  Accord de niveau de service contractuel. Monitoring 24/7, alertes instantanées, intervention en moins de 4h. Votre plateforme ne dort jamais.
                </p>
                
                {/* Uptime Visual */}
                <div className="bg-[#06080D]/50 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[#2BC673] text-4xl font-black">99.9%</span>
                  </div>
                  <p className="text-[#8D98AA] text-[10px] font-bold uppercase tracking-wider mb-6">Uptime garanti contractuellement</p>
                  
                  <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-[99.9%] bg-[#2BC673] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-[#8D98AA]">99.0</span>
                    <span className="text-[10px] text-[#8D98AA]">99.5</span>
                    <span className="text-[10px] text-[#8D98AA]">99.9%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. Rôles et Permissions Illimités */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500 md:col-span-2"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Rôles et Permissions Illimités</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-10 max-w-2xl">
                  Créez autant de rôles que nécessaire. Permissions granulaires par module, par page, par action. SSO / LDAP pour authentification centralisée en entreprise.
                </p>

                {/* Roles Table Visual */}
                <div className="space-y-3">
                  {[
                    { label: "ADMIN", color: "text-[#FFB332] bg-[#FFB332]/10", desc: "Contrôle total de l'instance", tag: "Tout" },
                    { label: "DIRECTION", color: "text-[#6EA7EA] bg-[#6EA7EA]/10", desc: "KPIs + validation stratégique", tags: ["Lecture", "Rapports"] },
                    { label: "OPÉRATIONS", color: "text-[#2BC673] bg-[#2BC673]/10", desc: "CRM + Projects + Comms", tags: ["Écriture", "-Finance"] },
                    { label: "PARTENAIRES", color: "text-[#B197FC] bg-[#B197FC]/10", desc: "Vue limitée + commissions", tag: "Referral" }
                  ].map((role, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#06080D]/40 border border-white/5 p-4 rounded-xl group/role hover:border-white/10 transition-colors">
                      <div className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${role.color}`}>{role.label}</div>
                      <div className="text-[13px] text-[#8D98AA] flex-1">{role.desc}</div>
                      <div className="flex gap-2">
                        {role.tag && <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-[#8D98AA]">{role.tag}</span>}
                        {role.tags?.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-[#8D98AA]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 6. API Complète & Webhooks */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🔗</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">API Complète & Webhooks</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed mb-8">
                  API REST complète documentée. Webhooks en temps réel. Connectez Infinite System à votre ERP existant, vos outils BI ou vos systèmes legacy.
                </p>

                {/* Code Visual */}
                <div className="bg-[#06080D] border border-white/5 rounded-xl p-6 font-mono text-[12px] space-y-2 overflow-hidden shadow-2xl">
                  <p><span className="text-[#6EA7EA]">GET</span> <span className="text-[#F2F4F8]">/api/v1/clients</span></p>
                  <p><span className="text-[#FFB332]">POST</span> <span className="text-[#F2F4F8]">/api/v1/invoices</span></p>
                  <p><span className="text-[#2BC673]">Authorization:</span> <span className="text-[#8D98AA]">Bearer {"{token}"}</span></p>
                </div>
              </div>
            </motion.div>

            {/* 7. Conformité & Audit */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1320] border border-white/5 p-10 rounded-[32px] overflow-hidden relative group hover:border-white/10 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#161B28] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F2F4F8] mb-4">Conformité & Audit</h3>
                <p className="text-[#8D98AA] text-[15px] leading-relaxed">
                  Audit logs complets de chaque action. Conformité loi ivoirienne n°2013-450, OHADA, CNPS. Rapport de conformité généré sur demande pour vos auditeurs.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTEURS SERVIS (BENTO STYLE MATCHING IMAGE) */}
      <section className="py-24 bg-[#06080D] border-t border-white/5 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-[900px]">
          <div className="text-center mb-16">
            <span className="text-[#8D98AA] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
              SECTEURS SERVIS
            </span>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 group"
          >
            {[
              { emoji: "🏛️", name: "Institutions" },
              { emoji: "🏦", name: "Finance & Banque" },
              { emoji: "🏗️", name: "BTP & Immobilier" },
              { emoji: "🎓", name: "Éducation" },
              { emoji: "🏥", name: "Santé" },
              { emoji: "🌍", name: "ONG & Impact" }
            ].map((sect, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className={`
                  p-12 border-white/5 flex items-center gap-6 hover:bg-white/[0.02] transition-colors
                  ${i % 2 === 0 ? 'border-b md:border-r' : 'border-b'}
                  ${i === 0 ? 'rounded-tl-[32px]' : ''}
                  ${i === 1 ? 'md:rounded-tr-[32px]' : ''}
                  ${i === 4 ? 'md:rounded-bl-[32px]' : ''}
                  ${i === 5 ? 'rounded-br-[32px]' : ''}
                `}
              >
                <span className="text-4xl">{sect.emoji}</span>
                <span className="text-[#F2F4F8] text-[20px] font-bold tracking-tight">{sect.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (NEW) */}
      <section className="py-24 bg-[#06080D] relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-[#FFB332] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 inline-flex items-center before:content-[''] before:w-6 before:h-[1px] before:bg-[#FFB332] before:mr-3 after:content-[''] after:w-6 after:h-[1px] after:bg-[#FFB332] after:ml-3">
              ILS NOUS FONT CONFIANCE
            </span>
            <h2 className="text-4xl md:text-[50px] font-black text-[#F2F4F8] tracking-tight">Ce que disent nos clients</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { t: "« Avant Infinite Core, je ne savais pas combien j'avais en caisse avant que mon comptable me rappelle. Maintenant je regarde mon tableau de bord le matin comme mon téléphone. »", name: "Kofi A.", role: "CEO — BTP, Cocody", init: "KA", bg: "bg-[#F6A928]" },
              { t: "« Le module CRM a remplacé nos 3 tableaux Excel et notre groupe WhatsApp commercial. Mes commerciaux ont enfin un outil sérieux. »", name: "Awa K.", role: "Responsable commerciale, Import-export", init: "AK", bg: "bg-[#6EA7EA]" },
              { t: "« On a déployé Infinite Core en 5 jours. Le support répond sur WhatsApp le jour même. C'est ça la vraie différence avec les logiciels européens. »", name: "Marc T.", role: "DG — Cabinet conseil, Plateau", init: "MT", bg: "bg-[#2BC673]" }
            ].map((testi, i) => (
              <motion.div key={i} variants={itemVariants} className="group bg-[#0A1020] border border-white/5 rounded-[24px] p-8 md:p-10 relative flex flex-col justify-between hover:border-[#FFB332]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,179,50,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB332]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Quote className="absolute top-8 right-8 text-white/[0.03] w-16 h-16 pointer-events-none group-hover:text-[#FFB332]/10 transition-colors duration-500" />
                <div className="mb-6 flex">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-[#FFB332] fill-[#FFB332] mr-1" />)}
                </div>
                <p className="text-[#8D98AA] text-[15px] italic leading-relaxed mb-10 min-h-[120px]">
                  {testi.t}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-[#06080D] ${testi.bg}`}>
                    {testi.init}
                  </div>
                  <div>
                    <p className="text-[#F2F4F8] text-[14px] font-bold">{testi.name}</p>
                    <p className="text-[#8D98AA] text-[11px]">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TARIFS (REDESIGNED MATCHING IMAGES) */}
      <section id="tarifs" className="py-24 bg-[#06080D] border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="text-center mb-20">
            <span className="text-[#FFB332] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 inline-flex items-center before:content-[''] before:w-6 before:h-[1px] before:bg-[#FFB332] before:mr-3 after:content-[''] after:w-6 after:h-[1px] after:bg-[#FFB332] after:ml-3">
              TARIFS
            </span>
            <h2 className="text-4xl md:text-[56px] font-black text-[#F2F4F8] tracking-tight mb-4 text-gradient">Le plan qu'il vous faut.</h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            
            {/* PACK DÉCOUVERTE (IMAGE 1) */}
            <motion.div variants={itemVariants} className="bg-[#0D1320] border border-white/5 rounded-[32px] p-10 flex flex-col hover:border-white/10 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB332]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#8D98AA] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 block">PACK DÉCOUVERTE</span>
                <h3 className="text-3xl font-black text-white mb-3">Démarrer</h3>
                <p className="text-[#8D98AA] text-[15px] mb-10 min-h-[46px]">Pour structurer votre première solution clé.</p>
                
                <div className="bg-[#0A1020] border border-[#FFB332]/20 rounded-2xl px-5 py-5 flex items-center gap-4 mb-8 shadow-inner shadow-[#FFB332]/5">
                  <span className="text-[#2BC673] text-xl">🧩</span>
                  <span className="text-[#F2F4F8] text-[15px] font-bold">1 solution configurée</span>
                </div>

                <div className="h-[1px] bg-white/5 w-full mb-8"></div>

                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    '1 module Infinite Core au choix',
                    'Configuration et mise en place',
                    'Formation incluse (1h)',
                    'Support email + mises à jour'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded border border-[#FFB332]/40 bg-[#FFB332]/10 flex items-center justify-center mt-0.5 shadow-[0_0_10px_rgba(255,179,50,0.1)]">
                        <Check size={12} className="text-[#FFB332]" strokeWidth={4} />
                      </div>
                      <span className="text-[14px] text-[#8D98AA] font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup" className="w-full text-center px-6 py-5 bg-transparent border border-white/10 hover:bg-white/5 text-[#F2F4F8] font-bold text-[16px] rounded-[20px] transition-all mb-4 group/btn">
                  Créer mon compte <span className="inline-block transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </Link>
                <p className="text-[11px] text-[#8D98AA]/60 text-center italic">Prix communiqué après inscription</p>
              </div>
            </motion.div>

            {/* PACK CROISSANCE (IMAGE 3) */}
            <motion.div variants={itemVariants} className="bg-[#0D1320] border-2 border-[#1B253D] rounded-[32px] p-10 flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 md:scale-105 group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5B89C3] text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.1em] uppercase shadow-lg z-20">
                LE PLUS POPULAIRE
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B89C3]/[0.03] to-transparent opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#8D98AA] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 block mt-2">PACK CROISSANCE</span>
                <h3 className="text-3xl font-black text-white mb-3">Croître</h3>
                <p className="text-[#8D98AA] text-[15px] mb-10 min-h-[46px]">3 solutions connectées pour PME ambitieuses.</p>
                
                <div className="bg-[#0A1020] border border-[#FFB332]/40 rounded-2xl px-5 py-5 flex items-center gap-4 mb-8 shadow-inner shadow-[#FFB332]/10 relative overflow-hidden group/shimmer">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB332]/10 to-transparent animate-shimmer"></div>
                  <span className="text-[#FFB332] text-xl relative z-10">🚀</span>
                  <span className="text-[#F2F4F8] text-[15px] font-bold relative z-10">3 solutions connectées</span>
                </div>

                <div className="h-[1px] bg-white/5 w-full mb-8"></div>

                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    '3 modules Infinite Core connectés',
                    'Onboarding dédié équipe Noya',
                    'Support WhatsApp prioritaire',
                    'Portail client complet'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded border border-[#FFB332]/40 bg-[#FFB332]/10 flex items-center justify-center mt-0.5 shadow-[0_0_10px_rgba(255,179,50,0.2)]">
                        <Check size={12} className="text-[#FFB332]" strokeWidth={4} />
                      </div>
                      <span className="text-[14px] text-[#8D98AA] font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup" className="w-full text-center px-6 py-5 bg-[#FFB332] hover:bg-[#F6A928] text-[#06080D] font-black text-[16px] rounded-[20px] transition-all shadow-[0_10px_40px_rgba(255,179,50,0.4)] mb-4 hover:scale-[1.02] transform transition-transform group/btn">
                  Créer mon compte <span className="inline-block transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </Link>
                <p className="text-[11px] text-[#8D98AA]/60 text-center italic">Prix communiqué après inscription</p>
              </div>
            </motion.div>

            {/* ENTERPRISE (IMAGE 2) */}
            <motion.div variants={itemVariants} className="bg-[#0D1320] border border-white/5 rounded-[32px] p-10 flex flex-col hover:border-white/10 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B89C3]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#8D98AA] text-[10px] font-bold tracking-[0.15em] uppercase mb-4 block">INFINITE SYSTEM</span>
                <h3 className="text-3xl font-black text-white mb-3">Enterprise</h3>
                <p className="text-[#8D98AA] text-[15px] mb-10 min-h-[46px]">Personnalisation illimitée pour grandes structures.</p>
                
                <div className="bg-[#0A1020] border border-[#5B89C3]/20 rounded-2xl px-5 py-5 flex items-center gap-4 mb-8 shadow-inner shadow-[#5B89C3]/5">
                  <span className="text-[#5B89C3] text-xl">⚡</span>
                  <span className="text-[#F2F4F8] text-[15px] font-bold">Infinite System complet</span>
                </div>

                <div className="h-[1px] bg-white/5 w-full mb-8"></div>

                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    'White label + branding complet',
                    'Infrastructure dédiée + SLA 99.9%',
                    'Modules sur mesure illimités',
                    'API + SSO + LDAP + Audit logs'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded border border-[#FFB332]/40 bg-[#FFB332]/10 flex items-center justify-center mt-0.5">
                        <Check size={12} className="text-[#FFB332]" strokeWidth={4} />
                      </div>
                      <span className="text-[14px] text-[#8D98AA] font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/contact" className="w-full text-center px-6 py-5 bg-[#5B89C3] hover:bg-[#4A78B2] text-white font-black text-[16px] rounded-[20px] transition-all shadow-[0_10px_30px_rgba(91,137,195,0.3)] mb-4 group/btn">
                  Demander une démo <span className="inline-block transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </Link>
                <p className="text-[11px] text-[#8D98AA]/60 text-center italic mb-8">Tarification sur devis</p>

                {/* Service Badges (Image 2 Bottom) */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  {[
                    { icon: "🔒", t: "Aucun paiement en ligne" },
                    { icon: "📱", t: "Wave & Orange Money" },
                    { icon: "💬", t: "Contact WhatsApp 24h" },
                    { icon: "💳", t: "Aucune carte bancaire" }
                  ].map((badge, b) => (
                    <div key={b} className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2 hover:bg-white/10 transition-colors">
                      <span className="text-[14px]">{badge.icon}</span>
                      <span className="text-[8px] font-black text-[#8D98AA] leading-tight uppercase tracking-widest">{badge.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* CTA Enterprise (MATCHING IMAGE 2) */}
      <section className="py-24 relative z-10 bg-[#06080D]">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-[#0D1320] border border-white/5 rounded-[32px] p-10 md:p-14 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#6EA7EA]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Discutons de votre projet<br/>
                  <span className="text-[#6EA7EA]">Enterprise.</span>
                </h3>
                
                <p className="text-[#8D98AA] text-[16px] leading-relaxed mb-10">
                  Notre équipe analyse votre structure, vos besoins spécifiques et vous propose une architecture Infinite System sur mesure. Aucun engagement requis pour la première consultation.
                </p>
                
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/contact" 
                    className="flex items-center justify-between px-8 py-5 bg-[#5B89C3] hover:bg-[#4A78B2] text-white font-bold rounded-2xl transition-all group/cta shadow-[0_10px_30px_rgba(91,137,195,0.2)]"
                  >
                    Demander une démo Enterprise
                    <ArrowRight className="group-hover/cta:translate-x-1 transition-transform" size={20} />
                  </Link>
                  
                  <Link 
                    to="/tarifs" 
                    className="flex items-center justify-between px-8 py-5 bg-transparent border border-white/10 hover:bg-white/5 text-[#8D98AA] hover:text-[#F2F4F8] font-bold rounded-2xl transition-all"
                  >
                    Voir les plans et tarifs
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION CTA "PRÊT À COMMENCER ?" (MATCHING IMAGE) */}
      <section className="py-24 md:py-32 relative z-10 bg-[#06080D] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[14px] font-bold tracking-[0.2em] text-[#8D98AA] uppercase mb-10 opacity-60"
            >
              — PRÊT À COMMENCER ? —
            </motion.h2>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-[60px] font-black text-white leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto"
            >
              Rejoignez les 97 entreprises qui pilotent leur croissance.
            </motion.h1>
 
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[17px] md:text-[20px] text-[#8D98AA] mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Gratuit. Aucune carte bancaire. Notre équipe vous accompagne à chaque étape — de l'inscription au déploiement final.
            </motion.p>
 
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <Link 
                to="/signup" 
                className="group inline-flex items-center justify-center px-10 py-5 bg-[#F2A13D] hover:bg-[#E2912D] text-[#06080D] font-black text-[18px] rounded-[22px] transition-all shadow-[0_15px_40px_rgba(242,161,61,0.25)] hover:shadow-[0_20px_50px_rgba(242,161,61,0.35)] hover:scale-[1.02] active:scale-95"
              >
                Créer mon compte gratuitement 
                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[14px] text-[#8D98AA] font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-[#F2A13D]">✓</span> Gratuit
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F2A13D]">✓</span> Sans carte bancaire
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F2A13D]">✓</span> Prêt en 2 minutes
                </div>
              </div>
              <div className="flex justify-center text-[14px] text-[#8D98AA] font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-[#F2A13D]">✓</span> Support WhatsApp inclus
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
}