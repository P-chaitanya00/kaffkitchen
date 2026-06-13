// ==========================================================================
// KAFF Luxury Kitchen — Product Detail Script File
// ==========================================================================

// ============================================================
// GOOGLE SHEETS / DRIVE INTEGRATION (via Google Forms — shared with script.js)
// ============================================================
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf2px_k6YjHs4eSAXmCfKpSD6yGWH1g9dqOfc3Yu9FvL3pvlQ/formResponse';

const GF_ENTRY = {
  name:     'entry.1770772388',
  phone:    'entry.1878027421',
  address:  'entry.1247697541',
  product:  'entry.217940314',
  price:    'entry.437553521',
  message:  'entry.1200208346'
};

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

const products = [...defaultProducts];
let activeProduct = null;

function refreshProductsDatabase() {
  const customList = JSON.parse(localStorage.getItem('kaff_custom_products') || '[]');
  const deletedDefaultIds = JSON.parse(localStorage.getItem('kaff_deleted_products') || '[]');
  
  const customIds = customList.map(p => p.id);
  const visibleDefaults = defaultProducts.filter(p => !deletedDefaultIds.includes(p.id) && !customIds.includes(p.id));
  
  products.length = 0;
  products.push(...visibleDefaults, ...customList);
}
refreshProductsDatabase();

const mockReviews = [
  { name: 'Aarav Mehta', date: 'May 12, 2026', rating: 5, comment: 'Absolutely stunning design and performance. Integrates flawlessly into our modular kitchen space. Highly recommended.' },
  { name: 'Sneha Deshmukh', date: 'April 28, 2026', rating: 4, comment: 'We have been using this for 3 months now. It operates quietly and matches the premium feel of high-end international brands.' },
  { name: 'Vikram Singh', date: 'April 15, 2026', rating: 5, comment: 'Excellent build quality. The certified technician arrived on time and completed the installation quickly. Extremely happy with the purchase.' }
];

async function loadFirebaseData() {
  // Wait for firebase to be initialized
  let checks = 0;
  while (!window.firebaseDB && checks < 50) {
    await new Promise(r => setTimeout(r, 100));
    checks++;
  }
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
        delete data.timestamp;
        return data;
      });
    };
    
    // Fetch custom products and deleted products
    const firestoreProducts = await fetchCollection('custom_products');
    localStorage.setItem('kaff_custom_products', JSON.stringify(firestoreProducts));
    
    const firestoreDeletedProducts = await fetchCollection('deleted_products');
    const deletedProductIds = firestoreDeletedProducts.map(d => d.productId).filter(Boolean);
    localStorage.setItem('kaff_deleted_products', JSON.stringify(deletedProductIds));
    
    refreshProductsDatabase();
    
    // Check if the current product details need to be re-rendered
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'prod-001';
    const product = products.find(p => p.id === productId);
    if (product && (!activeProduct || activeProduct.id !== product.id || activeProduct.image !== product.image)) {
      activeProduct = product;
      renderProductDetails(product);
      renderRelatedProducts(product);
    }
  } catch (error) {
    console.error("Error loading live data from Firestore:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-001';
  let product = products.find(p => p.id === productId);

  if (!product) {
    // Show a loading spinner in case we are waiting for Firestore sync
    const mainContainer = document.querySelector('.product-detail-container') || document.body;
    const originalHTML = mainContainer.innerHTML;
    mainContainer.innerHTML = `
      <div style="text-align: center; padding: 5rem 0; color: #fff;">
        <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); width: 50px; height: 50px; border-radius: 50%; border-left-color: var(--accent-gold); animation: spin 1s linear infinite; margin: 0 auto 2rem;"></div>
        <h3 style="font-family: var(--font-heading);">Syncing Product Collection...</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Connecting to Firestore to fetch database details...</p>
      </div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    
    // Wait for Firestore to load and sync
    loadFirebaseData().then(() => {
      product = products.find(p => p.id === productId);
      if (!product) {
        showNotFound();
      } else {
        mainContainer.innerHTML = originalHTML;
        activeProduct = product;
        renderProductDetails(product);
        renderRelatedProducts(product);
      }
    });
  } else {
    activeProduct = product;
    renderProductDetails(product);
    renderRelatedProducts(product);
    // Also load Firebase data in the background to ensure any changes/updates are synced
    loadFirebaseData();
  }

  // Initialize Cart bar
  if (typeof updateCartBar === 'function') {
    updateCartBar();
  }
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

  // Gallery Image & Thumbnails
  const images = p.images && p.images.length > 0 ? p.images : [p.image].filter(Boolean);
  window.currentDetailImages = images;
  window.currentDetailImageIndex = 0;

  const mainImageEl = document.getElementById('detail-image');
  if (mainImageEl && images.length > 0) {
    mainImageEl.src = images[0];
    mainImageEl.alt = p.name;
  }

  const prevBtn = document.getElementById('detailPrevBtn');
  const nextBtn = document.getElementById('detailNextBtn');
  if (prevBtn && nextBtn) {
    if (images.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  const thumbContainer = document.getElementById('detailThumbnailsContainer');
  if (thumbContainer) {
    if (images.length > 1) {
      thumbContainer.innerHTML = images.map((imgUrl, index) => {
        return `
          <div onclick="window.detailUpdateImage(${index})" style="
            width: 60px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid ${index === 0 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'};
            cursor: pointer;
            background: transparent;
            transition: all 0.2s;
          " class="detail-thumbnail" onmouseover="this.style.borderColor='var(--accent-gold)'" onmouseout="if(window.currentDetailImageIndex !== ${index}) this.style.borderColor='rgba(255,255,255,0.1)'">
            <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        `;
      }).join('');
    } else {
      thumbContainer.innerHTML = '';
    }
  }

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

  // === SEO: Dynamic JSON-LD & Meta Updates ===
  document.title = `${p.name} — KAFF Premium Kitchen Appliances`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${p.name} — ${p.description || p.features.join(', ')}. Price: ₹${p.price.toLocaleString('en-IN')}. Buy from KAFF.`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = `${p.name} — KAFF Kitchen Appliances`;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = `${p.name}. Price: ₹${p.price.toLocaleString('en-IN')}. ${p.features.slice(0, 3).join(', ')}.`;
  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) ogImg.content = p.image.startsWith('http') ? p.image : `https://kaffkitchen.vercel.app/${p.image}`;

  // Update JSON-LD Product schema
  const jsonLdEl = document.getElementById('product-jsonld');
  if (jsonLdEl) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "brand": { "@type": "Brand", "name": "KAFF" },
      "category": p.category,
      "description": p.description || p.features.join('. '),
      "image": p.image.startsWith('http') ? p.image : `https://kaffkitchen.vercel.app/${p.image}`,
      "sku": p.id,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": p.price,
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "KAFF Kitchen Appliances" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": p.rating,
        "reviewCount": mockReviews.length,
        "bestRating": 5
      }
    };
    jsonLdEl.textContent = JSON.stringify(schema);
  }
  
  // Set initial WhatsApp link
  updateWhatsAppLink(p, 1);
}

window.detailUpdateImage = (index) => {
  if (!window.currentDetailImages || window.currentDetailImages.length === 0) return;
  if (index < 0) {
    index = window.currentDetailImages.length - 1;
  } else if (index >= window.currentDetailImages.length) {
    index = 0;
  }
  window.currentDetailImageIndex = index;
  const imgUrl = window.currentDetailImages[index];
  const mainImageEl = document.getElementById('detail-image');
  if (mainImageEl) {
    mainImageEl.src = imgUrl;
  }

  // Update active thumbnail border
  const thumbContainer = document.getElementById('detailThumbnailsContainer');
  if (thumbContainer) {
    const thumbs = thumbContainer.querySelectorAll('.detail-thumbnail');
    thumbs.forEach((thumb, idx) => {
      if (idx === index) {
        thumb.style.borderColor = 'var(--accent-gold)';
      } else {
        thumb.style.borderColor = 'rgba(255,255,255,0.1)';
      }
    });
  }
};

window.detailPrevImage = () => {
  window.detailUpdateImage(window.currentDetailImageIndex - 1);
};

window.detailNextImage = () => {
  window.detailUpdateImage(window.currentDetailImageIndex + 1);
};

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

    const pPrice = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;

    card.innerHTML = `
      <div class="related-img-wrapper">
        <img src="${p.image || 'images/oven.png'}" alt="${p.name || 'Product'}">
      </div>
      <h4>${p.name || 'Untitled Product'}</h4>
      <div class="related-price">₹${pPrice.toLocaleString('en-IN')}</div>
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
function updateWhatsAppLink(p, qty) {
  const whatsappBtn = document.getElementById('detail-whatsapp');
  if (!whatsappBtn) return;
  
  let msgText = `Hi, I'm interested in inquiring about `;
  if (qty > 1) {
    const total = p.price * qty;
    msgText += `${qty} units of the ${p.name} (Price: ₹${p.price.toLocaleString('en-IN')} each, Total: ₹${total.toLocaleString('en-IN')}). Please share availability.`;
  } else {
    msgText += `the ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share availability and delivery time.`;
  }
  
  const encoded = encodeURIComponent(msgText);
  whatsappBtn.href = `https://wa.me/919000714841?text=${encoded}`;
}

window.updateQty = (change) => {
  const el = document.getElementById('qty-val');
  let val = Number(el.textContent) + change;
  if (val < 1) val = 1;
  el.textContent = val;
  if (activeProduct) {
    updateWhatsAppLink(activeProduct, val);
  }
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

// ==========================================================================
// Unified Shopping Cart System (Synced via LocalStorage)
// ==========================================================================
const combos = (typeof defaultCombos !== 'undefined') ? defaultCombos : [];
window.cart = JSON.parse(localStorage.getItem('kaff_cart') || '[]');

window.saveCart = () => {
  localStorage.setItem('kaff_cart', JSON.stringify(window.cart));
  window.updateCartBar();
};

window.addToCart = (id, event, isCombo = false, quantity = 1) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  let item = null;
  if (isCombo) {
    item = combos.find(c => c.id === id);
  } else {
    item = products.find(p => p.id === id);
  }
  
  if (!item) return;
  
  const existing = window.cart.find(cartItem => cartItem.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    window.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || (isCombo ? 'images/combos/page_4.png' : 'images/oven.png'),
      quantity: quantity,
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

window.addActiveProductToCart = (event) => {
  if (!activeProduct) return;
  const qtyEl = document.getElementById('qty-val');
  const qty = qtyEl ? Number(qtyEl.textContent) : 1;
  
  window.addToCart(activeProduct.id, event, false, qty);
  alert(`${qty} x ${activeProduct.name} added to cart!`);
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
      source: 'website_cart_inquiry_product_page'
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

