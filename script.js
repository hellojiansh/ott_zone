const WHATSAPP_NUMBER = "919088212294";

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

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = product.cat;

  const tag = document.createElement("div");
  tag.className = "product-tag";
  tag.textContent = product.meta;
  card.appendChild(tag);

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
  button.className = "btn btn-whatsapp";
  button.type = "button";
  button.textContent = "Order on WhatsApp";
  button.addEventListener("click", () => {
    const message = `Hi, I want to order: ${product.title} (₹${product.price}). Please share payment details and delivery steps.`;
    window.open(toWhatsAppUrl(message), "_blank", "noopener");
  });
  ctaWrap.appendChild(button);
  card.appendChild(ctaWrap);

  return card;
}

function renderProducts(category = "all") {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  PRODUCTS.filter(p => category === "all" || p.cat === category).forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function setupCategoryFilters() {
  const chips = document.querySelectorAll("#category-filters .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      const category = chip.dataset.category || "all";
      renderProducts(category);
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

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  setupCategoryFilters();
  renderHeroTopPicks();
  setYear();
});