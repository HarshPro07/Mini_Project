document.addEventListener("DOMContentLoaded", () => {
    // Product data for different markets and categories
    const productsData = {
        local: [
            { name: "Tomato", category: "vegetables", price: 20 },
            { name: "Potato", category: "vegetables", price: 15 },
            { name: "Milk", category: "dairy", price: 50 }
        ],
        online: [
            { name: "Tomato", category: "vegetables", price: 25 },
            { name: "Potato", category: "vegetables", price: 18 },
            { name: "Milk", category: "dairy", price: 55 }
        ],
        taluka: [
            { name: "Tomato", category: "vegetables", price: 22 },
            { name: "Potato", category: "vegetables", price: 16 },
            { name: "Milk", category: "dairy", price: 52 }
        ],
        district: [
            { name: "Tomato", category: "vegetables", price: 23 },
            { name: "Potato", category: "vegetables", price: 17 },
            { name: "Milk", category: "dairy", price: 53 }
        ]
    };

    // DOM elements
    const productGrid = document.getElementById("productGrid");
    const marketTypeSelector = document.querySelectorAll(".market-pill");
    const categoryCards = document.querySelectorAll(".category-card");
    const sellProductModal = document.getElementById("sellProductModal");
    const closeModal = document.getElementById("closeModal");
    const sellProductForm = document.getElementById("sellProductForm");
    const noProductsMessage = document.getElementById("noProductsMessage");

    let selectedCategory = null; // Track the selected category

    // Function to display products based on selected market type and category
    function displayProducts(marketType) {
        productGrid.innerHTML = ""; // Clear previous products

        if (productsData[marketType]) {
            const filteredProducts = selectedCategory
                ? productsData[marketType].filter(product => product.category === selectedCategory)
                : productsData[marketType];

            if (filteredProducts.length > 0) {
                filteredProducts.forEach((product) => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("price-card");

                    productCard.innerHTML = `
                        <div class="price-card-header">
                            <h3 class="price-card-title">${product.name}</h3>
                            <p class="price-card-market">Market: ${marketType.charAt(0).toUpperCase() + marketType.slice(1)}</p>
                        </div>
                        <div class="price-card-footer">
                            <span class="price-amount">₹${product.price}</span>
                            <button class="sell-button" data-product="${product.name}" data-price="${product.price}">Sell</button>
                        </div>
                    `;

                    productGrid.appendChild(productCard);
                });

                // Add event listeners to "Sell" buttons
                const sellButtons = document.querySelectorAll(".sell-button"); // Select all sell buttons
                sellButtons.forEach((button) => {
                    button.addEventListener("click", (event) => {
                        const productName = event.target.getAttribute("data-product");
                        const productPrice = event.target.getAttribute("data-price");

                        // Pre-fill the form with product details
                        document.getElementById("productName").value = productName;
                        document.getElementById("productPrice").value = productPrice;

                        // Show the modal
                        sellProductModal.style.display = "flex";
                    });
                });

                noProductsMessage.classList.add("hide"); // Hide "No products" message
            } else {
                noProductsMessage.classList.remove("hide"); // Show "No products" message
            }
        }
    }

    // Handle market type selection
    marketTypeSelector.forEach((pill) => {
        pill.addEventListener("click", (event) => {
            // Remove active class from all pills
            marketTypeSelector.forEach((p) => p.classList.remove("market-pill-active"));

            // Add active class to the clicked pill
            event.target.classList.add("market-pill-active");

            const selectedMarket = event.target.getAttribute("data-market");
            displayProducts(selectedMarket);
        });
    });

    // Handle category selection
    categoryCards.forEach((card) => {
        card.addEventListener("click", (event) => {
            // Remove selected class from all category cards
            categoryCards.forEach((c) => c.classList.remove("selected"));

            // Add selected class to the clicked category card
            event.currentTarget.classList.add("selected");

            // Update the selected category
            selectedCategory = event.currentTarget.getAttribute("data-category");

            // Display products for the currently selected market and category
            const activeMarket = document.querySelector(".market-pill-active").getAttribute("data-market");
            displayProducts(activeMarket);
        });
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        sellProductModal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === sellProductModal) {
            sellProductModal.style.display = "none";
        }
    });

    // Handle form submission
    sellProductForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get form data
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productCategory = selectedCategory || "general";

        // Add the new product to the grid
        const productCard = document.createElement("div");
        productCard.classList.add("price-card");
        productCard.innerHTML = `
            <div class="price-card-header">
                <h3 class="price-card-title">${productName}</h3>
                <p class="price-card-market">Category: ${productCategory}</p>
            </div>
            <div class="price-card-footer">
                <span class="price-amount">₹${productPrice}</span>
            </div>
        `;
        productGrid.appendChild(productCard);

        alert("Product submitted successfully!");
        sellProductModal.style.display = "none"; // Close the modal after submission
        sellProductForm.reset(); // Reset the form fields
    });

    // Display products for the default market type (local) on page load
    displayProducts("local");
});