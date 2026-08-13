import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/content.js";

function NavLink({ item, isHome, className, onClick }) {
  if (item.isRoute) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  // Anchor link: normal <a> on the home page (native scroll),
  // or a Link back to "/" + hash from any other page.
  return isHome ? (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  ) : (
    <Link to={`/${item.href}`} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink-900/85 backdrop-blur-md border-b border-ink-500/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16 md:h-20">
        <a
          href="#accueil"
          className="font-display font-semibold text-lg tracking-tight text-cream"
        >
         Oh my Esmel<span className="text-gold"> !!!</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isHome={isHome}
              className="text-sm text-muted hover:text-cream transition-colors"
            />
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink-950 transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-cream p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-ink-900/97 backdrop-blur-md border-b border-ink-500/60"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isHome={isHome}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-cream/90 border-b border-ink-500/40 last:border-none"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
