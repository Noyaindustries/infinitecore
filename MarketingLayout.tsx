import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../../firebase';
import Logo from '../Logo';
import { useAuth } from '../FirebaseProvider';

export default function MarketingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const role = userData?.role;
  const accountSpaces =
    role === 'admin'
      ? [
          { to: '/superadmin', label: 'Espace SuperAdmin' },
          { to: '/admin', label: 'Espace Commando' },
        ]
      : role === 'commando'
        ? [{ to: '/admin', label: 'Espace Commando' }]
        : role === 'developer'
          ? [{ to: '/developer', label: 'Espace Développeur' }]
          : role === 'partner'
            ? [{ to: '/partenaire', label: 'Espace Partenaire' }]
            : [{ to: '/dashboard', label: 'Mon espace client' }];

  const handleLogout = async () => {
    localStorage.removeItem('demoRole');
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-[100dvh] font-sans text-text-secondary bg-surface-primary flex flex-col selection:bg-noya-blue/30">
      {/* HEADER */}
      <header className="bg-surface-primary/90 backdrop-blur-xl text-text-primary sticky top-0 z-50 border-b border-border-subtle">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex-1 flex justify-start pl-2">
            <Link to="/" className="flex-shrink-0 h-10 sm:h-12 md:h-24 w-auto flex items-center transition-all duration-300">
              <Logo lightText className="h-full" />
            </Link>
          </div>
          
          {/* Desktop Nav - Parfaitement centré */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[15px] font-medium">
            <Link to="/solutions" className="text-text-secondary hover:text-text-primary transition-colors">Solutions</Link>
            <Link to="/a-propos" className="text-text-secondary hover:text-text-primary transition-colors">À propos</Link>
            <Link to="/tarifs" className="text-text-secondary hover:text-text-primary transition-colors">Tarifs</Link>
            <Link to="/faq" className="text-text-secondary hover:text-text-primary transition-colors">FAQ</Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-3">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 bg-surface-secondary hover:bg-surface-tertiary border border-border-subtle px-4 py-2 rounded-full transition-colors text-text-primary text-sm">
                  <div className="w-7 h-7 rounded-full bg-noya-blue flex items-center justify-center text-xs font-bold text-white">
                    {userData?.firstName?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:inline">Mon espace</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 bg-surface-secondary text-text-secondary rounded-xl shadow-2xl border border-border-subtle overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  {accountSpaces.map((space) => (
                    <Link key={space.to} to={space.to} className="block px-4 py-3 hover:bg-surface-tertiary hover:text-text-primary transition-colors text-sm">
                      {space.label}
                    </Link>
                  ))}
                  {role === 'client' && (
                    <>
                      <Link to="/dashboard/profil" className="block px-4 py-3 hover:bg-surface-tertiary hover:text-text-primary transition-colors text-sm">Mon profil</Link>
                      <Link to="/dashboard/boutique" className="block px-4 py-3 hover:bg-surface-tertiary hover:text-text-primary transition-colors text-sm">Boutique & Services</Link>
                    </>
                  )}
                  <div className="border-t border-border-subtle" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-surface-tertiary transition-colors text-noya-red text-sm">
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-text-secondary hover:text-text-primary transition-colors px-4 py-2 text-sm">
                  Connexion
                </Link>
                <Link to="/signup" className="bg-noya-orange hover:brightness-110 text-noya-black px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(255,179,50,0.2)] hover:shadow-[0_0_30px_rgba(255,179,50,0.3)]">
                  Créer mon compte
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav - Slide Down */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="bg-surface-secondary border-t border-border-subtle px-6 py-6 space-y-5">
            {/* Nav Links */}
            <nav className="space-y-1">
              {[
                { to: '/solutions', label: 'Solutions' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/tarifs', label: 'Tarifs' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-3 px-3 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="pt-4 border-t border-border-subtle">
              {user ? (
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest px-3 mb-2">Mon compte</p>
                  {accountSpaces.map((space) => (
                    <Link
                      key={space.to}
                      to={space.to}
                      className="block py-3 px-3 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {space.label}
                    </Link>
                  ))}
                  {role === 'client' && (
                    <>
                      <Link to="/dashboard/profil" className="block py-3 px-3 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all text-sm" onClick={() => setIsMenuOpen(false)}>Mon profil</Link>
                      <Link to="/dashboard/boutique" className="block py-3 px-3 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all text-sm" onClick={() => setIsMenuOpen(false)}>Boutique & Services</Link>
                    </>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left py-3 px-3 text-noya-red hover:bg-noya-red/10 rounded-xl font-medium text-sm transition-all mt-2"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-3 text-text-secondary hover:text-text-primary border border-border-subtle rounded-xl transition-all font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-3 bg-noya-orange text-noya-black rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,179,50,0.2)]"
                  >
                    Créer mon compte
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-surface-secondary text-text-muted py-12 sm:py-16 border-t border-border-subtle">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Footer Top */}
          <div className="flex flex-col items-center text-center mb-10">
            <Logo lightText />
            <p className="mt-4 text-text-secondary text-sm max-w-md">
              The Operating System for African Business
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm mb-10">
            <Link to="/mentions-legales" className="hover:text-text-primary transition-colors">Mentions légales</Link>
            <Link to="/cgu" className="hover:text-text-primary transition-colors">CGU</Link>
            <Link to="/cgv" className="hover:text-text-primary transition-colors">CGV</Link>
            <Link to="/confidentialite" className="hover:text-text-primary transition-colors">Confidentialité</Link>
            <Link to="/cookies" className="hover:text-text-primary transition-colors">Politique Cookies</Link>
            <Link to="/staff/login" className="hover:text-text-primary transition-colors">Espace Staff</Link>
            <button
              onClick={() => { localStorage.removeItem('ic_consent'); window.location.reload(); }}
              className="hover:text-text-primary transition-colors"
            >
              Gestion des cookies
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-text-dim border-t border-border-subtle pt-8">
            © {new Date().getFullYear()} Infinite Core by Noya Industries. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
