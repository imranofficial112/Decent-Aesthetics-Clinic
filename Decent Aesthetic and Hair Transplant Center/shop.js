// Shop Data and Logic
const products = [
    { id: 1, name: "Hair Growth Serum", price: 89.99, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400", desc: "Clinically proven formula with Biotin and Peptides to stimulate follicle growth." },
    { id: 2, name: "Anti Hair Fall Shampoo", price: 45.00, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400", desc: "Strengthening shampoo with Caffeine and Keratin to reduce breakage." },
    { id: 3, name: "Beard Growth Oil", price: 55.00, image: "https://images.unsplash.com/photo-1621503855523-28f41165e3ed?auto=format&fit=crop&q=80&w=400", desc: "Nourishes the underlying skin and promotes a thicker, fuller beard." },
    { id: 4, name: "Vitamin C Serum", price: 75.00, image: "https://images.unsplash.com/photo-1615397323136-2391bdeee85d?auto=format&fit=crop&q=80&w=400", desc: "High-potency antioxidant serum for brightening and anti-aging." },
    { id: 5, name: "Sunscreen SPF 50", price: 38.00, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400", desc: "Broad-spectrum protection without the white cast. Perfect for post-treatment." },
    { id: 6, name: "Anti Acne Gel", price: 42.00, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400", desc: "Targeted spot treatment with Salicylic Acid to quickly clear blemishes." },
    { id: 7, name: "Hyaluronic Acid Serum", price: 68.00, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400", desc: "Intense hydration formula to plump skin and smooth fine lines." }
];

let cart = JSON.parse(localStorage.getItem('clinicCart')) || [];

function renderProducts() {
    const grid = document.getElementById('productList');
    if (!grid) return;

    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card fade-in';
        div.innerHTML = `
            <div class="product-img-container">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-outline btn-sm" style="color:var(--navy); border-color:var(--navy);" onclick="addToCart(${p.id})">Add to Cart</button>
                    <button class="btn btn-gold btn-sm" onclick="buyNow(${p.id})">Buy Now</button>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });
}

function updateCartUI() {
    const countSpans = document.querySelectorAll('.cart-count');
    const panelCountSpan = document.getElementById('panelCartCount');
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotalText');
    const modalTotal = document.getElementById('modalTotal');

    let totalItems = 0;
    let totalPrice = 0;

    if (container) container.innerHTML = '';

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        if (container) {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    <span class="remove-item" onclick="removeFromCart(${index})">Remove</span>
                </div>
            `;
            container.appendChild(div);
        }
    });

    countSpans.forEach(span => span.textContent = totalItems);
    if (panelCountSpan) panelCountSpan.textContent = totalItems;
    if (totalEl) totalEl.textContent = `$${totalPrice.toFixed(2)}`;
    if (modalTotal) modalTotal.textContent = `$${totalPrice.toFixed(2)}`;

    localStorage.setItem('clinicCart', JSON.stringify(cart));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    document.getElementById('cartPanel').classList.add('open');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function buyNow(id) {
    addToCart(id);
    document.getElementById('cartPanel').classList.add('open');
}

// Cart Panel Toggles
document.addEventListener('DOMContentLoaded', () => {
    // Icons
    const cartIcon = document.getElementById('cartIcon');
    const navCartIcon = document.getElementById('navCartIcon');
    const cartPanel = document.getElementById('cartPanel');
    const closeCart = document.getElementById('closeCart');

    if (cartIcon && cartPanel) {
        cartIcon.addEventListener('click', () => cartPanel.classList.add('open'));
    }
    if (navCartIcon && cartPanel) {
        navCartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartPanel.classList.add('open');
        });
    }
    if (closeCart && cartPanel) {
        closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));
    }

    renderProducts();
    updateCartUI();
});

function openPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment(event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your order.");
    cart = [];
    updateCartUI();
    closePayment();
    document.getElementById('cartPanel').classList.remove('open');
}

function trackOrder() {
    const trackId = document.getElementById('trackId').value.trim();
    const result = document.getElementById('trackResult');
    if (trackId === "") {
        result.innerHTML = "<span style='color:red;'>Please enter a tracking number.</span>";
        return;
    }

    result.innerHTML = `Tracking Order <b style='color:-var(--gold);'>${trackId}</b>...`;

    setTimeout(() => {
        const statuses = ["Processing at dispatch center", "In transit to destination", "Out for delivery", "Delivered safely"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        result.innerHTML = `Status: <b style='color:var(--navy);'>${randomStatus}</b>`;
    }, 1500);
}
