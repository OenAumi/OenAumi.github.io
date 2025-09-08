// Drawer functionality
const toggle = document.querySelector('.nav-toggle');
const drawer = document.querySelector('.nav-drawer');
const scrim = document.querySelector('.scrim');
const main = document.querySelector('main');

function openDrawer(open = false) {
  // Toggle drawer
  drawer.classList.toggle('open', open);
  
  // Toggle aria-expanded
  toggle.setAttribute('aria-expanded', String(open));
  
  // Toggle scrim
  scrim.hidden = !open;
  scrim.classList.toggle('open', open);
  
  // Toggle body scroll lock
  document.body.classList.toggle('drawer-open', open);
  
  // Handle focus trap
  if (main && 'inert' in HTMLElement.prototype) {
    main.inert = open;
  }
}

// Event Listeners
toggle.addEventListener('click', (e) => {
  e.preventDefault();
  const isOpen = drawer.classList.contains('open');
  openDrawer(!isOpen);
});

// Close on scrim click
scrim.addEventListener('click', () => {
  openDrawer(false);
});

// Close on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    openDrawer(false);
  }
});

// Close on nav link click
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    openDrawer(false);
  });
});

// ===== Tandai link aktif otomatis (kalau lupa set aria-current) =====
(function markActive(){
  // Ambil nama file terakhir dari URL, default ke index.html
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('#site-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (!a.hasAttribute('aria-current') && href && path === href){
      a.setAttribute('aria-current','page');
    }
  });
})();

// Tandai menu aktif otomatis
function markActiveMenu() {
  // Ambil path terakhir dari URL, default ke index.html
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  
  document.querySelectorAll('#site-nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    // Cek jika homepage
    if (path === 'index.html' && href === 'index.html') {
      link.setAttribute('aria-current', 'page'); 
    }
    // Cek halaman lain
    else if (path === href) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Panggil saat load
markActiveMenu();

// Tambahkan di main.js
function handleError(err) {
  console.error('App Error:', err);
  // Tampilkan pesan error yang user-friendly
}

try {
  // Wrap existing drawer code
} catch(err) {
  handleError(err);
}

// Intersection Observer for rail animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rail = entry.target.closest('.rail');
      if (rail) {
        rail.querySelectorAll('.card').forEach(card => {
          card.classList.add('is-visible');
        });
      }
    }
  });
}, observerOptions);

// Observe rail sections instead of individual cards
document.querySelectorAll('.rail').forEach(rail => {
  observer.observe(rail);
});

// Horizontal scroll effect
function initRailScroll() {
  const railContainer = document.querySelector('.rail-container');
  const rail = document.querySelector('.rail');
  const cards = rail.querySelectorAll('.rail-card');
  const totalCards = cards.length;

  window.addEventListener('scroll', () => {
    if (railContainer && rail) {
      const rect = railContainer.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      
      // Adjust scroll range for better distribution
      const adjustedProgress = Math.max(0, Math.min(1, scrollProgress * 1.2));
      
      // Apply transforms to each card
      cards.forEach((card, index) => {
        const moveX = adjustedProgress * 100 * (totalCards - 1);
        card.style.transform = `translateX(${index * 100 - moveX}%)`;
      });
    }
  });
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', initRailScroll);
