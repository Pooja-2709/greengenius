// Global variable to store permission data
let userPermissions = null;

document.addEventListener('DOMContentLoaded', () => {
    username = localStorage.getItem("username")
    const greetingMessage = `Hello, ${username}! Welcome.`;

    // Get the greeting container and message element
    const greetingContainer = document.getElementById("greeting-container");
    const greetingMessageElement = document.getElementById("greeting-message");

    // Set the greeting message
    greetingMessageElement.textContent = greetingMessage;

    // Show the greeting container
    greetingContainer.style.display = "block";

    // Automatically close after 5 seconds
    setTimeout(() => {
        greetingContainer.style.display = "none";
    }, 7000);
});
// Fetch user permissions when the page loads
fetchUserPermissions();

// Function to fetch user permissions from the backend
function fetchUserPermissions() {
    const userId = localStorage.getItem("userid");
   
    fetch(`http://127.0.0.1:8000/get_permission/${userId}`)
        .then(response => response.json())
        .then(data => {
            userPermissions = data.data;
            // Example: Open the 'electric-tab' based on userPermissions
            showTabsBasedOnPermissions();
        })
        .catch(error => console.error('Error fetching user permissions:', error));
}

// Function to check permission for a specific tab
function checkPermissionFromBackend(tabName) {
    // Check if userPermissions is available
    if (!userPermissions) {
        console.error('User permissions not available.');
        return false;
    }

    // Check permission for the given tab
    return userPermissions[tabName.toLowerCase()] === true;
}

// Function to show or hide tabs based on permission status
function showTabsBasedOnPermissions() {
    const tabNames = ["electric", "water", "weather"];
    tabNames.forEach(tabName => {
        const hasPermission = checkPermissionFromBackend(tabName);
        const tabButton = document.getElementById(`${tabName}-tab`);

        if (hasPermission) {
            tabButton.style.display = 'block';  // Show the tab button
        } else {
            tabButton.classList.remove('no-permission');  // Remove the no-permission class
        }
    });
}

// Function to open a tab and show a message if no permission
function openTab(tabName) {
    // Check permission from the backend for the given tab
    const hasPermission = checkPermissionFromBackend(tabName);

    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-pane');
    tabContents.forEach(content => content.classList.remove('active'));

    // Show the selected tab content or display a message
    const tabContentElement = document.getElementById(`${tabName}-content`);
    const tabButton = document.getElementById(`${tabName}-tab`);

    if (hasPermission) {
        tabContentElement.classList.add('active');
    } else {
        // Display the "No Permission" message only if the tab button is clicked
        const message = `You do not have permission to access the ${tabName} tab.`;
        displayCustomAlert(message);
        tabButton.classList.add('no-permission');  // Add a class to style the tab button differently
    }
}

// Function to display a custom alert message
function displayCustomAlert(message) {
    const alertModal = document.getElementById('customAlertModal');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertModal.style.display = 'flex';
}

// Function to close the custom alert modal
function closeAlertModal() {
    const alertModal = document.getElementById('customAlertModal');
    alertModal.style.display = 'none';
}

function simulateUserLogin() {
    // Get the treeDiv element
    const treeDiv = document.getElementById('treeDiv');

    // Display the treeDiv
    treeDiv.classList.remove('hidden');

    // You can customize the greeting message based on the user's information
    const greetingMessage = `"Hello, Abhishek 🌲 Let's grow a better world together."`;

    // Set the greeting message
    const greetingElement = document.getElementById('greeting');
    greetingElement.textContent = greetingMessage;

    // Automatically close the treeDiv after 5 seconds
    setTimeout(() => {
        treeDiv.classList.add('hidden');
    }, 3000); // 5000 milliseconds (5 seconds)
}
