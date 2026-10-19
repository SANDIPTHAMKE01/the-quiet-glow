
const products = [
    {
        id: 1,
        name: "Sculpted Ceramic Mug",
        category: "Mug",
        description: "Hand-finished · Sand beige",
        price: 1299,
        image: "assets/images/cer1.jpg"
    },
    {
        id: 2,
        name: "Earthy Clay Mug",
        category: "Mug",
        description: "Artisan finish · Everyday rituals",
        price: 599,
        image: "assets/images/cer2.jpg"
    },
    {
        id: 3,
        name: "Sculpted Ceramic Mug",
        category: "Mug",
        description: "Natural texture · Minimal form",
        price: 899,
        image: "assets/images/cer3.jpg"
    },
    {
        id: 4,
        name: "Sculpted Ceramic Mug",
        category: "Mug",
        description: "Warm glow · Sculptural design",
        price: 899,
        image: "assets/images/cer4.jpg"
    },
    {
        id: 5,
        name: "Minimal Ceramic Planter",
        category: "Tableware",
        description: "Soft curves · Neutral glaze",
        price: 749,
        image: "assets/images/cer5.jpg"
    },
    {
        id: 6,
        name: "Plater",
        category: "Ceramics",
        description: "Handmade look · Earthy tones",
        price: 499,
        image: "assets/images/cer6.jpg"
    },
    {
        id: 7,
        name: "Textured Flower Pot",
        category: "Planters",
        description: "Organic form · Timeless finish",
        price: 999,
        image: "assets/images/pot1.jpg"
    },
    {
        id: 8,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/lamp1.jpg"
    },
    {
        id: 9,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/lamp2.jpg"
    },
    {
        id: 10,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/lamp3.jpg"
    },
    {
        id: 11,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/lamp4.jpg"
    },
    {
        id: 12,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/lamp5.jpg"
    },
    {
        id: 13,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/set1.jpg"
    },
    {
        id: 14,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/set2.jpg"
    },
    {
        id: 15,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/set3.jpg"
    },
    {
        id: 16,
        name: "Artisan Table Lamp",
        category: "Lighting",
        description: "Soft ambience · Natural finish",
        price: 2999,
        image: "assets/images/set4.jpg"
    }
];

const CART_KEY = "asterClayCart";
const WISHLIST_KEY = "asterClayWishlist";

function getStored(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function saveStored(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function money(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

function renderProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const wishlist = getStored(WISHLIST_KEY);

    grid.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-image-wrap">
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-category">
                    ${product.category}
                </span>

                <button
                    class="heart-btn ${wishlist.includes(product.id) ? "liked" : ""}"
                    data-heart="${product.id}"
                    aria-label="Toggle ${product.name} in wishlist"
                    aria-pressed="${wishlist.includes(product.id)}"
                    type="button"
                >${wishlist.includes(product.id) ? "♥" : "♡"}</button>
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${money(product.price)}</p>

                <button
                    class="add-cart-btn"
                    data-cart="${product.id}"
                    type="button"
                >Add to Cart &nbsp; →</button>
            </div>
        </article>
    `).join("");

    updateWishlistCount();
}

function updateWishlistCount() {
    const count = document.getElementById("wishlist-count");
    if (count) count.textContent = getStored(WISHLIST_KEY).length;
}

document.addEventListener("click", function (event) {
    const cartButton = event.target.closest("[data-cart]");
    const heartButton = event.target.closest("[data-heart]");

    if (cartButton) {
        const id = Number(cartButton.dataset.cart);
        const cart = getStored(CART_KEY);
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }

        saveStored(CART_KEY, cart);
        window.location.href = "cart.html";
    }

    if (heartButton) {
        const id = Number(heartButton.dataset.heart);
        let wishlist = getStored(WISHLIST_KEY);

        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(itemId => itemId !== id);
        } else {
            wishlist.push(id);
        }

        saveStored(WISHLIST_KEY, wishlist);

        if (document.getElementById("product-grid")) {
            renderProducts();
        } else if (typeof renderWishlist === "function") {
            renderWishlist();
        }
    }
});

renderProducts();
