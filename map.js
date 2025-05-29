document.addEventListener('DOMContentLoaded', function() {
    const locations = document.querySelectorAll('.map-location');
    
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const locationName = this.getAttribute('data-location');
            showLocationInfo(locationName, this);
        });
    });
});

function showLocationInfo(locationName, element) {
    // Remove any existing info boxes
    const existingInfo = document.querySelector('.location-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    // Create new info box
    const infoBox = document.createElement('div');
    infoBox.className = 'location-info';
    
    // Get location data based on the name
    const locationData = getLocationData(locationName);
    
    // Set content
    infoBox.innerHTML = `
        <h3>${locationData.title}</h3>
        <p>${locationData.description}</p>
        <p><strong>Where to find it:</strong> ${locationData.location}</p>
    `;
    
    // Position the info box
    const rect = element.getBoundingClientRect();
    infoBox.style.left = rect.left + 'px';
    infoBox.style.top = (rect.bottom + 10) + 'px';
    
    // Add to document
    document.body.appendChild(infoBox);
    
    // Show the info box
    setTimeout(() => {
        infoBox.classList.add('active');
    }, 10);
}

function getLocationData(locationName) {
    const locations = {
        'amphitheatre': {
            title: 'Amphitheatre',
            description: "Learn and be entertained. Come and catch daily educational and entertaining shows, talks and demonstrations at the amphitheatre.<br><br>Today's program:<br>9h00am : A Bug's Life - play<br>11h00am : Penny and her Penguins<br>14h00pm : Big Cats of Africa - a Documentary",
            location: 'The Amphitheatre is to the west of the main entrance.'
        },
        'insect-house': {
            title: 'Insect House',
            description: 'The Insect House is home to one of the largest and most diverse insect collections in the world. Here you will see creepy crawlies from all over the world, in every shape and size.',
            location: 'Insect House is at the eastern side of the zoo, next to the Monkey Trail.'
        },
        'monkey-trail': {
            title: 'Monkey Trail',
            description: 'Whether you choose to walk or ride, you will find the monkey trail very challenging. Take the 30 minute or 1 hour trail. Be prepared to get dirty!',
            location: 'Monkey Trail is at the eastern side of the zoo.'
        },
        'wild-things': {
            title: 'Wild Things Coffee Shop',
            description: "Come and relax with a fragrant, freshly-brewed cuppa at Wild Things. They also serve a variety of sandwiches, confectionery and desserts, in case you're peckish!",
            location: 'Wild Things is at the main Food Court.'
        },
        'lost-forest': {
            title: 'The Lost Forest',
            description: 'Relax and enjoy a picnic with your family and friends in this shady picnic spot by the edge of the lake. Picnic tables and clean bathrooms are provided.',
            location: 'The Lost Forest is to the east of the zoo, beyond Monkey Trail.'
        },
        'mos-pizza': {
            title: "Mo's Pizza",
            description: "Grab a delicious, authentic Italian meal at Mo's Pizza. They serve the most delicious thick-crust pizzas and delicious pastas.",
            location: "Mo's Pizza is at the main food court."
        },
        'dine-zoo': {
            title: 'Dine @The Zoo',
            description: "Gourmet meals, a serene atmosphere, live music and good company - sometimes that's all you need. Dine @The Zoo gives you all this.",
            location: 'Dine @The Zoo is located just behind the Amphitheatre.'
        }
    };

    return locations[locationName] || {
        title: 'Location',
        description: 'Information not available',
        location: 'Location not specified'
    };
}
