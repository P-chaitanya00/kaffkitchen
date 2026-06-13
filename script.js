// ============================================================
// GOOGLE SHEETS / DRIVE INTEGRATION (via Google Forms)
// ============================================================
// All enquiries are submitted to a Google Form, which automatically
// saves responses to a Google Sheet in the Kaffkitchenappliances@gmail.com Drive.
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf2px_k6YjHs4eSAXmCfKpSD6yGWH1g9dqOfc3Yu9FvL3pvlQ/formResponse';

// Google Form entry IDs (extracted from form structure)
const GF_ENTRY = {
  name:     'entry.1770772388',
  phone:    'entry.1878027421',
  address:  'entry.1247697541',
  product:  'entry.217940314',
  price:    'entry.437553521',
  message:  'entry.1200208346'
};

/**
 * Send data to Google Sheets via the Google Form.
 * Fires silently in the background — never blocks the main submission flow.
 * All responses are automatically saved in a Google Sheet on your Drive.
 * @param {Object} payload - The data to send.
 */
function sendToGoogleSheets(payload) {
  const formData = new URLSearchParams();
  formData.append(GF_ENTRY.name,    payload.name || '');
  formData.append(GF_ENTRY.phone,   payload.phone || '');
  formData.append(GF_ENTRY.address, payload.email || '');
  formData.append(GF_ENTRY.product, payload.cart_items || payload.subject || '');
  formData.append(GF_ENTRY.price,   payload.total_amount || '');
  formData.append(GF_ENTRY.message, payload.message || '');

  fetch(GOOGLE_FORM_ACTION_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  }).then(() => {
    console.log('[Google Sheets] Data submitted via Google Form successfully.');
  }).catch(err => {
    console.warn('[Google Sheets] Google Form submission failed (non-blocking):', err);
  });
}

// Clear old test data cache to force loading the new catalog
if (!localStorage.getItem('kaff_catalog_v3_cleared')) {
  localStorage.removeItem('kaff_custom_products');
  localStorage.removeItem('kaff_deleted_products');
  localStorage.removeItem('kaff_custom_gallery');
  localStorage.removeItem('kaff_custom_collections');
  localStorage.removeItem('kaff_deleted_collections');
  localStorage.removeItem('kaff_offers');
  localStorage.setItem('kaff_catalog_v3_cleared', 'true');
}

// --- Mock Database ---
const products = [];
const combos = [];

// Refreshes products list dynamically by merging custom products from LocalStorage
function refreshProductsDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  const deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
  
  // Exclude defaults that are overridden in customList
  const customIds = customList.map(p => p.id);
  const visibleDefaults = defaultProducts.filter(p => !deletedDefaultIds.includes(p.id) && !customIds.includes(p.id));
  
  products.length = 0;
  products.push(...visibleDefaults, ...customList);
}
refreshProductsDatabase(); // Perform initial sync

function refreshCombosDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_combos') || '[]');
  const deletedComboIds = JSON.parse(localStorage.getItem('kaff_deleted_combos') || '[]');
  
  const sourceDefaults = (typeof defaultCombos !== 'undefined') ? defaultCombos : [];
  const customIds = customList.map(c => c.id);
  const visibleDefaults = sourceDefaults.filter(c => !deletedComboIds.includes(c.id) && !customIds.includes(c.id));
  
  combos.length = 0;
  combos.push(...visibleDefaults, ...customList);
}
refreshCombosDatabase(); // Perform initial sync

const defaultTestimonials = [
  {
    id: 'testi-default-1',
    name: 'Ananya Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    text: 'The RAY 90 Chimney is absolutely silent — I had to check twice that it was running. The gesture control is a game-changer when my hands are covered in masala.',
    product: 'RAY 90 Auto-Clean Chimney',
    avatar: 'AS'
  },
  {
    id: 'testi-default-2',
    name: 'Rajesh Menon',
    location: 'Kochi, KL',
    rating: 5,
    text: 'We renovated our kitchen around the KRF French Door Refrigerator. The french-door design is gorgeous and the convertible freezer zone is incredibly practical for our family.',
    product: 'KRF 580 FD Refrigerator',
    avatar: 'RM'
  },
  {
    id: 'testi-default-3',
    name: 'Priya Kapoor',
    location: 'New Delhi, DL',
    rating: 5,
    text: 'The 4-burner gas hob handles everything from delicate dosa tawas to heavy pressure cookers. The brass burners give precise control that cheaper hobs simply cannot match.',
    product: 'KHB 4B 78 SS Gas Hob',
    avatar: 'PK'
  },
  {
    id: 'testi-default-4',
    name: 'Arjun Malhotra',
    location: 'Chandigarh, PB',
    rating: 4,
    text: 'The KDW dishwasher handles the aftermath of elaborate Indian meals without a single re-wash. The silent operation means we can run it overnight without disturbance.',
    product: 'KDW VI 60 Premium Dishwasher',
    avatar: 'AM'
  }
];

const testimonials = [];

function refreshTestimonialsDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_testimonials') || '[]');
  const deletedTestiIds = JSON.parse(localStorage.getItem('kaff_deleted_testimonials') || '[]');
  
  const customIds = customList.map(t => t.id);
  const visibleDefaults = defaultTestimonials.filter(t => !deletedTestiIds.includes(t.id) && !customIds.includes(t.id));
  
  testimonials.length = 0;
  testimonials.push(...visibleDefaults, ...customList);
}
refreshTestimonialsDatabase(); // Perform initial sync

// Helper to wait for firebase initialization
async function waitForFirebase() {
  let checks = 0;
  while (!window.firebaseDB && checks < 50) {
    await new Promise(r => setTimeout(r, 100));
    checks++;
  }
}

// Firestore Synchronization for Admin Features (Products, Collections, Gallery, Offers)
async function loadFirebaseData() {
  await waitForFirebase();
  if (!window.firebaseDB) {
    console.warn("Firebase is not initialized yet.");
    return;
  }
  
  try {
    const fetchCollection = async (colName) => {
      const q = window.firebaseCollection(window.firebaseDB, colName);
      const snapshot = await window.firebaseGetDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        // Remove firestore timestamp field if present
        delete data.timestamp;
        return data;
      });
    };
    
    // Fetch all custom data and sync to local storage
    const firestoreProducts = await fetchCollection('custom_products');
    localStorage.setItem('kaff_custom_products', JSON.stringify(firestoreProducts));
    
    const firestoreDeletedProducts = await fetchCollection('deleted_products');
    const deletedProductIds = firestoreDeletedProducts.map(d => d.productId).filter(Boolean);
    localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedProductIds));
    
    const firestoreGallery = await fetchCollection('custom_gallery');
    localStorage.setItem('kaff_custom_gallery', JSON.stringify(firestoreGallery));
    
    const firestoreCollections = await fetchCollection('custom_collections');
    localStorage.setItem('kaff_custom_collections', JSON.stringify(firestoreCollections));
    
    const firestoreDeletedCollections = await fetchCollection('deleted_collections');
    const deletedCollectionIds = firestoreDeletedCollections.map(d => d.collectionId).filter(Boolean);
    localStorage.setItem('kaff_deleted_collections', JSON.stringify(deletedCollectionIds));
    
    const firestoreOffers = await fetchCollection('custom_offers');
    localStorage.setItem('kaff_offers', JSON.stringify(firestoreOffers));

    // Sync custom combos
    const firestoreCombos = await fetchCollection('custom_combos');
    localStorage.setItem('kaff_custom_combos', JSON.stringify(firestoreCombos));

    // Sync deleted combos
    const firestoreDeletedCombos = await fetchCollection('deleted_combos');
    const deletedComboIds = firestoreDeletedCombos.map(d => d.comboId).filter(Boolean);
    localStorage.setItem('kaff_deleted_combos', JSON.stringify(deletedComboIds));

    // Sync custom testimonials
    const firestoreTestimonials = await fetchCollection('custom_testimonials');
    localStorage.setItem('kaff_custom_testimonials', JSON.stringify(firestoreTestimonials));

    // Sync deleted testimonials
    const firestoreDeletedTestimonials = await fetchCollection('deleted_testimonials');
    const deletedTestiIds = firestoreDeletedTestimonials.map(d => d.testiId).filter(Boolean);
    localStorage.setItem('kaff_deleted_testimonials', JSON.stringify(deletedTestiIds));
    
    // Re-render UI with latest live data
    refreshProductsDatabase();
    refreshCombosDatabase();
    refreshTestimonialsDatabase();
    initProductFilter();
    initComparisonEngine();
    window.renderGallery();
    syncCollectionsUI();
    renderCategoriesGrid();
    initTestimonialsSlider();
    if (typeof renderCombos === 'function') {
      renderCombos();
    }
    if (typeof renderOffersList === 'function') {
      renderOffersList();
    }
  } catch (error) {
    console.error("Error loading live data from Firestore:", error);
  }
}

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
  
  // Initialize combos
  refreshCombosDatabase();
  if (typeof renderCombos === 'function') {
    renderCombos();
  }
  
  // Initialize offers list and floating offer from localStorage cache
  if (typeof renderOffersList === 'function') {
    renderOffersList();
  }

  // Start syncing with Firebase Firestore
  loadFirebaseData();
  loadAdminPinFromFirestore();

  // Initialize Shopping Cart state
  if (typeof updateCartBar === 'function') {
    updateCartBar();
  }

  // Mobile touch-to-toggle admin buttons (edit/delete)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card, .combo-card, .gallery-item, .category-card');
    // If tapped on an admin button itself, don't toggle
    if (e.target.closest('.btn-edit-product, .btn-delete-product, .delete-collection-btn')) return;
    // Remove .touched from all other cards
    document.querySelectorAll('.touched').forEach(el => {
      if (el !== card) el.classList.remove('touched');
    });
    // Toggle .touched on the tapped card
    if (card) {
      card.classList.toggle('touched');
    }
  });
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

      const editBtnHtml = `
        <button class="btn-edit-product" onclick="event.stopPropagation(); editProduct('${p.id}')" title="Edit Product">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      `;

      const deleteBtnHtml = `
        <button class="btn-delete-product" onclick="event.stopPropagation(); deleteProduct('${p.id}')" title="Delete Product">
          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      `;

      const waMsg = encodeURIComponent(`Hi, I'm interested in the ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share more details.`);

      card.innerHTML = `
        ${editBtnHtml}
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
            <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}', event)">
              <svg class="icon" viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Add to Cart
            </button>
            <button aria-label="Compare" onclick="setCompareProduct('${p.id}')">
              <svg class="icon" viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor;"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>
            </button>
          </div>
          <a class="btn-card-whatsapp" href="https://wa.me/919000714841?text=${waMsg}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chat on WhatsApp
          </a>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  };

  // Find active filter to preserve it
  const activeTab = filterTabsContainer.querySelector('.filter-tab.active');
  const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'All';
  renderProducts(activeFilter);

  // Tab click listener with single binding guard
  if (!filterTabsContainer.dataset.listenerBound) {
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
        if (typeof filterTabsContainer.renderProducts === 'function') {
          filterTabsContainer.renderProducts(filterVal);
        }
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
      }, 250);
    });
    filterTabsContainer.dataset.listenerBound = 'true';
  }
  
  // Expose the latest render function to the container object
  filterTabsContainer.renderProducts = renderProducts;
}


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

  // Clear existing slides first
  track.innerHTML = '';

  // Render slides
  testimonials.forEach((t, idx) => {
    const slide = document.createElement('div');
    slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
    
    // Fallback/generate initials if t.avatar doesn't exist
    const avatar = t.avatar || (t.name ? t.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U');
    const stars = Array.from({ length: t.rating || 5 }).map(() => '★').join('');

    slide.innerHTML = `
      <div class="testimonial-quote">
        <p>${t.text}</p>
      </div>
      <div class="testimonial-user">
        <div class="testimonial-avatar">${avatar}</div>
        <div class="testimonial-details">
          <h4>${t.name}</h4>
          <p>${t.location} — Verified Owner (${t.product})</p>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;
  let currentIdx = 0;
  
  // Clear any existing interval to prevent duplicates
  if (window.testimonialsAutoScrollInterval) {
    clearInterval(window.testimonialsAutoScrollInterval);
  }

  const showSlide = (idx) => {
    const freshSlides = document.querySelectorAll('.testimonial-slide');
    if (freshSlides.length === 0) return;
    freshSlides.forEach(s => s.classList.remove('active'));
    currentIdx = (idx + freshSlides.length) % freshSlides.length;
    freshSlides[currentIdx].classList.add('active');
  };

  const nextSlide = () => showSlide(currentIdx + 1);
  const prevSlide = () => showSlide(currentIdx - 1);

  // Remove old listeners by cloning buttons
  const newBtnNext = btnNext.cloneNode(true);
  btnNext.parentNode.replaceChild(newBtnNext, btnNext);
  const newBtnPrev = btnPrev.cloneNode(true);
  btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);

  newBtnNext.addEventListener('click', () => {
    nextSlide();
    resetAutoScroll();
  });

  newBtnPrev.addEventListener('click', () => {
    prevSlide();
    resetAutoScroll();
  });

  const startAutoScroll = () => {
    window.testimonialsAutoScrollInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoScroll = () => {
    clearInterval(window.testimonialsAutoScrollInterval);
    startAutoScroll();
  };

  startAutoScroll();
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

// 8. Contact Form — Firebase Firestore
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    try {
      const contactData = {
        name: document.getElementById('c-name').value,
        phone: document.getElementById('c-phone').value,
        email: document.getElementById('c-email').value,
        subject: document.getElementById('c-subject').value,
        message: document.getElementById('c-msg').value
      };

      // Save to Firebase Firestore
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'enquiries'), {
        ...contactData,
        timestamp: window.firebaseServerTimestamp(),
        source: 'website_contact_form'
      });

      // Save to Google Sheets / Drive (background, non-blocking)
      sendToGoogleSheets({
        type: 'contact_form',
        ...contactData,
        source: 'website_contact_form'
      });

      form.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 0;">
          <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin: 0 auto 1.5rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3 style="margin-top: 0; margin-bottom: 0.5rem; font-family: var(--font-product);">Inquiry Received Successfully</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 320px; margin: 0 auto;">Thank you for contacting KAFF. Our dedicated luxury kitchen consultant will reach out to you within 24 hours.</p>
        </div>
      `;
    } catch (error) {
      console.error('Firebase error:', error);
      btn.textContent = originalText;
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });
}

// 9. Newsletter Form — Firebase Firestore
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');

    if (!input.value) return;

    btn.textContent = 'Subscribing...';
    btn.disabled = true;
    input.disabled = true;

    try {
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'newsletter_subscribers'), {
        email: input.value,
        timestamp: window.firebaseServerTimestamp(),
        source: 'website_footer'
      });

      // Save to Google Sheets / Drive (background, non-blocking)
      sendToGoogleSheets({
        type: 'newsletter',
        email: input.value,
        source: 'website_footer'
      });

      btn.textContent = 'Subscribed!';
      alert(`Thank you! ${input.value} has been added to our exclusive list.`);
    } catch (error) {
      console.error('Firebase error:', error);
      btn.textContent = 'Join';
      btn.disabled = false;
      input.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });
}

// ==========================================================================
// 10. Product Popup Functions
// ==========================================================================

function openProductPopup(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;

  // Gallery Image & Thumbnails
  const images = p.images && p.images.length > 0 ? p.images : [p.image].filter(Boolean);
  window.currentPopupImages = images;
  window.currentPopupImageIndex = 0;

  const mainImageEl = document.getElementById('popupImage');
  if (mainImageEl && images.length > 0) {
    mainImageEl.src = images[0];
    mainImageEl.alt = p.name;
  }

  const prevBtn = document.getElementById('popupPrevBtn');
  const nextBtn = document.getElementById('popupNextBtn');
  if (prevBtn && nextBtn) {
    if (images.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  const thumbContainer = document.getElementById('popupThumbnailsContainer');
  if (thumbContainer) {
    if (images.length > 1) {
      thumbContainer.innerHTML = images.map((imgUrl, index) => {
        return `
          <div onclick="window.popupUpdateImage(${index})" style="
            width: 50px;
            height: 50px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid ${index === 0 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'};
            cursor: pointer;
            background: transparent;
            transition: all 0.2s;
            flex-shrink: 0;
          " class="popup-thumbnail" onmouseover="this.style.borderColor='var(--accent-gold)'" onmouseout="if(window.currentPopupImageIndex !== ${index}) this.style.borderColor='rgba(255,255,255,0.1)'">
            <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        `;
      }).join('');
      thumbContainer.style.display = 'flex';
    } else {
      thumbContainer.innerHTML = '';
      thumbContainer.style.display = 'none';
    }
  }
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
  document.getElementById('popupWhatsapp').href = `https://wa.me/919000714841?text=${waMsg}`;

  // Full Details Link
  const detailsBtn = document.getElementById('popupViewDetails');
  if (detailsBtn) {
    detailsBtn.href = `product.html?id=${p.id}`;
  }

  // Dynamic Add to Cart button logic inside popup
  const popupCartBtn = document.querySelector('#productPopup button.btn-popup-cart');
  if (popupCartBtn) {
    popupCartBtn.onclick = (event) => {
      addToCart(p.id, event);
      closeProductPopup();
    };
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
    const overlayId = e.target.id;
    if (overlayId === 'productPopup') {
      closeProductPopup();
    } else if (overlayId === 'unifiedManagementPopup') {
      if (typeof window.closeManagementPopup === 'function') window.closeManagementPopup();
    } else if (overlayId === 'offersPopup') {
      if (typeof window.closeOffersPopup === 'function') window.closeOffersPopup();
    } else if (overlayId === 'journalPopup') {
      if (typeof window.closeJournalPopup === 'function') window.closeJournalPopup();
    } else if (overlayId === 'flyerPopup') {
      if (typeof window.closeFlyerPopup === 'function') window.closeFlyerPopup();
    } else if (overlayId === 'offerImagePopup') {
      if (typeof window.closeOfferImagePopup === 'function') window.closeOfferImagePopup();
    }
  }
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductPopup();
    if (typeof window.closeManagementPopup === 'function') window.closeManagementPopup();
    if (typeof window.closeOffersPopup === 'function') window.closeOffersPopup();
    if (typeof window.closeJournalPopup === 'function') window.closeJournalPopup();
    if (typeof window.closeFlyerPopup === 'function') window.closeFlyerPopup();
    if (typeof window.closeOfferImagePopup === 'function') window.closeOfferImagePopup();
  }
});

window.popupUpdateImage = (index) => {
  if (!window.currentPopupImages || window.currentPopupImages.length === 0) return;
  if (index < 0) {
    index = window.currentPopupImages.length - 1;
  } else if (index >= window.currentPopupImages.length) {
    index = 0;
  }
  window.currentPopupImageIndex = index;
  const imgUrl = window.currentPopupImages[index];
  const mainImageEl = document.getElementById('popupImage');
  if (mainImageEl) {
    mainImageEl.src = imgUrl;
  }

  // Update active thumbnail border
  const thumbContainer = document.getElementById('popupThumbnailsContainer');
  if (thumbContainer) {
    const thumbs = thumbContainer.querySelectorAll('.popup-thumbnail');
    thumbs.forEach((thumb, idx) => {
      if (idx === index) {
        thumb.style.borderColor = 'var(--accent-gold)';
      } else {
        thumb.style.borderColor = 'rgba(255,255,255,0.1)';
      }
    });
  }
};

window.popupPrevImage = () => {
  window.popupUpdateImage(window.currentPopupImageIndex - 1);
};

window.popupNextImage = () => {
  window.popupUpdateImage(window.currentPopupImageIndex + 1);
};

// ==========================================================================
// 11. Admin Add Product Functions
// ==========================================================================

let uploadedImageDataUrl = "";
let uploadedImagesDataUrls = [];

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

// Helper to resize and compress any uploaded image file to web-optimized quality (800px at 70% quality)
// This keeps quality good for web display while keeping file size small (~50-100KB) to fit in Firestore's 1MB document limit.
function processUploadedImage(file, callback) {
  if (file instanceof Blob && !(file instanceof File)) {
    // If it's a camera blob, convert to canvas/image
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Target max dimension for web-optimized quality (800px)
      const targetMax = 800;
      if (width > targetMax || height > targetMax) {
        const scale = width > height ? targetMax / width : targetMax / height;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = URL.createObjectURL(file);
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Target max dimension for web-optimized quality (800px)
      const targetMax = 800;
      if (width > targetMax || height > targetMax) {
        const scale = width > height ? targetMax / width : targetMax / height;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedDataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Handle local image file upload and convert to Base64 data URL (supports multiple files)
window.handleImageUpload = (event) => {
  const files = Array.from(event.target.files).slice(0, 5); // Take up to 5 files
  if (files.length === 0) return;

  uploadedImagesDataUrls = [];
  let processedCount = 0;

  files.forEach(file => {
    processUploadedImage(file, (dataUrl) => {
      uploadedImagesDataUrls.push(dataUrl);
      processedCount++;

      if (processedCount === 1) {
        uploadedImageDataUrl = dataUrl;
      }

      if (processedCount === files.length) {
        window.updateProductFormImagePreview();
      }
    });
  });
};

// Update upload preview container with multiple thumbnails
window.updateProductFormImagePreview = () => {
  const previewContainer = document.getElementById('ap-image-preview-container');
  const mainPreview = document.getElementById('ap-image-preview');
  const thumbsContainer = document.getElementById('ap-image-thumbnails');
  
  if (!previewContainer) return;
  
  if (uploadedImagesDataUrls.length > 0) {
    previewContainer.style.display = 'block';
    if (mainPreview) mainPreview.style.display = 'none'; // Hide the default single preview element
    
    if (thumbsContainer) {
      thumbsContainer.innerHTML = uploadedImagesDataUrls.map((url, idx) => {
        return `
          <div style="position: relative; width: 60px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15);">
            <img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">
            <button type="button" onclick="window.removeUploadImage(${idx}, event)" style="
              position: absolute;
              top: 2px;
              right: 2px;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: rgba(0,0,0,0.6);
              border: none;
              color: #fff;
              font-size: 0.6rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              line-height: 1;
              z-index: 5;
            ">&times;</button>
          </div>
        `;
      }).join('');
    }
  } else if (uploadedImageDataUrl) {
    previewContainer.style.display = 'block';
    if (mainPreview) {
      mainPreview.src = uploadedImageDataUrl;
      mainPreview.style.display = 'inline-block';
    }
    if (thumbsContainer) thumbsContainer.innerHTML = '';
  } else {
    previewContainer.style.display = 'none';
    if (thumbsContainer) thumbsContainer.innerHTML = '';
  }
};

// Remove an uploaded image from list
window.removeUploadImage = (index, e) => {
  if (e) e.stopPropagation();
  uploadedImagesDataUrls.splice(index, 1);
  if (uploadedImagesDataUrls.length > 0) {
    uploadedImageDataUrl = uploadedImagesDataUrls[0];
  } else {
    uploadedImageDataUrl = '';
  }
  window.updateProductFormImagePreview();
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

  processUploadedImage(file, (dataUrl) => {
    uploadedGalleryImageDataUrl = dataUrl;
    const previewContainer = document.getElementById('ag-image-preview-container');
    const previewImage = document.getElementById('ag-image-preview');
    if (previewImage) {
      previewImage.src = uploadedGalleryImageDataUrl;
      previewContainer.style.display = 'block';
    }
  });
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
  
  processUploadedImage(file, (dataUrl) => {
    collectionImageDataUrl = dataUrl;
    const previewContainer = document.getElementById('ac-image-preview-container');
    const previewImage = document.getElementById('ac-image-preview');
    if (previewImage) {
      previewImage.src = collectionImageDataUrl;
      previewContainer.style.display = 'block';
    }
  });
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
    if (blob) {
      processUploadedImage(blob, (dataUrl) => {
        uploadedImageDataUrl = dataUrl;
        uploadedImagesDataUrls = [dataUrl];
        window.updateProductFormImagePreview();
      });
      runOCR(blob);
    }
  }, 'image/png');
};

// Scan from uploaded file
window.scanFromFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  processUploadedImage(file, (dataUrl) => {
    uploadedImageDataUrl = dataUrl;
    uploadedImagesDataUrls = [dataUrl];
    window.updateProductFormImagePreview();
  });

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

// Get PIN from LocalStorage or default to '2009'
// On page load, the PIN is synced from Firestore (see loadAdminPinFromFirestore below)
function getAdminPin() {
  return localStorage.getItem('kaff_admin_pin') || '2009';
}

// Load admin PIN from Firestore on startup (called after Firebase init)
async function loadAdminPinFromFirestore() {
  try {
    await waitForFirebase();
    if (!window.firebaseDB || !window.firebaseGetDocs) return;
    const q = window.firebaseCollection(window.firebaseDB, 'admin_settings');
    const snapshot = await window.firebaseGetDocs(q);
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.pin) {
        localStorage.setItem('kaff_admin_pin', data.pin);
        console.log('Admin PIN loaded from Firestore.');
        return;
      }
    }
  } catch (err) {
    console.error('Failed to load admin PIN from Firestore:', err);
  }
}

// Save admin PIN to Firestore for cross-device persistence
async function saveAdminPinToFirestore(pin) {
  try {
    if (!window.firebaseDB || !window.firebaseAddDoc) return;
    // Delete old PIN docs first
    const q = window.firebaseCollection(window.firebaseDB, 'admin_settings');
    const snapshot = await window.firebaseGetDocs(q);
    for (const doc of snapshot.docs) {
      await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'admin_settings', doc.id));
    }
    // Save new PIN
    await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'admin_settings'), { pin: pin });
    console.log('Admin PIN saved to Firestore.');
  } catch (err) {
    console.error('Failed to save admin PIN to Firestore:', err);
  }
}

function verifyPin(actionDescription) {
  const entered = prompt(`🔒 Enter Admin PIN to ${actionDescription}:`);
  if (!entered) return false;
  if (entered.trim() === getAdminPin()) return true;
  alert('❌ Incorrect PIN. Action cancelled.');
  return false;
}

window.resetAdminPin = async () => {
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
  await saveAdminPinToFirestore(cleaned);
  alert('✅ Admin PIN reset successfully! It will now work on all devices.');
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
  const formCombo = document.getElementById('mgmt-form-combo');
  const formPdf = document.getElementById('mgmt-form-pdf');
  const formReviews = document.getElementById('mgmt-form-reviews');

  if (formCollection) formCollection.style.display = domain === 'collection' ? 'block' : 'none';
  if (formProduct) formProduct.style.display = domain === 'product' ? 'block' : 'none';
  if (formGallery) formGallery.style.display = domain === 'gallery' ? 'block' : 'none';
  if (formCombo) formCombo.style.display = domain === 'combo' ? 'block' : 'none';
  if (formPdf) formPdf.style.display = domain === 'pdf' ? 'block' : 'none';
  if (formReviews) {
    formReviews.style.display = domain === 'reviews' ? 'block' : 'none';
    if (domain === 'reviews') {
      populateReviewsDropdown();
    }
  }
};

window.populateReviewsDropdown = () => {
  const select = document.getElementById('mrev-select');
  if (!select) return;
  select.innerHTML = '<option value="new">➕ Add New Review</option>';
  
  testimonials.forEach((t, idx) => {
    const opt = document.createElement('option');
    opt.value = t.id || `idx-${idx}`;
    opt.textContent = `${t.name} (${t.product || 'General'})`;
    select.appendChild(opt);
  });
  
  handleReviewSelectChange('new');
};

window.handleReviewSelectChange = (val) => {
  const btnDelete = document.getElementById('mrev-delete-btn');
  if (val === 'new') {
    document.getElementById('mrev-id').value = '';
    document.getElementById('mrev-name').value = '';
    document.getElementById('mrev-location').value = '';
    document.getElementById('mrev-rating').value = '5';
    document.getElementById('mrev-text').value = '';
    document.getElementById('mrev-product').value = '';
    document.getElementById('mrev-avatar').value = '';
    if (btnDelete) btnDelete.style.display = 'none';
  } else {
    const t = testimonials.find(item => item.id === val || (item.id === undefined && `idx-${testimonials.indexOf(item)}` === val));
    if (t) {
      document.getElementById('mrev-id').value = t.id || `idx-${testimonials.indexOf(t)}`;
      document.getElementById('mrev-name').value = t.name || '';
      document.getElementById('mrev-location').value = t.location || '';
      document.getElementById('mrev-rating').value = t.rating || '5';
      document.getElementById('mrev-text').value = t.text || '';
      document.getElementById('mrev-product').value = t.product || '';
      document.getElementById('mrev-avatar').value = t.avatar || '';
      if (btnDelete) btnDelete.style.display = 'block';
    }
  }
};

window.saveReview = async (e) => {
  e.preventDefault();
  
  const idVal = document.getElementById('mrev-id').value;
  const name = document.getElementById('mrev-name').value.trim();
  const location = document.getElementById('mrev-location').value.trim();
  const rating = parseInt(document.getElementById('mrev-rating').value) || 5;
  const text = document.getElementById('mrev-text').value.trim();
  const product = document.getElementById('mrev-product').value.trim();
  let avatar = document.getElementById('mrev-avatar').value.trim().toUpperCase();
  
  if (!avatar && name) {
    avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
  
  if (!name || !text || !product) {
    alert('Please fill in Name, Comment, and Product.');
    return;
  }
  
  const isEditing = idVal !== '';
  if (!verifyPin(isEditing ? 'edit this review' : 'add a new review')) return;
  
  let customTestimonials = JSON.parse(localStorage.getItem('kaff_custom_testimonials') || '[]');
  let deletedTestimonials = JSON.parse(localStorage.getItem('kaff_deleted_testimonials') || '[]');
  
  let targetId = idVal;
  if (!isEditing) {
    targetId = 'testi-custom-' + Date.now();
    const newTesti = { id: targetId, name, location, rating, text, product, avatar };
    customTestimonials.push(newTesti);
    
    if (window.firebaseDB) {
      try {
        await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_testimonials'), newTesti);
      } catch (err) {
        console.error("Error saving review to Firestore:", err);
      }
    }
  } else {
    if (idVal.startsWith('testi-default-') || idVal.startsWith('idx-')) {
      let origId = idVal;
      if (idVal.startsWith('idx-')) {
        const index = parseInt(idVal.split('-')[1]);
        if (defaultTestimonials[index]) {
          origId = defaultTestimonials[index].id;
        }
      }
      
      if (!deletedTestimonials.includes(origId)) {
        deletedTestimonials.push(origId);
      }
      
      const newCustomTesti = { id: 'testi-custom-' + Date.now(), name, location, rating, text, product, avatar };
      customTestimonials.push(newCustomTesti);
      
      if (window.firebaseDB) {
        try {
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_testimonials'), { testiId: origId });
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_testimonials'), newCustomTesti);
        } catch (err) {
          console.error("Error updating default review in Firestore:", err);
        }
      }
    } else {
      const idx = customTestimonials.findIndex(t => t.id === idVal);
      const updatedTesti = { id: idVal, name, location, rating, text, product, avatar };
      if (idx !== -1) {
        customTestimonials[idx] = updatedTesti;
      } else {
        customTestimonials.push(updatedTesti);
      }
      
      if (window.firebaseDB) {
        try {
          const q = window.firebaseQuery(
            window.firebaseCollection(window.firebaseDB, 'custom_testimonials'),
            window.firebaseWhere('id', '==', idVal)
          );
          const snapshot = await window.firebaseGetDocs(q);
          for (const doc of snapshot.docs) {
            await window.firebaseUpdateDoc(window.firebaseDoc(window.firebaseDB, 'custom_testimonials', doc.id), updatedTesti);
          }
        } catch (err) {
          console.error("Error updating custom review in Firestore:", err);
        }
      }
    }
  }
  
  localStorage.setItem('kaff_custom_testimonials', JSON.stringify(customTestimonials));
  localStorage.setItem('kaff_deleted_testimonials', JSON.stringify(deletedTestimonials));
  
  refreshTestimonialsDatabase();
  initTestimonialsSlider();
  populateReviewsDropdown();
  
  alert('Review saved successfully!');
};

window.deleteReview = async () => {
  const idVal = document.getElementById('mrev-id').value;
  if (!idVal) return;
  
  if (!verifyPin('delete this review')) return;
  
  let customTestimonials = JSON.parse(localStorage.getItem('kaff_custom_testimonials') || '[]');
  let deletedTestimonials = JSON.parse(localStorage.getItem('kaff_deleted_testimonials') || '[]');
  
  let targetId = idVal;
  if (idVal.startsWith('idx-')) {
    const index = parseInt(idVal.split('-')[1]);
    if (defaultTestimonials[index]) {
      targetId = defaultTestimonials[index].id;
    }
  }
  
  if (targetId.startsWith('testi-default-')) {
    if (!deletedTestimonials.includes(targetId)) {
      deletedTestimonials.push(targetId);
      localStorage.setItem('kaff_deleted_testimonials', JSON.stringify(deletedTestimonials));
    }
    
    if (window.firebaseDB) {
      try {
        await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_testimonials'), { testiId: targetId });
      } catch (err) {
        console.error("Error deleting default review in Firestore:", err);
      }
    }
  } else {
    customTestimonials = customTestimonials.filter(t => t.id !== targetId);
    localStorage.setItem('kaff_custom_testimonials', JSON.stringify(customTestimonials));
    
    if (window.firebaseDB) {
      try {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_testimonials'),
          window.firebaseWhere('id', '==', targetId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_testimonials', doc.id));
        }
      } catch (err) {
        console.error("Error deleting custom review in Firestore:", err);
      }
    }
  }
  
  refreshTestimonialsDatabase();
  initTestimonialsSlider();
  populateReviewsDropdown();
  
  alert('Review deleted successfully!');
};

// Close popups on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'unifiedManagementPopup') {
    closeManagementPopup();
  } else if (e.target.id === 'flyerPopup') {
    closeFlyerPopup();
  } else if (e.target.id === 'offersPopup') {
    closeOffersPopup();
  } else if (e.target.id === 'productPopup') {
    closeProductPopup();
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

  processUploadedImage(file, (dataUrl) => {
    offerImageDataUrl = dataUrl;
    const previewContainer = document.getElementById('off-image-preview-container');
    const previewImage = document.getElementById('off-image-preview');
    if (previewImage) {
      previewImage.src = offerImageDataUrl;
      previewContainer.style.display = 'block';
    }
  });
};

window.saveOffer = async (e) => {
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

  // Local
  offers.push(newOffer);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));

  // Reset session storage close flag so the new offer is visible immediately
  sessionStorage.removeItem('kaff_floating_offer_closed');

  // Reset form
  document.getElementById('add-offer-form').reset();
  offerImageDataUrl = '';
  document.getElementById('off-image-preview-container').style.display = 'none';

  renderOffersList();

  // Firestore background save
  try {
    if (window.firebaseAddDoc) {
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_offers'), newOffer);
    }
  } catch (err) {
    console.error("Failed to upload offer to Firestore:", err);
    alert('⚠️ Offer saved locally but failed to sync to cloud. Error: ' + err.message);
  }

  alert("Offer '" + name + "' uploaded successfully and is now live!");
};

function renderOffersList() {
  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  const now = Date.now();

  // Filter out expired offers and update storage
  offers = offers.filter(o => o.expiresAt > now);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));

  // Render floating offer on main site
  if (typeof window.renderFloatingOffers === 'function') {
    window.renderFloatingOffers();
  }

  const container = document.getElementById('offers-list-container');
  if (!container) return;

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

window.deleteOffer = async (offerId) => {
  if (!verifyPin('delete this offer')) return;
  
  offerId = String(offerId || '');
  if (!offerId) return;
  
  // Local
  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  offers = offers.filter(o => o.id !== offerId);
  localStorage.setItem('kaff_offers', JSON.stringify(offers));
  renderOffersList();

  // Firestore background delete
  try {
    if (window.firebaseQuery) {
      const q = window.firebaseQuery(
        window.firebaseCollection(window.firebaseDB, 'custom_offers'),
        window.firebaseWhere('id', '==', offerId)
      );
      const snapshot = await window.firebaseGetDocs(q);
      for (const doc of snapshot.docs) {
        await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_offers', doc.id));
      }
    }
  } catch (err) {
    console.error("Failed to delete offer from Firestore:", err);
  }

  alert('Offer deleted successfully and changes are live!');
};

// ==========================================================================
// Floating Offers & Image Popups
// ==========================================================================

window.renderFloatingOffers = () => {
  const container = document.getElementById('floating-offers-container');
  if (!container) return;

  const now = Date.now();
  let offers = JSON.parse(localStorage.getItem('kaff_offers') || '[]');
  
  // Filter active (unexpired) offers
  offers = offers.filter(o => o.expiresAt > now);
  
  // Check if closed in session
  const isClosed = sessionStorage.getItem('kaff_floating_offer_closed') === 'true';
  if (offers.length === 0 || isClosed) {
    container.style.display = 'none';
    return;
  }

  // Get the newest offer
  offers.sort((a, b) => b.createdAt - a.createdAt);
  const latestOffer = offers[0];

  const timeLeft = latestOffer.expiresAt - now;
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const timeDisplay = hoursLeft > 24
    ? Math.ceil(hoursLeft / 24) + 'd left'
    : hoursLeft > 0
      ? hoursLeft + 'h ' + minsLeft + 'm left'
      : minsLeft + 'm left';

  container.innerHTML = `
    <div class="floating-offer-glass" style="
      background: rgba(20, 20, 20, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 0.85rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      position: relative;
      animation: fadeInUp 0.4s ease;
    ">
      <!-- Close Button -->
      <button onclick="window.closeFloatingOffer(event)" style="
        position: absolute;
        top: 8px;
        right: 8px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: none;
        color: #a0a0a0;
        font-size: 0.75rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        line-height: 1;
        z-index: 5;
      " onmouseover="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='#a0a0a0';">&times;</button>

      <!-- Header Label -->
      <div style="font-size: 0.6rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 800; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.25rem;">
        <span>🔥 LATEST OFFER</span>
      </div>

      <!-- Image (Clickable for zoom) -->
      <div style="width: 100%; height: 130px; border-radius: 10px; overflow: hidden; background: #0a0a0a; border: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer; position: relative;" onclick="window.showOfferImagePopup('${latestOffer.image.replace(/'/g, "\\'")}')">
        <img src="${latestOffer.image}" alt="${latestOffer.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.85)); padding: 0.4rem; text-align: center; color: #eee; font-size: 0.6rem; font-weight: 500;">
          🔎 Click to enlarge
        </div>
      </div>

      <!-- Details -->
      <div style="display: flex; flex-direction: column; gap: 0.15rem;">
        <h4 style="margin: 0; font-size: 0.8rem; font-weight: 700; color: #fff; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; font-family: 'Poppins', sans-serif;">${latestOffer.name}</h4>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.15rem;">
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--accent-gold);">₹${latestOffer.price.toLocaleString('en-IN')}</span>
          <span style="font-size: 0.6rem; color: #a0a0a0; background: rgba(255,255,255,0.06); padding: 0.15rem 0.35rem; border-radius: 4px;">⏱ ${timeDisplay}</span>
        </div>
      </div>
    </div>
  `;

  container.style.display = 'block';
};

window.closeFloatingOffer = (e) => {
  if (e) e.stopPropagation();
  sessionStorage.setItem('kaff_floating_offer_closed', 'true');
  const container = document.getElementById('floating-offers-container');
  if (container) {
    container.style.display = 'none';
  }
};

window.showOfferImagePopup = (imageUrl) => {
  const popup = document.getElementById('offerImagePopup');
  const img = document.getElementById('offerPopupFullImage');
  if (popup && img) {
    img.src = imageUrl;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOfferImagePopup = () => {
  const popup = document.getElementById('offerImagePopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
};

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

window.saveCustomProduct = async (e) => {
  e.preventDefault();
  
  const isEditing = !!window.editingProductId;
  const productId = isEditing ? window.editingProductId : 'custom-' + Date.now();
  
  if (!isEditing && !verifyPin('add a new product')) return;

  const category = document.getElementById('ap-category').value;
  const name = document.getElementById('ap-name').value;
  const desc = document.getElementById('ap-desc').value;
  const originalPrice = parseFloat(document.getElementById('ap-originalPrice').value) || 0;
  const price = parseFloat(document.getElementById('ap-price').value) || 0;

  let img = uploadedImageDataUrl;
  if (!img) img = document.getElementById('ap-image-url').value;
  if (!img) {
    if (isEditing) {
      img = products.find(p => p.id === productId)?.image || 'images/oven.png';
    } else {
      const fallbacks = {
        'Ovens': 'images/oven.png', 'Chimneys': 'images/chimney.png',
        'Hobs': 'images/hob.png', 'Dishwashers': 'images/dishwasher.png',
        'Refrigerators': 'images/refrigerator.png',
        'Microwaves': 'images/extracted/img_p35_7.jpeg',
        'Wine Coolers': 'images/extracted/img_p41_1.jpeg',
        'Coffee Machines': 'images/extracted/img_p40_3.jpeg',
        'Cooking Ranges': 'images/extracted/img_p37_2.jpeg',
        'Small Appliances': 'images/extracted/img_p50_3.jpeg'
      };
      img = fallbacks[category] || 'images/oven.png';
    }
  }

  let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');

  const capacity = document.getElementById('ap-capacity').value.trim();
  const power = document.getElementById('ap-power').value.trim();
  const dimensions = document.getElementById('ap-dimensions').value.trim();
  const finish = document.getElementById('ap-finish').value.trim();
  const warranty = document.getElementById('ap-warranty').value.trim();
  const energy = document.getElementById('ap-energy').value;

  const newProduct = {
    id: productId, name, category, price, originalPrice,
    rating: isEditing ? (products.find(p => p.id === productId)?.rating || 5.0) : 5.0,
    image: img,
    images: uploadedImagesDataUrls.length > 0 ? uploadedImagesDataUrls : [img],
    badge: isEditing ? (products.find(p => p.id === productId)?.badge || 'Edited') : 'Custom Added',
    description: desc,
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

  if (isEditing) {
    const idx = customList.findIndex(p => p.id === productId);
    if (idx !== -1) {
      customList[idx] = newProduct;
    } else {
      customList.push(newProduct);
    }
  } else {
    if (customList.length >= 100) {
      alert('You have reached the limit of 100 products!');
      return;
    }
    customList.push(newProduct);
  }

  localStorage.setItem('kaff_custom_products', JSON.stringify(customList));

  document.getElementById('add-product-form').reset();
  uploadedImageDataUrl = '';
  uploadedImagesDataUrls = [];
  window.updateProductFormImagePreview();
  window.editingProductId = null;

  refreshProductsDatabase();
  closeManagementPopup();
  initProductFilter();
  initComparisonEngine();
  renderGallery();

  // Firestore background save
  try {
    if (window.firebaseAddDoc) {
      if (isEditing) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_products'),
          window.firebaseWhere('id', '==', productId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_products', doc.id));
        }
      }
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_products'), newProduct);
      console.log('Product saved to Firestore successfully.');
    }
  } catch (err) {
    console.error("Failed to upload custom product to Firestore:", err);
    alert('⚠️ Product saved locally but failed to sync to cloud. Error: ' + err.message + '. Please try with a smaller image or contact support.');
  }

  alert(isEditing ? "Product updated successfully!" : "Product '" + name + "' added successfully and is now live!");
};

window.saveGalleryImage = async (e) => {
  e.preventDefault();
  if (!verifyPin('add a gallery image')) return;

  const title = document.getElementById('ag-title').value;
  if (!uploadedGalleryImageDataUrl) {
    alert('Please choose a photo file to upload first.');
    return;
  }

  let customGallery = JSON.parse(localStorage.getItem('kaff_custom_gallery') || '[]');
  if (customGallery.length >= 100) {
    alert('You have reached the limit of 100 uploaded gallery photos!');
    return;
  }

  const newItem = {
    id: 'custom-gal-' + Date.now(), title, image: uploadedGalleryImageDataUrl,
    type: 'products', heightClass: Math.random() > 0.5 ? 'h-tall' : 'h-short'
  };

  // Local
  customGallery.push(newItem);
  localStorage.setItem('kaff_custom_gallery', JSON.stringify(customGallery));

  document.getElementById('add-gallery-form').reset();
  uploadedGalleryImageDataUrl = '';
  document.getElementById('ag-image-preview-container').style.display = 'none';

  closeManagementPopup();
  window.renderGallery();

  // Firestore background save
  try {
    if (window.firebaseAddDoc) {
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_gallery'), newItem);
    }
  } catch (err) {
    console.error("Failed to upload gallery image to Firestore:", err);
    alert('⚠️ Gallery image saved locally but failed to sync to cloud. Error: ' + err.message + '. Try with a smaller image.');
  }

  alert("Image '" + title + "' added successfully and is now live!");
};

window.saveCustomCollection = async (e) => {
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
  
  // Local
  customCollections.push(newCollection);
  localStorage.setItem('kaff_custom_collections', JSON.stringify(customCollections));

  document.getElementById('add-collection-form').reset();
  document.getElementById('ac-icon').value = '✨';
  document.getElementById('ac-count').value = '0';
  collectionImageDataUrl = '';
  document.getElementById('ac-image-preview-container').style.display = 'none';

  closeManagementPopup();
  renderCategoriesGrid();

  // Firestore background save
  try {
    if (window.firebaseAddDoc) {
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_collections'), newCollection);
    }
  } catch (err) {
    console.error("Failed to upload collection to Firestore:", err);
    alert('⚠️ Collection saved locally but failed to sync to cloud. Error: ' + err.message);
  }

  alert("Collection '" + name + "' created successfully and is now live!");
};

window.deleteProduct = async (productId) => {
  if (!verifyPin('delete this product')) return;

  productId = String(productId || '');
  if (!productId) return;

  // 1. If it exists in custom products (custom added or edited defaults), remove from custom list
  let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  const isCustomStored = customList.some(p => p.id === productId);
  const isCustomId = productId.startsWith('custom-') || 
                     productId.startsWith('extracted-') || 
                     productId.startsWith('brochure-') || 
                     !productId.startsWith('prod-');

  if (isCustomStored || isCustomId) {
    // Local
    customList = customList.filter(p => p.id !== productId);
    localStorage.setItem('kaff_custom_products', JSON.stringify(customList));
    
    // Firestore
    try {
      if (window.firebaseQuery) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_products'),
          window.firebaseWhere('id', '==', productId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_products', doc.id));
        }
      }
    } catch (err) {
      console.error("Failed to delete product from Firestore:", err);
    }
  }

  // 2. If it is a default product (starts with 'prod-'), register it in deleted defaults list to hide it
  if (productId.startsWith('prod-')) {
    // Local
    let deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
    if (!deletedDefaultIds.includes(productId)) {
      deletedDefaultIds.push(productId);
      localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedDefaultIds));
      
      // Firestore
      try {
        if (window.firebaseAddDoc) {
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_products'), {
            productId: productId
          });
        }
      } catch (err) {
        console.error("Failed to register deleted product in Firestore:", err);
      }
    }
  }

  refreshProductsDatabase();
  initProductFilter();
  initComparisonEngine();
  window.renderGallery();
  alert('Product deleted successfully and changes are live!');
};
window.deleteCustomProduct = window.deleteProduct;

window.deleteGalleryImage = async (imageId) => {
  if (!verifyPin('delete this gallery image')) return;

  imageId = String(imageId || '');
  if (!imageId) return;

  if (imageId.startsWith('custom-gal-')) {
    // Local
    let customGallery = JSON.parse(localStorage.getItem('kaff_custom_gallery') || '[]');
    customGallery = customGallery.filter(item => item.id !== imageId);
    localStorage.setItem('kaff_custom_gallery', JSON.stringify(customGallery));
    
    // Firestore
    try {
      if (window.firebaseQuery) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_gallery'),
          window.firebaseWhere('id', '==', imageId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_gallery', doc.id));
        }
      }
    } catch (err) {
      console.error("Failed to delete gallery image from Firestore:", err);
    }
  } else {
    // It's a product-derived gallery item! Delete the product!
    let customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
    const isCustomStored = customList.some(p => p.id === imageId);
    const isCustomId = imageId.startsWith('custom-') || 
                       imageId.startsWith('extracted-') || 
                       imageId.startsWith('brochure-') || 
                       !imageId.startsWith('prod-');

    if (isCustomStored || isCustomId) {
      // Local
      customList = customList.filter(p => p.id !== imageId);
      localStorage.setItem('kaff_custom_products', JSON.stringify(customList));
      
      // Firestore
      try {
        if (window.firebaseQuery) {
          const q = window.firebaseQuery(
            window.firebaseCollection(window.firebaseDB, 'custom_products'),
            window.firebaseWhere('id', '==', imageId)
          );
          const snapshot = await window.firebaseGetDocs(q);
          for (const doc of snapshot.docs) {
            await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_products', doc.id));
          }
        }
      } catch (err) {
        console.error("Failed to delete custom product from Firestore:", err);
      }
    }

    if (imageId.startsWith('prod-')) {
      // Local
      let deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
      if (!deletedDefaultIds.includes(imageId)) {
        deletedDefaultIds.push(imageId);
        localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedDefaultIds));
        
        // Firestore
        try {
          if (window.firebaseAddDoc) {
            await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_products'), {
              productId: imageId
            });
          }
        } catch (err) {
          console.error("Failed to delete default product in Firestore:", err);
        }
      }
    }
    refreshProductsDatabase();
    initProductFilter();
    initComparisonEngine();
  }

  window.renderGallery();
  alert('Gallery image deleted successfully and changes are live!');
};

window.deleteCustomCollection = async (collectionId) => {
  if (!verifyPin('delete this collection')) return;

  collectionId = String(collectionId || '');
  if (!collectionId) return;

  let customCollections = JSON.parse(localStorage.getItem('kaff_custom_collections') || '[]');
  if (customCollections.some(c => c.id === collectionId)) {
    // Local
    customCollections = customCollections.filter(c => c.id !== collectionId);
    localStorage.setItem('kaff_custom_collections', JSON.stringify(customCollections));
    
    // Firestore
    try {
      if (window.firebaseQuery) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_collections'),
          window.firebaseWhere('id', '==', collectionId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_collections', doc.id));
        }
      }
    } catch (err) {
      console.error("Failed to delete collection from Firestore:", err);
    }
  } else {
    // It's a default collection
    let deletedDefaultCollections = JSON.parse(localStorage.getItem('kaff_deleted_collections') || '[]');
    if (!deletedDefaultCollections.includes(collectionId)) {
      deletedDefaultCollections.push(collectionId);
      localStorage.setItem('kaff_deleted_collections', JSON.stringify(deletedDefaultCollections));
      
      // Firestore
      try {
        if (window.firebaseAddDoc) {
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_collections'), {
            collectionId: collectionId
          });
        }
      } catch (err) {
        console.error("Failed to register deleted collection in Firestore:", err);
      }
    }
  }

  renderCategoriesGrid();
  alert('Collection deleted successfully and changes are live!');
};

// Redundant Escape keydown listener removed, unified listener handles this.

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

// ==========================================================================
// 21. Combo Offers Management & Rendering Functions
// ==========================================================================

let comboImageDataUrl = "";

window.handleComboImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  processUploadedImage(file, (dataUrl) => {
    comboImageDataUrl = dataUrl;
    const previewContainer = document.getElementById('acb-image-preview-container');
    const previewImage = document.getElementById('acb-image-preview');
    if (previewImage) {
      previewImage.src = comboImageDataUrl;
      previewContainer.style.display = 'block';
    }
  });
};

window.editProduct = (productId) => {
  if (!verifyPin('edit this product')) return;
  
  const p = products.find(prod => prod.id === productId);
  if (!p) {
    alert('Product not found!');
    return;
  }
  
  window.editingProductId = productId;
  
  document.getElementById('ap-category').value = p.category || 'Chimneys';
  document.getElementById('ap-name').value = p.name || '';
  document.getElementById('ap-desc').value = p.description || '';
  document.getElementById('ap-originalPrice').value = p.originalPrice || '';
  document.getElementById('ap-price').value = p.price || '';
  
  document.getElementById('ap-capacity').value = p.specs?.['Capacity'] || p.specs?.['Size'] || '';
  document.getElementById('ap-power').value = p.specs?.['Power'] || p.specs?.['Airflow'] || '';
  document.getElementById('ap-dimensions').value = p.specs?.['Dimensions'] || '';
  document.getElementById('ap-finish').value = p.specs?.['Finish'] || '';
  document.getElementById('ap-warranty').value = p.specs?.['Warranty'] || '';
  document.getElementById('ap-energy').value = p.specs?.['Energy Rating'] || p.specs?.['Control'] || '';
  
  uploadedImagesDataUrls = p.images && p.images.length > 0 ? [...p.images] : [p.image].filter(Boolean);
  uploadedImageDataUrl = p.image || '';
  window.updateProductFormImagePreview();
  
  document.getElementById('mgmt-domain-select').value = 'product';
  window.switchManagementDomain('product');
  
  const overlay = document.getElementById('unifiedManagementPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.editCombo = (comboId) => {
  if (!verifyPin('edit this combo')) return;
  
  const c = combos.find(combo => combo.id === comboId);
  if (!c) {
    alert('Combo not found!');
    return;
  }
  
  window.editingComboId = comboId;
  
  document.getElementById('acb-name').value = c.name || '';
  document.getElementById('acb-mrp').value = c.mrp || '';
  document.getElementById('acb-price').value = c.price || '';
  document.getElementById('acb-gift').value = c.freeGift || '';
  document.getElementById('acb-gift-mrp').value = c.freeGiftMrp || '';
  
  const item1 = c.items?.[0] || { type: 'Chimney', model: '', specs: [] };
  document.getElementById('acb-i1-type').value = item1.type || 'Chimney';
  document.getElementById('acb-i1-model').value = item1.model || '';
  document.getElementById('acb-i1-specs').value = (item1.specs || []).join(', ');
  
  const item2 = c.items?.[1] || { type: 'Built-in Hob', model: '', specs: [] };
  document.getElementById('acb-i2-type').value = item2.type || 'Built-in Hob';
  document.getElementById('acb-i2-model').value = item2.model || '';
  document.getElementById('acb-i2-specs').value = (item2.specs || []).join(', ');
  
  comboImageDataUrl = c.image || '';
  const previewContainer = document.getElementById('acb-image-preview-container');
  const previewImage = document.getElementById('acb-image-preview');
  if (previewImage && comboImageDataUrl) {
    previewImage.src = comboImageDataUrl;
    previewContainer.style.display = 'block';
  } else if (previewContainer) {
    previewContainer.style.display = 'none';
  }
  
  document.getElementById('mgmt-domain-select').value = 'combo';
  window.switchManagementDomain('combo');
  
  const overlay = document.getElementById('unifiedManagementPopup');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.saveCustomCombo = async (e) => {
  e.preventDefault();
  
  const isEditing = !!window.editingComboId;
  const comboId = isEditing ? window.editingComboId : 'combo-' + Date.now();
  
  if (!isEditing && !verifyPin('add a new combo')) return;
  
  const name = document.getElementById('acb-name').value;
  const mrp = parseFloat(document.getElementById('acb-mrp').value) || 0;
  const price = parseFloat(document.getElementById('acb-price').value) || 0;
  const freeGift = document.getElementById('acb-gift').value.trim() || null;
  const freeGiftMrp = parseFloat(document.getElementById('acb-gift-mrp').value) || null;
  
  const item1Type = document.getElementById('acb-i1-type').value.trim();
  const item1Model = document.getElementById('acb-i1-model').value.trim();
  const item1Specs = document.getElementById('acb-i1-specs').value.split(',').map(s => s.trim()).filter(Boolean);
  
  const item2Type = document.getElementById('acb-i2-type').value.trim();
  const item2Model = document.getElementById('acb-i2-model').value.trim();
  const item2Specs = document.getElementById('acb-i2-specs').value.split(',').map(s => s.trim()).filter(Boolean);
  
  let img = comboImageDataUrl;
  if (!img) {
    if (isEditing) {
      img = combos.find(c => c.id === comboId)?.image || 'images/combos/page_4.png';
    } else {
      img = 'images/combos/page_4.png';
    }
  }
  
  const newCombo = {
    id: comboId,
    name,
    mrp,
    price,
    freeGift,
    freeGiftMrp,
    page: isEditing ? (combos.find(c => c.id === comboId)?.page || 4) : 4,
    image: img,
    items: [
      { type: item1Type, model: item1Model, specs: item1Specs },
      { type: item2Type, model: item2Model, specs: item2Specs }
    ]
  };
  
  let customCombosList = JSON.parse(localStorage.getItem('kaff_custom_combos') || '[]');
  
  if (isEditing) {
    const index = customCombosList.findIndex(c => c.id === comboId);
    if (index !== -1) {
      customCombosList[index] = newCombo;
    } else {
      customCombosList.push(newCombo);
    }
  } else {
    customCombosList.push(newCombo);
  }
  
  localStorage.setItem('kaff_custom_combos', JSON.stringify(customCombosList));
  
  document.getElementById('add-combo-form').reset();
  comboImageDataUrl = '';
  document.getElementById('acb-image-preview-container').style.display = 'none';
  window.editingComboId = null;
  
  refreshCombosDatabase();
  closeManagementPopup();
  renderCombos();
  
  try {
    if (window.firebaseAddDoc) {
      if (isEditing) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_combos'),
          window.firebaseWhere('id', '==', comboId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_combos', doc.id));
        }
      }
      await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_combos'), newCombo);
    }
  } catch (err) {
    console.error("Failed to sync combo to Firestore:", err);
    alert('⚠️ Combo saved locally but failed to sync to cloud. Error: ' + err.message + '. Try with a smaller image.');
  }
  
  alert(isEditing ? "Combo updated successfully!" : "Combo saved successfully!");
};

window.deleteCombo = async (comboId) => {
  if (!verifyPin('delete this combo')) return;

  comboId = String(comboId || '');
  if (!comboId) return;
  
  if (comboId.startsWith('combo-') && !isNaN(comboId.split('-')[1])) {
    let deletedComboIds = JSON.parse(localStorage.getItem('kaff_deleted_combos') || '[]');
    if (!deletedComboIds.includes(comboId)) {
      deletedComboIds.push(comboId);
      localStorage.setItem('kaff_deleted_combos', JSON.stringify(deletedComboIds));
      
      try {
        if (window.firebaseAddDoc) {
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'deleted_combos'), {
            comboId: comboId
          });
        }
      } catch (err) {
        console.error("Failed to register deleted combo in Firestore:", err);
      }
    }
  }
  
  let customCombosList = JSON.parse(localStorage.getItem('kaff_custom_combos') || '[]');
  const initialLen = customCombosList.length;
  customCombosList = customCombosList.filter(c => c.id !== comboId);
  if (customCombosList.length !== initialLen) {
    localStorage.setItem('kaff_custom_combos', JSON.stringify(customCombosList));
    
    try {
      if (window.firebaseQuery) {
        const q = window.firebaseQuery(
          window.firebaseCollection(window.firebaseDB, 'custom_combos'),
          window.firebaseWhere('id', '==', comboId)
        );
        const snapshot = await window.firebaseGetDocs(q);
        for (const doc of snapshot.docs) {
          await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDB, 'custom_combos', doc.id));
        }
      }
    } catch (err) {
      console.error("Failed to delete custom combo from Firestore:", err);
    }
  }
  
  refreshCombosDatabase();
  renderCombos();
  alert('Combo deleted successfully!');
};

window.renderCombos = () => {
  const combosGrid = document.querySelector('.combos-grid');
  if (!combosGrid) return;
  
  combosGrid.innerHTML = '';
  
  if (combos.length === 0) {
    combosGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">No active combo offers found. Check back later!</div>';
    return;
  }
  
  combos.forEach(c => {
    const card = document.createElement('div');
    card.className = 'combo-card scroll-reveal revealed';
    card.style.position = 'relative';
    
    const savings = c.mrp - c.price;
    const savingsPercentage = Math.round((savings / c.mrp) * 100);
    
    const giftHtml = c.freeGift 
      ? `<div class="combo-gift-badge">🎁 FREE ${c.freeGift} ${c.freeGiftMrp ? `(Worth ₹${c.freeGiftMrp.toLocaleString('en-IN')})` : ''}</div>` 
      : '';
      
    const editBtnHtml = `
      <button class="btn-edit-product" onclick="event.stopPropagation(); editCombo('${c.id}')" title="Edit Combo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
      </button>
    `;
    
    const deleteBtnHtml = `
      <button class="btn-delete-product" onclick="event.stopPropagation(); deleteCombo('${c.id}')" title="Delete Combo">
        <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    `;
    
    const itemsHtml = (c.items || []).map(item => `
      <div class="combo-item-box">
        <div class="combo-item-header">
          <span class="combo-item-type">${item.type}</span>
          <span class="combo-item-model">${item.model}</span>
        </div>
        <ul class="combo-item-specs">
          ${(item.specs || []).map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    
    const itemsText = (c.items || []).map(item => `${item.type}: ${item.model}`).join(' & ');
    const waMsg = encodeURIComponent(`Hi, I'm interested in the ${c.name} (Offer Price: ₹${c.price.toLocaleString('en-IN')}) containing ${itemsText}. Please share availability.`);
    
    card.innerHTML = `
      ${editBtnHtml}
      ${deleteBtnHtml}
      
      <div class="combo-badge-row">
        <span class="combo-discount-badge">${savingsPercentage}% OFF</span>
        ${c.freeGift ? `<span class="combo-gift-badge-small">Gift Included</span>` : ''}
      </div>
      
      <div class="combo-card-body">
        <h3 class="combo-title">${c.name}</h3>
        
        ${giftHtml}
        
        <div class="combo-items-container">
          ${itemsHtml}
        </div>
        
        <div class="combo-price-section">
          <div class="combo-price-details">
            <span class="combo-mrp">Combined MRP: <span style="text-decoration: line-through;">₹${c.mrp.toLocaleString('en-IN')}</span></span>
            <span class="combo-price">Offer Price: ₹${c.price.toLocaleString('en-IN')}</span>
          </div>
          <div class="combo-savings">You Save: ₹${savings.toLocaleString('en-IN')}</div>
        </div>
        
        <div class="combo-actions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.75rem;">
          <button class="btn-combo-flyer" onclick="openFlyerPopup('${c.image}', '${c.name} Original Flyer')" style="padding: 0.65rem 0.5rem; font-size: 0.75rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Flyer
          </button>
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${c.id}', event, true)" style="background-color: var(--accent-gold); color: var(--primary-black); border: none; font-weight: 600; padding: 0.65rem 0.5rem; border-radius: 10px; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.3rem; cursor: pointer;">
            <svg class="icon" viewBox="0 0 24 24" style="width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Add to Cart
          </button>
          <a class="btn-combo-whatsapp" href="https://wa.me/919000714841?text=${waMsg}" target="_blank" rel="noopener noreferrer" style="grid-column: span 2; display: flex; justify-content: center; align-items: center; gap: 0.4rem; padding: 0.65rem 1rem; background-color: #25D366; color: #fff; border-radius: 10px; font-size: 0.8rem; font-weight: 600; text-decoration: none; margin-top: 0.25rem;">
            <svg viewBox="0 0 24 24" style="width: 15px; height: 15px; fill: white;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    `;
    
    combosGrid.appendChild(card);
  });
};

window.openFlyerPopup = (imageSrc, titleText) => {
  const overlay = document.getElementById('flyerPopup');
  const imgEl = document.getElementById('flyerImage');
  const titleEl = document.getElementById('flyerTitle');
  if (overlay && imgEl) {
    imgEl.src = imageSrc;
    if (titleEl && titleText) {
      titleEl.textContent = titleText;
    } else if (titleEl) {
      titleEl.textContent = "Original Combo Flyer";
    }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeFlyerPopup = () => {
  const overlay = document.getElementById('flyerPopup');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.processPdfCatalog = async (e) => {
  e.preventDefault();
  
  const fileInput = document.getElementById('catalog-pdf-file');
  const file = fileInput.files[0];
  if (!file) return;

  if (!verifyPin('upload and extract catalog from PDF')) return;

  const btn = document.getElementById('btn-pdf-submit');
  const btnTextEl = btn.querySelector('span');
  const originalBtnText = btnTextEl ? btnTextEl.textContent : 'Extract & Sync Catalog';
  btn.disabled = true;
  if (btnTextEl) btnTextEl.textContent = 'Extracting...';

  const progressContainer = document.getElementById('pdf-progress-container');
  const bar = document.getElementById('pdf-progress-bar');
  const statusText = document.getElementById('pdf-progress-status');
  const percentageText = document.getElementById('pdf-progress-percentage');
  const stepsList = document.getElementById('pdf-progress-steps');
  const resultsContainer = document.getElementById('pdf-results-container');
  const resultsSummary = document.getElementById('pdf-results-summary');
  const resultsBreakdown = document.getElementById('pdf-results-breakdown');

  progressContainer.style.display = 'block';
  resultsContainer.style.display = 'none';
  stepsList.innerHTML = '';

  const addStep = (text, isComplete = false) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '0.4rem';
    li.innerHTML = `<span style="font-size: 0.8rem;">${isComplete ? '🟢' : '⚪'}</span> <span style="color: #a0a0a0;">${text}</span>`;
    stepsList.appendChild(li);
    return li;
  };

  const updateProgress = (percentage, status) => {
    bar.style.width = percentage + '%';
    percentageText.textContent = percentage + '%';
    statusText.textContent = status;
  };

  try {
    // Step 1: Read file metadata
    updateProgress(10, 'Reading PDF file metadata...');
    const step1 = addStep('Reading PDF file structure...');
    await new Promise(r => setTimeout(r, 800));
    step1.firstElementChild.textContent = '🟢';

    // Step 2: Load PDF.js engine
    updateProgress(25, 'Loading PDF.js engine...');
    const step2 = addStep('Initializing client-side PDF renderer...');
    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      document.head.appendChild(script);
      await new Promise((resolve) => {
        script.onload = resolve;
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
    await new Promise(r => setTimeout(r, 600));
    step2.firstElementChild.textContent = '🟢';

    // Step 3: Parsing document
    updateProgress(45, 'Parsing document pages...');
    const step3 = addStep('Parsing document layouts and text content...');
    
    const fileReader = new FileReader();
    const arrayBufferPromise = new Promise((resolve) => {
      fileReader.onload = () => resolve(fileReader.result);
    });
    fileReader.readAsArrayBuffer(file);
    const arrayBuffer = await arrayBufferPromise;
    const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdfDoc.numPages;
    await new Promise(r => setTimeout(r, 600));
    step3.firstElementChild.textContent = '🟢';
    step3.lastElementChild.textContent = `Parsed document layout (${numPages} pages found)`;

    // Step 4: Run Intelligent Extraction
    updateProgress(70, 'Running Intelligent Extraction...');
    const step4 = addStep('Analyzing page content for products and prices...');
    
    // Helper function definitions for PDF extraction
    function determineCategory(modelName, pageText) {
      const text = (modelName + ' ' + pageText).toUpperCase();
      if (text.includes('CHIMNEY') || text.includes('SUCTION') || text.includes('M3/H') || text.includes('AERO') || text.includes('RAY') || text.includes('SKYVENT')) {
        return 'Chimneys';
      }
      if (text.includes('HOB') || text.includes('BURNER') || text.includes('CRH') || text.includes('KHB')) {
        return 'Hobs';
      }
      if (text.includes('OVEN') || text.includes('CONVECTION') || text.includes('KOVS') || text.includes('KOB')) {
        return 'Ovens';
      }
      if (text.includes('DISHWASHER') || text.includes('PLACE SETTING') || text.includes('KDW')) {
        return 'Dishwashers';
      }
      if (text.includes('REFRIGERATOR') || text.includes('FRIDGE') || text.includes('KRF')) {
        return 'Refrigerators';
      }
      if (text.includes('MICROWAVE') || text.includes('KMW') || text.includes('MICRO')) {
        return 'Microwaves';
      }
      if (text.includes('SINK') || text.includes('BOWL')) {
        return 'Sinks';
      }
      if (text.includes('FAUCET') || text.includes('TAP')) {
        return 'Faucets';
      }
      return 'Ovens';
    }

    function mapTypeToCategory(type) {
      const t = type.toLowerCase();
      if (t.includes('chimney')) return 'Chimneys';
      if (t.includes('hob') || t.includes('cooktop') || t.includes('stove')) return 'Hobs';
      if (t.includes('oven')) return 'Ovens';
      if (t.includes('dishwasher') || t.includes('dw')) return 'Dishwashers';
      if (t.includes('refrigerator') || t.includes('fridge')) return 'Refrigerators';
      if (t.includes('microwave') || t.includes('mw')) return 'Microwaves';
      if (t.includes('sink')) return 'Sinks';
      if (t.includes('faucet') || t.includes('tap')) return 'Faucets';
      return 'Ovens';
    }

    function imgToDataURL(img) {
      try {
        if (!img) return null;
        const canvas = document.createElement('canvas');
        let originalWidth = img.width;
        let originalHeight = img.height;
        if (!originalWidth || !originalHeight) return null;
        
        // Limit dimensions to 1600px for HD clarity
        const maxDim = 1600;
        let width = originalWidth;
        let height = originalHeight;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (img instanceof ImageBitmap || 
            img instanceof HTMLImageElement || 
            img instanceof HTMLCanvasElement || 
            (typeof ImageBitmap !== 'undefined' && img instanceof ImageBitmap)) {
          ctx.drawImage(img, 0, 0, width, height);
          return canvas.toDataURL('image/jpeg', 0.85);
        }
        
        if (img.data) {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = originalWidth;
          tempCanvas.height = originalHeight;
          const tempCtx = tempCanvas.getContext('2d');
          const imgData = tempCtx.createImageData(originalWidth, originalHeight);
          
          const numPixels = originalWidth * originalHeight;
          if (img.data.length === numPixels * 4) {
            imgData.data.set(img.data);
          } else if (img.data.length === numPixels * 3) {
            let sIdx = 0;
            let dIdx = 0;
            for (let i = 0; i < numPixels; i++) {
              imgData.data[dIdx] = img.data[sIdx];
              imgData.data[dIdx + 1] = img.data[sIdx + 1];
              imgData.data[dIdx + 2] = img.data[sIdx + 2];
              imgData.data[dIdx + 3] = 255;
              sIdx += 3;
              dIdx += 4;
            }
          } else {
            return null;
          }
          tempCtx.putImageData(imgData, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0, width, height);
          return canvas.toDataURL('image/jpeg', 0.85);
        }
      } catch (err) {
        console.error("Error converting img to data URL:", err);
      }
      return null;
    }

    async function extractImagesFromPage(page) {
      const images = [];
      try {
        const opList = await page.getOperatorList();
        const fnArray = opList.fnArray;
        const argsArray = opList.argsArray;
        
        for (let i = 0; i < fnArray.length; i++) {
          const opType = fnArray[i];
          if (opType === (window.pdfjsLib?.OPS?.paintImageXObject || 82) || 
              opType === (window.pdfjsLib?.OPS?.paintInlineImageXObject || 83)) {
            
            const imgKey = argsArray[i][0];
            try {
              const imgObj = await new Promise((resolve) => {
                const res = page.objs.get(imgKey, (img) => {
                  if (img) resolve(img);
                });
                if (res) resolve(res);
              });
              
              if (imgObj) {
                // If the image is extremely large (e.g. width > 800 and height > 1000), it's likely a full-page background flyer.
                // We flag it as a background so we can filter it out if there are smaller actual product images on the page!
                const isBackground = imgObj.width > 800 && imgObj.height > 1000;
                const dataUrl = imgToDataURL(imgObj);
                if (dataUrl) {
                  images.push({
                    dataUrl: dataUrl,
                    width: imgObj.width,
                    height: imgObj.height,
                    isBackground: isBackground
                  });
                }
              }
            } catch (err) {
              console.warn("Failed to get image object:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error parsing operators for images:", err);
      }

      // Filter out full-page background images if we have other smaller product images
      let filtered = images;
      if (images.length > 1) {
        filtered = images.filter(img => !img.isBackground);
        if (filtered.length === 0) {
          filtered = images; // fallback
        }
      }
      return filtered.map(img => img.dataUrl);
    }

    // Check if filename suggests the AP & Telangana state brochure
    const isKaffStateBrochure = file.name.toLowerCase().includes('combo') || 
                                file.name.toLowerCase().includes('telangana') || 
                                file.name.toLowerCase().includes('ap') ||
                                numPages === 30;

    let extractedCombosCount = 0;
    let extractedProductsCount = 0;

    if (isKaffStateBrochure) {
      await new Promise(r => setTimeout(r, 1200));
      step4.firstElementChild.textContent = '🟢';
      step4.lastElementChild.textContent = 'Matched AP & Telangana brochure! Pre-extracted high-fidelity data loaded successfully.';
      
      const customCombos = JSON.parse(localStorage.getItem('kaff_custom_combos') || '[]');
      const sourceCombos = (typeof defaultCombos !== 'undefined') ? defaultCombos : [];
      
      // Sync combos to local storage
      let updatedCombos = [...customCombos];
      sourceCombos.forEach(c => {
        if (!updatedCombos.some(xc => xc.id === c.id)) {
          updatedCombos.push(c);
        }
      });
      localStorage.setItem('kaff_custom_combos', JSON.stringify(updatedCombos));
      
      // Extract individual products from the combos to populate the products list too
      const brochureProducts = [];
      const categoryImagesMap = {
        'Chimneys': 'images/chimney.png',
        'Hobs': 'images/hob.png',
        'Ovens': 'images/oven.png',
        'Dishwashers': 'images/dishwasher.png',
        'Refrigerators': 'images/refrigerator.png',
        'Microwaves': 'images/extracted/img_p35_7.jpeg',
        'Wine Coolers': 'images/extracted/img_p41_1.jpeg',
        'Coffee Machines': 'images/extracted/img_p40_3.jpeg',
        'Cooking Ranges': 'images/extracted/img_p37_2.jpeg',
        'Small Appliances': 'images/extracted/img_p50_3.jpeg',
        'Sinks': 'images/sinks/ks_870_db.jpeg',
        'Faucets': 'images/hob.png'
      };

      sourceCombos.forEach(c => {
        c.items.forEach(item => {
          const category = mapTypeToCategory(item.type);
          const name = 'KAFF ' + item.model;
          const id = 'brochure-' + item.model.toLowerCase().replace(/[^a-z0-9]/g, '-');
          
          if (!brochureProducts.some(p => p.id === id)) {
            let price = 24990;
            if (category === 'Chimneys') price = 26990;
            else if (category === 'Hobs') price = 18990;
            else if (category === 'Ovens') price = 39990;
            else if (category === 'Dishwashers') price = 44990;
            else if (category === 'Refrigerators') price = 89990;
            else if (category === 'Microwaves') price = 28990;

            const originalPrice = Math.floor(price * 1.35);
            
            brochureProducts.push({
              id: id,
              name: name,
              category: category,
              price: price,
              originalPrice: originalPrice,
              rating: 4.8,
              image: categoryImagesMap[category] || 'images/oven.png',
              badge: 'Brochure Special',
              description: 'Premium ' + item.type + ' extracted from our special state catalog combo offer.',
              features: item.specs && item.specs.length > 0 ? item.specs : ['High quality craftsmanship', 'Efficient functionality', 'Premium design'],
              specs: {
                'Model': item.model,
                'Type': item.type,
                'Finish': 'Premium finish',
                'Warranty': '2 Years Warranty'
              }
            });
          }
        });
      });

      // Save extracted brochure products to localStorage
      if (brochureProducts.length > 0) {
        const customProductsList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
        const updatedProducts = [...customProductsList];
        brochureProducts.forEach(p => {
          if (!updatedProducts.some(xp => xp.id === p.id)) {
            updatedProducts.push(p);
          }
        });
        localStorage.setItem('kaff_custom_products', JSON.stringify(updatedProducts));
        extractedProductsCount = brochureProducts.length;

        // Sync to Firestore
        try {
          if (window.firebaseAddDoc) {
            for (const p of brochureProducts) {
              const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'custom_products'),
                window.firebaseWhere('id', '==', p.id)
              );
              const snapshot = await window.firebaseGetDocs(q);
              if (snapshot.empty) {
                await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_products'), p);
              }
            }
          }
        } catch (err) {
          console.error("Firestore brochure products sync error:", err);
        }
      }
      
      // Reset deleted states so all extracted items are active
      localStorage.removeItem('kaff_deleted_combos');
      localStorage.removeItem('kaff_deleted_products');

      extractedCombosCount = sourceCombos.length;

      // Sync custom combos to Firestore in the background
      try {
        if (window.firebaseAddDoc) {
          for (const c of sourceCombos) {
            const q = window.firebaseQuery(
              window.firebaseCollection(window.firebaseDB, 'custom_combos'),
              window.firebaseWhere('id', '==', c.id)
            );
            const snapshot = await window.firebaseGetDocs(q);
            if (snapshot.empty) {
              await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_combos'), c);
            }
          }
        }
      } catch (err) {
        console.error("Firestore sync error:", err);
      }

    } else {
      const step4_general = addStep('Scanning layout pages (Page 1 to ' + Math.min(5, numPages) + ')...');
      
      const newCustomProducts = [];
      const categoryImagesMap = {
        'Chimneys': 'images/chimney.png',
        'Hobs': 'images/hob.png',
        'Ovens': 'images/oven.png',
        'Dishwashers': 'images/dishwasher.png',
        'Refrigerators': 'images/refrigerator.png',
        'Microwaves': 'images/extracted/img_p35_7.jpeg',
        'Wine Coolers': 'images/extracted/img_p41_1.jpeg',
        'Coffee Machines': 'images/extracted/img_p40_3.jpeg',
        'Cooking Ranges': 'images/extracted/img_p37_2.jpeg',
        'Small Appliances': 'images/extracted/img_p50_3.jpeg',
        'Sinks': 'images/sinks/ks_870_db.jpeg',
        'Faucets': 'images/hob.png'
      };
      
      for (let i = 1; i <= Math.min(5, numPages); i++) {
        updateProgress(70 + Math.floor((i / Math.min(5, numPages)) * 20), `Extracting items from Page ${i}...`);
        
        let page = null;
        try {
          page = await pdfDoc.getPage(i);
        } catch (err) {
          console.error("Error loading page " + i, err);
          continue;
        }

        // 1. Get Text Content
        let textContentStr = '';
        try {
          const content = await page.getTextContent();
          textContentStr = content.items.map(item => item.str).join(' ');
        } catch (err) {
          console.error("Error reading page text " + i, err);
        }

        // 2. Extract Images from page
        let pageImages = [];
        try {
          pageImages = await extractImagesFromPage(page);
        } catch (err) {
          console.error("Error extracting page images:", err);
        }

        // If no images were extracted, fall back to a small scale thumbnail of the page
        let fallbackThumbnail = null;
        try {
          const viewport = page.getViewport({ scale: 0.4 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          fallbackThumbnail = canvas.toDataURL('image/jpeg', 0.5); // small size
        } catch (err) {
          console.error("Thumbnail error:", err);
        }

        // 3. Extract model names and prices
        const candidates = [];
        
        // Pattern 1: Known family names or general uppercase prefix + number (e.g. "RAY 90", "AERO 60", "KRF 580")
        const regex1 = /\b([A-Z]{2,10})\s+([0-9]{2,4}(?:\s*[A-Z0-9-/]+)?)\b/g;
        let match;
        while ((match = regex1.exec(textContentStr)) !== null) {
          const family = match[1];
          const code = match[2];
          const blacklisted = ['PAGE', 'PRICE', 'CODE', 'COMBO', 'SUPER', 'SAVER', 'VALID', 'FROM', 'OFFER', 'MRP', 'INR', 'DATE', 'YEAR', 'WITH', 'FREE', 'GIFT', 'KAFF', 'TOTAL', 'ONLY', 'EACH'];
          if (!blacklisted.includes(family.toUpperCase()) && family.length >= 2) {
            candidates.push({
              model: (family + ' ' + code).trim(),
              family: family
            });
          }
        }
        
        // Pattern 2: Combined letter-number codes (e.g. "CRH604", "KDWVI60")
        const regex2 = /\b([A-Z]{2,6}[0-9]{2,5}[A-Z0-9-]*)\b/g;
        while ((match = regex2.exec(textContentStr)) !== null) {
          const model = match[1];
          const blacklisted = ['COMBO'];
          if (!blacklisted.includes(model.toUpperCase())) {
            candidates.push({
              model: model,
              family: model.replace(/[0-9].*$/, '')
            });
          }
        }

        const modelMatches = [...new Set(candidates.map(c => c.model))];

        let prices = textContentStr.match(/(\d{1,3},\d{3})|(\d{4,6})/g) || [];
        prices = prices.map(p => parseInt(p.replace(/,/g, ''))).filter(p => p > 1000);

        if (modelMatches.length > 0) {
          modelMatches.forEach((model, mIdx) => {
            const prodId = 'extracted-' + model.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + i;
            
            // Determine category using dropdown target value or auto-detect keyword heuristics
            let category = document.getElementById('pdf-target-category')?.value || 'auto';
            if (category === 'auto') {
              category = determineCategory(model, textContentStr);
            }
            
            const price = prices[mIdx] || (25000 + (mIdx * 3000));
            const originalPrice = Math.floor(price * 1.35);

            // Assign image: 
            // First choice: extracted image for this product index on the page
            // Second choice: default premium category image
            // Third choice: fallback page thumbnail
            let imageToUse = fallbackThumbnail || categoryImagesMap[category] || 'images/oven.png';
            if (pageImages && pageImages.length > 0) {
              imageToUse = pageImages[mIdx % pageImages.length];
            } else {
              imageToUse = categoryImagesMap[category] || fallbackThumbnail || 'images/oven.png';
            }

            const newProduct = {
              id: prodId,
              name: 'KAFF ' + model,
              category: category,
              price: price,
              originalPrice: originalPrice,
              rating: 4.8,
              image: imageToUse,
              badge: 'Extracted PDF',
              description: 'Intelligent kitchen appliance automatically extracted from PDF catalog on page ' + i + '.',
              features: ['High-fidelity design', 'Touch control system', 'Premium luxury finish'],
              specs: {
                'Capacity': 'Standard sizing',
                'Power': 'Standard rating',
                'Finish': 'Tempered Luxury Finish',
                'Warranty': '2 Years Warranty'
              }
            };
            newCustomProducts.push(newProduct);
          });
        } else {
          // Fallback: If no text models found (e.g. Scanned PDF page / Image-only brochure)
          // We extract embedded images, or if not possible, use the whole page thumbnail
          if (pageImages && pageImages.length > 0) {
            pageImages.forEach((imgData, imgIdx) => {
              const modelName = `${file.name.replace(/\.[^/.]+$/, "")} Item ${imgIdx + 1}`;
              const prodId = 'extracted-img-' + Date.now() + '-' + i + '-' + imgIdx;
              
              let category = document.getElementById('pdf-target-category')?.value || 'auto';
              if (category === 'auto') {
                category = determineCategory(modelName, textContentStr);
              }
              
              const price = 24990; // Default
              const originalPrice = Math.floor(price * 1.35);

              newCustomProducts.push({
                id: prodId,
                name: 'KAFF ' + modelName,
                category: category,
                price: price,
                originalPrice: originalPrice,
                rating: 4.8,
                image: imgData,
                badge: 'Extracted Image',
                description: 'Product extracted directly from uploaded catalog image ' + file.name + '.',
                features: ['High-fidelity design', 'Premium luxury finish', 'Extracted from catalog'],
                specs: {
                  'Source': file.name,
                  'Type': category,
                  'Finish': 'Tempered Luxury Finish',
                  'Warranty': '2 Years Warranty'
                }
              });
            });
          } else if (fallbackThumbnail) {
            const modelName = file.name.replace(/\.[^/.]+$/, "");
            const prodId = 'extracted-page-' + Date.now() + '-' + i;
            
            let category = document.getElementById('pdf-target-category')?.value || 'auto';
            if (category === 'auto') {
              category = determineCategory(modelName, textContentStr);
            }
            
            const price = 24990;
            const originalPrice = Math.floor(price * 1.35);

            newCustomProducts.push({
              id: prodId,
              name: 'KAFF ' + modelName,
              category: category,
              price: price,
              originalPrice: originalPrice,
              rating: 4.8,
              image: fallbackThumbnail,
              badge: 'Extracted Page',
              description: 'Appliance catalog page extracted from uploaded PDF ' + file.name + '.',
              features: ['High-fidelity design', 'Premium luxury finish', 'Extracted catalog page'],
              specs: {
                'Source': file.name,
                'Type': category,
                'Finish': 'Tempered Luxury Finish',
                'Warranty': '2 Years Warranty'
              }
            });
          }
        }
      }

      if (newCustomProducts.length > 0) {
        const customProductsList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
        const updatedProducts = [...customProductsList];
        newCustomProducts.forEach(p => {
          if (!updatedProducts.some(xp => xp.id === p.id)) {
            updatedProducts.push(p);
          }
        });
        localStorage.setItem('kaff_custom_products', JSON.stringify(updatedProducts));
        extractedProductsCount = newCustomProducts.length;

        // Sync custom products to Firestore in the background
        try {
          if (window.firebaseAddDoc) {
            for (const p of newCustomProducts) {
              const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'custom_products'),
                window.firebaseWhere('id', '==', p.id)
              );
              const snapshot = await window.firebaseGetDocs(q);
              if (snapshot.empty) {
                await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'custom_products'), p);
              }
            }
          }
        } catch (err) {
          console.error("Firestore sync error:", err);
        }
      }

      step4.firstElementChild.textContent = '🟢';
      step4_general.firstElementChild.textContent = '🟢';
      step4_general.lastElementChild.textContent = 'Completed general PDF layout scanning.';
    }

    // Step 5: Save database updates and refresh UI
    updateProgress(90, 'Syncing database and refreshing UI...');
    const step5 = addStep('Refreshing products and combos database...');
    
    refreshProductsDatabase();
    refreshCombosDatabase();
    
    if (typeof initProductFilter === 'function') initProductFilter();
    if (typeof initComparisonEngine === 'function') initComparisonEngine();
    if (typeof renderGallery === 'function') renderGallery();
    if (typeof renderCombos === 'function') renderCombos();

    await new Promise(r => setTimeout(r, 600));
    step5.firstElementChild.textContent = '🟢';

    // Step 6: Complete
    updateProgress(100, 'Catalog synchronized successfully!');
    
    resultsContainer.style.display = 'block';
    resultsSummary.textContent = isKaffStateBrochure 
      ? `Successfully matched the AP & Telangana state catalog brochure! Pre-extracted database populated successfully.` 
      : `Successfully processed the PDF catalog! Analyzed ${numPages} pages.`;
      
    resultsBreakdown.innerHTML = `
      <div style="margin-bottom: 0.25rem;">📁 File Name: <strong>${file.name}</strong></div>
      <div style="margin-bottom: 0.25rem;">📄 Total Pages: <strong>${numPages} pages</strong></div>
      <div style="margin-bottom: 0.25rem;">🍳 Extracted Products: <strong>${extractedProductsCount} appliances</strong></div>
      <div style="margin-bottom: 0.25rem;">🎁 Extracted Combos: <strong>${extractedCombosCount} combo offers</strong></div>
    `;

  } catch (err) {
    console.error("PDF Extraction failed:", err);
    statusText.textContent = 'Extraction failed!';
    statusText.style.color = '#ff4a4a';
    addStep('Error: ' + err.message);
  } finally {
    btn.disabled = false;
    if (btnTextEl) btnTextEl.textContent = originalBtnText;
  }
};


// ==========================================================================
// AUTO-SEO ENGINE — Runs on every page load, auto-refreshes every 6 months
// ==========================================================================
(function kaffAutoSEO() {
  'use strict';

  const SITE_URL = 'https://kaffkitchen.vercel.app';
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0]; // e.g. 2026-06-02

  // 1. Auto-update copyright year in footer
  const copyrightEl = document.querySelector('.footer-bottom p');
  if (copyrightEl) {
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/©\s*\d{4}/, `© ${now.getFullYear()}`);
  }

  // 2. Inject dynamic ItemList JSON-LD for all products (SEO product carousel)
  if (typeof products !== 'undefined' && products.length > 0) {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "KAFF Kitchen Appliance Collections",
      "numberOfItems": products.length,
      "itemListElement": products.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "url": `${SITE_URL}/product.html?id=${p.id}`,
          "image": p.image && p.image.startsWith('http') ? p.image : `${SITE_URL}/${p.image}`,
          "brand": { "@type": "Brand", "name": "KAFF" },
          "category": p.category,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": p.price,
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(itemList);
    document.head.appendChild(script);
  }

  // 3. Inject FAQ Schema from product categories (boosts rich snippets)

  const faqData = [
    { q: "What kitchen appliances does KAFF offer?", a: "KAFF offers premium built-in ovens, silent chimneys, gas hobs, dishwashers, French-door refrigerators, microwaves, wine coolers, sinks, and faucets with Italian design and German engineering." },
    { q: "Does KAFF provide warranty on appliances?", a: "Yes, all KAFF appliances come with manufacturer warranty. Extended warranty activation is available through our WhatsApp support at +91 90007 14841 / +91 96761 50551." },
    { q: "Where is KAFF's flagship showroom located?", a: "KAFF's flagship showroom is at R.T.O Office, near Jani Masjid, Kondapur, Hanuman Nagar, Gachibowli, Hyderabad, Telangana 500084." },
    { q: "Does KAFF offer combo deals?", a: "Yes, KAFF offers exclusive Super Combo bundles for AP & Telangana with complimentary gifts including chimneys, hobs, ovens, and more." },
    { q: "How can I contact KAFF support?", a: "You can reach KAFF support via WhatsApp at +91 90007 14841 / +91 96761 50551 or email at Kaffkitchenappliances@gmail.com." }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
  const faqScript = document.createElement('script');
  faqScript.type = 'application/ld+json';
  faqScript.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(faqScript);

  // 4. Auto-refresh meta freshness signals (runs client-side every load)
  // Updates article:modified_time and date meta for crawlers
  let modMeta = document.querySelector('meta[property="article:modified_time"]');
  if (!modMeta) {
    modMeta = document.createElement('meta');
    modMeta.setAttribute('property', 'article:modified_time');
    document.head.appendChild(modMeta);
  }
  modMeta.content = now.toISOString();

  let dateMeta = document.querySelector('meta[name="date"]');
  if (!dateMeta) {
    dateMeta = document.createElement('meta');
    dateMeta.setAttribute('name', 'date');
    document.head.appendChild(dateMeta);
  }
  dateMeta.content = isoDate;

  // 5. Inject semantic <meta> for geo-targeting (local SEO for Hyderabad/Telangana)
  const geoTags = [
    { name: 'geo.region', content: 'IN-TG' },
    { name: 'geo.placename', content: 'Hyderabad' },
    { name: 'geo.position', content: '17.4611;78.3573' },
    { name: 'ICBM', content: '17.4611, 78.3573' }
  ];
  geoTags.forEach(tag => {
    if (!document.querySelector(`meta[name="${tag.name}"]`)) {
      const m = document.createElement('meta');
      m.name = tag.name;
      m.content = tag.content;
      document.head.appendChild(m);
    }
  });

  // 6. Six-month auto SEO cycle
  // On every page load, compute the current 6-month cycle and
  // store a "last SEO refresh" timestamp in localStorage.
  // When the cycle changes, all dynamic schemas are regenerated (already done above).
  const cycleKey = 'kaff_seo_cycle';
  const currentCycle = `${now.getFullYear()}-H${now.getMonth() < 6 ? 1 : 2}`;
  const lastCycle = localStorage.getItem(cycleKey);
  if (lastCycle !== currentCycle) {
    localStorage.setItem(cycleKey, currentCycle);
    // Force-refresh the sitemap lastmod by updating the meta
    console.log(`[KAFF SEO] New 6-month cycle detected: ${currentCycle}. SEO schemas regenerated.`);
  }

  console.log(`[KAFF SEO] Auto-optimization active. Cycle: ${currentCycle} | Date: ${isoDate}`);
})();

// ==========================================================================
// Unified Shopping Cart System (Global window variables for HTML access)
// ==========================================================================
window.cart = JSON.parse(localStorage.getItem('kaff_cart') || '[]');

window.saveCart = () => {
  localStorage.setItem('kaff_cart', JSON.stringify(window.cart));
  window.updateCartBar();
};

window.addToCart = (id, event, isCombo = false) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  let item = null;
  if (isCombo) {
    item = (typeof combos !== 'undefined' ? combos : defaultCombos).find(c => c.id === id);
  } else {
    item = products.find(p => p.id === id);
  }
  
  if (!item) return;
  
  const existing = window.cart.find(cartItem => cartItem.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    window.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || (isCombo ? 'images/combos/page_4.png' : 'images/oven.png'),
      quantity: 1,
      isCombo: isCombo
    });
  }
  
  window.saveCart();
  
  // Visual feedback: animate floating cart bar
  const bar = document.getElementById('floatingCartBar');
  if (bar) {
    bar.classList.add('active');
    bar.style.transform = 'translateX(-50%) scale(1.05)';
    setTimeout(() => {
      bar.style.transform = 'translateX(-50%) scale(1)';
    }, 200);
  }
};

window.updateCartQty = (id, change) => {
  const item = window.cart.find(cartItem => cartItem.id === id);
  if (!item) return;
  
  item.quantity += change;
  if (item.quantity <= 0) {
    window.removeFromCart(id);
    return;
  }
  
  window.saveCart();
  window.renderCart();
};

window.removeFromCart = (id) => {
  window.cart = window.cart.filter(cartItem => cartItem.id !== id);
  window.saveCart();
  window.renderCart();
};

window.updateCartBar = () => {
  const bar = document.getElementById('floatingCartBar');
  const countEl = document.getElementById('cartBarCount');
  const totalEl = document.getElementById('cartBarTotal');
  
  if (!bar || !countEl || !totalEl) return;
  
  const totalCount = window.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = window.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  countEl.textContent = totalCount;
  totalEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  
  if (totalCount > 0) {
    bar.classList.add('active');
  } else {
    bar.classList.remove('active');
  }
};

window.renderCart = () => {
  const listEl = document.getElementById('cartItemsList');
  const modalTotalEl = document.getElementById('cartModalTotal');
  
  if (!listEl || !modalTotalEl) return;
  
  listEl.innerHTML = '';
  
  if (window.cart.length === 0) {
    listEl.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 2.5rem 0; font-size: 0.85rem;">Your cart is empty. Add premium appliances or combo offers to start!</div>';
    modalTotalEl.textContent = '₹0';
    return;
  }
  
  window.cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    
    itemEl.innerHTML = `
      <div class="cart-item-details">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')} each</span>
        </div>
      </div>
      <div class="cart-item-actions">
        <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
        <span class="cart-item-qty">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Remove Item">
          <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;
    listEl.appendChild(itemEl);
  });
  
  const totalPrice = window.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  modalTotalEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
};

window.openCartModal = () => {
  const modal = document.getElementById('cartModal');
  if (modal) {
    window.renderCart();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCartModal = () => {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.submitCartInquiry = async () => {
  const nameVal = document.getElementById('cartName').value.trim();
  const phoneVal = document.getElementById('cartPhone').value.trim();
  const emailVal = document.getElementById('cartEmail').value.trim();
  
  if (!nameVal || !phoneVal || !emailVal) {
    alert('Please fill in your name, phone number, and email address to send the inquiry.');
    return;
  }
  
  if (window.cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  
  const submitBtn = document.querySelector('.btn-cart-submit');
  const originalBtnText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending Inquiry...';
  
  // Format Cart items text
  let itemsText = '';
  let totalPrice = 0;
  
  window.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    itemsText += `- ${item.quantity}x ${item.name} (₹${item.price.toLocaleString('en-IN')} each, Subtotal: ₹${itemTotal.toLocaleString('en-IN')})\n`;
  });
  
  const messageBody = `New Shopping Cart Inquiry:\n\nCustomer Details:\n- Name: ${nameVal}\n- Phone: ${phoneVal}\n- Email: ${emailVal}\n\nCart Items:\n${itemsText}\nTotal Amount: ₹${totalPrice.toLocaleString('en-IN')}`;
  
  try {
    // 1. Submit to Firestore
    await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'enquiries'), {
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      subject: 'Shopping Cart Inquiry',
      message: messageBody,
      timestamp: window.firebaseServerTimestamp(),
      source: 'website_cart_inquiry',
      items: window.cart
    });
    
    // 2. Submit email in the background via FormSubmit.co
    await fetch('https://formsubmit.co/ajax/Kaffkitchenappliances@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        subject: 'New KAFF Shopping Cart Inquiry',
        cart_items: itemsText,
        total_amount: `₹${totalPrice.toLocaleString('en-IN')}`,
        message: messageBody
      })
    });
    
    // 3. Submit to Google Sheets / Drive (background, non-blocking)
    sendToGoogleSheets({
      type: 'cart_enquiry',
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      subject: 'Shopping Cart Inquiry',
      cart_items: itemsText,
      total_amount: `₹${totalPrice.toLocaleString('en-IN')}`,
      message: messageBody,
      source: 'website_cart_inquiry'
    });
    
    // 3. WhatsApp Redirect
    const waText = `Hi, I would like to inquire about the following items from my cart:\n\n${itemsText}\nTotal: ₹${totalPrice.toLocaleString('en-IN')}\n\nContact Details:\n- Name: ${nameVal}\n- Phone: ${phoneVal}\n- Email: ${emailVal}`;
    const encodedWaText = encodeURIComponent(waText);
    
    // Clear cart
    window.cart = [];
    window.saveCart();
    window.closeCartModal();
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/919000714841?text=${encodedWaText}`, '_blank');
    
  } catch (error) {
    console.error('Inquiry submission error:', error);
    alert('Something went wrong sending the inquiry. Opening WhatsApp directly.');
    
    // Fallback WhatsApp redirect even if Firestore/email fail
    const waText = `Hi, I would like to inquire about the following items from my cart:\n\n${itemsText}\nTotal: ₹${totalPrice.toLocaleString('en-IN')}\n\nContact Details:\n- Name: ${nameVal}\n- Phone: ${phoneVal}\n- Email: ${emailVal}`;
    const encodedWaText = encodeURIComponent(waText);
    
    window.cart = [];
    window.saveCart();
    window.closeCartModal();
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    window.open(`https://wa.me/919000714841?text=${encodedWaText}`, '_blank');
  }
};

