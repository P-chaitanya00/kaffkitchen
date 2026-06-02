// ==========================================================================
// KAFF Luxury Kitchen — Core Script File
// ==========================================================================

// --- Mock Database ---
const defaultProducts = [
  {
    id: 'prod-001',
    name: 'KOB 73 SS Built-in Oven',
    category: 'Ovens',
    price: 64990,
    originalPrice: 79990,
    rating: 4.8,
    image: 'images/oven.png',
    badge: 'Bestseller',
    description: 'Premium 73-litre European built-in oven with 10 cooking functions including true convection, rotisserie, and defrost. Sleek black glass front with stainless steel trim fits seamlessly into modular kitchens.',
    features: ['73L capacity cavity', '10 cooking functions', 'True European convection'],
    specs: {
      'Capacity': '73 Litres',
      'Power': '2800 W',
      'Dimensions': '595 × 595 × 567 mm',
      'Finish': 'Stainless Steel & Black Glass',
      'Warranty': '3 Years',
      'Energy Rating': 'A+ Rated'
    }
  },
  {
    id: 'prod-002',
    name: 'RAY 90 Auto-Clean Chimney',
    category: 'Chimneys',
    price: 32990,
    originalPrice: 42990,
    rating: 4.7,
    image: 'images/chimney.png',
    badge: 'New Launch',
    description: 'Ultra-quiet 90cm wall-mounted chimney with 1350 m³/hr suction and heat auto-clean technology. Touch panel and gesture control allow hands-free operation while cooking.',
    features: ['1350 m³/hr suction power', 'Heat auto-clean tech', 'Touch + gesture control'],
    specs: {
      'Capacity': '90 cm Width',
      'Power': '200 W',
      'Dimensions': '900 × 500 × 650 mm',
      'Finish': 'Matt Black Glass',
      'Warranty': '5 Years Motor',
      'Energy Rating': 'A Rated'
    }
  },
  {
    id: 'prod-003',
    name: 'KDW VI 60 Premium Dishwasher',
    category: 'Dishwashers',
    price: 54990,
    originalPrice: 64990,
    rating: 4.6,
    image: 'images/dishwasher.png',
    badge: 'Premium Care',
    description: 'Fully integrated 14-place setting dishwasher with 8 wash programs and AquaStop flood protection. Designed for Indian cookware with heavy-duty spray arms and an A+++ energy rating.',
    features: ['14 place settings', '8 wash programs', 'AquaStop protection'],
    specs: {
      'Capacity': '14 Place Settings',
      'Power': '1800 W',
      'Dimensions': '598 × 815 × 550 mm',
      'Finish': 'Fully Integrated',
      'Warranty': '2 Years',
      'Energy Rating': 'A+++ Rated'
    }
  },
  {
    id: 'prod-004',
    name: 'KHB 4B 78 SS Gas Hob',
    category: 'Hobs',
    price: 18990,
    originalPrice: 24990,
    rating: 4.9,
    image: 'images/hob.png',
    badge: 'Chef Choice',
    description: 'Professional 4-burner gas hob with high-efficiency brass burners, auto-pulse ignition, and flame failure safety device. Tempered glass surface provides easy cleaning and a refined look.',
    features: ['4 high-efficiency brass burners', 'Auto pulse ignition', 'Flame failure safety'],
    specs: {
      'Capacity': '4 Burners',
      'Power': '8.1 kW Total',
      'Dimensions': '780 × 520 × 55 mm',
      'Finish': 'Tempered Glass Finish',
      'Warranty': '2 Years',
      'Energy Rating': 'N/A'
    }
  },
  {
    id: 'prod-005',
    name: 'KRF 580 FD Refrigerator',
    category: 'Refrigerators',
    price: 89990,
    originalPrice: 109990,
    rating: 5.0,
    image: 'images/refrigerator.png',
    badge: 'Luxury French Door',
    description: 'Luxury 580-litre French-door refrigerator with dual cooling technology and convertible zones. Smart inverter compressor backed by a 10-year warranty ensures silent, energy-efficient operation.',
    features: ['580L convertible zones', 'Dual cooling technology', 'Smart inverter compressor'],
    specs: {
      'Capacity': '580 Litres',
      'Power': '150 W',
      'Dimensions': '835 × 680 × 1785 mm',
      'Finish': 'Black Brush Stainless',
      'Warranty': '10 Years Compressor',
      'Energy Rating': 'A+++ Rated'
    }
  },
  {
    id: 'prod-006',
    name: 'KMC 28 BI Convection Microwave',
    category: 'Microwaves',
    price: 22990,
    originalPrice: 28990,
    rating: 4.5,
    image: 'images/oven.png',
    badge: 'Built-in',
    description: 'Compact 28-litre built-in convection microwave with 40 auto-cook presets and multi-stage cooking. Black glass front integrates cleanly into your modular kitchen design.',
    features: ['28L convection cavity', '40 auto-cook menus', 'Multi-stage cooking'],
    specs: {
      'Capacity': '28 Litres',
      'Power': '1450 W',
      'Dimensions': '595 × 388 × 400 mm',
      'Finish': 'Black Glass + Stainless',
      'Warranty': '2 Years',
      'Energy Rating': 'N/A'
    }
  }
];

const defaultCollections = [
  { id: 'coll-default-ovens', name: 'Ovens', displayName: 'Built-in Ovens', count: 24, icon: `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`, image: 'images/oven.png' },
  { id: 'coll-default-hobs', name: 'Hobs', displayName: 'Hobs & Cooktops', count: 42, icon: `<svg viewBox="0 0 24 24"><ellipse cx="11" cy="13" rx="7" ry="5"></ellipse><path d="M18 13h4"></path><path d="M11 10a4.5 3 0 0 1 2 1.5"></path></svg>`, image: 'images/hob.png' },
  { id: 'coll-default-chimneys', name: 'Chimneys', displayName: 'Chimney Hoods', count: 36, icon: `<svg viewBox="0 0 24 24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59-3.41A2 2 0 1 1 14 8H2m15.59-3.41A2 2 0 1 1 19 8H2"></path></svg>`, image: 'images/chimney.png' },
  { id: 'coll-default-dishwashers', name: 'Dishwashers', displayName: 'Dishwashers', count: 18, icon: `<svg viewBox="0 0 24 24"><path d="M4 9h16M7 6h2M12 6h.01M8 14h8M12 17h2"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg>`, image: 'images/dishwasher.png' },
  { id: 'coll-default-refrigerators', name: 'Refrigerators', displayName: 'Refrigerators', count: 15, icon: `<svg viewBox="0 0 24 24"><path d="M7.5 4L16.5 4L12 12l8-4.5"></path><path d="M4 7.5L12 12L4 16.5"></path><path d="M16.5 20L12 12l4.5-8"></path><path d="M7.5 4L12 12L7.5 20"></path></svg>`, image: 'images/refrigerator.png' },
  { id: 'coll-default-microwaves', name: 'Microwaves', displayName: 'Microwaves', count: 12, icon: `<svg viewBox="0 0 24 24" style="stroke: rgba(255,255,255,0.15); fill: none; stroke-width: 1.5;"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="14" y2="8"></line><line x1="6" y1="12" x2="14" y2="12"></line><line x1="6" y1="16" x2="14" y2="16"></line><circle cx="18" cy="10" r="1"></circle><circle cx="18" cy="14" r="1"></circle></svg>`, image: 'images/oven.png' }
];

const products = [];

// Refreshes products list dynamically by merging custom products from LocalStorage
function refreshProductsDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  const deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
  const visibleDefaults = defaultProducts.filter(p => !deletedDefaultIds.includes(p.id));
  
  products.length = 0;
  products.push(...visibleDefaults, ...customList);
}
refreshProductsDatabase(); // Perform initial sync

const testimonials = [
  {
    name: 'Ananya Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    text: 'The RAY 90 Chimney is absolutely silent — I had to check twice that it was running. The gesture control is a game-changer when my hands are covered in masala.',
    product: 'RAY 90 Auto-Clean Chimney',
    avatar: 'AS'
  },
  {
    name: 'Rajesh Menon',
    location: 'Kochi, KL',
    rating: 5,
    text: 'We renovated our kitchen around the KRF French Door Refrigerator. The french-door design is gorgeous and the convertible freezer zone is incredibly practical for our family.',
    product: 'KRF 580 FD Refrigerator',
    avatar: 'RM'
  },
  {
    name: 'Priya Kapoor',
    location: 'New Delhi, DL',
    rating: 5,
    text: 'The 4-burner gas hob handles everything from delicate dosa tawas to heavy pressure cookers. The brass burners give precise control that cheaper hobs simply cannot match.',
    product: 'KHB 4B 78 SS Gas Hob',
    avatar: 'PK'
  },
  {
    name: 'Arjun Malhotra',
    location: 'Chandigarh, PB',
    rating: 4,
    text: 'The KDW dishwasher handles the aftermath of elaborate Indian meals without a single re-wash. The silent operation means we can run it overnight without disturbance.',
    product: 'KDW VI 60 Premium Dishwasher',
    avatar: 'AM'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroParticles();
  initProductFilter();
  initStatsObserver();
  initTestimonialsSlider();
  initComparisonEngine();
  initScrollReveal();
  initContactForm();
  initNewsletterForm();
  initScrollSpy();
  renderGallery();
});

// 1. Navigation Sticky Header & Mobile Drawer
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const toggleDrawer = () => {
    mobileDrawer.classList.toggle('open');
    drawerOverlay.classList.toggle('open');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  };

  mobileMenuBtn.addEventListener('click', toggleDrawer);
  drawerOverlay.addEventListener('click', toggleDrawer);
  
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close drawer on click
      toggleDrawer();
    });
  });
}

// 2. Dynamic Hero Floating Particles & Interactive Spotlight Follower
function initHeroParticles() {
  const hero = document.getElementById('home');
  if (!hero) return;

  // Track mouse movements to update radial spotlight coordinates
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });

  const count = 6;
  const positions = [
    { x: '12%', y: '25%', size: 4, delay: '0s' },
    { x: '88%', y: '20%', size: 3, delay: '1s' },
    { x: '75%', y: '70%', size: 5, delay: '2s' },
    { x: '20%', y: '82%', size: 3, delay: '3s' },
    { x: '50%', y: '35%', size: 4, delay: '1.5s' },
    { x: '92%', y: '60%', size: 3, delay: '2.5s' }
  ];

  positions.forEach(pos => {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = pos.x;
    p.style.top = pos.y;
    p.style.width = `${pos.size}px`;
    p.style.height = `${pos.size}px`;
    p.style.animationDelay = pos.delay;
    hero.appendChild(p);
  });
}

// 3. Featured Products Filter
function initProductFilter() {
  const filterTabsContainer = document.querySelector('.filter-tabs');
  const productsGrid = document.querySelector('.products-grid');
  
  if (!filterTabsContainer || !productsGrid) return;

  // Render cards
  const renderProducts = (filter) => {
    productsGrid.innerHTML = '';
    
    const filtered = products.filter(p => {
      if (filter === 'All') return true;
      return p.category === filter;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">No products found in this category.</div>';
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card scroll-reveal revealed';
      card.style.position = 'relative'; // Anchor for the absolute delete button
      
      const ratingStars = Array.from({ length: 5 }).map((_, i) => 
        `<span class="${i < Math.floor(p.rating) ? '' : 'star-muted'}">★</span>`
      ).join('');

      const deleteBtnHtml = `
        <button class="btn-delete-product" onclick="event.stopPropagation(); deleteProduct('${p.id}')" title="Delete Product">
          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      `;

      const waMsg = encodeURIComponent(`Hi, I'm interested in the ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share more details.`);

      card.innerHTML = `
        ${deleteBtnHtml}
        <div class="product-img-wrapper" style="cursor:pointer" onclick="openProductPopup('${p.id}')">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3 style="cursor:pointer" onclick="openProductPopup('${p.id}')">${p.name}</h3>
          <div class="product-rating">
            ${ratingStars}
            <span>(${p.rating.toFixed(1)})</span>
          </div>
          <ul class="product-features-list">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div class="product-price-row">
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.originalPrice ? `<span class="product-price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <div class="product-actions-grid">
            <button class="btn-add-cart" onclick="openProductPopup('${p.id}')">
              <svg class="icon" viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> View
            </button>
            <button aria-label="Add to wishlist" onclick="toggleWishlist(this)">♡</button>
            <button aria-label="Compare" onclick="setCompareProduct('${p.id}')">
              <svg class="icon" viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor;"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>
            </button>
          </div>
          <a class="btn-card-whatsapp" href="https://wa.me/911800123456?text=${waMsg}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chat on WhatsApp
          </a>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  };

  // Initial render
  renderProducts('All');

  // Tab click listener
  filterTabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filterVal = tab.getAttribute('data-filter');
    
    // Add subtle fade-out/fade-in transitions
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(10px)';
    productsGrid.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      renderProducts(filterVal);
      productsGrid.style.opacity = '1';
      productsGrid.style.transform = 'translateY(0)';
    }, 250);
  });
}

// Global Wishlist toggle helper
window.toggleWishlist = (btn) => {
  btn.innerHTML = btn.innerHTML === '♡' ? '♥' : '♡';
  btn.style.color = btn.innerHTML === '♥' ? '#e11d48' : 'var(--text-primary)';
};

// Global compare helper to hook into selectors
window.setCompareProduct = (id) => {
  const selectA = document.getElementById('compare-select-a');
  if (selectA) {
    selectA.value = id;
    selectA.dispatchEvent(new Event('change'));
    document.getElementById('compare').scrollIntoView({ behavior: 'smooth' });
  }
};

// 4. Stats Counter Animation
function initStatsObserver() {
  const statsPanel = document.querySelector('.stats-panel');
  if (!statsPanel) return;

  const countUp = (el) => {
    const target = Number(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease out
      const current = Math.floor(ease * target);
      
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-count-value').forEach(countUp);
        observer.disconnect(); // Trigger once
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsPanel);
}

// 5. Testimonials slider
function initTestimonialsSlider() {
  const track = document.querySelector('.testimonials-track');
  const btnPrev = document.querySelector('.testimonial-btn.prev');
  const btnNext = document.querySelector('.testimonial-btn.next');

  if (!track || !btnPrev || !btnNext) return;

  // Render slides
  testimonials.forEach((t, idx) => {
    const slide = document.createElement('div');
    slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
    
    const stars = Array.from({ length: t.rating }).map(() => '★').join('');

    slide.innerHTML = `
      <div class="testimonial-quote">
        <p>${t.text}</p>
      </div>
      <div class="testimonial-user">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div class="testimonial-details">
          <h4>${t.name}</h4>
          <p>${t.location} — Verified Owner (${t.product})</p>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  const slides = document.querySelectorAll('.testimonial-slide');
  let currentIdx = 0;
  let autoScrollInterval;

  const showSlide = (idx) => {
    slides.forEach(s => s.classList.remove('active'));
    
    currentIdx = (idx + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');
  };

  const nextSlide = () => showSlide(currentIdx + 1);
  const prevSlide = () => showSlide(currentIdx - 1);

  btnNext.addEventListener('click', () => {
    nextSlide();
    resetAutoScroll();
  });

  btnPrev.addEventListener('click', () => {
    prevSlide();
    resetAutoScroll();
  });

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  };

  // Start auto slide
  startAutoScroll();

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);
}

// 6. Product Comparison Engine
function initComparisonEngine() {
  const selectA = document.getElementById('compare-select-a');
  const selectB = document.getElementById('compare-select-b');
  const tableBody = document.querySelector('.compare-table-body');
  const compareTableContainer = document.getElementById('compare-table-container');
  const comparePlaceholder = document.getElementById('compare-placeholder');

  if (!selectA || !selectB || !tableBody || !compareTableContainer || !comparePlaceholder) return;

  // Save current values to restore them if they still exist after rebuilding options
  const prevValA = selectA.value;
  const prevValB = selectB.value;

  // Clear selections
  selectA.innerHTML = '';
  selectB.innerHTML = '';

  // Add default blank option
  const optDefaultA = document.createElement('option');
  optDefaultA.value = '';
  optDefaultA.textContent = 'Select Appliance 1...';
  selectA.appendChild(optDefaultA);

  const optDefaultB = document.createElement('option');
  optDefaultB.value = '';
  optDefaultB.textContent = 'Select Appliance 2...';
  selectB.appendChild(optDefaultB);

  // Populate options
  products.forEach(p => {
    const optA = document.createElement('option');
    optA.value = p.id;
    optA.textContent = p.name;
    const optB = optA.cloneNode(true);
    
    selectA.appendChild(optA);
    selectB.appendChild(optB);
  });

  // Restore values if still available, else default to empty
  if (products.some(p => p.id === prevValA)) {
    selectA.value = prevValA;
  } else {
    selectA.value = '';
  }

  if (products.some(p => p.id === prevValB)) {
    selectB.value = prevValB;
  } else {
    selectB.value = '';
  }

  const compareRows = [
    { key: 'price', label: 'Price (INR)', type: 'price' },
    { key: 'Capacity', label: 'Capacity / Size', type: 'spec' },
    { key: 'Power', label: 'Power Consumption', type: 'spec' },
    { key: 'Dimensions', label: 'Dimensions', type: 'spec' },
    { key: 'Finish', label: 'Material Finish', type: 'spec' },
    { key: 'Warranty', label: 'Warranty Duration', type: 'spec' },
    { key: 'Energy Rating', label: 'Energy Rating', type: 'spec' }
  ];

  const updateComparison = () => {
    const valA = selectA.value;
    const valB = selectB.value;

    if (!valA || !valB) {
      // Hide table and show placeholder
      compareTableContainer.style.display = 'none';
      comparePlaceholder.style.display = 'block';
      return;
    }

    const pA = products.find(p => p.id === valA);
    const pB = products.find(p => p.id === valB);

    if (!pA || !pB) {
      compareTableContainer.style.display = 'none';
      comparePlaceholder.style.display = 'block';
      return;
    }

    // Update headers in table
    const headerA = document.getElementById('compare-header-a');
    const headerB = document.getElementById('compare-header-b');
    if (headerA) headerA.textContent = pA.name;
    if (headerB) headerB.textContent = pB.name;

    tableBody.innerHTML = '';

    compareRows.forEach(row => {
      const tr = document.createElement('div');
      tr.className = 'compare-row';

      let valA_text, valB_text, classA = '', classB = '';

      if (row.type === 'price') {
        valA_text = `₹${pA.price.toLocaleString('en-IN')}`;
        valB_text = `₹${pB.price.toLocaleString('en-IN')}`;
        // Highlight cheaper option
        if (pA.price < pB.price) classA = 'better-highlight';
        if (pB.price < pA.price) classB = 'better-highlight';
      } else {
        valA_text = pA.specs[row.key] || 'N/A';
        valB_text = pB.specs[row.key] || 'N/A';
        // Highlight higher Energy rating if applicable
        if (row.key === 'Energy Rating') {
          const rank = ['N/A', 'C', 'B', 'A', 'A+', 'A++', 'A+++', 'A Rated', 'A+ Rated', 'A+++ Rated'];
          const rA = rank.indexOf(valA_text);
          const rB = rank.indexOf(valB_text);
          if (rA > rB) classA = 'better-highlight';
          if (rB > rA) classB = 'better-highlight';
        }
      }

      tr.innerHTML = `
        <div>${row.label}</div>
        <div class="${classA}">${valA_text}</div>
        <div class="${classB}">${valB_text}</div>
      `;

      tableBody.appendChild(tr);
    });

    // Show table and hide placeholder
    compareTableContainer.style.display = 'block';
    comparePlaceholder.style.display = 'none';
  };

  selectA.addEventListener('change', updateComparison);
  selectB.addEventListener('change', updateComparison);

  // Initial trigger
  updateComparison();
}

// 7. Scroll Reveal Trigger
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const reveal = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Reveal when top of element is 100px from viewport bottom
      if (rect.top <= viewHeight - 80) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  // Initial check
  reveal();
}

// 8. Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    // Simulate database submit
    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 0;">
          <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin: 0 auto 1.5rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3 style="margin-top: 0; margin-bottom: 0.5rem; font-family: var(--font-product);">Inquiry Received Successfully</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 320px; margin: 0 auto;">Thank you for contacting KAFF. Our dedicated luxury kitchen consultant will reach out to you within 24 hours.</p>
        </div>
      `;
    }, 1500);
  });
}

// 9. Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');

    if (!input.value) return;

    btn.textContent = 'Subscribed!';
    btn.disabled = true;
    input.disabled = true;
    
    setTimeout(() => {
      alert(`Thank you! ${input.value} has been added to our exclusive list.`);
    }, 300);
  });
}

// ==========================================================================
// 10. Product Popup Functions
// ==========================================================================

function openProductPopup(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;

  document.getElementById('popupImage').src = p.image;
  document.getElementById('popupImage').alt = p.name;
  document.getElementById('popupName').textContent = p.name;
  document.getElementById('popupCategory').textContent = p.category;
  document.getElementById('popupDesc').textContent = p.description || '';

  // Badge
  const badgeEl = document.getElementById('popupBadge');
  if (p.badge) {
    badgeEl.textContent = p.badge;
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.style.display = 'none';
  }

  // Features
  const featuresEl = document.getElementById('popupFeatures');
  featuresEl.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  // Pricing
  document.getElementById('popupPrice').textContent = `₹${p.price.toLocaleString('en-IN')}`;
  document.getElementById('popupOriginalPrice').textContent = p.originalPrice ? `₹${p.originalPrice.toLocaleString('en-IN')}` : '';

  // Discount
  const discountEl = document.getElementById('popupDiscount');
  if (p.originalPrice && p.originalPrice > p.price) {
    const pct = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    discountEl.textContent = `${pct}% OFF`;
    discountEl.style.display = 'inline-block';
  } else {
    discountEl.style.display = 'none';
  }

  // WhatsApp link
  const waMsg = encodeURIComponent(`Hi, I'm interested in the ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share more details.`);
  document.getElementById('popupWhatsapp').href = `https://wa.me/911800123456?text=${waMsg}`;

  // Full Details Link
  const detailsBtn = document.getElementById('popupViewDetails');
  if (detailsBtn) {
    detailsBtn.href = `product.html?id=${p.id}`;
  }

  // Show overlay
  const overlay = document.getElementById('productPopup');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openCategoryPopup(categoryName) {
  const match = products.find(p => p.category === categoryName);
  if (match) {
    openProductPopup(match.id);
  }
}

function closeProductPopup() {
  const overlay = document.getElementById('productPopup');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close popup on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('product-popup-overlay')) {
    closeProductPopup();
  }
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductPopup();
  }
});

// ==========================================================================
// 11. Admin Add Product Functions
// ==========================================================================

let uploadedImageDataUrl = "";

window.openAddProductPopup = () => {
  const overlay = document.getElementById('addProductPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAddProductPopup = () => {
  const overlay = document.getElementById('addProductPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Handle local image file upload and convert to Base64 data URL
window.handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Enforce LocalStorage capacity boundaries (limit image to 1.5MB)
  if (file.size > 1.5 * 1024 * 1024) {
    alert("Image size exceeds limit! Please upload a file smaller than 1.5MB for quick performance.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImageDataUrl = e.target.result;
    
    // Display thumbnail preview
    const previewContainer = document.getElementById('ap-image-preview-container');
    const previewImage = document.getElementById('ap-image-preview');
    if (previewImage) {
      previewImage.src = uploadedImageDataUrl;
      previewContainer.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

// Product saving and deleting are managed with PIN security at the end of the file.

// ==========================================================================
// 12. Active Scroll Spy Highlight
// ==========================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (sections.length === 0 || navItems.length === 0) return;

  const onScroll = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 150; // Offset for sticky nav height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run immediately on bootstrap
}

// ==========================================================================
// 13. Dynamic Inspiration & Product Gallery Functions
// ==========================================================================

// Original luxury kitchen design layout pictures
const defaultGalleryItems = [];

let uploadedGalleryImageDataUrl = "";

// Dynamic gallery rendering (combines defaults, product photos, and custom base64 uploads)
window.renderGallery = (filter = 'all') => {
  const galleryGrid = document.getElementById('dynamicGallery');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = '';

  const customGallery = JSON.parse(localStorage.getItem('kaff_custom_gallery') || '[]');

  // Dynamically map all active products (including custom ones!) into product photos
  const productGalleryItems = products.map(p => ({
    id: p.id,
    title: p.name,
    image: p.image,
    type: 'products',
    heightClass: 'h-short',
    isProduct: true
  }));

  // Merge datasets
  const combinedItems = [
    ...defaultGalleryItems,
    ...productGalleryItems,
    ...customGallery
  ];

  // Apply active category filter tab
  const filtered = combinedItems.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  if (filtered.length === 0) {
    galleryGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">No photos available in this category.</div>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = `gallery-item ${item.heightClass || 'h-short'} scroll-reveal revealed`;
    card.style.position = 'relative';

    const deleteBtnHtml = `
      <button class="btn-delete-product" onclick="event.stopPropagation(); deleteGalleryImage('${item.id}')" title="Delete Image">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    // Clicking products opens detailed specs; clicking layouts scrolls to inquiry
    const clickAction = item.isProduct ? `onclick="openProductPopup('${item.id}')"` : `onclick="document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })"`;
    const labelAction = item.isProduct ? 'View Specs' : 'Inquire Design';

    card.innerHTML = `
      ${deleteBtnHtml}
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-label">${item.title}</div>
      <div class="gallery-item-overlay" ${clickAction} style="cursor: pointer;">
        <h4 style="text-align: center; padding: 0 0.75rem; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; font-family: var(--font-heading);">${item.title}</h4>
        <button class="btn btn-primary btn-view" style="padding: 0.5rem 1.25rem; font-size: 0.75rem;">${labelAction}</button>
      </div>
    `;
    galleryGrid.appendChild(card);
  });
};

// Filter tab handler for gallery categories
window.filterGallery = (filter, btn) => {
  const buttons = document.querySelectorAll('[data-gallery-filter]');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const galleryGrid = document.getElementById('dynamicGallery');
  if (galleryGrid) {
    galleryGrid.style.opacity = '0';
    galleryGrid.style.transform = 'translateY(8px)';
    galleryGrid.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      window.renderGallery(filter);
      galleryGrid.style.opacity = '1';
      galleryGrid.style.transform = 'translateY(0)';
    }, 200);
  }
};

window.openAddGalleryPopup = () => {
  const overlay = document.getElementById('addGalleryPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAddGalleryPopup = () => {
  const overlay = document.getElementById('addGalleryPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleGalleryImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1.5 * 1024 * 1024) {
    alert("Image size exceeds limit! Please upload a file smaller than 1.5MB for quick performance.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedGalleryImageDataUrl = e.target.result;
    const previewContainer = document.getElementById('ag-image-preview-container');
    const previewImage = document.getElementById('ag-image-preview');
    if (previewImage) {
      previewImage.src = uploadedGalleryImageDataUrl;
      previewContainer.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

// Gallery saving and deleting are managed with PIN security at the end of the file.

// ==========================================================================
// 14. Admin Add Collection Functions
// ==========================================================================

let collectionImageDataUrl = "";

window.openAddCollectionPopup = () => {
  const overlay = document.getElementById('addCollectionPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAddCollectionPopup = () => {
  const overlay = document.getElementById('addCollectionPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleCollectionImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 1.5 * 1024 * 1024) {
    alert("Image size exceeds limit! Please upload a file smaller than 1.5MB.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    collectionImageDataUrl = e.target.result;
    const previewContainer = document.getElementById('ac-image-preview-container');
    const previewImage = document.getElementById('ac-image-preview');
    if (previewImage) {
      previewImage.src = collectionImageDataUrl;
      previewContainer.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

// Collection saving is managed with PIN security at the end of the file.

// ==========================================================================
// 15. Product Scanner (OCR with Tesseract.js)
// ==========================================================================

let scannerStream = null;

// Start camera for scanning
window.startScannerCamera = async () => {
  const viewfinder = document.getElementById('scanner-viewfinder');
  const video = document.getElementById('scanner-video');
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = scannerStream;
    viewfinder.style.display = 'block';
  } catch (err) {
    alert('Camera access denied or not available. Please use "Scan from Photo" instead.');
    console.error('Camera error:', err);
  }
};

// Stop camera
window.stopScannerCamera = () => {
  const viewfinder = document.getElementById('scanner-viewfinder');
  const video = document.getElementById('scanner-video');
  if (scannerStream) {
    scannerStream.getTracks().forEach(t => t.stop());
    scannerStream = null;
  }
  video.srcObject = null;
  viewfinder.style.display = 'none';
};

// Capture frame from camera and scan
window.captureAndScan = () => {
  const video = document.getElementById('scanner-video');
  const canvas = document.getElementById('scanner-canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Stop camera after capture
  stopScannerCamera();

  // Convert canvas to blob and run OCR
  canvas.toBlob(blob => {
    if (blob) runOCR(blob);
  }, 'image/png');
};

// Scan from uploaded file
window.scanFromFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  runOCR(file);
  event.target.value = '';
};

// Run Tesseract OCR on image
async function runOCR(imageSource) {
  const progressEl = document.getElementById('scanner-progress');
  const statusEl = document.getElementById('scanner-status');
  const barEl = document.getElementById('scanner-bar');
  const resultEl = document.getElementById('scanner-result');
  const rawTextEl = document.getElementById('scanner-raw-text');

  // Show progress
  progressEl.style.display = 'block';
  resultEl.style.display = 'none';
  barEl.style.width = '10%';
  statusEl.textContent = 'Initializing OCR engine...';

  try {
    const result = await Tesseract.recognize(imageSource, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round((m.progress || 0) * 100);
          barEl.style.width = pct + '%';
          statusEl.textContent = `Scanning text... ${pct}%`;
        } else if (m.status) {
          statusEl.textContent = m.status;
        }
      }
    });

    barEl.style.width = '100%';
    statusEl.textContent = 'Scan complete! Review text below and click Done.';

    const scannedText = result.data.text || '';
    rawTextEl.textContent = scannedText;
    resultEl.style.display = 'block';

    window.lastScannedText = scannedText;

    // Hide progress after a moment
    setTimeout(() => {
      progressEl.style.display = 'none';
    }, 1500);

  } catch (err) {
    statusEl.textContent = 'Scan failed. Please try again.';
    barEl.style.width = '0%';
    console.error('OCR Error:', err);
    setTimeout(() => { progressEl.style.display = 'none'; }, 2500);
  }
}

// Intelligent parser: extract product info from scanned text
function autoFillFromScannedText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const fullText = lines.join(' ');
  const lowerText = fullText.toLowerCase();

  // --- 1. Detect Category ---
  const categoryKeywords = {
    'Ovens': ['oven', 'convection', 'bake', 'grill', 'roast', 'built-in oven', 'otg'],
    'Hobs': ['hob', 'cooktop', 'burner', 'gas stove', 'induction', 'flame'],
    'Chimneys': ['chimney', 'hood', 'suction', 'filter', 'exhaust', 'ventilation'],
    'Dishwashers': ['dishwasher', 'wash cycle', 'rinse', 'dish', 'cutlery basket'],
    'Microwaves': ['microwave', 'reheat', 'defrost', 'magnetron', 'micro wave'],
    'Refrigerators': ['refrigerator', 'fridge', 'freezer', 'cooling', 'frost free', 'french door']
  };

  let detectedCategory = 'Ovens'; // default
  let maxHits = 0;
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    const hits = keywords.filter(kw => lowerText.includes(kw)).length;
    if (hits > maxHits) {
      maxHits = hits;
      detectedCategory = cat;
    }
  }
  const catSelect = document.getElementById('ap-category');
  if (catSelect) {
    // Check if the option exists, else pick first
    let found = false;
    for (const opt of catSelect.options) {
      if (opt.value === detectedCategory) { found = true; break; }
    }
    if (found) catSelect.value = detectedCategory;
  }

  // --- 2. Detect Product Name ---
  // Look for brand-like patterns (KAFF, model numbers like KOB, KDW, etc.)
  let productName = '';
  const modelRegex = /\b(KAFF\s*)?[A-Z]{2,5}[\s-]?\d{1,4}[A-Z]*(?:\s+[A-Z]+)*/i;
  const modelMatch = fullText.match(modelRegex);
  if (modelMatch) {
    productName = modelMatch[0].trim();
    // If it doesn't start with KAFF, prepend it
    if (!productName.toUpperCase().startsWith('KAFF')) {
      productName = 'KAFF ' + productName;
    }
  }
  // Fallback: use first non-trivial line as name
  if (!productName || productName.length < 4) {
    productName = lines.find(l => l.length >= 5 && l.length <= 60) || 'Scanned Product';
  }
  document.getElementById('ap-name').value = productName;

  // --- 3. Extract Prices ---
  // Look for ₹ or Rs or MRP patterns
  const priceMatches = [];
  const priceRegex = /(?:₹|Rs\.?|INR|MRP|Price)[:\s]*([0-9,]+(?:\.\d{2})?)/gi;
  let pm;
  while ((pm = priceRegex.exec(fullText)) !== null) {
    priceMatches.push(parseInt(pm[1].replace(/,/g, ''), 10));
  }
  // Also try bare large numbers (likely prices)
  const bareNumRegex = /\b(\d{4,6})\b/g;
  let bn;
  while ((bn = bareNumRegex.exec(fullText)) !== null) {
    const num = parseInt(bn[1], 10);
    if (num >= 1000 && num <= 999999) {
      priceMatches.push(num);
    }
  }
  // Remove duplicates and sort descending
  const uniquePrices = [...new Set(priceMatches)].sort((a, b) => b - a);

  if (uniquePrices.length >= 2) {
    document.getElementById('ap-originalPrice').value = uniquePrices[0];
    document.getElementById('ap-price').value = uniquePrices[1];
  } else if (uniquePrices.length === 1) {
    document.getElementById('ap-originalPrice').value = uniquePrices[0];
    document.getElementById('ap-price').value = Math.round(uniquePrices[0] * 0.85); // estimate 15% off
  }

  // --- 4. Extract Specifications ---
  // A. Capacity / Size
  let capacity = '';
  const capMatch = fullText.match(/(\d+\s*(?:Litre|Liter|Ltr|Ltrs|L|cm|mm|m3\/h|m³\/h)\b)/i);
  if (capMatch) {
    capacity = capMatch[1];
  }
  document.getElementById('ap-capacity').value = capacity;

  // B. Power Consumption
  let power = '';
  const powerMatch = fullText.match(/(\d+(?:\.\d+)?\s*(?:W|Watt|kW|Watts|V|Volts)\b)/i);
  if (powerMatch) {
    power = powerMatch[1];
  }
  document.getElementById('ap-power').value = power;

  // C. Dimensions
  let dimensions = '';
  const dimMatch = fullText.match(/(\d+\s*[x×*]\s*\d+\s*(?:[x×*]\s*\d+)?\s*(?:mm|cm|in|inch|inches)?)/i);
  if (dimMatch) {
    dimensions = dimMatch[1];
  }
  document.getElementById('ap-dimensions').value = dimensions;

  // D. Material Finish
  let finish = '';
  const finishes = ['tempered glass', 'stainless steel', 'black glass', 'chrome', 'silver', 'metallic', 'matte black', 'glossy black', 'satin finish', 'glass finish'];
  for (const f of finishes) {
    if (lowerText.includes(f)) {
      finish = f.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }
  if (!finish) {
    const finishMatch = fullText.match(/(\w+\s+finish)\b/i);
    if (finishMatch) {
      finish = finishMatch[1];
    }
  }
  document.getElementById('ap-finish').value = finish;

  // E. Warranty Duration
  let warranty = '';
  const warMatch = fullText.match(/(\d+\s*(?:Year|Yr|Month|Mon)s?\s*(?:Warranty)?)/i);
  if (warMatch) {
    warranty = warMatch[1];
  }
  document.getElementById('ap-warranty').value = warranty;

  // F. Energy Rating
  let energy = '';
  const energyRatings = ['A+++', 'A++', 'A+', 'A', 'B', 'C'];
  for (const er of energyRatings) {
    const erEscaped = er.replace(/[+]/g, '\\+');
    const reg = new RegExp('\\b' + erEscaped + '\\b', 'i');
    if (reg.test(fullText)) {
      energy = er;
      break;
    }
  }
  document.getElementById('ap-energy').value = energy;

  // --- 5. Build Description from remaining text ---
  // Collect feature-like lines (contain specs, numbers, keywords)
  const featureKeywords = ['capacity', 'power', 'watt', 'litre', 'liter', 'energy', 'warranty',
    'steel', 'glass', 'timer', 'auto', 'sensor', 'touch', 'digital', 'speed',
    'noise', 'rpm', 'size', 'dimension', 'weight', 'voltage', 'finish', 'color'];
  
  const featureLines = lines.filter(l => {
    const ll = l.toLowerCase();
    return featureKeywords.some(kw => ll.includes(kw)) || /\d+\s*(w|l|kg|mm|cm|rpm|db)/i.test(l);
  });

  let description = '';
  if (featureLines.length > 0) {
    description = featureLines.slice(0, 6).join('. ') + '.';
  } else {
    // Use lines 2-5 as description
    description = lines.slice(1, 5).join('. ');
  }
  if (description.length > 3) {
    document.getElementById('ap-desc').value = description;
  }
}

// Get PIN from LocalStorage or default to '1234'
function getAdminPin() {
  return localStorage.getItem('kaff_admin_pin') || '1234';
}

function verifyPin(actionDescription) {
  const entered = prompt(`🔒 Enter Admin PIN to ${actionDescription}:`);
  if (!entered) return false;
  if (entered.trim() === getAdminPin()) return true;
  alert('❌ Incorrect PIN. Action cancelled.');
  return false;
}

window.resetAdminPin = () => {
  const currentPin = getAdminPin();
  const enteredCurrent = prompt('🔒 Enter the CURRENT Admin PIN:');
  if (!enteredCurrent) return;
  if (enteredCurrent.trim() !== currentPin) {
    alert('❌ Incorrect current PIN. Access denied.');
    return;
  }

  const newPin = prompt('🔑 Enter your NEW Admin PIN (4-6 digits):');
  if (!newPin) return;
  const cleaned = newPin.trim();
  if (cleaned.length < 4 || cleaned.length > 6 || isNaN(cleaned)) {
    alert('❌ PIN must be a numeric value containing 4 to 6 digits.');
    return;
  }

  const confirmPin = prompt('🔑 Confirm your NEW Admin PIN:');
  if (!confirmPin) return;
  if (confirmPin.trim() !== cleaned) {
    alert('❌ PIN confirmation mismatch. Action cancelled.');
    return;
  }

  localStorage.setItem('kaff_admin_pin', cleaned);
  alert('✅ Admin PIN reset successfully!');
};

// ==========================================================================
// 17. Unified Management Portal Functions
// ==========================================================================

window.openManagementPopup = () => {
  if (!verifyPin('access Management Portal')) return;
  const overlay = document.getElementById('unifiedManagementPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Trigger domain switch to show the correct form
    const selector = document.getElementById('mgmt-domain-select');
    if (selector) switchManagementDomain(selector.value);
  }
};

window.closeManagementPopup = () => {
  const overlay = document.getElementById('unifiedManagementPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  // Stop scanner camera if running
  if (typeof stopScannerCamera === 'function') stopScannerCamera();
};

window.switchManagementDomain = (domain) => {
  const formCollection = document.getElementById('mgmt-form-collection');
  const formProduct = document.getElementById('mgmt-form-product');
  const formGallery = document.getElementById('mgmt-form-gallery');

  if (formCollection) formCollection.style.display = domain === 'collection' ? 'block' : 'none';
  if (formProduct) formProduct.style.display = domain === 'product' ? 'block' : 'none';
  if (formGallery) formGallery.style.display = domain === 'gallery' ? 'block' : 'none';
};

// Close management popup on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'unifiedManagementPopup') {
    closeManagementPopup();
  }
});

// ==========================================================================
// 18. Offers Popup & System
// ==========================================================================

let offerImageDataUrl = '';

window.openOffersPopup = () => {
  if (!verifyPin('access Offers section')) return;
  const overlay = document.getElementById('offersPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderOffersList();
  }
};

window.closeOffersPopup = () => {
  const overlay = document.getElementById('offersPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleOfferImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 1.5 * 1024 * 1024) {
    alert('Image size exceeds limit! Please upload a file smaller than 1.5MB.');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    offerImageDataUrl = e.target.result;
    const previewContainer = document.getElementById('off-image-preview-container');
    const previewImage = document.getElementById('off-image-preview');
    if (previewImage) {
      previewImage.src = offerImageDataUrl;
      previewContainer.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.saveOffer = (e) => {
  e.preventDefault();
  if (!verifyPin('upload a new offer')) return;

  const name = document.getElementById('off-name').value.trim();
  const price = parseFloat(document.getElementById('off-price').value) || 0;
  const duration = parseInt(document.getElementById('off-duration').value) || 1;
  const durationUnit = document.getElementById('off-duration-unit').value;

  if (!offerImageDataUrl) {
    alert('Please upload an offer photo first.');
    return;
  }

  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  if (offers.length >= 10) {
    alert('Maximum 10 active offers allowed! Please delete some first.');
    return;
  }

  // Calculate expiry timestamp
  const now = Date.now();
  const durationMs = durationUnit === 'hours' ? duration * 60 * 60 * 1000 : duration * 24 * 60 * 60 * 1000;
  const expiresAt = now + durationMs;

  const newOffer = {
    id: 'offer-' + Date.now(),
    name: name,
    price: price,
    duration: duration,
    durationUnit: durationUnit,
    image: offerImageDataUrl,
    createdAt: now,
    expiresAt: expiresAt
  };

  offers.push(newOffer);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));

  // Reset form
  document.getElementById('add-offer-form').reset();
  offerImageDataUrl = '';
  document.getElementById('off-image-preview-container').style.display = 'none';

  renderOffersList();
  alert("Offer '" + name + "' uploaded successfully!");
};

function renderOffersList() {
  const container = document.getElementById('offers-list-container');
  if (!container) return;

  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  const now = Date.now();

  // Filter out expired offers and update storage
  offers = offers.filter(o => o.expiresAt > now);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));

  if (offers.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: #555;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
        <p style="font-size: 0.8rem; margin: 0; color: #8a8a8a;">No active offers right now.<br>Upload one below to get started!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = offers.map(offer => {
    const timeLeft = offer.expiresAt - now;
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const timeDisplay = hoursLeft > 24
      ? Math.ceil(hoursLeft / 24) + ' days left'
      : hoursLeft > 0
        ? hoursLeft + 'h ' + minsLeft + 'm left'
        : minsLeft + 'm left';

    return `
      <div style="display: flex; gap: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 0.65rem; align-items: center; transition: all 0.3s ease;">
        <img src="${offer.image}" alt="${offer.name}" style="width: 56px; height: 56px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.05); flex-shrink: 0;">
        <div style="flex: 1; min-width: 0;">
          <h4 style="margin: 0; font-size: 0.8rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Poppins', sans-serif;">${offer.name}</h4>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.2rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: var(--accent-gold);">₹${offer.price.toLocaleString('en-IN')}</span>
            <span style="font-size: 0.6rem; background: rgba(212,175,55,0.12); color: var(--accent-gold); padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600;">⏱ ${timeDisplay}</span>
          </div>
        </div>
        <button onclick="deleteOffer('${offer.id}')" title="Delete Offer" style="flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: rgba(225,29,72,0.15); border: 1px solid rgba(225,29,72,0.3); color: #ff4d4d; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; transition: all 0.2s;">×</button>
      </div>
    `;
  }).join('');
}

window.deleteOffer = (offerId) => {
  if (!verifyPin('delete this offer')) return;
  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  offers = offers.filter(o => o.id !== offerId);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));
  renderOffersList();
  alert('Offer deleted successfully!');
};

// Close offers popup on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'offersPopup') {
    closeOffersPopup();
  }
});

// ==========================================================================
// 19. Dynamic Categories Grid Rendering
// ==========================================================================

window.syncCollectionsUI = () => {
  const customCollections = JSON.parse(localStorage.getItem('kaff_custom_collections') || '[]');
  const deletedDefaultCollections = JSON.parse(localStorage.getItem('kaff_deleted_collections') || '[]');
  const visibleDefaults = defaultCollections.filter(c => !deletedDefaultCollections.includes(c.id));
  const allCollections = [...visibleDefaults, ...customCollections];

  // 1. Rebuild Filter Tabs in Featured Products
  const filterTabsContainer = document.querySelector('.filter-tabs');
  if (filterTabsContainer) {
    filterTabsContainer.innerHTML = '<button class="filter-tab active" data-filter="All">All Products</button>';
    allCollections.forEach(c => {
      const tab = document.createElement('button');
      tab.className = 'filter-tab';
      tab.setAttribute('data-filter', c.name);
      tab.textContent = c.displayName || c.name;
      filterTabsContainer.appendChild(tab);
    });
    // Re-initialize filter click listeners
    if (typeof initProductFilter === 'function') initProductFilter();
  }

  // 2. Rebuild Category Dropdown in Add Product Form
  const apCategory = document.getElementById('ap-category');
  if (apCategory) {
    apCategory.innerHTML = '';
    allCollections.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.displayName || c.name;
      apCategory.appendChild(opt);
    });
  }
};

window.renderCategoriesGrid = () => {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const customCollections = JSON.parse(localStorage.getItem('kaff_custom_collections') || '[]');
  const deletedDefaultCollections = JSON.parse(localStorage.getItem('kaff_deleted_collections') || '[]');
  const visibleDefaults = defaultCollections.filter(c => !deletedDefaultCollections.includes(c.id));
  const allCollections = [...visibleDefaults, ...customCollections];

  allCollections.forEach(coll => {
    const card = document.createElement('div');
    card.className = `category-card scroll-reveal revealed`;
    card.setAttribute('onclick', `openCategoryPopup('${coll.name}')`);
    card.style.cursor = 'pointer';
    card.style.position = 'relative';

    const hasImage = coll.image && coll.image.length > 0;
    const displayName = coll.displayName || coll.name;

    // Delete button with PIN security for all collections
    const deleteBtn = `
      <span class="delete-collection-btn" onclick="event.stopPropagation(); deleteCustomCollection('${coll.id}')" title="Delete collection">×</span>
    `;

    card.innerHTML = `
      ${deleteBtn}
      <div class="category-img">
        ${hasImage
          ? `<img src="${coll.image}" alt="${displayName}" style="width:100%;height:100%;object-fit:cover;">`
          : `<div class="category-gradient-placeholder">${coll.icon}</div>`
        }
      </div>
      <div class="category-overlay"></div>
      <div class="category-body">
        <div class="category-icon-circle">${coll.icon}</div>
        <div class="category-details">
          <h3>${displayName}</h3>
          <p>${coll.count} Appliances</p>
        </div>
        <span class="category-arrow">&rarr;</span>
      </div>
    `;

    grid.appendChild(card);
  });

  // Re-sync filter dropdown and tabs
  syncCollectionsUI();
};

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCategoriesGrid();
});

// ==========================================================================
// 20. PIN-Secured Actions & Scanner Handlers
// ==========================================================================

window.finishScanningAndAutoFill = () => {
  if (window.lastScannedText) {
    autoFillFromScannedText(window.lastScannedText);
    const resultEl = document.getElementById('scanner-result');
    if (resultEl) resultEl.style.display = 'none';
    alert('Product details populated successfully! You can now review and save.');
  } else {
    alert('No scanned text available.');
  }
};

window.saveCustomProduct = (e) => {
  e.preventDefault();
  if (!verifyPin('add a new product')) return;

  const category = document.getElementById('ap-category').value;
  const name = document.getElementById('ap-name').value;
  const desc = document.getElementById('ap-desc').value;
  const originalPrice = parseFloat(document.getElementById('ap-originalPrice').value) || 0;
  const price = parseFloat(document.getElementById('ap-price').value) || 0;

  let img = uploadedImageDataUrl;
  if (!img) img = document.getElementById('ap-image-url').value;
  if (!img) {
    const fallbacks = {
      'Ovens': 'images/oven.png', 'Chimneys': 'images/chimney.png',
      'Hobs': 'images/hob.png', 'Dishwashers': 'images/dishwasher.png',
      'Refrigerators': 'images/refrigerator.png', 'Microwaves': 'images/oven.png'
    };
    img = fallbacks[category] || 'images/oven.png';
  }

  let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  if (customList.length >= 20) {
    alert('You have reached the limit of 20 products!');
    return;
  }

  const capacity = document.getElementById('ap-capacity').value.trim();
  const power = document.getElementById('ap-power').value.trim();
  const dimensions = document.getElementById('ap-dimensions').value.trim();
  const finish = document.getElementById('ap-finish').value.trim();
  const warranty = document.getElementById('ap-warranty').value.trim();
  const energy = document.getElementById('ap-energy').value;

  const newProduct = {
    id: 'custom-' + Date.now(), name, category, price, originalPrice,
    rating: 5.0, image: img, badge: 'Custom Added', description: desc,
    features: [
      capacity ? capacity + ' capacity' : 'High durability design',
      power ? power + ' power' : 'Precision control system',
      finish ? finish + ' finish' : 'Premium luxury finish'
    ],
    specs: {
      'Capacity': capacity || 'Standard sizing',
      'Power': power || 'Standard',
      'Dimensions': dimensions || 'Standard sizing',
      'Finish': finish || 'Tempered Luxury Finish',
      'Warranty': warranty || '2 Years Warranty',
      'Energy Rating': energy || 'A+ Rated'
    }
  };

  customList.push(newProduct);
  localStorage.setItem('kaff_custom_products', JSON.stringify(customList));

  document.getElementById('add-product-form').reset();
  uploadedImageDataUrl = '';
  document.getElementById('ap-image-preview-container').style.display = 'none';

  refreshProductsDatabase();
  closeManagementPopup();
  initProductFilter();
  initComparisonEngine();
  renderGallery();

  alert("Product '" + name + "' added successfully!");
};

window.saveGalleryImage = (e) => {
  e.preventDefault();
  if (!verifyPin('add a gallery image')) return;

  const title = document.getElementById('ag-title').value;
  if (!uploadedGalleryImageDataUrl) {
    alert('Please choose a photo file to upload first.');
    return;
  }

  let customGallery = JSON.parse(localStorage.getItem('kaff_custom_gallery') || '[]');
  if (customGallery.length >= 20) {
    alert('You have reached the limit of 20 uploaded gallery photos!');
    return;
  }

  const newItem = {
    id: 'custom-gal-' + Date.now(), title, image: uploadedGalleryImageDataUrl,
    type: 'products', heightClass: Math.random() > 0.5 ? 'h-tall' : 'h-short'
  };

  customGallery.push(newItem);
  localStorage.setItem('kaff_custom_gallery', JSON.stringify(customGallery));

  document.getElementById('add-gallery-form').reset();
  uploadedGalleryImageDataUrl = '';
  document.getElementById('ag-image-preview-container').style.display = 'none';

  closeManagementPopup();
  window.renderGallery();
  alert("Image '" + title + "' added successfully!");
};

window.saveCustomCollection = (e) => {
  e.preventDefault();
  if (!verifyPin('create a new collection')) return;

  const name = document.getElementById('ac-name').value.trim();
  const icon = document.getElementById('ac-icon').value.trim();
  const count = parseInt(document.getElementById('ac-count').value) || 0;
  const img = collectionImageDataUrl || '';

  let customCollections = JSON.parse(localStorage.getItem('kaff_custom_collections') || '[]');
  if (customCollections.length >= 10) {
    alert('You have reached the limit of 10 custom collections!');
    return;
  }
  if (customCollections.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    alert('A collection with this name already exists!');
    return;
  }

  const newCollection = { id: 'coll-' + Date.now(), name, icon, count, image: img };
  customCollections.push(newCollection);
  localStorage.setItem('kaff_custom_collections', JSON.stringify(customCollections));

  document.getElementById('add-collection-form').reset();
  document.getElementById('ac-icon').value = '✨';
  document.getElementById('ac-count').value = '0';
  collectionImageDataUrl = '';
  document.getElementById('ac-image-preview-container').style.display = 'none';

  closeManagementPopup();
  renderCategoriesGrid();

  alert("Collection '" + name + "' created successfully!");
};

window.deleteProduct = (productId) => {
  if (!verifyPin('delete this product')) return;

  if (productId.startsWith('custom-')) {
    let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
    customList = customList.filter(p => p.id !== productId);
    localStorage.setItem('kaff_custom_products', JSON.stringify(customList));
  } else {
    let deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
    if (!deletedDefaultIds.includes(productId)) {
      deletedDefaultIds.push(productId);
      localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedDefaultIds));
    }
  }

  refreshProductsDatabase();
  initProductFilter();
  initComparisonEngine();
  window.renderGallery();
  alert('Product deleted successfully!');
};
window.deleteCustomProduct = window.deleteProduct;

window.deleteGalleryImage = (imageId) => {
  if (!verifyPin('delete this gallery image')) return;

  if (imageId.startsWith('custom-gal-')) {
    let customGallery = JSON.parse(localStorage.getItem('kaff_custom_gallery') || '[]');
    customGallery = customGallery.filter(item => item.id !== imageId);
    localStorage.setItem('kaff_custom_gallery', JSON.stringify(customGallery));
  } else {
    // It's a product-derived gallery item! Delete the product!
    if (imageId.startsWith('custom-')) {
      let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
      customList = customList.filter(p => p.id !== imageId);
      localStorage.setItem('kaff_custom_products', JSON.stringify(customList));
    } else {
      let deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
      if (!deletedDefaultIds.includes(imageId)) {
        deletedDefaultIds.push(imageId);
        localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedDefaultIds));
      }
    }
    refreshProductsDatabase();
    initProductFilter();
    initComparisonEngine();
  }

  window.renderGallery();
  alert('Gallery image deleted successfully!');
};

window.deleteCustomCollection = (collectionId) => {
  if (!verifyPin('delete this collection')) return;

  let customCollections = JSON.parse(localStorage.getItem('kaff_custom_collections') || '[]');
  if (customCollections.some(c => c.id === collectionId)) {
    customCollections = customCollections.filter(c => c.id !== collectionId);
    localStorage.setItem('kaff_custom_collections', JSON.stringify(customCollections));
  } else {
    // It's a default collection
    let deletedDefaultCollections = JSON.parse(localStorage.getItem('kaff_deleted_collections') || '[]');
    if (!deletedDefaultCollections.includes(collectionId)) {
      deletedDefaultCollections.push(collectionId);
      localStorage.setItem('kaff_deleted_collections', JSON.stringify(deletedDefaultCollections));
    }
  }

  renderCategoriesGrid();
  alert('Collection deleted successfully!');
};

// Close all popups on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeManagementPopup();
    closeOffersPopup();
    closeJournalPopup();
  }
});

// ==========================================================================
// 19. Journal Popup & System
// ==========================================================================

window.openJournalPopup = (journalId) => {
  const journals = {
    'journal-1': {
      title: '10 Luxury Layout Design Ideas for Modular Kitchens',
      category: 'Kitchen Design',
      image: 'images/journal-1.png',
      date: 'May 15, 2026',
      readTime: '⏱ 6 min read',
      content: `
        <p style="margin-bottom: 1.25rem;">Creating a luxury modular kitchen requires a thoughtful blend of state-of-the-art appliances, ergonomic design, and premium materials. Here are the top design principles utilized by master decorators today:</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">1. The Clean Appliance Tower</h4>
        <p style="margin-bottom: 1.25rem;">Integrating built-in convection ovens and microwave towers directly into a seamless vertical cabinet stack keeps countertops clutter-free while elevating the kitchen's modern premium aesthetics.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">2. Hidden Ventilation Systems</h4>
        <p style="margin-bottom: 1.25rem;">Modern kitchens utilize ceiling-integrated or ultra-silent sleek chimneys. Matching your hood to the accent lines of your modular cabinetry creates a sophisticated, unified aesthetic flow.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">3. Smart Zoning & The Golden Triangle</h4>
        <p style="margin-bottom: 1.25rem;">Ensure your cooking hob, refrigeration unit, and cleanup sink are perfectly spaced to minimize steps. Luxury designs add a specialized "prep zone" complete with integrated pull-out accessories.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">4. Ambient Under-cabinet LED Strips</h4>
        <p style="margin-bottom: 1.25rem;">Incorporate low-profile warm LEDs underneath top cabinets. This brightens workspace surfaces while creating a spectacular glowing drop-shadow outline over marble countertops in the evening.</p>
      `
    },
    'journal-2': {
      title: 'Built-in Ovens vs. Microwaves: The Ultimate Setup',
      category: 'Appliance Guide',
      image: 'images/journal-2.png',
      date: 'May 02, 2026',
      readTime: '⏱ 8 min read',
      content: `
        <p style="margin-bottom: 1.25rem;">One of the most frequent dilemmas when planning a modern luxury kitchen is deciding between a built-in convection oven and a built-in microwave, or deciding how to configure them for absolute culinary success.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">The Differences in Functionality</h4>
        <p style="margin-bottom: 1.25rem;"><strong>Convection Ovens:</strong> Use traditional heating elements and fans to circulate hot air evenly. Ideal for serious baking, slow roasting, baking sourdough bread, and achieving perfect golden crusts on meats.</p>
        <p style="margin-bottom: 1.25rem;"><strong>Microwaves:</strong> Use radio waves to excite water molecules in food, heating rapidly. Best for reheating leftovers, quick defrosting, steaming vegetables, and preparing rapid single-bowl recipes.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">Why a Vertically Stacked Setup is Ideal</h4>
        <p style="margin-bottom: 1.25rem;">In modern luxury kitchens, matching a high-capacity built-in oven with a matching high-performance microwave stacked vertically inside a cabinetry tower is the definitive standard. This configurations places both appliances at comfortable chest/eye levels for easy access, provides high cooking versatility for large families, and offers a premium visual finish.</p>
        
        <h4 style="color: #fff; margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; font-size: 1.1rem; font-weight: 600;">Alternative: The Combi-Oven</h4>
        <p style="margin-bottom: 1.25rem;">If kitchen space is limited, select a combi-steam-microwave oven that handles multiple functions in a single, high-end appliance, keeping your kitchen's footprint ultra-clean and efficient.</p>
      `
    }
  };

  const journal = journals[journalId];
  if (!journal) return;

  const overlay = document.getElementById('journalPopup');
  if (overlay) {
    document.getElementById('journalPopupImage').src = journal.image;
    document.getElementById('journalPopupImage').alt = journal.title;
    document.getElementById('journalPopupCategory').textContent = journal.category;
    document.getElementById('journalPopupTitle').textContent = journal.title;
    document.getElementById('journalPopupContent').innerHTML = journal.content;
    document.getElementById('journalPopupDate').textContent = journal.date;
    document.getElementById('journalPopupReadTime').textContent = journal.readTime;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeJournalPopup = () => {
  const overlay = document.getElementById('journalPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};
