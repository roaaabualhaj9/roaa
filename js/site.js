const header = document.querySelector('header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
const back = document.querySelector('.back');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];

function closeMenu() {
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open navigation');
  menu?.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
}

function setActiveLink(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    active ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current');
  });
}

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav?.classList.toggle('open', !open);
  menu.querySelector('i').className = open ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
});

nav?.addEventListener('click', event => {
  if (event.target.matches('a')) closeMenu();
});

addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('show'));
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.find(entry => entry.isIntersecting);
    if (visible) setActiveLink(visible.target.id);
  }, { rootMargin: '-25% 0px -60%', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
} else {
  revealItems.forEach(item => item.classList.add('show'));
}

addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', scrollY > 12);
  back?.classList.toggle('show', scrollY > 600);
  if (scrollY < 100) setActiveLink('top');
}, { passive: true });

back?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.message');

  if (!form.checkValidity()) {
    form.reportValidity();
    message.textContent = 'Please complete the required fields with a valid email address.';
    return;
  }

  message.textContent = 'Online enquiries are not connected yet. Please email hello@codegy.co.';
});
