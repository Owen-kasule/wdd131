document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images for small screens
    const preloadImages = [
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    ];

    preloadImages.forEach(url => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
    });

    // Hamburger menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('visible');
        menuToggle.textContent = nav.classList.contains('visible') ? '✕' : '☰';
    });

    // Update current year and last modified date
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // Temple data
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Salt Lake Utah",
            location: "Salt Lake City, Utah, United States",
            dedicated: "1893, April, 6",
            area: 253015,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
        },
        {
            templeName: "Provo City Center",
            location: "Provo, Utah, United States",
            dedicated: "2016, March, 20",
            area: 85760,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/2018/400x250/Provo-City-Center-Temple01.jpg"
        },
        {
            templeName: "Nairobi Kenya Temple",
            location: "Nairobi, Kenya, Africa",
            dedicated: "2024, March, 3",
            area: 19184,
            imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-20358-main.jpg"
        }
    ];

    // Render temples dynamically
    const renderTemples = (temples) => {
        const gallery = document.getElementById("temple-gallery");
        gallery.innerHTML = ""; // Clear current content

        const isSmallScreen = window.innerWidth <= 768; // Detect small screens

        temples.forEach((temple, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img 
                    src="${temple.imageUrl}" 
                    alt="${temple.templeName}" 
                    loading="${isSmallScreen && index === 0 ? 'eager' : 'lazy'}" 
                    width="400" 
                    height="250"> <!-- Explicit dimensions to prevent layout shifts -->
                <div class="caption">
                    <h3>${temple.templeName}</h3>
                    <p><strong>Location:</strong> ${temple.location}</p>
                    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                    <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
                </div>
            `;
            gallery.appendChild(card);
        });
    };

    // Filter temples based on criteria
    const filterTemples = (criteria) => {
        let filteredTemples = temples;

        if (criteria === "old") {
            filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900);
        } else if (criteria === "new") {
            filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000);
        } else if (criteria === "large") {
            filteredTemples = temples.filter(temple => temple.area > 90000);
        } else if (criteria === "small") {
            filteredTemples = temples.filter(temple => temple.area < 10000);
        }

        renderTemples(filteredTemples);
    };

    // Event listeners for navigation links
    document.getElementById("home").addEventListener("click", () => renderTemples(temples));
    document.getElementById("old").addEventListener("click", () => filterTemples("old"));
    document.getElementById("new").addEventListener("click", () => filterTemples("new"));
    document.getElementById("large").addEventListener("click", () => filterTemples("large"));
    document.getElementById("small").addEventListener("click", () => filterTemples("small"));

    // Initial render of all temples
    renderTemples(temples);
});