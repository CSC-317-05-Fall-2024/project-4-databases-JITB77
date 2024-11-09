
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    // Header element
    header.innerHTML = `
        <div class="location">
            <img class="location-img" src="/public/images/sfphoto.jpg" alt="">
            <p class="location-name">San Francisco</p>
        </div>
    `;

    // Nav element
    nav.innerHTML = `
        <div class="header">
            <div class="header-item">
                <a href="/">Home</a>
            </div>
            <div class="header-item">
                <a href="/attractions">Attractions</a>
            </div>
            <div class="header-item">
                <a href="/restaurants">Restaurants</a>
            </div>
            <div class="header-item">
                <a href="/restaurantsform">New Restaurant</a>
            </div>
        </div>
    `;

    // Footer element
    footer.innerHTML = `
        <div class="footer">
            <p>Contact info: Aabdikarimov@sfsu.edu</p>
        </div>
    `;
});
