const techniquesData = {
    crop: [
        { 
            name: "Organic Farming", 
            description: "A method of farming that uses natural fertilizers and avoids synthetic chemicals. Organic farming helps preserve soil health, reduces water pollution, and enhances biodiversity.",
            image: "https://example.com/organic-farming.jpg",
            video: "https://www.youtube.com/watch?v=TX1x5hY5mqk"
        },
        { 
            name: "Drip Irrigation", 
            description: "A water-efficient irrigation technique that provides water directly to plant roots. It conserves water, reduces weed growth, and improves crop yields.",
            image: "https://example.com/drip-irrigation.jpg",
            video: "https://www.youtube.com/watch?v=example1"
        }
    ],
    soil: [
        { 
            name: "Soil Testing", 
            description: "A process that helps farmers analyze nutrient levels in soil to optimize crop growth. It ensures proper fertilizer use, reduces soil degradation, and improves productivity.",
            image: "https://example.com/soil-testing.jpg",
            video: "https://www.youtube.com/watch?v=example2"
        }
    ]
};

// Function to display techniques (sub-categories) when a main category is clicked
function showTechniques(category) {
    const techniquesDiv = document.getElementById('techniques');
    techniquesDiv.innerHTML = ""; // Clear previous content
    techniquesDiv.classList.add("techniques-grid");

    if (techniquesData[category]) {
        techniquesData[category].forEach(technique => {
            // Create a card for each technique
            const techniqueCard = document.createElement('div');
            techniqueCard.classList.add('technique-card');
            techniqueCard.onclick = () => showTechniqueDetails(technique, category);

            // Add image
            const img = document.createElement('img');
            img.src = technique.image;
            img.alt = technique.name;

            // Add name
            const name = document.createElement('h3');
            name.textContent = technique.name;

            // Add description
            const desc = document.createElement('p');
            desc.textContent = technique.description.substring(0, 100) + "...";

            // Append elements
            techniqueCard.appendChild(img);
            techniqueCard.appendChild(name);
            techniqueCard.appendChild(desc);

            // Add to container
            techniquesDiv.appendChild(techniqueCard);
        });
    }

    // Store the current category
    document.getElementById('techniques').setAttribute('data-category', category);
}

// Function to show technique details and hide sub-categories
function showTechniqueDetails(technique, category) {
    // Hide sub-category (techniques) and only keep main category visible
    document.getElementById('techniques').style.display = 'none';

    // Show technique details
    const iframeContainer = document.getElementById('iframe-container');
    iframeContainer.style.display = 'flex';
    document.getElementById('tech-image').src = technique.image;
    document.getElementById('tech-name').textContent = technique.name;
    document.getElementById('tech-description').textContent = technique.description;
    document.getElementById('tech-video').href = technique.video;

    // Create a back button at the bottom
    const backButton = document.createElement('button');
    backButton.textContent = "Back";
    backButton.classList.add('back-button');
    backButton.onclick = () => goBackToSubCategory(category);

    // Remove existing back button (if any) and add new one
    const existingBackButton = document.querySelector('.back-button');
    if (existingBackButton) {
        existingBackButton.remove();
    }
    iframeContainer.appendChild(backButton);
}

// Function to go back to sub-category selection
function goBackToSubCategory(category) {
    document.getElementById('techniques').style.display = 'flex'; // Show sub-categories again
    document.getElementById('iframe-container').style.display = 'none'; // Hide technique details

    // Refresh techniques list
    showTechniques(category);
}

// Attach event listeners to main category buttons
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function() {
        const selectedCategory = this.getAttribute('data-category');
        showTechniques(selectedCategory);
        document.getElementById('iframe-container').style.display = 'none'; // Hide details when a new category is selected
        document.getElementById('techniques').style.display = 'flex';
    });
});
