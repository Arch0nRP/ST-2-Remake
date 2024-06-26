// Disable right-click context menu to prevent inspecting elements
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Disable certain key combinations to prevent opening developer tools
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === 'u' || event.key === 's' || event.key === 'i' || event.key === 'j' || event.key === 'c')) {
        event.preventDefault();
    }
    if (event.key === 'F12') {
        event.preventDefault();
    }
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Retrieve the values of the username and password fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Validate credentials
    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'webpage2.html'; // Redirect to the videos page
    } else {
        // Display error message
        errorMessage.innerText = 'Incorrect username or password.';
        errorMessage.style.display = 'block';
    }
}

// Function to handle sign up
function handleSignUp(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Retrieve the values of the new username and password fields
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const signupMessage = document.getElementById('signup-message');

    // Store the credentials in localStorage
    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    // Display success message and redirect to login page after a short delay
    signupMessage.innerText = 'Sign up successful! Redirecting to login page...';
    signupMessage.style.color = 'green';
    signupMessage.style.display = 'block';

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Add event listener for login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

// Add event listener for signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', handleSignUp);
}

// Function to load videos
function loadVideos() {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        // Fetch the video data from the JSON file
        fetch('videos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(videos => {
                videos.forEach(video => {
                    // Create a div element for each video
                    const videoElement = document.createElement('div');
                    // Create and append title
                    const title = document.createElement('h2');
                    title.innerText = video.title;
                    videoElement.appendChild(title);

                    // Create and append video element
                    const videoTag = document.createElement('video');
                    videoTag.width = 320;
                    videoTag.height = 240;
                    videoTag.controls = true;

                    // Create and append source element
                    const sourceTag = document.createElement('source');
                    sourceTag.src = `videos/${video.source}`;
                    sourceTag.type = 'video/mp4';

                    videoTag.appendChild(sourceTag);
                    videoElement.appendChild(videoTag);

                    // Append videoElement to the videoContainer
                    videoContainer.appendChild(videoElement);
                });
            })
            .catch(error => {
                console.error('Error loading videos:', error);
                videoContainer.innerText = 'Failed to load videos. Please try again later.';
            });
    }
}

// Load videos when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadVideos);
