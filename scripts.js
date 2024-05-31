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

// Event listener for the login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Retrieve the values of the username and password fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the entered username and password match the expected values
    if (username === '😊' && password === '😊') {
        window.location.href = 'webpage2.html'; // Redirect to the videos page
    } else {
        alert('Incorrect username or password. Hint: Both are smileys.');
    }
});

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        // Fetch the video data from the JSON file
        fetch('videos.json')
            .then(response => response.json())
            .then(videos => {
                // For each video, create a new HTML element to display it
                videos.forEach(video => {
                    const videoElement = document.createElement('div');
                    // Use innerText instead of innerHTML to prevent XSS
                    const title = document.createElement('h2');
                    title.innerText = video.title;
                    videoElement.appendChild(title);

                    // Create video element
                    const videoTag = document.createElement('video');
                    videoTag.width = 320;
                    videoTag.height = 240;
                    videoTag.controls = true;

                    // Create source element for video
                    const sourceTag = document.createElement('source');
                    sourceTag.src = `videos/${video.source}`;
                    sourceTag.type = 'video/mp4';

                    videoTag.appendChild(sourceTag);
                    videoElement.appendChild(videoTag);

                    // Append the video element to the container
                    videoContainer.appendChild(videoElement);
                });
            })
            .catch(error => {
                console.error('Error loading videos:', error);
            });
    }
});
