// Product Data
const products = [
  {
    id: 1,
    name: "Classic Jollof Rice",
    category: "jollof",
    price: 25.0,
    image: "jollof/Jollof-1.jpg",
    description:
      "Authentic Nigerian jollof rice cooked with aromatic spices, tomatoes, and your choice of protein. A true West African classic.",
    ingredients: ["Rice", "Tomatoes", "Onions", "Bell Peppers", "Spices", "Chicken/Beef"],
  },
  {
    id: 2,
    name: "Spicy Jollof Rice",
    category: "jollof",
    price: 27.0,
    image: "jollof/Spicy Jollof Rice.jpg",
    description:
      "Our classic jollof rice with an extra kick of heat. Perfect for spice lovers who want that authentic African fire.",
    ingredients: ["Rice", "Tomatoes", "Scotch Bonnet", "Onions", "Bell Peppers", "Spices", "Chicken/Beef"],
  },
  {
    id: 3,
    name: "Vegetarian Jollof Rice",
    category: "jollof",
    price: 22.0,
    image: "jollof/Vegetarian Jollof Rice.jpg",
    description:
      "Plant-based version of our famous jollof rice, packed with vegetables and rich flavors. No compromise on taste!",
    ingredients: ["Rice", "Tomatoes", "Mixed Vegetables", "Onions", "Bell Peppers", "Vegetable Stock", "Spices"],
  },
  {
    id: 4,
    name: "Seafood Jollof Rice",
    category: "jollof",
    price: 35.0,
    image: "jollof/Seafood Jollof Rice.jpg",
    description: "Premium jollof rice loaded with fresh seafood including prawns, fish, and crab. A coastal delicacy.",
    ingredients: ["Rice", "Prawns", "Fish", "Crab", "Tomatoes", "Onions", "Bell Peppers", "Seafood Stock"],
  },
  {
    id: 5,
    name: "Classic Fried Rice",
    category: "fried",
    price: 24.0,
    image: "fried rice/Classic Fried Rice.jpg",
    description:
      "Perfectly seasoned fried rice with mixed vegetables, eggs, and your choice of protein. A satisfying meal.",
    ingredients: ["Rice", "Mixed Vegetables", "Eggs", "Soy Sauce", "Chicken/Beef", "Green Onions"],
  },
  {
    id: 6,
    name: "Chicken Fried Rice",
    category: "fried",
    price: 26.0,
    image: "fried rice/Chicken Fried Rice.jpg",
    description: "Delicious fried rice with tender chicken pieces, vegetables, and aromatic seasonings.",
    ingredients: ["Rice", "Chicken", "Mixed Vegetables", "Eggs", "Soy Sauce", "Garlic", "Ginger"],
  },
  {
    id: 7,
    name: "Shrimp Fried Rice",
    category: "fried",
    price: 30.0,
    image: "fried rice/Shrimp Fried Rice.jpg",
    description: "Premium fried rice with succulent shrimp, fresh vegetables, and special seasonings.",
    ingredients: ["Rice", "Shrimp", "Mixed Vegetables", "Eggs", "Soy Sauce", "Garlic", "Green Onions"],
  },
  {
    id: 8,
    name: "Vegetable Fried Rice",
    category: "fried",
    price: 20.0,
    image: "fried rice/Vegetable Fried Rice.jpg",
    description: "Healthy and colorful fried rice packed with fresh vegetables and aromatic herbs.",
    ingredients: ["Rice", "Broccoli", "Carrots", "Bell Peppers", "Peas", "Eggs", "Soy Sauce", "Sesame Oil"],
  },
  {
    id: 9,
    name: "Traditional Waakye",
    category: "waakye",
    price: 23.0,
    image: "waakye/Traditional Waakye.jpg",
    description:
      "Authentic Ghanaian waakye - rice and beans cooked with millet leaves, served with traditional accompaniments.",
    ingredients: ["Rice", "Black-eyed Beans", "Millet Leaves", "Gari", "Boiled Eggs", "Shito", "Salad"],
  },
  {
    id: 10,
    name: "Waakye with Fish",
    category: "waakye",
    price: 28.0,
    image: "waakye/Waakye with Fish.jpg",
    description: "Traditional waakye served with grilled fish, boiled eggs, and all the classic accompaniments.",
    ingredients: ["Rice", "Black-eyed Beans", "Grilled Fish", "Millet Leaves", "Gari", "Boiled Eggs", "Shito"],
  },
  {
    id: 11,
    name: "Waakye with Chicken",
    category: "waakye",
    price: 26.0,
    image: "waakye/Waakye with Chicken.jpg",
    description: "Hearty waakye with tender chicken pieces, perfect for a filling and nutritious meal.",
    ingredients: ["Rice", "Black-eyed Beans", "Chicken", "Millet Leaves", "Gari", "Boiled Eggs", "Shito"],
  },
  {
    id: 12,
    name: "Waakye with Beef",
    category: "waakye",
    price: 29.0,
    image: "waakye/Waakye with Beef.jpg",
    description: "Rich and flavorful waakye with tender beef, served with traditional sides and sauces.",
    ingredients: ["Rice", "Black-eyed Beans", "Beef", "Millet Leaves", "Gari", "Boiled Eggs", "Shito", "Salad"],
  },
]

// Categories Data
const categories = [
  {
    name: "Jollof Rice",
    count: "4 Delicious Varieties",
    image: "jollof/Jollof-1.jpg",
    category: "jollof",
  },
  {
    name: "Fried Rice",
    count: "4 Amazing Options",
    image: "fried rice/FriedRice-1.jpg",
    category: "fried",
  },
  {
    name: "Waakye",
    count: "4 Traditional Styles",
    image: "waakye/waakye-1.jpg",
    category: "waakye",
  },
]



// Cart functionality
let cart = JSON.parse(localStorage.getItem("wakawakaboyz-cart")) || []


// Company Configuration
const COMPANY_CONFIG = {
  email: "orders@wakawakaboyz.com",
  whatsapp: "+233208517482",
  phone: "+233208517482",
  name: "Wakawakaboyz",
  address: "Accra, Ghana",
  phone: "+233 208 517 482",
}

// Paystack Configuration - REPLACE WITH YOUR ACTUAL KEY
const PAYSTACK_PUBLIC_KEY = "pk_test_1de624ac74204ae8d527f479814b7194229e5a5c" // Replace with your actual Paystack public key

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.userId)
  }

  updateCartCount()

  // Check which page we're on and load appropriate content
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      loadHomePage()
      break
    case "shop.html":
      loadShopPage()
      break
    case "product-detail.html":
      loadProductDetail()
      break
    case "checkout.html":
      loadCheckoutPage()
      break
  }

  // Add event listeners
  setupEventListeners()
})

function setupEventListeners() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMobileMenu)
  }

  // Filter buttons on shop page
  const filterBtns = document.querySelectorAll(".filter-btn")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      filterProducts(this.dataset.category)
    })
  })

  // Checkout form
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckout)
  }
}

function loadHomePage() {
  loadCategories()
  loadFeaturedProducts()
}

function loadCategories() {
  const categoriesGrid = document.getElementById("categoriesGrid")
  if (!categoriesGrid) return

  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <div class="category-card" onclick="goToShop('${category.category}')">
            <img src="${category.image}" alt="${category.name}" class="category-image">
            <h3 class="category-name">${category.name}</h3>
            <p class="category-count">${category.count}</p>
        </div>
    `,
    )
    .join("")
}

function loadFeaturedProducts() {
  const featuredProducts = document.getElementById("featuredProducts")
  if (!featuredProducts) return

  // Show first 6 products as featured
  const featured = products.slice(0, 6)
  featuredProducts.innerHTML = featured.map((product) => createProductCard(product)).join("")
}

function loadShopPage() {
  const shopProducts = document.getElementById("shopProducts")
  if (!shopProducts) return

  shopProducts.innerHTML = products.map((product) => createProductCard(product)).join("")
}

// Update the createProductCard function to make the entire card clickable
function createProductCard(product) {
  return `
        <div class="product-card" data-category="${product.category}" onclick="goToProductDetail(${product.id})">
            <div class="product-badge">${product.category === "jollof" ? "Popular" : product.category === "waakye" ? "Traditional" : "Special"}</div>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="product-price">GH₵${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); event.stopPropagation();">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `
}

function filterProducts(category) {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// FIXED: Product Detail Function
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))

  if (!productId) {
    window.location.href = "shop.html"
    return
  }

  const product = products.find((p) => p.id === productId)

  if (!product) {
    window.location.href = "shop.html"
    return
  }

  // Update page title
  document.title = `${product.name} - Wakawakaboyz`

  const productDetailContent = document.getElementById("productDetailContent")
  if (!productDetailContent) return

  productDetailContent.innerHTML = `
        <div class="product-detail-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-price">GH₵${product.price.toFixed(2)}</div>
            <p class="product-detail-description">${product.description}</p>
            
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${product.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                </ul>
            </div>
            
            <div class="quantity-selector">
                <label>Quantity:</label>
                <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <input type="number" id="quantity" value="1" min="1" max="10" class="quantity-input">
                <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCartWithQuantity(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="buy-now-btn" onclick="buyNow(${product.id})">
                    <i class="fas fa-credit-card"></i> Buy Now
                </button>
            </div>
        </div>
    `

  // Load related products
  loadRelatedProducts(product.category, product.id)
}

// Add buy now functionality
function buyNow(productId) {
  const product = products.find((p) => p.id === productId)
  const quantityInput = document.getElementById("quantity")
  const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

  if (!product) return

  // Create temporary cart for immediate purchase
  const purchaseItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: quantity,
  }

  // Store in session storage for checkout
  sessionStorage.setItem("immediate-purchase", JSON.stringify([purchaseItem]))

  // Redirect to checkout
  window.location.href = "checkout.html?type=immediate"
}

function loadRelatedProducts(category, excludeId) {
  const relatedProducts = document.getElementById("relatedProducts")
  if (!relatedProducts) return

  const related = products.filter((p) => p.category === category && p.id !== excludeId).slice(0, 3)
  relatedProducts.innerHTML = related.map((product) => createProductCard(product)).join("")
}

function changeQuantity(change) {
  const quantityInput = document.getElementById("quantity")
  if (!quantityInput) return

  const currentValue = Number.parseInt(quantityInput.value)
  let newValue = currentValue + change

  if (newValue < 1) newValue = 1
  if (newValue > 10) newValue = 10

  quantityInput.value = newValue
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  saveCart()
  updateCartCount()
  showNotification(`${product.name} added to cart!`)
}

function addToCartWithQuantity(productId) {
  const product = products.find((p) => p.id === productId)
  const quantityInput = document.getElementById("quantity")
  const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  saveCart()
  updateCartCount()
  showNotification(`${product.name} added to cart!`)
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartCount()
  updateCartDisplay()
}

function updateCartItemQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = newQuantity
      saveCart()
      updateCartCount()
      updateCartDisplay()
    }
  }
}

function saveCart() {
  localStorage.setItem("wakawakaboyz-cart", JSON.stringify(cart))
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function openCart() {
  const cartModal = document.getElementById("cartModal")
  if (cartModal) {
    cartModal.style.display = "block"
    updateCartDisplay()
  }
}

function closeCart() {
  const cartModal = document.getElementById("cartModal")
  if (cartModal) {
    cartModal.style.display = "none"
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartItems || !cartTotal) return

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>"
    cartTotal.textContent = "0.00"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">GH₵${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateCartItemQuantity(${item.id}, parseInt(this.value))">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total.toFixed(2)
}

function goToCheckout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!")
    return
  }
  window.location.href = "checkout.html"
}

function loadCheckoutPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const isImmediatePurchase = urlParams.get("type") === "immediate"

  let items = []
  if (isImmediatePurchase) {
    items = JSON.parse(sessionStorage.getItem("immediate-purchase")) || []
  } else {
    items = cart
  }

  const checkoutItems = document.getElementById("checkoutItems")
  const subtotal = document.getElementById("subtotal")
  const deliveryFee = document.getElementById("deliveryFee")
  const finalTotal = document.getElementById("finalTotal")

  if (!checkoutItems) return

  if (items.length === 0) {
    checkoutItems.innerHTML = '<p>No items to checkout. <a href="shop.html">Continue shopping</a></p>'
    return
  }

  checkoutItems.innerHTML = items
    .map(
      (item) => `
        <div class="checkout-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>Quantity: ${item.quantity}</small>
            </div>
            <div>GH₵${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `,
    )
    .join("")

  const subtotalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryAmount = 5.0
  const totalAmount = subtotalAmount + deliveryAmount

  if (subtotal) subtotal.textContent = subtotalAmount.toFixed(2)
  if (deliveryFee) deliveryFee.textContent = deliveryAmount.toFixed(2)
  if (finalTotal) finalTotal.textContent = totalAmount.toFixed(2)
}

// FIXED: Handle Checkout Function
function handleCheckout(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const urlParams = new URLSearchParams(window.location.search)
  const isImmediatePurchase = urlParams.get("type") === "immediate"

  // Get items from cart or immediate purchase
  let items = []
  if (isImmediatePurchase) {
    items = JSON.parse(sessionStorage.getItem("immediate-purchase")) || []
  } else {
    items = cart
  }

  if (items.length === 0) {
    showNotification("No items to checkout!")
    return
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const total = subtotal + deliveryFee

  const orderData = {
    customer: {
      name: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    },
    paymentMethod: formData.get("paymentMethod"),
    items: items,
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: total,
    orderDate: new Date().toISOString(),
    orderId: generateOrderId(),
    notes: formData.get("notes") || "",
  }

  // Process payment based on method
  if (orderData.paymentMethod === "momo" || orderData.paymentMethod === "card") {
    processPaystackPayment(orderData)
  } else {
    // Cash on delivery
    orderData.paymentStatus = "cash_on_delivery"
    processOrder(orderData)
  }
}

// Generate unique order ID
function generateOrderId() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `WKB${timestamp}${random}`
}

// FIXED: Paystack Payment Function
function processPaystackPayment(orderData) {
  // Check if Paystack is loaded
  if (typeof PaystackPop === "undefined") {
    showNotification("Payment system not loaded. Please refresh and try again.", "error")
    return
  }

  try {
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: orderData.customer.email,
      amount: Math.round(orderData.total * 100), // Amount in pesewas (kobo)
      currency: "GHS",
      ref: orderData.orderId,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: orderData.customer.name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: orderData.customer.phone,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: orderData.customer.address,
          },
        ],
      },








































      
      callback: (response) => {
        // Payment successful
        console.log("Payment successful:", response)
        orderData.paymentReference = response.reference
        orderData.paymentStatus = "paid"

        showNotification("Payment successful! Processing your order...", "success")

        // Process the order
        processOrder(orderData)
      },
      onClose: () => {
        showNotification("Payment cancelled", "warning")
      },
    })

    handler.openIframe()
  } catch (error) {
    console.error("Paystack error:", error)
    showNotification("Payment initialization failed. Please try again.", "error")
  }
}

// FIXED: Enhanced Email Function
async function sendEnhancedEmailReceipt(orderData) {
  try {
    // Check if EmailJS is loaded and configured
    if (typeof emailjs === "undefined") {
      console.warn("EmailJS not loaded")
      showNotification("Email service not available", "warning")
      return false
    }

    if (EMAILJS_CONFIG.serviceId === "service_xxxxxxx") {
      console.warn("EmailJS not configured")
      showNotification("Email service not configured", "warning")
      return false
    }

    showNotification("Sending receipt...", "info")

    // Generate simple receipt HTML
    const receiptHTML = generateSimpleReceipt(orderData)

    // Prepare email parameters
    const emailParams = {
      to_email: COMPANY_CONFIG.email,
      customer_email: orderData.customer.email,
      subject: `🍽️ New Order Received - ${orderData.orderId}`,
      customer_name: orderData.customer.name,
      order_id: orderData.orderId,
      total_amount: orderData.total.toFixed(2),
      payment_status: orderData.paymentStatus === "paid" ? "PAID" : "Cash on Delivery",
      payment_reference: orderData.paymentReference || "N/A",
      order_date: new Date(orderData.orderDate).toLocaleString(),
      customer_phone: orderData.customer.phone,
      customer_address: orderData.customer.address,
      receipt_html: receiptHTML,
      items_summary: orderData.items
        .map((item) => `${item.name} x${item.quantity} - GH₵${(item.price * item.quantity).toFixed(2)}`)
        .join("\n"),
      subtotal: orderData.subtotal.toFixed(2),
      delivery_fee: orderData.deliveryFee.toFixed(2),
      notes: orderData.notes || "No special instructions",
    }

    // Send email using EmailJS
    const response = await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, emailParams)

    console.log("Email sent successfully:", response)
    showNotification("Receipt sent to company email!", "success")
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    showNotification("Failed to send email receipt", "error")
    return false
  }
}

// Generate simple receipt HTML
function generateSimpleReceipt(orderData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: white;">
      <div style="text-align: center; border-bottom: 2px solid #ff6b35; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #ff6b35; margin: 0;">${COMPANY_CONFIG.name}</h1>
        <p style="margin: 5px 0;">Authentic West African Cuisine</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 10px 0;">Order Receipt</h2>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Date:</strong> ${new Date(orderData.orderDate).toLocaleString()}</p>
        <p><strong>Payment Status:</strong> ${orderData.paymentStatus === "paid" ? "✅ PAID" : "💰 Cash on Delivery"}</p>
        ${orderData.paymentReference ? `<p><strong>Payment Reference:</strong> ${orderData.paymentReference}</p>` : ""}
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${orderData.customer.name}</p>
        <p><strong>Email:</strong> ${orderData.customer.email}</p>
        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
        <p><strong>Address:</strong> ${orderData.customer.address}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3>Order Items</h3>
        ${orderData.items
          .map(
            (item) => `
          <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
            <div>
              <strong>${item.name}</strong><br>
              <small>Qty: ${item.quantity} × GH₵${item.price.toFixed(2)}</small>
            </div>
            <div><strong>GH₵${(item.price * item.quantity).toFixed(2)}</strong></div>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Subtotal:</span>
          <span>GH₵${orderData.subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Delivery Fee:</span>
          <span>GH₵${orderData.deliveryFee.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #ff6b35; border-top: 2px solid #ff6b35; padding-top: 10px; margin-top: 10px;">
          <span>Total:</span>
          <span>GH₵${orderData.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #666;">
        <p>Thank you for choosing ${COMPANY_CONFIG.name}!</p>
        <p>Contact: ${COMPANY_CONFIG.phone} | ${COMPANY_CONFIG.email}</p>
      </div>
    </div>
  `
}

// Enhanced WhatsApp message
function sendEnhancedWhatsAppReceipt(orderData) {
  const message = `
🍽️ *NEW ORDER - ${COMPANY_CONFIG.name.toUpperCase()}* 🍽️

📋 *Order Details:*
Order ID: ${orderData.orderId}
Date: ${new Date(orderData.orderDate).toLocaleString()}
Status: ${orderData.paymentStatus === "paid" ? "✅ PAID" : "💰 Cash on Delivery"}
${orderData.paymentReference ? `Payment Ref: ${orderData.paymentReference}` : ""}

👤 *Customer Information:*
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}
Address: ${orderData.customer.address}

🛒 *Items Ordered:*
${orderData.items
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}\n   Qty: ${item.quantity} | Unit: GH₵${item.price.toFixed(2)} | Total: GH₵${(item.price * item.quantity).toFixed(2)}`,
  )
  .join("\n\n")}

💰 *Payment Summary:*
Subtotal: GH₵${orderData.subtotal.toFixed(2)}
Delivery: GH₵${orderData.deliveryFee.toFixed(2)}
*TOTAL: GH₵${orderData.total.toFixed(2)}*

${orderData.notes ? `📝 *Special Instructions:* ${orderData.notes}` : ""}

⏰ *Expected Delivery:* 30-45 minutes
🚚 *Status:* Pending Confirmation
  `.trim()

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`

  setTimeout(() => {
    window.open(whatsappUrl, "_blank")
    showNotification("WhatsApp message prepared!", "success")
  }, 1000)
}

// Enhanced notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  }

  const colors = {
    success: "#28a745",
    error: "#dc3545",
    info: "#17a2b8",
    warning: "#ffc107",
  }

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.2rem;">${icons[type]}</span>
      <span>${message}</span>
    </div>
  `

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    z-index: 3000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    max-width: 400px;
  `

  document.body.appendChild(notification)

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// FIXED: Process Order Function
async function processOrder(orderData) {
  try {
    showNotification("Processing your order...", "info")

    // Send email receipt
    const emailSent = await sendEnhancedEmailReceipt(orderData)

    // Send WhatsApp message
    sendEnhancedWhatsAppReceipt(orderData)

    // Clear cart or session storage
    const urlParams = new URLSearchParams(window.location.search)
    const isImmediatePurchase = urlParams.get("type") === "immediate"

    if (isImmediatePurchase) {
      sessionStorage.removeItem("immediate-purchase")
    } else {
      cart = []
      saveCart()
      updateCartCount()
    }

    // Show success message
    if (emailSent) {
      showNotification("Order placed successfully! Receipt sent to our team.", "success")
    } else {
      showNotification("Order placed successfully! Our team has been notified.", "success")
    }

    // Redirect to success page
    setTimeout(() => {
      window.location.href = `order-success.html?orderId=${orderData.orderId}`
    }, 3000)
  } catch (error) {
    console.error("Error processing order:", error)
    showNotification("Order processed but there was an issue. Our team has been notified.", "warning")

    // Still redirect to success page
    setTimeout(() => {
      window.location.href = `order-success.html?orderId=${orderData.orderId}`
    }, 3000)
  }
}

function goToShop(category = "all") {
  window.location.href = `shop.html?category=${category}`
}

function goToProductDetail(productId) {
  window.location.href = `product-detail.html?id=${productId}`
}

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  if (navMenu) {
    navMenu.classList.toggle("mobile-active")
  }
}

// Add CSS for notification animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
      from {
          transform: translateX(100%);
          opacity: 0;
      }
      to {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  @keyframes slideOut {
      from {
          transform: translateX(0);
          opacity: 1;
      }
      to {
          transform: translateX(100%);
          opacity: 0;
      }
  }
  
  .nav-menu.mobile-active {
      display: flex;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
      .nav-menu {
          display: none;
      }
  }
`
document.head.appendChild(style)

// Close cart when clicking outside
window.addEventListener("click", (e) => {
  const cartModal = document.getElementById("cartModal")
  if (e.target === cartModal) {
    closeCart()
  }
})

// Handle URL parameters for shop page
if (window.location.pathname.includes("shop.html")) {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")
  if (category && category !== "all") {
    setTimeout(() => {
      const filterBtn = document.querySelector(`[data-category="${category}"]`)
      if (filterBtn) {
        filterBtn.click()
      }
    }, 100)
  }
}

// Hero Slider Functionality
let currentSlideIndex = 0
const slides = document.querySelectorAll(".hero-slide")
const indicators = document.querySelectorAll(".indicator")

function showSlide(index) {
  if (slides.length === 0) return

  // Remove active class from all slides and indicators
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Add active class to current slide and indicator
  if (slides[index]) slides[index].classList.add("active")
  if (indicators[index]) indicators[index].classList.add("active")
}

function changeSlide(direction) {
  if (slides.length === 0) return

  currentSlideIndex += direction

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1
  }

  showSlide(currentSlideIndex)
}

function currentSlide(index) {
  currentSlideIndex = index - 1
  showSlide(currentSlideIndex)
}

// Auto-slide functionality
function autoSlide() {
  if (slides.length === 0) return

  currentSlideIndex = (currentSlideIndex + 1) % slides.length
  showSlide(currentSlideIndex)
}

// Start auto-slide when page loads
if (slides.length > 0) {
  setInterval(autoSlide, 5000) // Change slide every 5 seconds
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".animate-on-scroll")
  animateElements.forEach((el) => observer.observe(el))
})
