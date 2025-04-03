function changeLanguage(language) {
  const elements = {
      'main-title': {
          en: "🌾 Farmer's Portal - Home 🌾",
          mr: "🌾 शेतकरी पोर्टल - मुख्यपृष्ठ 🌾"
      },
      'nav-market': {
          en: "Find Nearby Market",
          mr: "जवळील बाजार शोधा"
      },
      'nav-techniques': {
          en: "Learn New Techniques",
          mr: "नवीन तंत्रे शिका"
      },
      'nav-sell': {
          en: "Sell Product",
          mr: "उत्पादन विक्री"
      },
      'nav-about': {
          en: "About Us",
          mr: "आमच्याबद्दल"
      },
      'nav-faq': {
          en: "FAQs",
          mr: "वारंवार विचारले जाणारे प्रश्न"
      },
      'hero-text': {
          en: "Empowering Farmers Through Technology",
          mr: "तंत्रज्ञानाद्वारे शेतकऱ्यांना सशक्त करणे"
      },
      'hero-desc': {
          en: "Access tools to connect with markets, learn techniques, sell produce, and stay updated with notifications.",
          mr: "बाजारांशी जोडण्यासाठी साधने, तंत्रे शिकण्यासाठी, उत्पादन विकण्यासाठी आणि सूचनांसह अद्ययावत राहण्यासाठी प्रवेश करा."
      },

      'feature1': {
       
              en: "Find Nearby Market",
              mr: "जवळील बाजार शोधा"
         
       },
      'feature2': {
         
              en: "Learn New Techniques",
              mr: "नवीन तंत्रे शिका"
        
      },
      'feature3': {
        
              en: "Sell Product",
              mr: "उत्पादन विक्री"
        
        }, 
        
      'feature4': {
         
              en: "Know New Government Schemes",
              mr: "नवीन सरकारी योजना जाणून घ्या"
         
    },
      'feature5': {
         
              en: "Rent An Instrument",
              mr: "शेतीची अवजारे भाड्याने घ्या"
       
       
      },
    
};


  // Loop through all elements and update text if they exist
  for (const id in elements) {
      let element = document.getElementById(id);
      if (element) {
          element.textContent = elements[id][language];
      }
  }
}

// Logout Functionality
function logoutUser() {
  alert('Logged out successfully!');
  
  // Hide Profile Section
  let profileSection = document.getElementById('profile-info');
  let profileLink = document.getElementById('profile-link');

  if (profileSection) profileSection.style.display = 'none';
  if (profileLink) profileLink.style.display = 'none';
}

// About Section Reveal on Scroll
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");

  if (!aboutSection) return; // Ensure the section exists

  function revealAbout() {
      let sectionPosition = aboutSection.getBoundingClientRect().top;
      let screenPosition = window.innerHeight / 1.2;

      if (sectionPosition < screenPosition) {
          aboutSection.classList.add("visible");
          window.removeEventListener("scroll", revealAbout); // Remove event listener once revealed
      }
  }

  window.addEventListener("scroll", revealAbout);
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const faqs = document.querySelectorAll('.faq');

  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });
});