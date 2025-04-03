
  document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather Icons
  feather.replace();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile');
  const menuIcon = menuToggle.querySelector('[data-feather]');
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    
    if (mobileMenu.classList.contains('open')) {
      menuIcon.setAttribute('data-feather', 'x');
    } else {
      menuIcon.setAttribute('data-feather', 'menu');
    }
    
    // Re-initialize icons after changing
    feather.replace();
  });
  
  // Tabs functionality
  const tabs = document.querySelectorAll('.tab');
  const schemesGrids = document.querySelectorAll('.schemes-grid');
  const currentSchemeType = document.querySelector('.current-scheme-type');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get the tab value
      const tabValue = tab.getAttribute('data-tab');
      
      // Update current scheme type text
      if (currentSchemeType) {
        currentSchemeType.textContent = tabValue.charAt(0).toUpperCase() + tabValue.slice(1);
      }
      
      // Hide all scheme grids
      schemesGrids.forEach(grid => grid.classList.remove('active'));
      
      // Show the corresponding grid
      document.getElementById(tabValue + '-schemes').classList.add('active');
      
      // Render schemes for the active tab
      renderSchemes(tabValue);
    });
  });
  
  // Render schemes function
  function renderSchemes(type) {
    const grid = document.getElementById(type + '-schemes');
    grid.innerHTML = '';
    
    schemes[type].forEach(scheme => {
      const schemeCard = document.createElement('div');
      schemeCard.className = 'scheme-card';
      
      schemeCard.innerHTML = `
        <div class="scheme-image">
          <img src="${scheme.image}" alt="${scheme.title}">
          <div class="scheme-image-overlay"></div>
          <div class="scheme-image-content">
            <div class="scheme-category">${scheme.category}</div>
            <h3 class="scheme-title">${scheme.title}</h3>
          </div>
        </div>
        <div class="scheme-content">
          <p class="scheme-description">${scheme.description}</p>
          <div class="scheme-meta">
            <div class="scheme-meta-item">
              <i data-feather="calendar"></i>
              <span>Deadline: ${scheme.deadline}</span>
            </div>
            <div class="scheme-meta-item">
              <i data-feather="map-pin"></i>
              <span>${scheme.region}</span>
            </div>
          </div>
          <button class="scheme-button">
            View Details
            <i data-feather="arrow-right"></i>
          </button>
        </div>
      `;
      
      grid.appendChild(schemeCard);
    });
    
    // Re-initialize feather icons after adding new content
    feather.replace();
  }
  
  // Initialize first tab
  renderSchemes('national');
  
  // Eligibility Checker Form Steps
  const steps = document.querySelectorAll('.eligibility-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const stepIndicators = document.querySelectorAll('.step');
  
  // Initialize form data object
  let formData = {
    state: '',
    district: '',
    landSize: '',
    landOwnership: '',
    farmerCategory: '',
    crop: ''
  };
  
  // Current step (1-based)
  let currentStep = 1;
  
  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Save data from current step
      if (currentStep === 1) {
        formData.state = document.getElementById('state').value;
        formData.district = document.getElementById('district').value;
      } else if (currentStep === 2) {
        formData.landSize = document.getElementById('landSize').value;
        
        const landOwnershipRadios = document.querySelectorAll('input[name="landOwnership"]');
        landOwnershipRadios.forEach(radio => {
          if (radio.checked) {
            formData.landOwnership = radio.value;
          }
        });
        
        formData.farmerCategory = document.getElementById('farmerCategory').value;
      }
      
      // Move to next step if not already at the last step
      if (currentStep < 3) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep].classList.add('active');
        
        stepIndicators[currentStep - 1].classList.remove('active');
        stepIndicators[currentStep].classList.add('active');
        
        currentStep++;
      }
    });
  });
  
  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Move to previous step if not already at the first step
      if (currentStep > 1) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep - 2].classList.add('active');
        
        stepIndicators[currentStep - 1].classList.remove('active');
        stepIndicators[currentStep - 2].classList.add('active');
        
        currentStep--;
      }
    });
  });
  
  // Find schemes button click handler
  const findSchemesButton = document.getElementById('find-schemes');
  if (findSchemesButton) {
    findSchemesButton.addEventListener('click', () => {
      // Save data from the last step
      formData.crop = document.getElementById('crop').value;
      
      // Here you would typically send this data to a server
      // For demo purposes, just log the data to console
      console.log('Eligibility Form Data:', formData);
      
      // Show a simple alert for demonstration
      alert('Based on your information, we found 5 schemes you may be eligible for. In a real application, we would show you these schemes or redirect you to a results page.');
    });
  }
  
  // Animate elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .eligibility-content, .eligibility-form-container');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Initialize scroll animations if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    animateOnScroll();
  }
});