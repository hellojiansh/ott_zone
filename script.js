

function toWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function createProductCard(product, index, state) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = product.cat;

  const tag = document.createElement("div");
  tag.className = "product-tag";
  tag.textContent = product.meta;
  card.appendChild(tag);

  if (["Netflix", "prime-6m", "chatgpt-3m-shared", "chatgpt-3m-onmail"].includes(product.id)) {
    const highlight = document.createElement("div");
    highlight.className = "product-highlight";
    highlight.textContent =
      product.id === "chatgpt-3m-onmail"
        ? "Premium Plan"
        : index === 0
        ? "Best Seller"
        : "Popular";
    card.appendChild(highlight);
  }

  const header = document.createElement("div");
  header.className = "product-header";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image";

  const img = document.createElement("img");
  img.alt = product.title;
  img.loading = "lazy";
  img.src = `assets/${product.image}`;
  imageWrap.appendChild(img);

  header.appendChild(imageWrap);

  const headerText = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.title;

  const meta = document.createElement("div");
  meta.className = "product-meta";
  meta.textContent = product.meta;

  headerText.appendChild(title);
  headerText.appendChild(meta);

  const rating = document.createElement("div");
  rating.className = "product-rating";
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "★";
  const ratingText = document.createElement("span");
  ratingText.textContent = product.rating.toFixed(1);
  rating.appendChild(star);
  rating.appendChild(ratingText);
  headerText.appendChild(rating);

  header.appendChild(headerText);
  card.appendChild(header);

  const priceRow = document.createElement("div");
  priceRow.className = "product-price-row";
  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = `₹${product.price}`;
  const mrp = document.createElement("span");
  mrp.className = "product-mrp";
  mrp.textContent = `₹${product.mrp}`;
  price.appendChild(mrp);
  priceRow.appendChild(price);

  const discount = document.createElement("span");
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  discount.textContent = `Save ${discountPercent}%`;
  discount.style.color = "#9ca3af";
  discount.style.fontSize = "0.75rem";
  priceRow.appendChild(discount);

  card.appendChild(priceRow);

  const chipRow = document.createElement("div");
  chipRow.className = "product-chip-row";
  const cat = document.createElement("span");
  cat.className = "product-cat";
  if (product.cat === "ott") cat.textContent = "OTT";
  else if (product.cat === "storage") cat.textContent = "Storage";
  else if (product.cat === "tools") cat.textContent = "Tools";
  else cat.textContent = "Other";

  chipRow.appendChild(cat);
  card.appendChild(chipRow);

  const ctaWrap = document.createElement("div");
  ctaWrap.className = "product-cta";

  const qty = state.getQuantity ? state.getQuantity(product.id) : 0;

  if (!qty) {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.type = "button";
    button.textContent = "Add to cart";
    button.addEventListener("click", () => {
      state.addToCart(product);
    });
    ctaWrap.appendChild(button);
  } else {
    const qtyControl = document.createElement("div");
    qtyControl.className = "qty-control";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "qty-btn";
    minus.textContent = "−";
    minus.addEventListener("click", () => {
      state.changeQuantity(product, -1);
    });

    const value = document.createElement("span");
    value.className = "qty-value";
    value.textContent = String(qty);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "qty-btn";
    plus.textContent = "+";
    plus.addEventListener("click", () => {
      state.changeQuantity(product, 1);
    });

    qtyControl.appendChild(minus);
    qtyControl.appendChild(value);
    qtyControl.appendChild(plus);
    ctaWrap.appendChild(qtyControl);
  }

  card.appendChild(ctaWrap);

  return card;
}

function getDiscountPercent(product) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

function renderProducts(state) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let items = PRODUCTS.filter(p => state.category === "all" || p.cat === state.category);

  const term = state.search.trim().toLowerCase();
  if (term) {
    items = items.filter(p => p.title.toLowerCase().includes(term) || p.id.toLowerCase().includes(term));
  }

  if (state.sort === "rating") {
    items = [...items].sort((a, b) => b.rating - a.rating);
  } else if (state.sort === "discount") {
    items = [...items].sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
  } else if (state.sort === "price-low") {
    items = [...items].sort((a, b) => a.price - b.price);
  }

  items.forEach((product, index) => {
    const card = createProductCard(product, index, state);
    grid.appendChild(card);
  });
}

function setupCategoryFilters(state) {
  const chips = document.querySelectorAll("#category-filters .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      state.category = chip.dataset.category || "all";
      renderProducts(state);
    });
  });
}

function renderHeroTopPicks() {
  const list = document.getElementById("hero-top-picks");
  if (!list) return;

  const top = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  top.forEach(product => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = product.title;

    const meta = document.createElement("span");
    meta.textContent = product.meta;

    const price = document.createElement("span");
    price.className = "price-tag";
    price.textContent = `₹${product.price}`;

    li.appendChild(name);
    li.appendChild(meta);
    li.appendChild(price);
    li.addEventListener("click", () => {
      const message = `Hi, I'm interested in ${product.title} (₹${product.price}). Is it available?`;
      window.open(toWhatsAppUrl(message), "_blank", "noopener");
    });

    list.appendChild(li);
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
}

function setupSortFilters(state) {
  const chips = document.querySelectorAll("#sort-filters .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      state.sort = chip.dataset.sort || "default";
      renderProducts(state);
    });
  });
}

function setupSearch(state) {
  const input = document.getElementById("product-search");
  if (!input) return;
  input.addEventListener("input", () => {
    state.search = input.value || "";
    renderProducts(state);
  });
}

function setupCart(state) {
  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const cartClose = document.getElementById("cart-close");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const cartDiscountedEl = document.getElementById("cart-discounted");
  const cartCheckout = document.getElementById("cart-checkout");
  const cartClear = document.getElementById("cart-clear");
  const cartCouponInput = document.getElementById("cart-coupon");
  const cartApplyCoupon = document.getElementById("cart-apply-coupon");

  const cart = [];
  let appliedCoupon = null;

  function getQuantity(id) {
    const item = cart.find(entry => entry.product.id === id);
    return item ? item.quantity : 0;
  }

  function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = String(count);
  }

  function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  function getCouponDiscount(total) {
    if (!appliedCoupon) return 0;
    const code = appliedCoupon.toLowerCase();
    if (code === "ott10") {
      return Math.round(total * 0.1);
    }
    if (code === "flat50") {
      return total >= 200 ? 50 : 0;
    }
    return 0;
  }

  function updateCartTotal() {
    const total = calculateTotal();
    const discount = getCouponDiscount(total);
    const finalTotal = Math.max(total - discount, 0);

    cartTotalEl.textContent = `₹${total}`;
    if (discount > 0) {
      cartDiscountedEl.textContent = `After coupon: ₹${finalTotal} (saved ₹${discount})`;
      cartDiscountedEl.classList.remove("hidden");
    } else {
      cartDiscountedEl.textContent = "";
      cartDiscountedEl.classList.add("hidden");
    }
  }

  function renderCartItems() {
    cartItemsEl.innerHTML = "";
    if (cart.length === 0) {
      const empty = document.createElement("p");
      empty.className = "cart-empty";
      empty.textContent = "Your cart is empty. Add a few plans to place a WhatsApp order.";
      cartItemsEl.appendChild(empty);
      return;
    }

    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const info = document.createElement("div");
      info.className = "cart-item-info";

      const title = document.createElement("p");
      title.className = "cart-item-title";
      title.textContent = item.product.title;

      const meta = document.createElement("p");
      meta.className = "cart-item-meta";
      meta.textContent = `${item.product.meta} • x${item.quantity}`;

      info.appendChild(title);
      info.appendChild(meta);

      const right = document.createElement("div");

      const price = document.createElement("div");
      price.className = "cart-item-price";
      price.textContent = `₹${item.product.price * item.quantity}`;

      const remove = document.createElement("button");
      remove.className = "cart-item-remove";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        cart.splice(index, 1);
        renderCartItems();
        updateCartBadge();
        updateCartTotal();
        renderProducts(state);
      });

      right.appendChild(price);
      right.appendChild(remove);

      row.appendChild(info);
      row.appendChild(right);
      cartItemsEl.appendChild(row);
    });
  }

  function changeQuantity(product, delta) {
    const existing = cart.find(item => item.product.id === product.id);
    if (!existing && delta > 0) {
      cart.push({ product, quantity: 1 });
    } else if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        const index = cart.indexOf(existing);
        cart.splice(index, 1);
      }
    }
    updateCartBadge();
    updateCartTotal();
    renderCartItems();
    if (cart.length > 0) {
      cartPanel.classList.add("cart-panel-open");
    }
    renderProducts(state);
  }

  function addToCart(product) {
    changeQuantity(product, 1);
  }

  function buildWhatsAppMessage() {
    if (cart.length === 0) {
      return "Hi, I want to know more about OTTZone plans.";
    }
    const lines = cart.map(
      item => `- ${item.product.title} (₹${item.product.price} x ${item.quantity}) = ₹${
        item.product.price * item.quantity
      }`
    );
    const total = calculateTotal();
    const discount = getCouponDiscount(total);
    const finalTotal = Math.max(total - discount, 0);
    const header = "Hi, I want to place this order from OTTZone:\n";
    const body = lines.join("\n");
    const couponLine =
      appliedCoupon && discount > 0
        ? `\n\nCoupon used: ${appliedCoupon.toUpperCase()} (saved ₹${discount})`
        : "";
    const footer = `\n\nTotal: ₹${total}${couponLine}\nPayable amount: ₹${finalTotal}\nPlease share payment options and delivery steps.`;
    return header + body + footer;
  }

  cartButton.addEventListener("click", () => {
    cartPanel.classList.toggle("cart-panel-open");
  });

  cartClose.addEventListener("click", () => {
    cartPanel.classList.remove("cart-panel-open");
  });

  cartCheckout.addEventListener("click", () => {
    const message = buildWhatsAppMessage();
    window.open(toWhatsAppUrl(message), "_blank", "noopener");
  });

  cartClear.addEventListener("click", () => {
    cart.splice(0, cart.length);
    appliedCoupon = null;
    if (cartCouponInput) cartCouponInput.value = "";
    renderCartItems();
    updateCartBadge();
    updateCartTotal();
    renderProducts(state);
  });

  if (cartApplyCoupon && cartCouponInput) {
    cartApplyCoupon.addEventListener("click", () => {
      const code = cartCouponInput.value.trim();
      appliedCoupon = code || null;
      updateCartTotal();
    });
  }

  state.addToCart = addToCart;
  state.getQuantity = getQuantity;
  state.changeQuantity = changeQuantity;

  renderCartItems();
  updateCartBadge();
  updateCartTotal();
}

function setupAiAssistant() {
  const form = document.getElementById("ai-form");
  const input = document.getElementById("ai-input");
  const messages = document.getElementById("ai-messages");
  if (!form || !input || !messages) return;

  function appendMessage(text, from) {
    const wrap = document.createElement("div");
    wrap.className = `ai-message ${from === "bot" ? "ai-message-bot" : "ai-message-user"}`;
    const p = document.createElement("p");
    p.textContent = text;
    wrap.appendChild(p);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function localFallbackAnswer(question) {
    const trimmed = question.trim();
    if (!trimmed) {
      return "Please type a short question about OTTZone plans, timings or payment and I’ll try to help.";
    }
    const q = trimmed.toLowerCase();

    if (q.includes("time") || q.includes("timing") || q.includes("open")) {
      return "We usually deliver and reply between 9 AM and 9 PM, Monday to Saturday. Orders outside this window are processed in the next working slot.";
    }
    if (q.includes("payment") || q.includes("upi") || q.includes("crypto")) {
      return "We support UPI, bank transfer and, on request, crypto for some plans. Message on WhatsApp for exact details and current options.";
    }
    if (q.includes("cheap") || q.includes("lowest") || q.includes("budget")) {
      const cheapest = [...PRODUCTS].sort((a, b) => a.price - b.price).slice(0, 3);
      const names = cheapest.map(p => `${p.title} (₹${p.price})`).join(", ");
      return `Some of the lowest-priced plans right now are: ${names}. For full details and availability, message us on WhatsApp.`;
    }
    if (q.includes("anime") || q.includes("crunchyroll")) {
      return "For anime lovers, Crunchyroll 1 Month and 1 Year plans are good options. You can also combine them with YouTube + Google One for more value.";
    }
    if (q.includes("who are you") || q.includes("who r you") || q.includes("who are u")) {
      return "I’m the OTTZone assistant. I can help with quick questions about our plans and timings. For actual orders or payment issues, please message directly on WhatsApp.";
    }

    return "I can help with basic questions about plans, timings and payment types. For exact offers, custom combos or any issue with access, please message directly on WhatsApp.";
  }

  async function getAssistantReply(question) {
    const trimmed = question.trim();
    if (!trimmed) {
      return "Please type a short question about OTTZone plans, timings or payment and I’ll try to help.";
    }

    // If no external key, fall back to local logic
    if (!YOU_API_KEY) {
      return localFallbackAnswer(trimmed);
    }

    try {
      const systemPrompt =
        "You are an assistant for OTTZone, a website that sells OTT subscriptions, storage plans and digital tools at discounted prices. " +
        "Keep answers short and clear. Always remind users that real orders and payments are handled only on WhatsApp, not inside this chat. " +
        "Support hours are 9 AM–9 PM, Monday to Saturday. Payments are usually via UPI, bank transfer and sometimes crypto. " +
        "Do not invent prices or plans that were not mentioned; speak generally unless the question matches obvious products like Netflix, Crunchyroll, ChatGPT, Google One, Spotify, etc. " +
        "Answer in one or two short sentences.";

      const res = await fetch("https://api.you.com/v1/agents/runs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${YOU_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          agent: "express",
          input: `${systemPrompt}\nUser: ${trimmed}`,
          stream: false
        })
      });

      if (!res.ok) {
        console.error("You.com Agents API error:", res.status, await res.text());
        return localFallbackAnswer(trimmed);
      }

      const data = await res.json();
      // The exact shape may change; try to pull a main text field, otherwise fall back
      const text =
        data?.output_text?.[0]?.content ||
        data?.output_text ||
        data?.response ||
        localFallbackAnswer(trimmed);

      return typeof text === "string" && text.trim() ? text.trim() : localFallbackAnswer(trimmed);
    } catch (error) {
      console.error("You.com Agents request failed:", error);
      return localFallbackAnswer(trimmed);
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendMessage(value, "user");
    input.value = "";
    const reply = await getAssistantReply(value);
    appendMessage(reply, "bot");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const state = { category: "all", search: "", sort: "default" };

  setupCart(state);

  renderProducts(state);
  setupCategoryFilters(state);
  setupSortFilters(state);
  setupSearch(state);
  renderHeroTopPicks();
  setYear();
  setupAiAssistant();
});