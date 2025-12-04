// Admin Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication (Default credentials: admin/admin123)
            // TODO: Replace with Supabase authentication for production
            if (username === 'admin' && password === 'admin123') {
                // Store admin session
                sessionStorage.setItem('adminUser', JSON.stringify({
                    username: username,
                    loginTime: new Date().toISOString()
                }));
                
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid credentials. Default: admin/admin123');
            }
        });
    }
});

// Smooth scroll and animations
window.addEventListener('load', function() {
    // Add smooth appearance to elements
    const elements = document.querySelectorAll('.card, .welcome-section');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// Card click animation feedback
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Club card hover effect with background blur
if (document.querySelector('.club-card')) {
    const clubCards = document.querySelectorAll('.club-card');
    let hoverTimeout = null;
    
    // Function to check if card should slide left
    function checkCardPosition() {
        clubCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const spaceOnRight = windowWidth - rect.right;
            
            // If less than card width space on right, slide left instead
            if (spaceOnRight < rect.width) {
                card.classList.add('slide-left');
            } else {
                card.classList.remove('slide-left');
            }
        });
    }
    
    // Check position on load and resize
    checkCardPosition();
    window.addEventListener('resize', checkCardPosition);
    
    const clubsGrid = document.querySelector('.clubs-grid');
    
    clubCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            // Set timeout for 1 second before activating blur
            hoverTimeout = setTimeout(() => {
                if (clubsGrid) {
                    clubsGrid.classList.add('show-blur');
                }
            }, 1000);
        });
        
        card.addEventListener('mouseleave', function() {
            // Clear timeout if mouse leaves before 1 second
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
            // Instantly remove blur
            if (clubsGrid) {
                clubsGrid.classList.remove('show-blur');
            }
        });
    });
}

// Apply Form Handler (club-detail.html)
const applyForm = document.getElementById('applyForm');
if (applyForm) {
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            year: document.getElementById('year').value,
            branch: document.getElementById('branch').value,
            motivation: document.getElementById('motivation').value
        };
        
        console.log('Application submitted:', formData);
        alert('Application submitted successfully! We will contact you soon.');
        applyForm.reset();
    });
}

// Event Modal Handler (events.html)
const eventModal = document.getElementById('eventModal');
const closeModalBtn = document.getElementById('closeModal');
const eventCards = document.querySelectorAll('.event-card');

if (eventModal && eventCards.length > 0) {
    // Open modal when event card is clicked
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const date = this.getAttribute('data-date');
            const datetime = this.getAttribute('data-datetime');
            const venue = this.getAttribute('data-venue');
            const organizer = this.getAttribute('data-organizer');
            const registration = this.getAttribute('data-registration');
            const image = this.getAttribute('data-image');
            const description = this.getAttribute('data-description');
            const highlights = this.getAttribute('data-highlights');
            
            // Populate modal with data
            document.getElementById('modalTitle').textContent = title || 'Event Title';
            document.getElementById('modalDate').textContent = date || 'Date';
            document.getElementById('modalDateTime').textContent = datetime || 'TBA';
            document.getElementById('modalVenue').textContent = venue || 'TBA';
            document.getElementById('modalOrganizer').textContent = organizer || 'TBA';
            document.getElementById('modalRegistration').textContent = registration || 'TBA';
            document.getElementById('modalImage').src = image || '';
            document.getElementById('modalDescription').textContent = description || 'No description available.';
            
            // Populate highlights
            const highlightsList = document.getElementById('modalHighlights');
            highlightsList.innerHTML = '';
            if (highlights) {
                const highlightsArray = highlights.split('|');
                highlightsArray.forEach(highlight => {
                    const li = document.createElement('li');
                    li.textContent = highlight;
                    highlightsList.appendChild(li);
                });
            }
            
            // Show modal
            eventModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        eventModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    const modalOverlay = document.querySelector('.event-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Register button handler
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('Registration form will be implemented. Thank you for your interest!');
        });
    }
}
