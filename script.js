const products = [
  {
    name: "9PM Eau de Parfum",
    brand: "Afnan",
    category: "fragrance",
    image: "assets/fragrance-amber.jpg",
  },
  {
    name: "24K Eau de Parfum",
    brand: "Fragrance",
    category: "fragrance",
    image: "assets/fragrance-glass.jpg",
  },
  {
    name: "Sauvage Eau de Toilette",
    brand: "Dior",
    category: "fragrance",
    image: "assets/fragrance-bottle.jpg",
  },
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "fragrance",
    image: "assets/fragrance-amber.jpg",
  },
  {
    name: "1 Million Eau de Toilette",
    brand: "Paco Rabanne",
    category: "fragrance",
    image: "assets/fragrance-glass.jpg",
  },
  {
    name: "Acqua di Gi\u00F2 Eau de Toilette",
    brand: "Giorgio Armani",
    category: "fragrance",
    image: "assets/fragrance-bottle.jpg",
  },
  {
    name: "Le Male Eau de Toilette",
    brand: "Jean Paul Gaultier",
    category: "fragrance",
    image: "assets/fragrance-amber.jpg",
  },
  {
    name: "Dylan Blue Pour Homme",
    brand: "Versace",
    category: "fragrance",
    image: "assets/fragrance-glass.jpg",
  },
  {
    name: "Invictus Eau de Toilette",
    brand: "Paco Rabanne",
    category: "fragrance",
    image: "assets/fragrance-bottle.jpg",
  },
  {
    name: "Y Eau de Toilette",
    brand: "Yves Saint Laurent",
    category: "fragrance",
    image: "assets/fragrance-amber.jpg",
  },
  {
    name: "Terre d\u2019Herm\u00E8s",
    brand: "Herm\u00E8s",
    category: "fragrance",
    image: "assets/fragrance-glass.jpg",
  },
  {
    name: "Dark Aura",
    brand: "Fragrance",
    category: "fragrance",
    image: "assets/fragrance-bottle.jpg",
  },
  {
    name: "Everyday Lip Gloss",
    brand: "LipsByLene",
    category: "lips",
    image: "assets/lip-care.jpg",
  },
  {
    name: "Creamy Lipstick",
    brand: "LipsByLene",
    category: "makeup",
    image: "assets/makeup.jpg",
  },
  {
    name: "Soft-Matte Foundation",
    brand: "Complexion",
    category: "makeup",
    image: "assets/cosmetics.jpg",
  },
  {
    name: "Lengthening Mascara",
    brand: "Eyes",
    category: "makeup",
    image: "assets/makeup.jpg",
  },
  {
    name: "Blush Duo",
    brand: "Cheeks",
    category: "makeup",
    image: "assets/cosmetics.jpg",
  },
  {
    name: "Everyday Eyeshadow Palette",
    brand: "Eyes",
    category: "makeup",
    image: "assets/makeup.jpg",
  },
  {
    name: "Nourishing Lip Balm",
    brand: "LipsByLene",
    category: "lips",
    image: "assets/lip-care.jpg",
  },
  {
    name: "Glossy Lip Oil",
    brand: "LipsByLene",
    category: "lips",
    image: "assets/lip-care.jpg",
  },
  {
    name: "Hydrating Face Cleanser",
    brand: "Skincare",
    category: "skincare",
    image: "assets/skincare.jpg",
  },
  {
    name: "Daily Face Moisturizer",
    brand: "Skincare",
    category: "skincare",
    image: "assets/skincare.jpg",
  },
  {
    name: "Nourishing Body Cream",
    brand: "Body care",
    category: "bodycare",
    image: "assets/body-care.jpg",
  },
  {
    name: "Silky Body Lotion",
    brand: "Body care",
    category: "bodycare",
    image: "assets/body-care.jpg",
  },
];

const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const filterButtons = document.querySelectorAll(".filter-button");

function displayProducts(category = "all") {
  const visibleProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  productList.replaceChildren();
  productCount.textContent = `${visibleProducts.length} items`;

  visibleProducts.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = `product product-${product.category}`;
    card.style.setProperty("--item-index", String(Math.min(index, 8)));

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = `${product.category} editorial photograph`;
    image.loading = "lazy";
    image.width = 640;
    image.height = 480;

    const categoryLabel = document.createElement("p");
    categoryLabel.className = "product-category";
    categoryLabel.textContent =
      product.category === "bodycare" ? "Body care" : product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const brand = document.createElement("p");
    brand.className = "product-brand";
    brand.textContent = product.brand;

    const inquiry = document.createElement("a");
    inquiry.className = "product-inquiry";
    inquiry.href = `https://wa.me/2348066954262?text=${encodeURIComponent(`Hi LipsByLene, I am interested in ${product.name}.`)}`;
    inquiry.target = "_blank";
    inquiry.rel = "noreferrer";
    inquiry.textContent = "Ask about this";
    inquiry.setAttribute("aria-label", `Ask about ${product.name} on WhatsApp`);

    card.append(image, categoryLabel, name, brand, inquiry);
    productList.append(card);
  });

  observeReveals();
}

function observeReveals() {
  const revealItems = document.querySelectorAll(".product:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setFilter(category) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  displayProducts(category);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelectorAll("nav [data-filter]").forEach((link) => {
  link.addEventListener("click", () => setFilter(link.dataset.filter));
});

displayProducts();
