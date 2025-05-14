// Change text content dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Change welcome message after 3 seconds
    setTimeout(function() {
        document.getElementById('welcomeMessage').textContent = 'Discover the Land of the Rising Sun';
    }, 3000);

    // Set up form validation events
    setupFormValidation();
    
    // Set up keypress detection
    setupKeyboardEvents();
});

// Function to change the background color of the header
function changeHeaderColor() {
    const header = document.querySelector('.header');
    // Toggle between default red and a blue color
    if (header.style.backgroundColor === 'var(--dark-blue)') {
        header.style.backgroundColor = 'var(--japan-red)';
    } else {
        header.style.backgroundColor = 'var(--dark-blue)';
    }
}

// Secret double-click action
function showSecretMessage() {
    const secretMessage = document.getElementById('secretMessage');
    secretMessage.style.display = 'block';
    
    // Hide the message after 5 seconds
    setTimeout(function() {
        secretMessage.style.display = 'none';
    }, 5000);
}

// Modify CSS styles via JavaScript
function toggleHighlight(tourId) {
    const tourCard = document.getElementById(tourId);
    tourCard.classList.toggle('highlight');
}

// Toggle special offer visibility
function toggleSpecialOffer() {
    const specialOffer = document.getElementById('specialOffer');
    if (specialOffer.style.display === 'none') {
        specialOffer.style.display = 'block';
    } else {
        specialOffer.style.display = 'none';
    }
}

// Add or remove elements when a button is clicked
let tourCounter = 0;

function addTour() {
    tourCounter++;
    
    // Create new list item
    const newTour = document.createElement('li');
    newTour.textContent = `Tour Package ${tourCounter}`;
    
    // Add the new tour to the list
    document.getElementById('tourItems').appendChild(newTour);
    
    // Update the counter display
    document.getElementById('itemCount').textContent = tourCounter;
}

function removeTour() {
    if (tourCounter > 0) {
        // Get the tour items list
        const tourItems = document.getElementById('tourItems');
        
        // Remove the last tour from the list
        tourItems.removeChild(tourItems.lastChild);
        
        // Decrement the counter
        tourCounter--;
        
        // Update the counter display
        document.getElementById('itemCount').textContent = tourCounter;
    }
}

// Slideshow functionality
let slideIndex = 0;
const slides = document.getElementsByClassName('slideshow-slide');

function changeSlide(n) {
    // Remove active class from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Calculate new slide index
    slideIndex += n;
    
    // Wrap around if at the end or beginning
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Add active class to the current slide
    slides[slideIndex].classList.add('active');
}

// Accordion functionality
function toggleAccordion(header) {
    // Toggle active class on the clicked header
    header.classList.toggle('active');
    
    // Get the content panel
    const content = header.nextElementSibling;
    
    // Toggle the content visibility
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        header.querySelector('i').className = 'fas fa-chevron-down';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        header.querySelector('i').className = 'fas fa-chevron-up';
    }
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('tourBookingForm');
    
    if (!form) return;
    
    // Real-time validation for inputs
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const tourSelect = document.getElementById('tourSelect');
    const password = document.getElementById('password');
    
    // Add input event listeners for real-time validation
    if (fullName) {
        fullName.addEventListener('input', function() {
            validateField(fullName, 'fullNameError', 'Name is required', function(value) {
                return value.trim() !== '';
            });
        });
    }
    
    if (email) {
        email.addEventListener('input', function() {
            validateField(email, 'emailError', 'Please enter a valid email address', function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            });
        });
    }
    
    if (password) {
        password.addEventListener('input', function() {
            validateField(password, 'passwordError', 'Password must be at least 8 characters', function(value) {
                return value.length >= 8;
            });
        });
    }
    
    if (tourSelect) {
        tourSelect.addEventListener('change', function() {
            validateField(tourSelect, 'tourSelectError', 'Please select a tour', function(value) {
                return value !== '';
            });
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        isValid = validateField(fullName, 'fullNameError', 'Name is required', function(value) {
            return value.trim() !== '';
        }) && isValid;
        
        isValid = validateField(email, 'emailError', 'Please enter a valid email address', function(value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }) && isValid;
        
        isValid = validateField(password, 'passwordError', 'Password must be at least 8 characters', function(value) {
            return value.length >= 8;
        }) && isValid;
        
        isValid = validateField(tourSelect, 'tourSelectError', 'Please select a tour', function(value) {
            return value !== '';
        }) && isValid;
        
        // If form is valid, show success message
        if (isValid) {
            document.getElementById('formSuccess').style.display = 'block';
            form.reset();
            
            // Reset validation styles
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.classList.remove('input-valid', 'input-invalid');
            });
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        }
    });
}

// Helper function for field validation
function validateField(field, errorId, errorMessage, validationFn) {
    if (!field) return true;
    
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(field.value);
    
    if (isValid) {
        field.classList.remove('input-invalid');
        field.classList.add('input-valid');
        if (errorElement) errorElement.style.display = 'none';
    } else {
        field.classList.remove('input-valid');
        field.classList.add('input-invalid');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
    
    return isValid;
}

// Keyboard event handling
function setupKeyboardEvents() {
    // Listen for keypresses on the document
    document.addEventListener('keydown', function(event) {
        // Press 'n' to go to next slide
        if (event.key === 'n' || event.key === 'N') {
            changeSlide(1);
        }
        
        // Press 'p' to go to previous slide
        if (event.key === 'p' || event.key === 'P') {
            changeSlide(-1);
        }
        
        // Press 't' to toggle theme
        if (event.key === 't' || event.key === 'T') {
            changeHeaderColor();
        }
        
        // Press 's' to reveal secret message
        if (event.key === 's' || event.key === 'S') {
            showSecretMessage();
        }
    });
}