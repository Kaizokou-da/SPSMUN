// ================== THEME TOGGLE ==================
const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme from local storage
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  body.className = storedTheme;
} else {
  body.className = "theme-default";
}

// Toggle between default and dark
if (toggle) {
  toggle.addEventListener("click", () => {
    if (body.classList.contains("theme-default")) {
      body.className = "theme-dark";
      localStorage.setItem("theme", "theme-dark");
    } else {
      body.className = "theme-default";
      localStorage.setItem("theme", "theme-default");
    }
  });
}

// ================== NAVIGATION (Hamburger, Backdrop, Submenus, Shrink) ==================
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const header = document.querySelector('.luxury-header');
  let lastScrollTop = 0;

  // Hamburger menu toggle
  if (navToggle && mainNav && navBackdrop) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('show');
      navBackdrop.classList.toggle('show');
      this.classList.toggle('open');
      body.classList.toggle('menu-open');
    });

    // Close nav if backdrop is clicked
    navBackdrop.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', false);
      mainNav.classList.remove('show');
      navBackdrop.classList.remove('show');
      navToggle.classList.remove('open');
      body.classList.remove('menu-open');
    });
  }

  // Toggle submenus on mobile
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        item.classList.toggle('show-sub');
      }
    });
  });

  // Shrink navbar on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
    });
  }

  // Hide/show main nav on scroll down/up
  const mainNavScroll = document.querySelector('.main-nav');
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (mainNavScroll) {
      if (currentScroll > lastScrollTop) {
        mainNavScroll.classList.add('hidden');
      } else {
        mainNavScroll.classList.remove('hidden');
      }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

// ================== BACK TO TOP BUTTON ==================
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ================== HERO PARALLAX EFFECT ==================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      this.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
  }
});

// ================== HERO COUNTDOWN TIMER ==================
document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('hero-countdown');
  if (countdown) {
    function updateCountdown() {
      const eventDate = new Date('2025-09-10T09:00:00');
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        countdown.textContent = "The conference is live!";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      countdown.textContent = `Conference starts in ${days}d ${hours}h ${mins}m`;
    }
    setInterval(updateCountdown, 60000);
    updateCountdown();
  }
});

// ================== ANIMATED STATS COUNTER ==================
document.addEventListener('DOMContentLoaded', () => {
  function animateStat(el) {
    const target = +el.dataset.animate;
    let count = 0;
    const step = Math.ceil(target / 60);
    function update() {
      count += step;
      if (count > target) count = target;
      el.textContent = count;
      if (count < target) requestAnimationFrame(update);
    }
    update();
  }
  const stats = document.querySelectorAll('.stat-number[data-animate]');
  let animated = false;
  function checkStats() {
    if (animated) return;
    const trigger = window.innerHeight + window.scrollY > (stats[0]?.offsetTop || 0);
    if (trigger) {
      stats.forEach(animateStat);
      animated = true;
    }
  }
  if (stats.length) {
    window.addEventListener('scroll', checkStats);
    checkStats();
  }
});

// ================== TESTIMONIALS CAROUSEL (Auto-scroll) ==================
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('testimonial-carousel');
  if (carousel && carousel.children.length > 1) {
    let idx = 0;
    const cards = carousel.children;
    setInterval(() => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = i === idx ? 'block' : 'none';
      }
      idx = (idx + 1) % cards.length;
    }, 3500);
  }
});

// ================== SCROLL REVEAL ANIMATION ==================
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
  }
});

// ================== AOS INIT (Animate On Scroll) ==================
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});

// ================== CONTACT PAGE: TOGGLE INFO ON MOBILE ==================
function toggleInfo() {
  const info = document.querySelector('.contact-info-container');
  const toggle = document.querySelector('.info-toggle');
  if (info && toggle) {
    if (info.style.display === "none" || !info.style.display || info.style.display === "") {
      info.style.display = "flex";
      toggle.textContent = "Hide Contact Details";
    } else {
      info.style.display = "none";
      toggle.textContent = "Show Contact Details";
    }
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const infoContainer = document.querySelector('.contact-info-container');
  const infoToggle = document.querySelector('.info-toggle');
  if (infoContainer && infoToggle) {
    if (window.innerWidth <= 768) {
      infoToggle.style.display = 'block';
      infoContainer.style.display = 'none';
    } else {
      infoToggle.style.display = 'none';
      infoContainer.style.display = 'flex';
    }
  }
});
window.addEventListener('resize', () => {
  const infoContainer = document.querySelector('.contact-info-container');
  const infoToggle = document.querySelector('.info-toggle');
  if (infoContainer && infoToggle) {
    if (window.innerWidth <= 768) {
      infoToggle.style.display = 'block';
      if (infoContainer.style.display !== 'none') {
        infoContainer.style.display = 'none';
        infoToggle.textContent = "Show Contact Details";
      }
    } else {
      infoToggle.style.display = 'none';
      infoContainer.style.display = 'flex';
    }
  }
});

// ================== CONTACT FORM SUBMIT (AJAX + TOAST) ==================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById("toast");
  if (form && toast) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitButton = form.querySelector('.submit-btn');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      fetch('process_contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.textContent = data.message || "Message sent! We’ll get back to you shortly.";
          toast.style.backgroundColor = '#301934';
          form.reset();
        } else {
          toast.textContent = data.message || "Failed to send message. Please try again.";
          toast.style.backgroundColor = '#d9534f';
        }
      })
      .catch(() => {
        toast.textContent = "An error occurred. Please try again later.";
        toast.style.backgroundColor = '#d9534f';
      })
      .finally(() => {
        toast.style.visibility = "visible";
        toast.style.opacity = "1";
        toast.style.bottom = "40px";
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.bottom = "0px";
          setTimeout(() => toast.style.visibility = "hidden", 500);
        }, 3500);
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
    });
  }
});

// ================== GALLERY FILTERING ==================
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const yearButtons = document.querySelectorAll('.year-btn');
  const items = document.querySelectorAll('.gallery-item');
  function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const activeYear = document.querySelector('.year-btn.active')?.dataset.year || '';
    items.forEach(item => {
      const matchesCategory = activeFilter === 'all' || item.classList.contains(activeFilter);
      const matchesYear = item.classList.contains(activeYear);
      item.style.display = (matchesCategory && matchesYear) ? 'block' : 'none';
    });
  }
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
  if (filterButtons.length && yearButtons.length && items.length) applyFilters();
});

// ================== HERO BACKGROUND CANVAS ANIMATION ==================
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.querySelector('.hero').offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    const dots = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: 0.2 + Math.random() * 0.3
    }));
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > w) d.dx *= -1;
        if (d.y < 0 || d.y > h) d.dy *= -1;
        ctx.globalAlpha = d.o;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    animate();
  }
});
