document.getElementById('restaurantForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const newRestaurant = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant),
        });

        if (response.ok) {
            // Optionally handle a successful response
            window.location.href = '/restaurants'; // Redirect after successful submission
        } else {
            console.error('Error:', response.statusText);
            // Handle error
            alert('Failed to add restaurant. Please try again.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        // Handle fetch error
        alert('An error occurred. Please try again.');
    }
}
