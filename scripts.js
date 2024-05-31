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

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Simple client-side validation for demonstration purposes
    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'webpage2.html'; // Redirect to the
