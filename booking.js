// Flight database simulation
const flightDatabase = {
    airlines: [
        { code: 'AA', name: 'American Airlines', logo: '✈️' },
        { code: 'DL', name: 'Delta Airlines', logo: '🛫' },
        { code: 'UA', name: 'United Airlines', logo: '✈️' },
        { code: 'BA', name: 'British Airways', logo: '🛬' },
        { code: 'EK', name: 'Emirates', logo: '✈️' },
        { code: 'QR', name: 'Qatar Airways', logo: '🛫' },
        { code:  'LH', name: 'Lufthansa', logo:  '✈️' },
        { code: 'AF', name: 'Air France', logo: '🛬' },
        { code: 'SQ', name: 'Singapore Airlines', logo: '✈️' },
        { code: 'TK', name: 'Turkish Airlines', logo: '🛫' }
    ]
};

// Generate random flights based on search criteria
function generateFlights(from, to, departure, passengers) {
    const flights = [];
    const numFlights = Math.floor(Math.random() * 8) + 5; // 5-12 flights
    
    for (let i = 0; i < numFlights; i++) {
        const airline = flightDatabase.airlines[Math.floor(Math.random() * flightDatabase.airlines.length)];
        const stops = Math.random() > 0.4 ? 0 : (Math.random() > 0.5 ? 1 : 2);
        const basePrice = Math.floor(Math. random() * 800) + 200;
        const duration = Math.floor(Math.random() * 12) + 2; // 2-14 hours
        const departureHour = Math.floor(Math. random() * 24);
        const departureMinute = Math.floor(Math.random() * 60);
        const arrivalHour = (departureHour + duration) % 24;
        const arrivalMinute = departureMinute;
        
        flights.push({
            id: `FL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            airline: airline,
            from: from,
            to: to,
            departure:  {
                time: `${String(departureHour).padStart(2, '0')}:${String(departureMinute).padStart(2, '0')}`,
                airport: from. substring(0, 3).toUpperCase()
            },
            arrival: {
                time: `${String(arrivalHour).padStart(2, '0')}:${String(arrivalMinute).padStart(2, '0')}`,
                airport: to.substring(0, 3).toUpperCase()
            },
            duration: {
                hours: Math.floor(duration),
                minutes: Math.floor((duration % 1) * 60)
            },
            stops: stops,
            price: basePrice * parseInt(passengers),
            features: {
                wifi: Math.random() > 0.3,
                power: Math.random() > 0.4,
                meal: Math.random() > 0.5,
                entertainment: Math.random() > 0.6,
                baggage: Math. random() > 0.7 ? 2 : 1
            }
        });
    }
    
    return flights;
}

// Display flights in the results section
function displayFlights(flights, searchParams) {
    const resultsSection = document.getElementById('resultsSection');
    const flightResults = document.getElementById('flightResults');
    const resultsTitle = document.getElementById('resultsTitle');
    const featuresSection = document.getElementById('featuresSection');
    const popularRoutesSection = document.getElementById('popularRoutesSection');
    
    // Update title
    resultsTitle.textContent = `${flights.length} Flights from ${searchParams.from} to ${searchParams.to}`;
    
    // Clear previous results
    flightResults. innerHTML = '';
    
    if (flights.length === 0) {
        flightResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-plane-slash"></i>
                <h3>No Flights Found</h3>
                <p>Try adjusting your search criteria or check different dates.</p>
            </div>
        `;
    } else {
        flights.forEach(flight => {
            const flightCard = createFlightCard(flight);
            flightResults.appendChild(flightCard);
        });
    }
    
    // Show results section and hide other sections
    resultsSection.style.display = 'block';
    featuresSection.style.display = 'none';
    popularRoutesSection.style.display = 'none';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Create a flight card element
function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = 'flight-card';
    
    const stopsText = flight.stops === 0 ? 'Direct' : 
                     flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`;
    
    card.innerHTML = `
        <div class="flight-header">
            <div class="airline-info">
                <div class="airline-logo">${flight.airline.logo}</div>
                <div>
                    <div class="airline-name">${flight.airline.name}</div>
                    <div style="font-size: 12px; color: #999;">${flight.id}</div>
                </div>
            </div>
            <div class="flight-price">
                <div class="price-amount">$${flight.price}</div>
                <div class="price-label">Total Price</div>
            </div>
        </div>
        
        <div class="flight-details">
            <div class="flight-time">
                <div class="time">${flight.departure.time}</div>
                <div class="airport-code">${flight.departure.airport}</div>
            </div>
            
            <div class="flight-duration">
                <div class="duration-time">${flight.duration.hours}h ${flight.duration.minutes}m</div>
                <div class="duration-line"></div>
                <div class="stops-info">${stopsText}</div>
            </div>
            
            <div class="flight-time arrival">
                <div class="time">${flight.arrival.time}</div>
                <div class="airport-code">${flight.arrival.airport}</div>
            </div>
        </div>
        
        <div class="flight-features">
            ${flight.stops === 0 ? '<span class="feature-tag highlight"><i class="fas fa-plane"></i> Direct Flight</span>' : ''}
            ${flight.features.wifi ? '<span class="feature-tag"><i class="fas fa-wifi"></i> WiFi Available</span>' : ''}
            ${flight.features.power ? '<span class="feature-tag"><i class="fas fa-plug"></i> Power Outlets</span>' : ''}
            ${flight.features.meal ? '<span class="feature-tag"><i class="fas fa-utensils"></i> Meal Included</span>' : ''}
            ${flight.features.entertainment ?  '<span class="feature-tag"><i class="fas fa-tv"></i> Entertainment</span>' :  ''}
            <span class="feature-tag"><i class="fas fa-suitcase"></i> ${flight.features.baggage} Checked Bag</span>
        </div>
        
        <button class="book-btn" onclick="bookFlight('${flight.id}', '${flight.airline.name}', ${flight.price})">
            <i class="fas fa-check-circle"></i> Book Now
        </button>
    `;
    
    return card;
}

// Book flight function
function bookFlight(flightId, airline, price) {
    alert(`🎉 Booking Confirmed!\n\nFlight: ${flightId}\nAirline:  ${airline}\nTotal: $${price}\n\nThis is a demo.  In production, this would process your payment and send confirmation. `);
}

// Sort flights
function sortFlights(flights, sortBy) {
    const sorted = [... flights];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'duration': 
            return sorted.sort((a, b) => {
                const aDuration = a.duration.hours * 60 + a.duration.minutes;
                const bDuration = b.duration.hours * 60 + b.duration. minutes;
                return aDuration - bDuration;
            });
        case 'departure':
            return sorted.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
        default:
            return sorted;
    }
}

// Filter flights by stops
function filterFlights(flights, stopsFilter) {
    if (stopsFilter === 'all') return flights;
    
    switch(stopsFilter) {
        case 'direct':
            return flights.filter(f => f.stops === 0);
        case '1-stop':
            return flights.filter(f => f.stops === 1);
        case '2-stops':
            return flights.filter(f => f.stops >= 2);
        default:
            return flights;
    }
}

// Global variables
let currentFlights = [];
let currentSearchParams = {};

// Trip type selector
const tripTypeBtns = document.querySelectorAll('.trip-type-btn');
const returnDateGroup = document.getElementById('returnDateGroup');

tripTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tripTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tripType = btn.getAttribute('data-type');
        if (tripType === 'one-way') {
            returnDateGroup.style.display = 'none';
        } else {
            returnDateGroup.style.display = 'flex';
        }
    });
});

// Swap locations
const swapBtn = document.querySelector('.swap-btn');
const fromInput = document.getElementById('from');
const toInput = document. getElementById('to');

swapBtn.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput. value;
    toInput.value = temp;
});

// Set minimum date to today
const departureInput = document.getElementById('departure');
const returnInput = document. getElementById('return');
const today = new Date().toISOString().split('T')[0];

departureInput.setAttribute('min', today);
returnInput.setAttribute('min', today);

// Update return date minimum when departure changes
departureInput.addEventListener('change', () => {
    returnInput.setAttribute('min', departureInput.value);
    if (returnInput.value && returnInput.value < departureInput.value) {
        returnInput.value = departureInput.value;
    }
});

// Form submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    currentSearchParams = {
        from: fromInput. value,
        to: toInput.value,
        departure: departureInput.value,
        return: returnInput.value,
        passengers: document.getElementById('passengers').value,
        flexibleDates: document.getElementById('flexibleDates').checked,
        wifiPriority: document.getElementById('remoteWork').checked,
        extraBaggage: document.getElementById('baggage').checked,
        directOnly: document.getElementById('directOnly').checked,
        tripType: document.querySelector('.trip-type-btn. active').getAttribute('data-type')
    };
    
    // Generate and display flights
    currentFlights = generateFlights(
        currentSearchParams.from,
        currentSearchParams.to,
        currentSearchParams.departure,
        currentSearchParams.passengers
    );
    
    // Apply filters
    if (currentSearchParams.directOnly) {
        currentFlights = currentFlights.filter(f => f.stops === 0);
    }
    
    if (currentSearchParams.wifiPriority) {
        currentFlights = currentFlights.filter(f => f.features.wifi);
    }
    
    displayFlights(currentFlights, currentSearchParams);
});

// Modify search button
document.getElementById('modifySearchBtn')?.addEventListener('click', () => {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('featuresSection').style.display = 'block';
    document.getElementById('popularRoutesSection').style.display = 'block';
    document.getElementById('searchSection').scrollIntoView({ behavior: 'smooth' });
});

// Sort filter
document.getElementById('sortFilter')?.addEventListener('change', (e) => {
    const sorted = sortFlights(currentFlights, e.target.value);
    displayFlights(sorted, currentSearchParams);
});

// Stops filter
document.getElementById('stopsFilter')?.addEventListener('change', (e) => {
    const filtered = filterFlights(currentFlights, e.target.value);
    const sorted = sortFlights(filtered, document.getElementById('sortFilter').value);
    displayFlights(sorted, currentSearchParams);
});

// Price alert form
const alertForm = document.querySelector('.alert-form');
alertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = alertForm.querySelector('input[type="email"]').value;
    alert(`✅ Price alerts activated for ${email}!\n\nYou'll receive notifications when prices drop on your favorite routes.`);
    alertForm.reset();
});

// Route cards click handler
const routeCards = document.querySelectorAll('. route-card');
routeCards.forEach(card => {
    card.addEventListener('click', () => {
        const fromCity = card.getAttribute('data-from');
        const toCity = card.getAttribute('data-to');
        
        fromInput.value = fromCity;
        toInput.value = toCity;
        
        // Scroll to search form
        document.querySelector('. search-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold:  0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry. target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and route cards
document.querySelectorAll('.feature-card, .route-card').forEach(card => {
    card.style. opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});