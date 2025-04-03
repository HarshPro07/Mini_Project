// login.js
const video = document.getElementById("video");

// Function to start the video and load face-api models
async function startVideo() {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error("Error accessing webcam: ", err)
    );
  } catch (error) {
    console.error("Error loading face-api models: ", error);
  }
}

// Event listener for video play (Face detection)
video.addEventListener('play', async () => {
  try {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
    if (detections.length > 0) {
      alert("Face detected! Logging in...");
      // Add functionality to auto-login or process user authentication here
    }
  } catch (error) {
    console.error("Error detecting faces: ", error);
  }
});

// Function to display the login form
function showLoginForm() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

// Function to display the signup form
function showSignupForm() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
}

// Function to change language dynamically
const translations = {
  en: { loginHeader: "Login", signupHeader: "Signup" },
  hi: { loginHeader: "लॉग इन करें", signupHeader: "साइन अप करें" },
  mr: { loginHeader: "लॉगिन", signupHeader: "नोंदणी करा" },
};

function changeLanguage() {
  const lang = document.getElementById("language").value;
  document.getElementById("loginHeader").innerText = translations[lang].loginHeader;
  document.getElementById("signupHeader").innerText = translations[lang].signupHeader;
}

// Placeholder login functionality
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    alert(`Logging in with email: ${email}`);
    // Add authentication logic here
  } else {
    alert("Please fill in all fields to login.");
  }
}

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



