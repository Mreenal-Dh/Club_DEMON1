// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check if user is logged in
function checkAuth() {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Initialize on page load
if (checkAuth()) {
    loadClubs();
}

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.admin-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        
        // Update active button
        navButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
        
        // Load data for the section
        if (section === 'clubs') loadClubs();
        else if (section === 'events') loadEvents();
        else if (section === 'applications') loadApplications();
    });
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    sessionStorage.removeItem('adminUser');
    window.location.href = 'index.html';
});

// ===========================
// CLUBS MANAGEMENT
// ===========================

async function loadClubs() {
    const clubsList = document.getElementById('clubsList');
    clubsList.innerHTML = '<div class="loading">Loading clubs...</div>';
    
    try {
        const { data: clubs, error } = await supabase
            .from('clubs')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (clubs.length === 0) {
            clubsList.innerHTML = '<p class="no-data">No clubs found. Add your first club!</p>';
            return;
        }
        
        clubsList.innerHTML = clubs.map(club => `
            <div class="admin-card">
                <div class="card-header">
                    <h3>${club.name}</h3>
                    <span class="badge ${club.is_recruiting ? 'badge-success' : 'badge-secondary'}">
                        ${club.is_recruiting ? 'Recruiting' : 'Not Recruiting'}
                    </span>
                </div>
                <p class="card-description">${club.description || 'No description'}</p>
                <div class="card-meta">
                    <span>👥 ${club.member_count || 0} members</span>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editClub('${club.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteClub('${club.id}', '${club.name}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading clubs:', error);
        clubsList.innerHTML = '<p class="error-message">Error loading clubs. Please try again.</p>';
    }
}

// Add Club Button
document.getElementById('addClubBtn')?.addEventListener('click', function() {
    document.getElementById('clubModalTitle').textContent = 'Add New Club';
    document.getElementById('clubForm').reset();
    document.getElementById('clubId').value = '';
    document.getElementById('clubModal').classList.add('active');
});

// Close Club Modal
document.getElementById('closeClubModal')?.addEventListener('click', function() {
    document.getElementById('clubModal').classList.remove('active');
});

document.getElementById('cancelClubBtn')?.addEventListener('click', function() {
    document.getElementById('clubModal').classList.remove('active');
});

// Save Club
document.getElementById('clubForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const clubId = document.getElementById('clubId').value;
    const clubData = {
        name: document.getElementById('clubName').value,
        description: document.getElementById('clubDescription').value,
        long_description: document.getElementById('clubLongDescription').value,
        member_count: parseInt(document.getElementById('clubMembers').value),
        is_recruiting: document.getElementById('clubRecruiting').checked,
        updated_at: new Date().toISOString()
    };
    
    try {
        if (clubId) {
            // Update existing club
            const { error } = await supabase
                .from('clubs')
                .update(clubData)
                .eq('id', clubId);
            
            if (error) throw error;
            alert('Club updated successfully!');
        } else {
            // Insert new club
            const { error } = await supabase
                .from('clubs')
                .insert([clubData]);
            
            if (error) throw error;
            alert('Club added successfully!');
        }
        
        document.getElementById('clubModal').classList.remove('active');
        loadClubs();
        
    } catch (error) {
        console.error('Error saving club:', error);
        alert('Error saving club. Please try again.');
    }
});

// Edit Club
async function editClub(clubId) {
    try {
        const { data: club, error } = await supabase
            .from('clubs')
            .select('*')
            .eq('id', clubId)
            .single();
        
        if (error) throw error;
        
        document.getElementById('clubModalTitle').textContent = 'Edit Club';
        document.getElementById('clubId').value = club.id;
        document.getElementById('clubName').value = club.name;
        document.getElementById('clubDescription').value = club.description || '';
        document.getElementById('clubLongDescription').value = club.long_description || '';
        document.getElementById('clubMembers').value = club.member_count || 0;
        document.getElementById('clubRecruiting').checked = club.is_recruiting;
        
        document.getElementById('clubModal').classList.add('active');
        
    } catch (error) {
        console.error('Error loading club:', error);
        alert('Error loading club details.');
    }
}

// Delete Club
async function deleteClub(clubId, clubName) {
    if (!confirm(`Are you sure you want to delete "${clubName}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('clubs')
            .delete()
            .eq('id', clubId);
        
        if (error) throw error;
        
        alert('Club deleted successfully!');
        loadClubs();
        
    } catch (error) {
        console.error('Error deleting club:', error);
        alert('Error deleting club. Please try again.');
    }
}

// ===========================
// EVENTS MANAGEMENT
// ===========================

async function loadEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '<div class="loading">Loading events...</div>';
    
    try {
        const { data: events, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (events.length === 0) {
            eventsList.innerHTML = '<p class="no-data">No events found. Add your first event!</p>';
            return;
        }
        
        eventsList.innerHTML = events.map(event => `
            <div class="admin-card">
                <div class="card-header">
                    <h3>${event.title}</h3>
                    <span class="badge badge-primary">${event.date}</span>
                </div>
                <p class="card-description">${event.description || 'No description'}</p>
                <div class="card-meta">
                    <span>📍 ${event.venue || 'TBA'}</span>
                    <span>👤 ${event.organizer || 'TBA'}</span>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteEvent('${event.id}', '${event.title}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading events:', error);
        eventsList.innerHTML = '<p class="error-message">Error loading events. Please try again.</p>';
    }
}

// Add Event Button
document.getElementById('addEventBtn')?.addEventListener('click', function() {
    document.getElementById('eventModalTitle').textContent = 'Add New Event';
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
    document.getElementById('eventModal').classList.add('active');
});

// Close Event Modal
document.getElementById('closeEventModal')?.addEventListener('click', function() {
    document.getElementById('eventModal').classList.remove('active');
});

document.getElementById('cancelEventBtn')?.addEventListener('click', function() {
    document.getElementById('eventModal').classList.remove('active');
});

// Save Event
document.getElementById('eventForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const eventId = document.getElementById('eventId').value;
    const highlights = document.getElementById('eventHighlights').value
        .split('\n')
        .filter(h => h.trim())
        .map(h => h.trim());
    
    const eventData = {
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        datetime: document.getElementById('eventDateTime').value,
        venue: document.getElementById('eventVenue').value,
        organizer: document.getElementById('eventOrganizer').value,
        registration_info: document.getElementById('eventRegistration').value,
        description: document.getElementById('eventDescription').value,
        image_url: document.getElementById('eventImage').value,
        highlights: highlights,
        updated_at: new Date().toISOString()
    };
    
    try {
        if (eventId) {
            // Update existing event
            const { error } = await supabase
                .from('events')
                .update(eventData)
                .eq('id', eventId);
            
            if (error) throw error;
            alert('Event updated successfully!');
        } else {
            // Insert new event
            const { error } = await supabase
                .from('events')
                .insert([eventData]);
            
            if (error) throw error;
            alert('Event added successfully!');
        }
        
        document.getElementById('eventModal').classList.remove('active');
        loadEvents();
        
    } catch (error) {
        console.error('Error saving event:', error);
        alert('Error saving event. Please try again.');
    }
});

// Edit Event
async function editEvent(eventId) {
    try {
        const { data: event, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', eventId)
            .single();
        
        if (error) throw error;
        
        document.getElementById('eventModalTitle').textContent = 'Edit Event';
        document.getElementById('eventId').value = event.id;
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date || '';
        document.getElementById('eventDateTime').value = event.datetime || '';
        document.getElementById('eventVenue').value = event.venue || '';
        document.getElementById('eventOrganizer').value = event.organizer || '';
        document.getElementById('eventRegistration').value = event.registration_info || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventImage').value = event.image_url || '';
        document.getElementById('eventHighlights').value = Array.isArray(event.highlights) 
            ? event.highlights.join('\n') 
            : '';
        
        document.getElementById('eventModal').classList.add('active');
        
    } catch (error) {
        console.error('Error loading event:', error);
        alert('Error loading event details.');
    }
}

// Delete Event
async function deleteEvent(eventId, eventTitle) {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId);
        
        if (error) throw error;
        
        alert('Event deleted successfully!');
        loadEvents();
        
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
    }
}

// ===========================
// APPLICATIONS MANAGEMENT
// ===========================

let currentFilter = 'all';

async function loadApplications(status = 'all') {
    currentFilter = status;
    const applicationsList = document.getElementById('applicationsList');
    applicationsList.innerHTML = '<div class="loading">Loading applications...</div>';
    
    try {
        let query = supabase
            .from('club_applications')
            .select(`
                *,
                clubs (name)
            `)
            .order('created_at', { ascending: false });
        
        if (status !== 'all') {
            query = query.eq('status', status);
        }
        
        const { data: applications, error } = await query;
        
        if (error) throw error;
        
        if (applications.length === 0) {
            applicationsList.innerHTML = '<p class="no-data">No applications found.</p>';
            return;
        }
        
        applicationsList.innerHTML = applications.map(app => `
            <div class="admin-card">
                <div class="card-header">
                    <h3>${app.name}</h3>
                    <span class="badge badge-${getStatusColor(app.status)}">${app.status}</span>
                </div>
                <div class="application-details">
                    <p><strong>Club:</strong> ${app.clubs?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${app.email}</p>
                    <p><strong>Year:</strong> ${app.year} | <strong>Branch:</strong> ${app.branch}</p>
                    <p><strong>Motivation:</strong> ${app.motivation || 'Not provided'}</p>
                    <p><strong>Applied:</strong> ${new Date(app.created_at).toLocaleDateString()}</p>
                </div>
                <div class="card-actions">
                    ${app.status === 'pending' ? `
                        <button class="btn-success" onclick="updateApplicationStatus('${app.id}', 'approved')">Approve</button>
                        <button class="btn-danger" onclick="updateApplicationStatus('${app.id}', 'rejected')">Reject</button>
                    ` : ''}
                    <button class="btn-delete" onclick="deleteApplication('${app.id}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading applications:', error);
        applicationsList.innerHTML = '<p class="error-message">Error loading applications. Please try again.</p>';
    }
}

function getStatusColor(status) {
    switch(status) {
        case 'approved': return 'success';
        case 'rejected': return 'danger';
        case 'pending': return 'warning';
        default: return 'secondary';
    }
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const status = this.getAttribute('data-status');
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        loadApplications(status);
    });
});

// Update Application Status
async function updateApplicationStatus(applicationId, newStatus) {
    try {
        const { error } = await supabase
            .from('club_applications')
            .update({ status: newStatus })
            .eq('id', applicationId);
        
        if (error) throw error;
        
        alert(`Application ${newStatus} successfully!`);
        loadApplications(currentFilter);
        
    } catch (error) {
        console.error('Error updating application:', error);
        alert('Error updating application status.');
    }
}

// Delete Application
async function deleteApplication(applicationId) {
    if (!confirm('Are you sure you want to delete this application?')) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('club_applications')
            .delete()
            .eq('id', applicationId);
        
        if (error) throw error;
        
        alert('Application deleted successfully!');
        loadApplications(currentFilter);
        
    } catch (error) {
        console.error('Error deleting application:', error);
        alert('Error deleting application.');
    }
}

// Make functions globally available
window.editClub = editClub;
window.deleteClub = deleteClub;
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.updateApplicationStatus = updateApplicationStatus;
window.deleteApplication = deleteApplication;
