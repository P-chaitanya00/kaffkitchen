// ==========================================================================
// KAFF Luxury Kitchen — Product Detail Script File
// ==========================================================================

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
    features: ['73L capacity cavity', '10 cooking functions', 'True European convection'],
    specs: {
      'Capacity': '73 Litres',
      'Power': '2800 W',
      'Dimensions': '595 × 595 × 567 mm',
      'Finish': 'Stainless Steel & Black Glass',
      'Warranty': '3 Years Comprehensive',
      'Energy Rating': 'A+ Rated',
      'Country of Origin': 'India'
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
    features: ['1350 m³/hr suction power', 'Heat auto-clean tech', 'Touch + gesture control'],
    specs: {
      'Capacity': '90 cm Width',
      'Power': '200 W',
      'Dimensions': '900 × 500 × 650 mm',
      'Finish': 'Matt Black Glass',
      'Warranty': '5 Years Motor',
      'Energy Rating': 'A Rated',
      'Country of Origin': 'India'
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
    features: ['14 place settings', '8 wash programs', 'AquaStop protection'],
    specs: {
      'Capacity': '14 Place Settings',
      'Power': '1800 W',
      'Dimensions': '598 × 815 × 550 mm',
      'Finish': 'Fully Integrated',
      'Warranty': '2 Years',
      'Energy Rating': 'A+++ Rated',
      'Country of Origin': 'India'
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
    features: ['4 high-efficiency brass burners', 'Auto pulse ignition', 'Flame failure safety'],
    specs: {
      'Capacity': '4 Burners',
      'Power': '8.1 kW Total',
      'Dimensions': '780 × 520 × 55 mm',
      'Finish': 'Tempered Glass Finish',
      'Warranty': '2 Years',
      'Energy Rating': 'N/A',
      'Country of Origin': 'India'
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
    features: ['580L convertible zones', 'Dual cooling technology', 'Smart inverter compressor'],
    specs: {
      'Capacity': '580 Litres',
      'Power': '150 W',
      'Dimensions': '835 × 680 × 1785 mm',
      'Finish': 'Black Brush Stainless',
      'Warranty': '10 Years Compressor',
      'Energy Rating': 'A+++ Rated',
      'Country of Origin': 'India'
    }
  },
  {
    id: 'prod-006',
    name: 'KMC 28 BI Convection Microwave',
    category: 'Ovens',
    price: 22990,
    originalPrice: 28990,
    rating: 4.5,
    image: 'images/oven.png',
    badge: 'Built-in',
    features: ['28L convection cavity', '40 auto-cook menus', 'Multi-stage cooking'],
    specs: {
      'Capacity': '28 Litres',
      'Power': '1450 W',
      'Dimensions': '595 × 388 × 400 mm',
      'Finish': 'Black Glass + Stainless',
      'Warranty': '2 Years',
      'Energy Rating': 'N/A',
      'Country of Origin': 'India'
    }
  }
];

const products = [...defaultProducts];

function refreshProductsDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  products.length = 0;
  products.push(...defaultProducts, ...customList);
}
refreshProductsDatabase();

const mockReviews = [
  { name: 'Aarav Mehta', date: 'May 12, 2026', rating: 5, comment: 'Absolutely stunning design and performance. Integrates flawlessly into our modular kitchen space. Highly recommended.' },
  { name: 'Sneha Deshmukh', date: 'April 28, 2026', rating: 4, comment: 'We have been using this for 3 months now. It operates quietly and matches the premium feel of high-end international brands.' },
  { name: 'Vikram Singh', date: 'April 15, 2026', rating: 5, comment: 'Excellent build quality. The certified technician arrived on time and completed the installation quickly. Extremely happy with the purchase.' }
];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-001';
  const product = products.find(p => p.id === productId);

  if (!product) {
    showNotFound();
    return;
  }

  renderProductDetails(product);
  renderRelatedProducts(product);
});

// Render dynamic fields
function renderProductDetails(p) {
  // Breadcrumbs
  document.getElementById('breadcrumb-category').textContent = p.category;
  document.getElementById('breadcrumb-category').href = `index.html#products`;
  document.getElementById('breadcrumb-name').textContent = p.name;

  // Badge
  const badgeEl = document.getElementById('detail-badge');
  if (p.badge) {
    badgeEl.textContent = p.badge;
    badgeEl.style.display = 'block';
  } else {
    badgeEl.style.display = 'none';
  }

  // Gallery Image
  document.getElementById('detail-image').src = p.image;
  document.getElementById('detail-image').alt = p.name;

  // Meta Info
  document.getElementById('detail-category').textContent = p.category;
  document.getElementById('detail-name').textContent = p.name;
  
  // Rating stars
  const starsString = Array.from({ length: 5 }).map((_, idx) => 
    idx < Math.floor(p.rating) ? '★' : '☆'
  ).join('');
  document.getElementById('detail-stars').textContent = starsString;
  document.getElementById('detail-rating-value').textContent = p.rating.toFixed(1);

  // Pricing
  document.getElementById('detail-price').textContent = `₹${p.price.toLocaleString('en-IN')}`;
  if (p.originalPrice) {
    document.getElementById('detail-price-original').textContent = `₹${p.originalPrice.toLocaleString('en-IN')}`;
    document.getElementById('detail-price-original').style.display = 'inline-block';
  } else {
    document.getElementById('detail-price-original').style.display = 'none';
  }

  // Key Features
  const featuresList = document.getElementById('detail-features');
  featuresList.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  // Specs Table
  const specsBody = document.getElementById('detail-specs-body');
  specsBody.innerHTML = Object.entries(p.specs).map(([key, val]) => `
    <tr>
      <td>${key}</td>
      <td>${val}</td>
    </tr>
  `).join('');

  // Reviews List
  const reviewsList = document.getElementById('detail-reviews-list');
  reviewsList.innerHTML = mockReviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-name">${r.name}</span>
        <span class="review-stars">${'★'.repeat(r.rating)}</span>
      </div>
      <p class="review-comment">${r.comment}</p>
      <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.5rem;">Reviewed on ${r.date}</div>
    </div>
  `).join('');
}

// Render 4 Related Products
function renderRelatedProducts(currProduct) {
  const grid = document.getElementById('detail-related-grid');
  if (!grid) return;

  const related = products.filter(p => p.id !== currProduct.id).slice(0, 4);

  grid.innerHTML = '';
  related.forEach(p => {
    const card = document.createElement('div');
    card.className = 'related-card';
    card.onclick = () => {
      window.location.href = `product.html?id=${p.id}`;
    };

    card.innerHTML = `
      <div class="related-img-wrapper">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <h4>${p.name}</h4>
      <div class="related-price">₹${p.price.toLocaleString('en-IN')}</div>
    `;
    grid.appendChild(card);
  });
}

// Show appliance not found error state
function showNotFound() {
  const container = document.querySelector('.product-detail-section .container');
  container.innerHTML = `
    <div style="text-align: center; padding: 6rem 0;">
      <svg viewBox="0 0 24 24" style="width: 64px; height: 64px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin: 0 auto 2rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <h2 style="font-family: var(--font-heading); margin-top: 0; margin-bottom: 1rem;">Appliance Not Found</h2>
      <p style="color: var(--text-secondary); max-width: 380px; margin: 0 auto 2.5rem;">The specific appliance model you requested does not exist or has been discontinued.</p>
      <a href="index.html" class="btn btn-primary">Return to Collections</a>
    </div>
  `;
}

// Global Actions helpers
window.updateQty = (change) => {
  const el = document.getElementById('qty-val');
  let val = Number(el.textContent) + change;
  if (val < 1) val = 1;
  el.textContent = val;
};

window.toggleFaq = (btn) => {
  const faqItem = btn.closest('.faq-item');
  const content = faqItem.querySelector('.faq-content');
  const symbol = btn.querySelector('span:last-child');
  
  const isOpen = content.style.display === 'block';
  
  // Close all
  document.querySelectorAll('.faq-content').forEach(c => c.style.display = 'none');
  document.querySelectorAll('.faq-btn span:last-child').forEach(s => s.textContent = '▼');

  if (!isOpen) {
    content.style.display = 'block';
    symbol.textContent = '▲';
  }
};

window.toggleWishlist = (btn) => {
  if (btn.textContent.includes('♡')) {
    btn.innerHTML = '♥ Added to Wishlist';
    btn.style.color = '#e11d48';
  } else {
    btn.innerHTML = '♡ Add to Wishlist';
    btn.style.color = 'var(--text-secondary)';
  }
};
