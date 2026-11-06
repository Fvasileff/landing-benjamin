import { CONTACTO } from '@/lib/site';

const NUMERO = CONTACTO.telefonoE164.replace(/\D/g, '');

export const WHATSAPP_URL = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
  'Hola, quisiera solicitar mi primera consulta de 15 minutos sin costo.'
)}`;

export const TEL_URL = `tel:${CONTACTO.telefonoE164}`;

export const NAV_LINKS = [
  { href: '#areas', label: 'Áreas' },
  { href: '#abogado', label: 'Sobre mí' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
];
