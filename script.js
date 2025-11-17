// Scroll reveal using IntersectionObserver
// Adds `.active` to `.reveal` and its `.reveal-child` children when in view

document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // Fallback: activate all reveals
    reveals.forEach(r => r.classList.add('active'));
    const childs = document.querySelectorAll('.reveal-child');
    childs.forEach(c => c.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Activate immediate children marked as reveal-child with a small stagger
        const children = el.querySelectorAll('.reveal-child');
        if (children.length) {
          children.forEach((c, i) => {
            c.style.transitionDelay = `${i * 100}ms`;
            c.classList.add('active');
          });
        }
        // Activate the container last (small delay to allow children to start)
        setTimeout(() => el.classList.add('active'), 60);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));
});

  // Theme toggle: persist user choice and apply dark class on <html>
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function applyTheme(theme){
      if(theme === 'dark'){
        root.classList.add('dark');
        if(toggle) toggle.textContent = '☀️';
      } else {
        root.classList.remove('dark');
        if(toggle) toggle.textContent = '🌙';
      }
      try { localStorage.setItem('theme', theme); } catch(e){}
    }

    // Initialize theme from localStorage or system preference
    const saved = (() => { try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
    if(saved) applyTheme(saved);
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
    else applyTheme('light');

    if(toggle){
      toggle.addEventListener('click', () => {
        const isDark = root.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }
  });
