let currentInfoBox = null;
let currentOpenLocation = null;

document.addEventListener('DOMContentLoaded', function() {
    const locations = document.querySelectorAll('.map-location');
    
    locations.forEach(location => {
        location.setAttribute('tabindex', '0'); // Make pins focusable

        const handleLocationInteraction = (event) => {
            event.stopPropagation(); 
            const locationName = location.getAttribute('data-location');
            if (!locationName) {
                console.error('Map location interacted without data-location attribute.');
                return;
            }

            if (currentOpenLocation === locationName) {
                removeLocationInfo();
            } else {
                showLocationInfo(locationName, location);
            }
        };

        location.addEventListener('click', handleLocationInteraction);
        location.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent space from scrolling page
                handleLocationInteraction(event);
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (currentInfoBox && !currentInfoBox.contains(event.target) && !event.target.closest('.map-location')) {
            removeLocationInfo();
        }
    });

    // Listen for Escape key to close info box
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentInfoBox) {
            removeLocationInfo();
        }
    });
});

function removeLocationInfo() {
    if (currentInfoBox) {
        const previouslyFocusedPin = document.querySelector(`.map-location[data-location="${currentOpenLocation}"]`);
        currentInfoBox.classList.remove('active');
        currentInfoBox.remove();
        currentInfoBox = null;
        currentOpenLocation = null;
        if (previouslyFocusedPin) {
            previouslyFocusedPin.focus(); // Return focus to the pin that opened the info box
        }
    }
}

function showLocationInfo(locationName, element) {
    removeLocationInfo(); 

    const locationData = getLocationData(locationName);
    if (!locationData || locationData.title === 'Location') { 
        console.warn(`No data found for location: ${locationName}`);
        return; 
    }

    currentInfoBox = document.createElement('div');
    currentInfoBox.className = 'location-info';
    currentInfoBox.setAttribute('role', 'dialog'); // ARIA role for dialog
    currentInfoBox.setAttribute('aria-modal', 'true'); // Indicates it's a modal dialog
    currentInfoBox.setAttribute('aria-labelledby', 'infoBoxTitle'); // For accessible title
    
    currentInfoBox.innerHTML = `
        <h3 id="infoBoxTitle">${locationData.title}</h3>
        <p>${locationData.description}</p>
        <p><strong>Where to find it:</strong> ${locationData.location}</p>
        <button class="close-info-box" aria-label="Close dialog">&times;</button>
    `;
    
    document.body.appendChild(currentInfoBox);

    const closeButton = currentInfoBox.querySelector('.close-info-box');
    closeButton.addEventListener('click', removeLocationInfo);
    closeButton.focus(); // Focus on the close button initially

    // Position the info box relative to the clicked element
    const rect = element.getBoundingClientRect();
    const infoBoxRect = currentInfoBox.getBoundingClientRect();

    let top = rect.bottom + 10; 
    let left = rect.left;    

    if (left + infoBoxRect.width > window.innerWidth) {
        left = window.innerWidth - infoBoxRect.width - 10; 
    }
    if (top + infoBoxRect.height > window.innerHeight) {
        top = rect.top - infoBoxRect.height - 10; 
    }
    if (top < 0) top = 10;
    if (left < 0) left = 10;

    currentInfoBox.style.left = left + 'px';
    currentInfoBox.style.top = top + 'px';
    
    setTimeout(() => {
        if (currentInfoBox) currentInfoBox.classList.add('active');
    }, 10); 

    currentOpenLocation = locationName;
}

function getLocationData(locationName) {
    const locations = {
        'amphitheatre': {
            title: 'Amphitheatre',
            description: "Learn and be entertained. Come and catch daily educational and entertaining shows, talks and demonstrations at the amphitheatre.<br><br>Today\'s program:<br>9h00am : A Bug\'s Life - play<br>11h00am : Penny and her Penguins<br>14h00pm : Big Cats of Africa - a Documentary",
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
            description: "Come and relax with a fragrant, freshly-brewed cuppa at Wild Things. They also serve a variety of sandwiches, confectionery and desserts, in case you\'re peckish!",
            location: 'Wild Things is at the main Food Court.'
        },
        'lost-forest': {
            title: 'The Lost Forest',
            description: 'Relax and enjoy a picnic with your family and friends in this shady picnic spot by the edge of the lake. Picnic tables and clean bathrooms are provided.',
            location: 'The Lost Forest is to the east of the zoo, beyond Monkey Trail.'
        },
        'mos-pizza': {
            title: "Mo\'s Pizza",
            description: "Grab a delicious, authentic Italian meal at Mo\'s Pizza. They serve the most delicious thick-crust pizzas and delicious pastas.",
            location: "Mo\'s Pizza is at the main food court."
        },
        'dine-zoo': {
            title: 'Dine @The Zoo',
            description: "Gourmet meals, a serene atmosphere, live music and good company - sometimes that\'s all you need. Dine @The Zoo gives you all this.",
            location: 'Dine @The Zoo is located just behind the Amphitheatre.'
        },
        'ice-cream': {
            title: 'Ice Cream Shop',
            description: 'Come and enjoy a delicious ice-cream. We have a wide range of ice-creams to choose from: Chocolate, Vanilla, Strawberry, Lemon, and Mango.',
            location: 'You will find the ice-cream at the ice-cream shop, right next to the TIGER enclosure.'
        },
        'panda-canyon': {
            title: 'Pandas',
            description: 'The giant panda (Ailuropoda melanoleuca), also known as panda bear, is native to south central China. It is easily recognized by the large, distinctive black patches around its eyes, over the ears, and across its round body.',
            location: 'You will find the pandas at Panda Canyon.'
        },
        'gemsbok': {
            title: 'Gemsbok',
            description: 'The gemsbok or gemsbuck (Oryx gazella) is a large antelope in the Oryx genus. It is native to the arid regions of Southern Africa, such as the Kalahari Desert.',
            location: 'You will find the gemsboks just beyond panda canyon.'
        },
        'elephant': {
            title: 'Elephants',
            description: 'Elephants are large mammals of the family Elephantidae. Two species are traditionally recognised, the African elephant and the Asian elephant. Male African elephants are the largest extant terrestrial animals.',
            location: 'You will find the elephants at pen E22, right next to the amphitheatre.'
        },
        'giraffe': {
            title: 'Giraffes',
            description: 'The giraffe (Giraffa camelopardalis) is an African even-toed ungulate mammal, the tallest living terrestrial animal and the largest ruminant. Its chief distinguishing characteristics are its extremely long neck and legs.',
            location: 'You will find the giraffes at G15, just beyond the research centre.'
        },
        'warthog': {
            title: 'Warthog',
            description: 'Phacochoerus is a genus of wild pigs in the family Suidae, known as warthogs. They are found in open and semiopen habitats, even in quite arid regions, in sub-Saharan Africa.',
            location: 'You will find the warthogs at WA11, near the elephant enclosure.'
        },
        'rhino-beetle': {
            title: 'Rhino Beetle',
            description: 'The rhino beetle is a genus of beetles in the family Scarabaeidae. The rhinoceros beetle is a large, robust, and heavy-bodied beetle.',
            location: 'You will find the rhino beetles at RB12, right next to the rhino enclosure.'
        },
        'koala': {
            title: 'Koalas',
            description: 'The koala (Phascolarctos cinereus) is an arboreal herbivorous marsupial native to Australia. It is easily recognisable by its stout, tailless body and large head with round, fluffy ears.',
            location: 'You will find the koalas next to the giraffe enclosure.'
        },
        'lion': {
            title: 'Lions',
            description: 'The lion (Panthera leo) is one of the five big cats in the genus Panthera. With some males exceeding 250 kg (550 lb) in weight, it is the second-largest living cat after the tiger.',
            location: 'You will find the lions at the Northern Frontier.'
        },
        'gorilla': {
            title: 'Gorilla',
            description: 'Gorillas are ground-dwelling, predominantly herbivorous apes that inhabit the forests of central Africa. They are the largest living primates by physical size.',
            location: 'You will find the gorilla cage at GO12.'
        },
        'tiger': {
            title: 'Tiger',
            description: 'The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside.',
            location: 'You will find the tigers at T12, right next to the amphitheatre.'
        }
    };

    return locations[locationName] || {
        title: 'Location',
        description: 'Information not available',
        location: 'Location not specified'
    };
}
