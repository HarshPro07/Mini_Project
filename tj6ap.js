document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category-card"); // Ensure categories are selected
    const techniquesGrid = document.querySelector(".techniques-grid");
    const techniquesSection = document.getElementById("techniques");
    const searchBox = document.getElementById("searchBox"); // Search bar

    // Slider functionality for Trending Technologies
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = "none";
        });

        // Show the current slide
        slides[index].style.display = "block";
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
        showSlide(currentSlide);
    }

    // Initialize the slider
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 3000); // Automatically change slides every 3 seconds
    }

    // Data for techniques under each category
    const techniquesData = {
        crop: [
            {
                name: "Crop Rotation",
                description: "A method to improve soil fertility and reduce pests.",
                image: ""
            },
            {
                name: "Intercropping",
                description: "Growing two or more crops together for better yield.",
                image: "https://source.unsplash.com/200x200/?intercropping"
            }
        ],
        soil: [
            {
                name: "Soil Testing",
                description: "Analyze soil nutrients to optimize crop growth.",
                image: "https://source.unsplash.com/200x200/?soil-testing"
            },
            {
                name: "Terrace Farming",
                description: "Prevent soil erosion on slopes with terrace farming.",
                image: "https://source.unsplash.com/200x200/?terrace-farming"
            }
        ],
        pest: [
            {
                name: "Integrated Pest Management",
                description: "A sustainable approach to managing pests.",
                image: "https://source.unsplash.com/200x200/?pest-management"
            },
            {
                name: "Biological Control",
                description: "Use natural predators to control pests.",
                image: "https://source.unsplash.com/200x200/?biological-control"
            }
        ],
        livestock: [
            {
                name: "Dairy Farming",
                description: "Efficient management of dairy animals for milk production.",
                image: "https://source.unsplash.com/200x200/?dairy-farming"
            },
            {
                name: "Poultry Farming",
                description: "Raising birds for eggs and meat production.",
                image: "https://source.unsplash.com/200x200/?poultry-farming"
            }
        ],
        agroforestry: [
            {
                name: "Silvopasture",
                description: "Combine forestry and grazing for sustainable farming.",
                image: "https://source.unsplash.com/200x200/?silvopasture"
            },
            {
                name: "Alley Cropping",
                description: "Grow crops between rows of trees for better yield.",
                image: "https://source.unsplash.com/200x200/?alley-cropping"
            }
        ],
        smart: [
            {
                name: "Precision Agriculture",
                description: "Use technology to optimize farming practices.",
                image: "https://source.unsplash.com/200x200/?precision-agriculture"
            },
            {
                name: "Drone Technology",
                description: "Monitor crops and livestock with drones.",
                image: "https://source.unsplash.com/200x200/?drone-technology"
            }
        ]
    };

    // Function to display techniques for a selected category
    function displayTechniques(category) {
        techniquesGrid.innerHTML = ""; // Clear previous techniques
        techniquesSection.classList.remove("hidden"); // Show the techniques section

        if (techniquesData[category]) {
            techniquesData[category].forEach(technique => {
                const card = document.createElement("div");
                card.classList.add("technique-card");
                card.innerHTML = `
                    <img src="${technique.image}" alt="${technique.name}">
                    <h3>${technique.name}</h3>
                    <p>${technique.description}</p>
                `;
                card.addEventListener("click", () => {
                    window.location.href = `details.html?name=${encodeURIComponent(technique.name)}`;
                });
                techniquesGrid.appendChild(card);
            });
        } else {
            console.error("No data found for category:", category); // Log error if category data is missing
        }
    }

    // Add click event listeners to category cards
    if (categories.length > 0) {
        categories.forEach(category => {
            category.addEventListener("click", () => {
                const selectedCategory = category.dataset.category;
                if (selectedCategory) {
                    displayTechniques(selectedCategory);
                    techniquesSection.scrollIntoView({ behavior: "smooth" }); // Scroll to techniques section
                } else {
                    console.error("Category data-category attribute is missing or invalid.");
                }
            });
        });
    } else {
        console.error("No categories found in the DOM.");
    }

    // Search functionality
    searchBox.addEventListener("input", () => {
        const searchTerm = searchBox.value.toLowerCase();

        categories.forEach(category => {
            const categoryName = category.querySelector("h3").textContent.toLowerCase();
            const categoryDescription = category.querySelector("p").textContent.toLowerCase();

            // Check if the search term matches the category name or description
            if (categoryName.includes(searchTerm) || categoryDescription.includes(searchTerm)) {
                category.style.display = "block"; // Show matching categories
            } else {
                category.style.display = "none"; // Hide non-matching categories
            }
        });
    });
});