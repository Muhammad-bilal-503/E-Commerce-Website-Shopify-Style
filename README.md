#  E-Commerce Website - MB Shopping Hub

A complete, beginner-friendly but professional **single-page e-commerce website (Shopify-style)** built using only HTML5, CSS3, and Pure JavaScript. This project includes a full admin panel for product management and demonstrates simulated backend behavior using localStorage.

##  Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Admin Panel](#admin-panel)
- [Exam Requirements](#exam-requirements)
- [Testing Guide](#testing-guide)
- [Code Structure](#code-structure)

---

##  Project Overview

This is a fully functional e-commerce website built for **Web Technology Final Paper**. It demonstrates:

- **Single-Page Application (SPA)** architecture
- **Product listing and shopping cart** functionality
- **User authentication** (Login/Register)
- **Admin panel** for product management
- **localStorage** for data persistence
- **Simulated backend** using JavaScript logic

The website is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

---

##  Features

###  Customer Features

1. **Product Browsing**
   - View all available products with images
   - See product details (name, price, stock)
   - Responsive product grid layout
   - Real-time stock availability

2. **Shopping Cart**
   - Add products to cart
   - Increase/decrease item quantities
   - Remove items from cart
   - View cart total
   - Cart persists across page refreshes (localStorage)

3. **User Authentication**
   - User registration
   - User login
   - Session management
   - Secure logout

4. **Checkout Process**
   - Login required for checkout
   - Order processing simulation
   - Order confirmation
   - Order history stored in localStorage

###  Admin Features

1. **Product Management**
   - Add new products
   - View all products
   - Edit product price and stock
   - Delete products

2. **Inventory Management**
   - Real-time stock updates
   - Automatic cart synchronization
   - Product deletion from cart if removed

3. **Admin Dashboard**
   - Clean, professional interface
   - Responsive design
   - Instant UI updates

---

##  Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Pure vanilla JavaScript, no frameworks
- **localStorage API** - Data persistence
- **Responsive Design** - Mobile-first approach

### No External Dependencies
- ❌ No React, Vue, or Angular
- ❌ No Bootstrap or Tailwind CSS
- ❌ No jQuery or other libraries
- ✅ Pure HTML, CSS, and JavaScript only

---

##  Project Structure

```
Final Paper Web/
│
├── index.html          # Main HTML file (SPA structure)
├── style.css           # All CSS styles (responsive design)
├── script.js           # All JavaScript logic
└── README.md          # This file
```

### File Breakdown

- **index.html**: Contains all HTML structure including:
  - Header with navigation
  - Product listing section
  - Shopping cart section
  - Login/Register modal
  - Admin panel section
  - Footer

- **style.css**: Contains all styling including:
  - Global styles and CSS variables
  - Responsive breakpoints
  - Product grid layout
  - Cart flexbox layout
  - Admin panel styles
  - Animations and transitions

- **script.js**: Contains all JavaScript logic including:
  - Product management
  - Cart functionality
  - Authentication system
  - Admin panel functions
  - localStorage operations
  - Simulated backend logic

---

##  Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A code editor (VS Code, Sublime Text, etc.) - optional
- A local web server (optional, for testing)

### Quick Start

1. **Download/Clone the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd "Final Paper Web"
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Open browser and navigate to: `http://localhost:8000`
   - Or double-click `index.html` to open directly

---

##  Usage Guide

### For Customers

#### 1. Browse Products
- The homepage displays all available products
- Each product shows:
  - Product image
  - Product name
  - Price
  - Stock availability
  - "Add to Cart" button

#### 2. Add to Cart
- Click "Add to Cart" on any product
- Stock decreases automatically
- Cart count updates in navigation
- Cart persists after page refresh

#### 3. View Cart
- Click "Cart" in navigation
- View all cart items
- Adjust quantities using +/- buttons
- Remove items using "Remove" button
- View total price

#### 4. Checkout
- Click "Checkout" button
- **Must be logged in** to checkout
- If not logged in, login modal appears
- After successful checkout:
  - Order is saved
  - Cart is cleared
  - Confirmation message shown

#### 5. Register/Login
- Click "Login" in navigation
- Choose "Register" to create account
- Or login with existing credentials
- Demo credentials available in modal

### Demo Credentials

**Regular User:**
- Username: `user1`
- Password: `pass123`

**Admin:**
- Username: `admin`
- Password: `admin123`

---

##  Admin Panel

### Accessing Admin Panel

1. Click "Login" in navigation
2. Select "Admin" from "Login as" dropdown
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Admin panel appears automatically

### Admin Features

#### ➕ Add Product
1. Fill in the form at the top:
   - Product Name
   - Price ($)
   - Stock Quantity
   - Image URL
2. Click "Add Product"
3. Product appears in list and customer view instantly

#### ✏️ Edit Product
1. Find product in the management table
2. Modify Price or Stock in the input fields
3. Click "💾 Save" button
4. Changes reflect immediately in customer view

#### 🗑️ Delete Product
1. Find product in the management table
2. Click "🗑️ Delete" button
3. Confirm deletion
4. Product removed from:
   - Admin list
   - Customer product listing
   - Cart (if present)

#### 🚪 Logout
- Click "Logout" button in admin header
- Returns to customer view
- Admin session cleared

---

## 📝 Exam Requirements

This project fulfills **Exam Question #2 and #3** requirements:

### ✅ Question #2 - Product Listing & Cart

- ✅ Semantic HTML structure
- ✅ Header with navigation (Home, Cart, Login)
- ✅ Product listing section (visible by default)
- ✅ Cart section (hidden initially)
- ✅ At least 4 products displayed dynamically
- ✅ Each product shows: Image, Name, Price, Stock, Add to Cart button
- ✅ Products rendered from JS array
- ✅ Full cart functionality (add, increase/decrease, remove)
- ✅ Cart calculations (subtotal, total)
- ✅ localStorage persistence
- ✅ Hide/show sections using JS
- ✅ Disable "Add to Cart" when stock = 0

### ✅ Question #3 - Login & Simulated Backend

- ✅ Login/Register form (username, password)
- ✅ Users stored in localStorage
- ✅ Form validation with error messages
- ✅ Logged-in user saved in localStorage
- ✅ Username shown in navbar after login
- ✅ Checkout requires login
- ✅ Logout clears session
- ✅ Simulated backend with JavaScript
- ✅ console.log() as backend logs
- ✅ setTimeout() for server delays
- ✅ Inventory management (stock updates)
- ✅ Checkout saves orders to localStorage
- ✅ Order confirmation messages

### ✅ Additional - Admin Panel

- ✅ Fixed admin account (admin/admin123)
- ✅ Admin login form
- ✅ Admin panel UI
- ✅ Add Product functionality
- ✅ View Product List
- ✅ Edit Product (price, stock)
- ✅ Delete Product
- ✅ Admin session management
- ✅ Logout functionality

---

## 🧪 Testing Guide

### Test Flow 1: Customer Shopping

1. ✅ **Browse Products**
   - Open website
   - Verify products display correctly
   - Check product images load

2. ✅ **Add to Cart**
   - Click "Add to Cart" on a product
   - Verify cart count increases
   - Check stock decreases

3. ✅ **Cart Persistence**
   - Add items to cart
   - Refresh page (F5)
   - Verify cart still contains items

4. ✅ **Checkout Without Login**
   - Go to cart
   - Click "Checkout"
   - Verify login modal appears
   - Verify error message shown

5. ✅ **Register/Login**
   - Click "Login"
   - Click "Register here"
   - Create new account
   - Verify auto-login after registration

6. ✅ **Successful Checkout**
   - Login as user
   - Add items to cart
   - Click "Checkout"
   - Verify order confirmation
   - Verify cart cleared

### Test Flow 2: Admin Panel

1. ✅ **Admin Login**
   - Click "Login"
   - Select "Admin"
   - Enter admin credentials
   - Verify admin panel appears

2. ✅ **Add Product**
   - Fill add product form
   - Submit form
   - Verify product appears in list
   - Verify product appears in customer view

3. ✅ **Edit Product**
   - Change product price/stock
   - Click "Save"
   - Verify changes in customer view

4. ✅ **Delete Product**
   - Click "Delete" on a product
   - Confirm deletion
   - Verify product removed from all views

5. ✅ **Admin Logout**
   - Click "Logout"
   - Verify return to customer view
   - Verify navigation restored

### Test Flow 3: Inventory Management

1. ✅ **Stock Reduction**
   - Add product to cart
   - Verify stock decreases
   - Verify "Add to Cart" disabled when stock = 0

2. ✅ **Stock Restoration**
   - Add item to cart
   - Remove item from cart
   - Verify stock restored

3. ✅ **Admin Stock Override**
   - Admin updates stock
   - Verify new stock value
   - Verify customer view updates

---

## 💻 Code Structure

### JavaScript Functions Overview

#### Product Management
- `loadProducts()` - Load products from localStorage
- `saveProducts()` - Save products to localStorage
- `renderProducts()` - Display products on customer page
- `createProductCard()` - Create product card HTML

#### Cart Management
- `addToCart()` - Add product to cart
- `removeFromCart()` - Remove product from cart
- `updateCartQuantity()` - Change item quantity
- `renderCart()` - Display cart items
- `calculateCartTotal()` - Calculate cart total
- `saveCart()` / `loadCart()` - Cart persistence

#### Authentication
- `handleLogin()` - Process user/admin login
- `handleRegister()` - Process user registration
- `logout()` - Clear session
- `updateAuthUI()` - Update navigation based on login state

#### Admin Panel
- `showAdminPanel()` - Display admin interface
- `handleAddProduct()` - Add new product
- `handleEditProduct()` - Update product
- `handleDeleteProduct()` - Remove product
- `renderAdminProducts()` - Display products in admin panel

#### Inventory Management
- `updateInventory()` - Update product stock
- Handles cart additions/removals
- Prevents adding out-of-stock items

---

## 🎨 Design Features

### Responsive Breakpoints
- **Desktop**: Full layout with grid
- **Tablet**: 768px and below
- **Mobile**: 480px and below

### Color Scheme
- Primary: Cyan/Teal (#06b6d4)
- Secondary: Blue (#3b82f6)
- Accent: Purple (#8b5cf6)
- Success: Green (#10b981)
- Danger: Pink/Red (#f43f5e)

### UI Components
- Modern gradient buttons
- Smooth animations
- Hover effects
- Modal dialogs
- Form validation
- Success/error messages

---

## 📊 Data Storage

All data is stored in browser's localStorage:

- **`products`** - Product inventory
- **`cart`** - Shopping cart items
- **`users`** - Registered users
- **`currentUser`** - Active session
- **`orders`** - Order history

### localStorage Keys
```javascript
localStorage.getItem('products')     // Product list
localStorage.getItem('cart')         // Cart items
localStorage.getItem('users')        // User accounts
localStorage.getItem('currentUser')  // Active session
localStorage.getItem('orders')       // Order history
```

---

## 🔒 Security Notes

⚠️ **Important**: This is a demo/educational project. For production:

- Passwords are stored in plain text (should be hashed)
- No server-side validation
- No HTTPS/SSL
- Admin credentials are hardcoded
- localStorage can be cleared by user

**For exam purposes**, this demonstrates:
- Frontend authentication flow
- Client-side data management
- Simulated backend operations

---

## 🐛 Troubleshooting

### Products Not Showing
- Check browser console for errors
- Verify localStorage has products: `localStorage.getItem('products')`
- Clear localStorage and refresh: `localStorage.clear()`

### Cart Not Persisting
- Check browser allows localStorage
- Verify cart is saved: `localStorage.getItem('cart')`
- Check browser console for errors

### Admin Panel Not Appearing
- Verify admin login credentials
- Check browser console for errors
- Ensure admin section exists in HTML

### Images Not Loading
- Check image URLs are valid
- Verify internet connection (for external images)
- Check browser console for 404 errors

---

## 📚 Learning Outcomes

This project demonstrates:

1. **SPA Architecture** - Single-page application without page reloads
2. **DOM Manipulation** - Dynamic content creation and updates
3. **Event Handling** - User interactions and form submissions
4. **Data Persistence** - localStorage usage
5. **State Management** - Managing application state
6. **Responsive Design** - Mobile-first approach
7. **Code Organization** - Clean, commented, maintainable code

---

## 👨‍💻 Author

**MB Shopping Hub**  
Web Technology Final Paper Project

---

## 📄 License

This project is created for educational purposes as part of Web Technology Final Paper.

---

## 🙏 Acknowledgments

- Built with pure HTML, CSS, and JavaScript
- No external libraries or frameworks
- Designed for exam demonstration
- Beginner-friendly but professional output

---

## 📞 Support

For questions or issues:
- Check browser console for error messages
- Verify all files are in the same directory
- Ensure modern browser is being used
- Review code comments for guidance

---

**Happy Coding! 🚀**
