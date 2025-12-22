const WHATSAPP_NUMBER = "919088212294";

// NOTE: This key is currently hardcoded for live AI responses.
// Anyone can see and abuse it in a public repo. Be ready to rotate it if needed.
const GOOGLE_API_KEY = "AIzaSyDr1NQiQodKYCDt7HHZOraAwdJW8j_UdNs";
const GEMINI_MODEL = "gemini-1.5-flash";

const PRODUCTS = [
  { id: "Netflix", title: "Netflix", cat: "ott", meta: "Shared", price: 149, mrp: 649, rating: 4.8, image: "netflix.png" },
  { id: "prime-6m", title: "Prime Video 6 Months", cat: "ott", meta: "On Mail", price: 149, mrp: 999, rating: 4.6, image: "prime.png" },
  { id: "crunchyroll-12m", title: "Crunchyroll 1 Year", cat: "ott", meta: "On Mail", price: 249, mrp: 999, rating: 4.7, image: "crunchyroll.png" },
  { id: "crunchyroll-1m", title: "Crunchyroll 1 Month", cat: "ott", meta: "On Mail", price: 49, mrp: 119, rating: 4.4, image: "crunchyroll.png" },
  { id: "hotstar-super-1m", title: "Hotstar Super 1 Month", cat: "ott", meta: "On Number", price: 69, mrp: 149, rating: 4.5, image: "hotstar.png" },
  { id: "zee5-18m-autopay", title: "ZEE5 1.5 Year", cat: "ott", meta: "AutoPay • Full Warranty", price: 249, mrp: 1499, rating: 4.4, image: "zee5.png" },
  { id: "sonyliv-12m", title: "SonyLiv 1 Year", cat: "ott", meta: "On Number", price: 249, mrp: 999, rating: 4.3, image: "sonyliv.png" },
  { id: "Spotify", title: "Spotify 2 Months", cat: "ott", meta: "On Mail", price: 149, mrp: 199, rating: 4.7, image: "Spotify.png" },

  { id: "yt-gone-invite-1m", title: "YouTube + Google One (2TB) 1 Month", cat: "storage", meta: "Invite", price: 59, mrp: 799, rating: 4.8, image: "youtube.png" },
  { id: "gone-gemini-onmail-12m", title: "Google One + Gemini (2TB) 1 Year", cat: "storage", meta: "On Mail", price: 249, mrp: 2100, rating: 4.9, image: "google.png" },
  { id: "gone-gemini-invite-12m", title: "Google One + Gemini (2TB) 1 Year", cat: "storage", meta: "Invite", price: 99, mrp: 2100, rating: 4.9, image: "google.png" },

  { id: "tradingview-1m", title: "TradingView 1 Month", cat: "tools", meta: "Gmail you provide", price: 79, mrp: 249, rating: 4.4, image: "tradingview1.png" },

  { id: "canva-edu-12m", title: "Canva 1 Year EDU Plan", cat: "other", meta: "EDU Plan Invite", price: 199, mrp: 3999, rating: 4.5, image: "canva.png" },
  { id: "chatgpt-3m-onmail", title: "ChatGPT 3 Months", cat: "other", meta: "On Mail", price: 1299, mrp: 6000, rating: 4.8, image: "chatgpt.png" },
  { id: "chatgpt-3m-shared", title: "ChatGPT 3 Months", cat: "other", meta: "Shared", price: 399, mrp: 6000, rating: 4.2, image: "chatgpt.png" },
  { id: "Surfshark", title: "Surfshark (2 Months)", cat: "other", meta: "Shared", price: 99, mrp: 2800, rating: 4.2, image: "surfshark.png" }
];

function toWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function createProductCard(product, index, addToCart) {
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
  const button = document.createElement("button");
  button.className = "btn btn-primary";
  button.type = "button";
  button.textContent = "Add to cart";
  button.addEventListener("click", () => {
    addToCart(product);
  });
  ctaWrap.appendChild(button);
  card.appendChild(ctaWrap);

  return card;
}

function getDiscountPercent(product) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

function renderProducts(category = "all", search = "", sort = "default", addToCart) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let items = PRODUCTS.filter(p => category === "all" || p.cat === category);

  const term = search.trim().toLowerCase();
  if (term) {
    items = items.filter(p => p.title.toLowerCase().includes(term) || p.id.toLowerCase().includes(term));
  }

  if (sort === "rating") {
    items = [...items].sort((a, b) => b.rating - a.rating);
  } else if (sort === "discount") {
    items = [...items].sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
  } else if (sort === "price-low") {
    items = [...items].sort((a, b) => a.price - b.price);
  }

  items.forEach((product, index) => {
    const card = createProductCard(product, index, addToCart);
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
      renderProducts(state.category, state.search, state.sort);
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

function setupSortFilters(state, addToCart) {
  const chips = document.querySelectorAll("#sort-filters .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      state.sort = chip.dataset.sort || "default";
      renderProducts(state.category, state.search, state.sort, addToCart);
    });
  });
}

function setupSearch(state, addToCart) {
  const input = document.getElementById("product-search");
  if (!input) return;
  input.addEventListener("input", () => {
    state.search = input.value || "";
    renderProducts(state.category, state.search, state.sort, addToCart);
  });
}

function setupCart(state) {
  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const cartClose = document.getElementById("cart-close");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCheckout = document.getElementById("cart-checkout");
  const cartClear = document.getElementById("cart-clear");

  const cart = [];

  function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = String(count);
  }

  function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartTotalEl.textContent = `₹${total}`;
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
      });

      right.appendChild(price);
      right.appendChild(remove);

      row.appendChild(info);
      row.appendChild(right);
      cartItemsEl.appendChild(row);
    });
  }

  function addToCart(product) {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    updateCartBadge();
    updateCartTotal();
    renderCartItems();
    cartPanel.classList.add("cart-panel-open");
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
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const header = "Hi, I want to place this order from OTTZone:\n";
    const body = lines.join("\n");
    const footer = `\n\nTotal: ₹${total}\nPlease share payment options and delivery steps.`;
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
    renderCartItems();
    updateCartBadge();
    updateCartTotal();
  });

  state.addToCart = addToCart;
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

  async function getAssistantReply(question) {
    const trimmed = question.trim();
    if (!trimmed) {
      return "Please type a short question about OTTZone plans, timings or payment and I’ll try to help.";
    }

    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === "YOUR_GOOGLE_API_KEY_HERE") {
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
        return "For anime lovers, Crunchyroll 1 Month and 1 Year plans are great options. You can also combine them with YouTube + Google One for more value.";
      }
      return "I can help with basic questions about plans, timings and payment types. For exact offers, custom combos or any issue with access, please message directly on WhatsApp.";
    }

    try {
      const systemPrompt =
        "You are an assistant for OTTZone, a website that sells OTT subscriptions, storage plans and digital tools at discounted prices. " +
        "Keep answers short and clear. Always remind users that real orders and payments are handled only on WhatsApp, not inside this chat. " +
        "Support hours are 9 AM–9 PM, Monday to Saturday. Payments are usually via UPI, bank transfer and sometimes crypto. " +
        "Do not invent prices or plans that were not mentioned; speak generally unless the question matches obvious products like Netflix, Crunchyroll, ChatGPT, Google One, Spotify, etc.";

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(
          GOOGLE_API_KEY
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: systemPrompt }] },
              { role: "user", parts: [{ text: trimmed }] }
            ]
          })
        }
      );

      if (!res.ok) {
        console.error("Gemini API error:", res.status, await res.text());
        return "I had trouble talking to the AI service right now. Please ask basic questions, or message us directly on WhatsApp for full support.";
      }

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map(part => part.text || "").join(" ").trim() ||
        "I couldn't generate a proper answer just now. Please message us on WhatsApp for full help.";
      return text;
    } catch (error) {
      console.error("Gemini request failed:", error);
      return "I had trouble talking to the AI service right now. Please try again later or message us directly on WhatsApp.";
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
  renderProducts(state.category, state.search, state.sort);
  setupCategoryFilters(state);
  setupSortFilters(state);
  setupSearch(state);
  renderHeroTopPicks();
  setYear();
  setupAiAssistant();
});