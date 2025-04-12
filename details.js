document.addEventListener("DOMContentLoaded", () => {
    // Get the technique name from the query parameter
    const params = new URLSearchParams(window.location.search);
    const techniqueName = params.get("name");

    // Data for techniques grouped by category
    const techniquesData = {
        crop: [
            {
                name: "Crop Rotation",
                description: "Crop rotation is a farming practice that involves growing different types of crops in the same area in sequential seasons. It helps improve soil fertility and reduce pests.",
                image: "https://source.unsplash.com/800x400/?crop-rotation",
                videos: [
                    {
                        title: "Crop Rotation Basics",
                        description: "Learn the basics of crop rotation and its benefits for sustainable farming.",
                        thumbnail: "https://img.youtube.com/vi/example1/0.jpg",
                        url: "https://www.youtube.com/watch?v=example1"
                    },
                    {
                        title: "Benefits of Crop Rotation",
                        description: "Explore the advantages of crop rotation for soil health and pest control.",
                        thumbnail: "https://img.youtube.com/vi/example2/0.jpg",
                        url: "https://www.youtube.com/watch?v=example2"
                    }
                ],
                courses: [
                    {
                        title: "Crop Rotation Techniques",
                        description: "A comprehensive course on crop rotation.",
                        platform: "Coursera",
                        url: "https://www.coursera.org/learn/crop-rotation"
                    },
                    {
                        title: "Sustainable Farming Practices",
                        description: "Learn sustainable farming techniques, including crop rotation.",
                        platform: "edX",
                        url: "https://www.edx.org/course/sustainable-farming"
                    }
                ]
            },
            {
                name: "Intercropping",
                description: "Intercropping is the practice of growing two or more crops together in proximity. It helps maximize the use of resources and improve crop yield.",
                image: "https://source.unsplash.com/800x400/?intercropping",
                videos: [
                    {
                        title: "Intercropping Techniques",
                        description: "Learn about different intercropping techniques and their applications.",
                        thumbnail: "https://img.youtube.com/vi/example3/0.jpg",
                        url: "https://www.youtube.com/watch?v=example3"
                    },
                    {
                        title: "Advantages of Intercropping",
                        description: "Discover the benefits of intercropping for sustainable agriculture.",
                        thumbnail: "https://img.youtube.com/vi/example4/0.jpg",
                        url: "https://www.youtube.com/watch?v=example4"
                    }
                ],
                courses: [
                    {
                        title: "Intercropping for Beginners",
                        description: "Learn the basics of intercropping.",
                        platform: "Udemy",
                        url: "https://www.udemy.com/course/intercropping-basics"
                    },
                    {
                        title: "Advanced Intercropping Techniques",
                        description: "Master advanced intercropping methods.",
                        platform: "FutureLearn",
                        url: "https://www.futurelearn.com/courses/intercropping"
                    }
                ]
            }
        ]
        // Add more categories and techniques here...
    };

    // Find the current technique and category
    let currentCategory = null;
    let currentTechnique = null;

    Object.keys(techniquesData).forEach(category => {
        const technique = techniquesData[category].find(t => t.name === techniqueName);
        if (technique) {
            currentCategory = category;
            currentTechnique = technique;
        }
    });

    if (currentTechnique) {
        // Set the title, image, and description
        document.getElementById("technique-title").textContent = currentTechnique.name;
        document.getElementById("technique-image").src = currentTechnique.image;
        document.getElementById("technique-description").textContent = currentTechnique.description;

        // Add YouTube video links
        const videoLinks = document.getElementById("video-links");
        currentTechnique.videos.forEach(video => {
            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");
            videoCard.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                    <a href="${video.url}" target="_blank" class="watch-button">Watch on YouTube</a>
                </div>
            `;
            videoLinks.appendChild(videoCard);
        });

        // Add course links
        const courseLinks = document.getElementById("course-links");
        currentTechnique.courses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            courseCard.innerHTML = `
                <img src="${course.thumbnail}" alt="${course.title}">

                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><strong>Platform:</strong> ${course.platform}</p>
                    <a href="${course.url}" target="_blank" class="enroll-button">Enroll Now</a>
                </div>
            `;
            courseLinks.appendChild(courseCard);
        });

        // Add "More Like This" section
        const moreLikeThis = document.getElementById("related-techniques");
        techniquesData[currentCategory].forEach(technique => {
            if (technique.name !== currentTechnique.name) { // Exclude the current technique
                const relatedCard = document.createElement("div");
                relatedCard.classList.add("related-technique-card");
                relatedCard.innerHTML = `
                    <h3>${technique.name}</h3>
                    <p>${technique.description}</p>
                    <a href="details.html?name=${encodeURIComponent(technique.name)}" class="view-details-button">View Details</a>
                `;
                moreLikeThis.appendChild(relatedCard);
            }
        });
    } else {
        // If the technique is not found, display an error message
        document.getElementById("technique-title").textContent = "Technique Not Found";
        document.getElementById("technique-description").textContent = "The technique you are looking for does not exist.";
    }
});