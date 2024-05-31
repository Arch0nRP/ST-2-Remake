// Disable right-click context menu
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

    // Simple client-side validation for demonstration purposes
    if (username === '😊' && password === '😊') {
        window.location.href = 'webpage2.html'; // Redirect to the videos page
    } else {
        // Display error message
        errorMessage.innerText = 'Incorrect username or password. Hint: Both are smileys.';
        errorMessage.style.display = 'block';
    }
}

// Add event listener for login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
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
                    const videoElement = document.createElement('div');
                    const title = document.createElement('h2');
                    title.innerText = video.title;
                    videoElement.appendChild(title);

                    const videoTag = document.createElement('video');
                    videoTag.width = 320;
                    videoTag.height = 240;
                    videoTag.controls = true;

                    const sourceTag = document.createElement('source');
                    sourceTag.src = `videos/${video.source}`;
                    sourceTag.type = 'video/mp4';

                    videoTag.appendChild(sourceTag);
                    videoElement.appendChild(videoTag);

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
