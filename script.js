/* ============================================
   E-COMMERCE APPLICATION - MAIN SCRIPT
   ============================================
   This file contains all the logic for:
   - Product listing and display
   - Shopping cart functionality
   - Authentication (Login/Register)
   - Simulated backend operations
   - LocalStorage persistence
   ============================================ */

// ============================================
// DATA STORAGE & INITIALIZATION
// ============================================

/**
 * Product inventory - stored in memory
 * This simulates a backend database
 */
let products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 20.00,
        stock: 10,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Denim Jeans",
        price: 45.00,
        stock: 8,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 80.00,
        stock: 5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Leather Jacket",
        price: 120.00,
        stock: 3,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Baseball Cap",
        price: 15.00,
        stock: 15,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Smart Watch",
        price: 150.00,
        stock: 7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    }
];

/**
 * Shopping cart - loaded from localStorage on init
 */
let cart = [];

/**
 * Current logged-in user
 */
let currentUser = null;

/**
 * Authentication mode: 'login' or 'register'
 */
let authMode = 'login';

/**
 * Admin credentials (hardcoded for demo)
 */
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
};

/**
 * Default demo user (for easy testing)
 */
const DEFAULT_USER = {
    username: 'user1',
    password: 'pass123',
    role: 'user'
};

// ============================================
// DOM ELEMENTS
// ============================================

const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart-section');
const adminSection = document.getElementById('admin-section');
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const navHome = document.getElementById('nav-home');
const navCart = document.getElementById('nav-cart');
const navLogin = document.getElementById('nav-login');
const authSection = document.getElementById('auth-section');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('auth-error');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const switchToRegister = document.getElementById('switch-to-register');
const switchText = document.getElementById('switch-text');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutMessage = document.getElementById('checkout-message');
const userTypeSelect = document.getElementById('user-type');
const submitText = document.getElementById('submit-text');
const addProductForm = document.getElementById('add-product-form');
const adminProductsList = document.getElementById('admin-products-list');
const adminMessage = document.getElementById('admin-message');
const adminLogoutBtn = document.getElementById('admin-logout-btn');

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 * Loads cart and user session from localStorage
 */
function init() {
    console.log('🔧 [BACKEND] Initializing application...');
    
    // Initialize default users if not exists
    initializeDefaultUsers();
    
    // Load products from localStorage (or use default)
    loadProducts();
    
    // Load cart from localStorage
    loadCart();
    
    // Load user session
    loadUserSession();
    
    // Check if admin is logged in
    if (currentUser && currentUser.role === 'admin') {
        showAdminPanel();
    } else {
        // Render initial state for customers
        renderProducts();
        renderCart();
        updateCartCount();
    }
    
    updateAuthUI();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup footer links
    setupFooterLinks();
    
    console.log('✅ [BACKEND] Application initialized successfully');
}

/**
 * Initialize default users (admin and demo user)
 */
function initializeDefaultUsers() {
    const users = getUsers();
    
    // Add admin if not exists
    if (!users.find(u => u.username === ADMIN_CREDENTIALS.username)) {
        users.push({
            username: ADMIN_CREDENTIALS.username,
            password: ADMIN_CREDENTIALS.password,
            role: ADMIN_CREDENTIALS.role
        });
    }
    
    // Add default user if not exists
    if (!users.find(u => u.username === DEFAULT_USER.username)) {
        users.push({
            username: DEFAULT_USER.username,
            password: DEFAULT_USER.password,
            role: DEFAULT_USER.role
        });
    }
    
    saveUsers(users);
    console.log('👥 [BACKEND] Default users initialized');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Navigation
    navHome.addEventListener('click', () => showSection('products'));
    navCart.addEventListener('click', () => showSection('cart'));
    navLogin.addEventListener('click', () => openLoginModal());
    
    // Modal
    closeModal.addEventListener('click', closeLoginModal);
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Auth form
    authForm.addEventListener('submit', handleAuthSubmit);
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Admin form
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Admin logout
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', handleAdminLogout);
    }
    
    // Event delegation for admin product actions (Edit/Delete)
    if (adminProductsList) {
        adminProductsList.addEventListener('click', handleAdminProductAction);
    }
}

// ============================================
// SECTION NAVIGATION
// ============================================

/**
 * Show/hide sections (SPA behavior)
 */
function showSection(sectionName) {
    // Hide all sections
    productsSection.classList.remove('active');
    cartSection.classList.remove('active');
    if (adminSection) adminSection.classList.remove('active');
    
    // Remove active class from nav links
    navHome.classList.remove('active');
    navCart.classList.remove('active');
    
    // Show selected section
    if (sectionName === 'products') {
        productsSection.classList.add('active');
        navHome.classList.add('active');
    } else if (sectionName === 'cart') {
        cartSection.classList.add('active');
        navCart.classList.add('active');
        renderCart(); // Refresh cart when viewing
    } else if (sectionName === 'admin') {
        if (adminSection) {
            adminSection.classList.add('active');
            renderAdminProducts(); // Refresh admin product list
        }
    }
}

// ============================================
// PRODUCT DISPLAY
// ============================================

/**
 * Render all products dynamically
 */
function renderProducts() {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    console.log(`📦 [BACKEND] Rendered ${products.length} products`);
}

/**
 * Create a product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isOutOfStock = product.stock === 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${product.name.charAt(0)}';">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-stock ${isOutOfStock ? 'out-of-stock' : 'in-stock'}">
                ${isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
            </p>
            <button 
                class="btn btn-primary" 
                onclick="addToCart(${product.id})"
                ${isOutOfStock ? 'disabled' : ''}
            >
                ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    `;
    
    return card;
}

// ============================================
// CART FUNCTIONALITY
// ============================================

/**
 * Add product to cart
 * Simulates backend API call with delay
 */
function addToCart(productId) {
    console.log(`🛒 [BACKEND] Adding product ${productId} to cart...`);
    
    // Simulate server delay
    setTimeout(() => {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('❌ [BACKEND] Product not found');
            return;
        }
        
        if (product.stock === 0) {
            console.warn('⚠️ [BACKEND] Product out of stock');
            alert('This product is out of stock!');
            return;
        }
        
        // Check if product already in cart
        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            // Increase quantity if stock allows
            if (cartItem.quantity < product.stock) {
                cartItem.quantity++;
                console.log(`✅ [BACKEND] Increased quantity for product ${productId}`);
            } else {
                alert('Cannot add more items. Stock limit reached!');
                return;
            }
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            console.log(`✅ [BACKEND] Added product ${productId} to cart`);
        }
        
        // Update inventory (simulated backend)
        updateInventory(productId, -1);
        
        // Save and refresh
        saveCart();
        renderCart();
        renderProducts(); // Refresh to update stock display
        updateCartCount();
        
        console.log(`📊 [BACKEND] Cart updated. Total items: ${getTotalCartItems()}`);
    }, 300); // Simulate 300ms server delay
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    console.log(`🗑️ [BACKEND] Removing product ${productId} from cart...`);
    
    setTimeout(() => {
        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            // Restore stock
            updateInventory(productId, cartItem.quantity);
            
            // Remove from cart
            cart = cart.filter(item => item.id !== productId);
            
            console.log(`✅ [BACKEND] Removed product ${productId} from cart`);
            
            // Save and refresh
            saveCart();
            renderCart();
            renderProducts();
            updateCartCount();
        }
    }, 200);
}

/**
 * Update item quantity in cart
 */
function updateCartQuantity(productId, change) {
    console.log(`🔄 [BACKEND] Updating quantity for product ${productId} by ${change}...`);
    
    setTimeout(() => {
        const cartItem = cart.find(item => item.id === productId);
        const product = products.find(p => p.id === productId);
        
        if (!cartItem || !product) return;
        
        const newQuantity = cartItem.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        // Check stock availability
        const currentStock = product.stock;
        const currentCartQty = cartItem.quantity;
        
        if (change > 0 && currentCartQty >= currentStock) {
            alert('Cannot add more items. Stock limit reached!');
            return;
        }
        
        // Update quantity
        const quantityDiff = change;
        cartItem.quantity = newQuantity;
        
        // Update inventory
        updateInventory(productId, -quantityDiff);
        
        console.log(`✅ [BACKEND] Updated quantity for product ${productId} to ${newQuantity}`);
        
        // Save and refresh
        saveCart();
        renderCart();
        renderProducts();
        updateCartCount();
    }, 200);
}

/**
 * Render cart items
 */
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty. Start shopping!</div>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    const total = calculateCartTotal();
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

/**
 * Create cart item element
 */
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const subtotal = item.price * item.quantity;
    
    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${item.name.charAt(0)}';">
        </div>
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        </div>
        <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-subtotal">$${subtotal.toFixed(2)}</div>
        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    
    return div;
}

/**
 * Calculate total cart value
 */
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get total number of items in cart
 */
function getTotalCartItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Update cart count badge
 */
function updateCartCount() {
    cartCount.textContent = getTotalCartItems();
}

// ============================================
// INVENTORY MANAGEMENT (Simulated Backend)
// ============================================

/**
 * Update product inventory
 * This simulates backend inventory management
 */
function updateInventory(productId, quantityChange) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        product.stock += quantityChange;
        
        // Ensure stock doesn't go negative
        if (product.stock < 0) {
            product.stock = 0;
        }
        
        console.log(`📦 [BACKEND] Updated inventory for product ${productId}. New stock: ${product.stock}`);
    }
}

// ============================================
// LOCALSTORAGE PERSISTENCE
// ============================================

/**
 * Save cart to localStorage
 */
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('💾 [BACKEND] Cart saved to localStorage');
    } catch (error) {
        console.error('❌ [BACKEND] Error saving cart:', error);
    }
}

/**
 * Load cart from localStorage
 */
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log(`💾 [BACKEND] Cart loaded from localStorage. Items: ${cart.length}`);
        }
    } catch (error) {
        console.error('❌ [BACKEND] Error loading cart:', error);
        cart = [];
    }
}

/**
 * Save user session
 */
function saveUserSession() {
    try {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log(`💾 [BACKEND] User session saved: ${currentUser.username}`);
        } else {
            localStorage.removeItem('currentUser');
            console.log('💾 [BACKEND] User session cleared');
        }
    } catch (error) {
        console.error('❌ [BACKEND] Error saving user session:', error);
    }
}

/**
 * Load user session
 */
function loadUserSession() {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            console.log(`💾 [BACKEND] User session loaded: ${currentUser.username}`);
        }
    } catch (error) {
        console.error('❌ [BACKEND] Error loading user session:', error);
        currentUser = null;
    }
}

/**
 * Get users from localStorage
 */
function getUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('❌ [BACKEND] Error loading users:', error);
        return [];
    }
}

/**
 * Save users to localStorage
 */
function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log('💾 [BACKEND] Users saved to localStorage');
    } catch (error) {
        console.error('❌ [BACKEND] Error saving users:', error);
    }
}

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Open login modal
 */
function openLoginModal() {
    authMode = 'login';
    updateAuthModal();
    loginModal.classList.add('active');
}

/**
 * Close login modal
 */
function closeLoginModal() {
    loginModal.classList.remove('active');
    authForm.reset();
    authError.textContent = '';
}

/**
 * Toggle between login and register mode
 */
function toggleAuthMode() {
    authMode = authMode === 'login' ? 'register' : 'login';
    updateAuthModal();
}

/**
 * Update auth modal UI based on mode
 */
function updateAuthModal() {
    if (authMode === 'login') {
        modalTitle.textContent = 'Welcome Back';
        modalSubtitle.textContent = 'Sign in to your account to continue';
        submitText.textContent = 'Login';
        switchText.textContent = "Don't have an account?";
        switchToRegister.textContent = 'Register here';
    } else {
        modalTitle.textContent = 'Create Account';
        modalSubtitle.textContent = 'Join us and start shopping today';
        submitText.textContent = 'Register';
        switchText.textContent = 'Already have an account?';
        switchToRegister.textContent = 'Login here';
    }
    authError.textContent = '';
}

/**
 * Handle authentication form submission
 */
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const userType = userTypeSelect ? userTypeSelect.value : 'user';
    
    // Validate inputs
    if (!username || !password) {
        authError.textContent = 'Please fill in all fields';
        return;
    }
    
    // Simulate backend authentication delay
    setTimeout(() => {
        if (authMode === 'login') {
            handleLogin(username, password, userType);
        } else {
            handleRegister(username, password);
        }
    }, 500); // Simulate 500ms server delay
}

/**
 * Handle user login
 */
function handleLogin(username, password, userType) {
    console.log(`🔐 [BACKEND] Attempting login for user: ${username} (type: ${userType})`);
    
    // Check admin login
    if (userType === 'admin') {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            currentUser = { 
                username: ADMIN_CREDENTIALS.username, 
                role: ADMIN_CREDENTIALS.role 
            };
            saveUserSession();
            updateAuthUI();
            closeLoginModal();
            showAdminPanel(); // Show admin panel instead of customer UI
            console.log(`✅ [BACKEND] Admin login successful`);
            return;
        } else {
            authError.textContent = 'Invalid admin credentials';
            console.log(`❌ [BACKEND] Admin login failed`);
            return;
        }
    }
    
    // Regular user login
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = { 
            username: user.username,
            role: user.role || 'user'
        };
        saveUserSession();
        updateAuthUI();
        closeLoginModal();
        console.log(`✅ [BACKEND] Login successful for user: ${username}`);
    } else {
        authError.textContent = 'Invalid username or password';
        console.log(`❌ [BACKEND] Login failed for user: ${username}`);
    }
}

/**
 * Handle user registration
 */
function handleRegister(username, password) {
    console.log(`📝 [BACKEND] Attempting registration for user: ${username}`);
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
        authError.textContent = 'Username already exists';
        console.log(`❌ [BACKEND] Registration failed: Username already exists`);
        return;
    }
    
    // Create new user
    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);
    
    // Auto-login after registration
    currentUser = { username: newUser.username };
    saveUserSession();
    updateAuthUI();
    closeLoginModal();
    
    console.log(`✅ [BACKEND] Registration successful for user: ${username}`);
}

/**
 * Handle user logout
 */
function logout() {
    console.log(`🚪 [BACKEND] Logging out user: ${currentUser?.username}`);
    const wasAdmin = currentUser && currentUser.role === 'admin';
    currentUser = null;
    saveUserSession();
    updateAuthUI();
    
    // If was admin, hide admin panel and show customer UI
    if (wasAdmin && adminSection && adminSection.classList.contains('active')) {
        showSection('products');
        renderProducts();
    }
    
    console.log('✅ [BACKEND] Logout successful');
}

/**
 * Handle admin logout
 */
function handleAdminLogout() {
    logout();
}

/**
 * Update authentication UI based on login state
 */
function updateAuthUI() {
    if (currentUser) {
        const isAdmin = currentUser.role === 'admin';
        const roleBadge = isAdmin ? '<span class="admin-badge">👑 Admin</span>' : '';
        
        // Show/hide navigation based on admin status
        if (isAdmin) {
            if (navHome) navHome.style.display = 'none';
            if (navCart) navCart.style.display = 'none';
        } else {
            if (navHome) navHome.style.display = 'block';
            if (navCart) navCart.style.display = 'block';
        }
        
        navLogin.innerHTML = `
            <span>Welcome, ${currentUser.username}! ${roleBadge}</span>
            <a href="#" id="logout-link" class="nav-link" style="margin-left: 1rem;">Logout</a>
        `;
        
        // Add logout event listener
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    } else {
        navLogin.textContent = 'Login';
        if (navHome) navHome.style.display = 'block';
        if (navCart) navCart.style.display = 'block';
    }
}

/**
 * Setup footer link event listeners
 */
function setupFooterLinks() {
    const footerHome = document.getElementById('footer-home');
    const footerProducts = document.getElementById('footer-products');
    const footerCart = document.getElementById('footer-cart');
    
    if (footerHome) {
        footerHome.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (footerProducts) {
        footerProducts.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (footerCart) {
        footerCart.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// CHECKOUT FUNCTIONALITY
// ============================================

/**
 * Handle checkout process
 */
function handleCheckout() {
    console.log('🛒 [BACKEND] Checkout process initiated...');
    
    // Check if user is logged in
    if (!currentUser) {
        checkoutMessage.textContent = 'Please login to checkout';
        checkoutMessage.className = 'message error';
        setTimeout(() => {
            checkoutMessage.textContent = '';
            checkoutMessage.className = 'message';
        }, 3000);
        openLoginModal();
        console.log('❌ [BACKEND] Checkout blocked: User not logged in');
        return;
    }
    
    // Check if cart is empty
    if (cart.length === 0) {
        checkoutMessage.textContent = 'Your cart is empty!';
        checkoutMessage.className = 'message error';
        setTimeout(() => {
            checkoutMessage.textContent = '';
            checkoutMessage.className = 'message';
        }, 3000);
        return;
    }
    
    // Simulate backend order processing delay
    setTimeout(() => {
        processOrder();
    }, 1000); // Simulate 1 second server processing
}

/**
 * Process order (simulated backend)
 */
function processOrder() {
    console.log('📦 [BACKEND] Processing order...');
    
    const order = {
        user: currentUser.username,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: calculateCartTotal(),
        date: new Date().toISOString(),
        orderId: Date.now() // Simple order ID generation
    };
    
    // Save order to localStorage
    saveOrder(order);
    
    // Log order details
    console.log('✅ [BACKEND] Order processed successfully:');
    console.log('📋 [BACKEND] Order Details:', JSON.stringify(order, null, 2));
    
    // Clear cart
    cart = [];
    saveCart();
    
    // Show success message
    checkoutMessage.textContent = `Order placed successfully! Order ID: ${order.orderId}`;
    checkoutMessage.className = 'message success';
    
    // Refresh UI
    renderCart();
    renderProducts();
    updateCartCount();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        checkoutMessage.textContent = '';
        checkoutMessage.className = 'message';
    }, 5000);
    
    console.log('🎉 [BACKEND] Checkout completed successfully');
}

/**
 * Save order to localStorage
 */
function saveOrder(order) {
    try {
        const orders = getOrders();
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('💾 [BACKEND] Order saved to localStorage');
    } catch (error) {
        console.error('❌ [BACKEND] Error saving order:', error);
    }
}

/**
 * Get orders from localStorage
 */
function getOrders() {
    try {
        const orders = localStorage.getItem('orders');
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error('❌ [BACKEND] Error loading orders:', error);
        return [];
    }
}

// ============================================
// ADMIN PANEL FUNCTIONS
// ============================================

/**
 * Show admin panel and hide customer UI
 */
function showAdminPanel() {
    console.log('👑 [BACKEND] Showing admin panel');
    
    // Hide customer sections
    if (productsSection) productsSection.classList.remove('active');
    if (cartSection) cartSection.classList.remove('active');
    if (navHome) navHome.classList.remove('active');
    if (navCart) navCart.classList.remove('active');
    
    // Show admin section
    if (adminSection) {
        adminSection.classList.add('active');
        renderAdminProducts();
    }
    
    // Hide navigation for admin
    if (navHome) navHome.style.display = 'none';
    if (navCart) navCart.style.display = 'none';
}

/**
 * Load products from localStorage or use default
 */
function loadProducts() {
    try {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts && JSON.parse(savedProducts).length > 0) {
            products = JSON.parse(savedProducts);
            console.log(`💾 [BACKEND] Products loaded from localStorage. Count: ${products.length}`);
        } else {
            // Save default products to localStorage
            saveProducts();
            console.log(`💾 [BACKEND] Default products saved to localStorage`);
        }
    } catch (error) {
        console.error('❌ [BACKEND] Error loading products:', error);
        saveProducts(); // Save defaults on error
    }
}

/**
 * Save products to localStorage
 */
function saveProducts() {
    try {
        localStorage.setItem('products', JSON.stringify(products));
        console.log(`💾 [BACKEND] Products saved to localStorage. Count: ${products.length}`);
    } catch (error) {
        console.error('❌ [BACKEND] Error saving products:', error);
    }
}

/**
 * Handle add product form submission
 */
function handleAddProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const image = document.getElementById('product-image').value.trim();
    
    // Validate inputs
    if (!name || !price || !stock || !image) {
        showAdminMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (price < 0 || stock < 0) {
        showAdminMessage('Price and stock must be positive numbers', 'error');
        return;
    }
    
    // Generate unique ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    // Create new product
    const newProduct = {
        id: newId,
        name: name,
        price: price,
        stock: stock,
        image: image
    };
    
    // Add to products array
    products.push(newProduct);
    
    // Save to localStorage
    saveProducts();
    
    // Update UI
    renderAdminProducts();
    renderProducts(); // Update customer view
    
    // Clear form
    addProductForm.reset();
    
    // Show success message
    showAdminMessage(`Product "${name}" added successfully!`, 'success');
    
    console.log(`✅ [BACKEND] Admin added new product: ${name} (ID: ${newId})`);
}

/**
 * Render products in admin panel
 */
function renderAdminProducts() {
    if (!adminProductsList) return;
    
    adminProductsList.innerHTML = '';
    
    if (products.length === 0) {
        adminProductsList.innerHTML = '<p class="empty-message">No products found. Add your first product above!</p>';
        return;
    }
    
    products.forEach(product => {
        const productRow = createAdminProductRow(product);
        adminProductsList.appendChild(productRow);
    });
    
    console.log(`📦 [BACKEND] Admin panel: Rendered ${products.length} products`);
}

/**
 * Create admin product row element
 */
function createAdminProductRow(product) {
    const row = document.createElement('div');
    row.className = 'admin-product-row';
    row.dataset.productId = product.id;
    
    row.innerHTML = `
        <div class="admin-product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${product.name.charAt(0)}';">
        </div>
        <div class="admin-product-info">
            <h4 class="admin-product-name">${product.name}</h4>
            <div class="admin-product-details">
                <span class="admin-product-id">ID: ${product.id}</span>
            </div>
        </div>
        <div class="admin-product-price">
            <label>Price ($):</label>
            <input type="number" class="admin-edit-price" value="${product.price.toFixed(2)}" step="0.01" min="0" data-product-id="${product.id}">
        </div>
        <div class="admin-product-stock">
            <label>Stock:</label>
            <input type="number" class="admin-edit-stock" value="${product.stock}" min="0" data-product-id="${product.id}">
        </div>
        <div class="admin-product-actions">
            <button class="btn btn-primary btn-sm admin-save-btn" data-product-id="${product.id}">💾 Save</button>
            <button class="btn btn-danger btn-sm admin-delete-btn" data-product-id="${product.id}">🗑️ Delete</button>
        </div>
    `;
    
    return row;
}

/**
 * Handle admin product actions (Edit/Delete) using event delegation
 */
function handleAdminProductAction(e) {
    const productId = parseInt(e.target.dataset.productId);
    
    if (!productId) return;
    
    // Handle Save button
    if (e.target.classList.contains('admin-save-btn')) {
        handleEditProduct(productId);
    }
    
    // Handle Delete button
    if (e.target.classList.contains('admin-delete-btn')) {
        handleDeleteProduct(productId);
    }
}

/**
 * Handle edit product (update price and stock)
 */
function handleEditProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get updated values from inputs
    const priceInput = document.querySelector(`.admin-edit-price[data-product-id="${productId}"]`);
    const stockInput = document.querySelector(`.admin-edit-stock[data-product-id="${productId}"]`);
    
    if (!priceInput || !stockInput) return;
    
    const newPrice = parseFloat(priceInput.value);
    const newStock = parseInt(stockInput.value);
    
    // Validate
    if (isNaN(newPrice) || newPrice < 0) {
        showAdminMessage('Invalid price value', 'error');
        return;
    }
    
    if (isNaN(newStock) || newStock < 0) {
        showAdminMessage('Invalid stock value', 'error');
        return;
    }
    
    // Update product
    product.price = newPrice;
    product.stock = newStock;
    
    // Save to localStorage
    saveProducts();
    
    // Update UI
    renderAdminProducts();
    renderProducts(); // Update customer view
    
    // Show success message
    showAdminMessage(`Product "${product.name}" updated successfully!`, 'success');
    
    console.log(`✅ [BACKEND] Admin updated product ID ${productId}: Price=$${newPrice}, Stock=${newStock}`);
}

/**
 * Handle delete product
 */
function handleDeleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
        return;
    }
    
    // Remove from products array
    products = products.filter(p => p.id !== productId);
    
    // Remove from cart if exists
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
        saveCart();
        updateCartCount();
        console.log(`🗑️ [BACKEND] Removed product ${productId} from cart`);
    }
    
    // Save to localStorage
    saveProducts();
    
    // Update UI
    renderAdminProducts();
    renderProducts(); // Update customer view
    renderCart(); // Update cart view
    
    // Show success message
    showAdminMessage(`Product "${product.name}" deleted successfully!`, 'success');
    
    console.log(`✅ [BACKEND] Admin deleted product ID ${productId}: ${product.name}`);
}

/**
 * Show admin message
 */
function showAdminMessage(message, type) {
    if (!adminMessage) return;
    
    adminMessage.textContent = message;
    adminMessage.className = `message ${type}`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        adminMessage.textContent = '';
        adminMessage.className = 'message';
    }, 3000);
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
