function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
  
    if (name && email && password) {
      alert(`Signing up as ${name} with email: ${email}`);
      // Add signup logic here
    } else {
      alert("Please fill in all fields to signup.");
    }
  }
  
  // Initialize video on page load
  startVideo();
  