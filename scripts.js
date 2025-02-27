document.addEventListener('DOMContentLoaded', function () {

    const homeLink = document.getElementById('homeLink');
    const reportLink = document.getElementById('reportLink');
    const searchLink = document.getElementById('searchLink');
    const aboutLink = document.getElementById('aboutLink');
    const contactLink = document.getElementById('contactLink');


    const homeSection = document.getElementById('homeSection');
    const reportSection = document.getElementById('reportSection');
    const searchSection = document.getElementById('searchSection');
    const aboutSection = document.getElementById('aboutSection');
    const contactSection = document.getElementById('contactSection');


    const reportForm = document.getElementById('reportForm');
    const searchButton = document.getElementById('searchButton');
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    const keywordSearch = document.getElementById('keywordSearch');
    const dateSearch = document.getElementById('dateSearch');
    const categorySearch = document.getElementById('categorySearch');
    const getLocationBtn = document.getElementById('getLocationBtn');


    homeLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(homeSection);
    });
    reportLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(reportSection);
    });
    searchLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(searchSection);
    });
    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(aboutSection);
    });
    contactLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(contactSection);
    });

    function showSection(section) {
        const allSections = document.querySelectorAll('main section');
        allSections.forEach(sec => sec.classList.remove('active'));
        section.classList.add('active');
        window.scrollTo(0, 0);
    }


    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemType = document.getElementById('itemType').value;
        const itemName = document.getElementById('itemName').value;
        const itemDescription =
            document.getElementById('itemDescription').value;
        const itemLocation = document.getElementById('itemLocation').value;
        const userEmail = document.getElementById('userEmail').value;

        const newItem = {
            type: itemType,
            name: itemName,
            description: itemDescription,
            location: itemLocation,
            email: userEmail,
            date: new Date().toISOString().split('T')[0]
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));

        alert('Item reported successfully!');
        reportForm.reset();
        showSection(homeSection);
    });


    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim().toLowerCase();
        searchItems({ keyword: query });
    });


    advancedSearchBtn.addEventListener('click', function () {
        const keyword = keywordSearch.value.trim().toLowerCase();
        const date = dateSearch.value;
        const category = categorySearch.value;
        searchItems({ keyword, date, category });
    });


    function searchItems({ keyword, date, category }) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const results = items.filter(item => {
            let match = true;

            if (keyword) {
                match = item.name.toLowerCase().includes(keyword) ||
                        item.description.toLowerCase().includes(keyword);
            }

            if (match && date) {
                match = item.date === date;
            }

            if (match && category) {
                match = item.type === category;
            }

            return match;
        });

        displaySearchResults(results);
        showSection(searchSection);
    }


    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No items found.</p>';
            return;
        }

        results.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');

            itemCard.innerHTML = `
                <h3>${item.type.charAt(0).toUpperCase() +
                     item.type.slice(1)} Item - ${item.name}</h3>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
            `;
            searchResults.appendChild(itemCard);
        });
    }


    getLocationBtn.addEventListener('click', function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const coords = position.coords.latitude + ', ' +
                               position.coords.longitude;
                document.getElementById('itemLocation').value = coords;
            }, function (error) {
                alert('Error retrieving location: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
});
