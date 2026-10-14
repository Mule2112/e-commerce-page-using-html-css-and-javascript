// 1. LocalStorage Array [] 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  // Electronics
  {
    id: 1,
    name: "Headset", 
    price: 199.99,
    image: "./assets/headset.png",
    category: "electronics",
    description: "For noiseless audio listening",
  },
  {
    id: 2,
    name: "SMART WATCH", 
    price: 799.99,
    image: "./assets/smart watch.png",
    category: "electronics",
    description: "Modern smart watch with calling support",
  },
  {
    id: 3,
    name: "4K Camera", 
    price: 800.99,
    image: "./assets/4k camera.png",
    category: "electronics",
    description: "High quality videos and photos",
  },
  // Fashion
  {
    id: 4,
    name: "LEATHER JACKET", 
    price: 599.99,
    image: "./assets/leather jacket.png",
    category: "fashion",
    description: "Durable and waterproof leather jacket",
  },
  {
    id: 5,
    name: "DESIGNER SUNGLASSES", 
    price: 599.99,
    image: "./assets/designer sunglass.png",
    category: "fashion",
    description: "UV protection sunglasses",
  },
  {
    id: 6,
    name: "ALL STAR SHOES", 
    price: 599.99,
    image: "./assets/allstar.png",
    category: "fashion",
    description: "Comfortable and long lasting canvas shoes",
  },
  // Home
  {
    id: 7,
    name: "HUMAN HAIR", 
    price: 299.99,
    image: "./assets/human-hair.png",
    category: "home",
    description: "Smooth and premium quality hair extension",
  },
  {
    id: 8,
    name: "TROUSER", 
    price: 699.99,
    image: "./assets/trouser.png",
    category: "home",
    description: "Slim fit formal trousers",
  },
  {
    id: 9,
    name: "BLANKET", 
    price: 709.99,
    image: "./assets/blanket.png",
    category: "home",
    description: "Warm and soft blanket for cold season",
  },
  // Sports
  {
    id: 10,
    name: "SPORT CLOTH", 
    price: 390.00,
    image: "./assets/sport-cloth.png",
    category: "sport",
    description: "Lightweight and breathable activewear",
  },
  {
    id: 11,
    name: "SPORT WEAR", 
    price: 280.00,
    image: "./assets/sport-cloth2.png",
    category: "sport",
    description: "Ideal for daily workouts and training",
  },
  {
    id: 12,
    name: "T-SHIRT", 
    price: 200.00,
    image: "./assets/t-shirt.png",
    category: "sport",
    description: "Durable casual cotton t-shirt",
  },
];

// 2. Render Products Function
function initproducts(items = products) {
  const container = document.getElementById("products-container");
  if (!container) return;
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No products found.</p>`;
    return;
  }

  items.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h2 class="product-title">${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
    `;
    container.appendChild(productCard);
  });
}

// 3. Save Cart to LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 4. Add Product to Cart
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  updateCartUI();
}

// 5. Change Product Quantity (+/-)
function changeQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== productId);
    }
  }

  updateCartUI();
}

// 6. Remove Item from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// 7. Update Cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartCount || !cartTotal) return;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: #777; margin-top: 20px;">Your cart is empty.</p>`;
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} × ${item.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
            <div class="quantity-controls" style="margin-top: 5px; display: flex; align-items: center; gap: 8px;">
              <button onclick="changeQuantity(${item.id}, -1)" style="padding: 2px 8px; cursor: pointer;">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${item.id}, 1)" style="padding: 2px 8px; cursor: pointer;">+</button>
            </div>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

  cartTotal.textContent = total.toFixed(2);
  
  // Payment Modal ውስጥ ያለውን ጠቅላላ ዋጋ ማዘመን
  const paymentTotal = document.getElementById("payment-total");
  if (paymentTotal) {
    paymentTotal.textContent = total.toFixed(2);
  }

  saveCartToLocalStorage();
}

// 8. Toggle Cart Sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  if (cartSidebar) {
    cartSidebar.classList.toggle("active");
  }
}

// 9. Payment Modal Handlers
function showPaymentModal() {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add items before checking out.");
    return;
  }
  
  const paymentModal = document.getElementById("payment-modal");
  if (paymentModal) {
    paymentModal.classList.add("active");
  }
}

function closePaymentContent() {
  const paymentModal = document.getElementById("payment-modal");
  if (paymentModal) {
    paymentModal.classList.remove("active");
  }
}

function processPayment(event) {
  event.preventDefault();
  alert("Payment successful! Thank you for your purchase.");
  
  // Cart አጽዳ
  cart = [];
  updateCartUI();
  closePaymentContent();
  toggleCart();
}

// 10. Page Load and Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initproducts();
  updateCartUI();

  // Search Filter Implementation
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
      initproducts(filtered);
    });
  }

  // Category Filter Implementation
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      if (category === "all") {
        initproducts(products);
      } else {
        const filtered = products.filter((p) => p.category === category);
        initproducts(filtered);
      }
    });
  });

  // Payment Method Selection Tabs
  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      method.classList.add("active");
    });
  });
});