/**
 * Comportamentos de interface compartilhados: cabeçalho, menu móvel, revelação ao rolar e item ativo.
 */

const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

/* Cabeçalho: estado "rolado" */
if (header) {
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* Menu móvel */
function setMenu(open: boolean) {
  if (!toggle || !menu || !header) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  header.toggleAttribute('data-menu-open', open);
  document.documentElement.toggleAttribute('data-menu-lock', open);
}

if (toggle && menu) {
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 980px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

/* Revelação suave */
const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce || !('IntersectionObserver' in window)) {
  revealItems.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealItems.forEach((el) => io.observe(el));
}

/* Item de menu ativo conforme a seção visível */
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
if (links.length && 'IntersectionObserver' in window) {
  const map = new Map<string, HTMLAnchorElement>();
  links.forEach((a) => map.set(a.getAttribute('href')?.replace('#', '') ?? '', a));
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = map.get(entry.target.id);
        if (!link) continue;
        if (entry.isIntersecting) {
          links.forEach((a) => a.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  map.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
}
