// Function to render restaurant cards
const renderRestaurantCards = (restaurants) => {
    const container = document.querySelector('.main-rest-container');
    container.innerHTML = ''; // Clear existing cards

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'main-rest-item';
        card.id = `card-${restaurant.id}`; // Set ID for easy access

        // Ensure correct property names are used based on your DB
        card.innerHTML = `
            <a href="/restaurants/${restaurant.id}" class="restaurant-link">
                <img src="${restaurant.photo}" alt="${restaurant.name}">
                <p>${restaurant.name}</p>
                <p>${restaurant.adress}</p>
                <p>${restaurant.phone}</p>
            </a>
            <button class="delete-btn" data-id="${restaurant.id}">X</button>
        `;

        container.appendChild(card);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent default action of the button
            const restaurantId = event.target.getAttribute('data-id');
            const deleted = await deleteRestaurant(restaurantId);
            if (deleted) {
                window.location.href = '/restaurants'; // Navigate to the restaurants page after deletion
            }
        });
    });
};

// Function to delete a restaurant
const deleteRestaurant = async (id) => {
    try {
        const response = await fetch(`/api/restaurants/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the restaurant');
        }
        console.log(`Restaurant with ID ${id} deleted successfully.`);
        return true; // Return true to indicate successful deletion
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
};

// Function to fetch and render restaurants
const fetchAndRenderRestaurants = async () => {
    try {
        const response = await fetch('/api/restaurants');
        const restaurants = await response.json();
        console.log('Fetched restaurants:', restaurants);
        renderRestaurantCards(restaurants); // Render the updated list
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
};

// Initial fetch and render
fetchAndRenderRestaurants();
