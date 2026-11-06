'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Scale, X } from 'lucide-react';
import { NAV_LINKS } from './site-links';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-slate-950/80 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Santillán y Asociados — Inicio">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent transition-colors group-hover:border-amber-400/50">
            <Scale size={18} className="text-amber-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide text-white">Santillán y Asociados</span>
            <span className="mt-1.5 font-mono text-[11px] tracking-[0.3em] text-slate-400">
              ESTUDIO JURÍDICO
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_0_0_0_rgba(245,158,11,0)] transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(245,158,11,0.5)]"
          >
            Consulta 15 min sin costo
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-amber-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3 text-sm font-medium text-slate-950"
          >
            Consulta 15 min sin costo
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
