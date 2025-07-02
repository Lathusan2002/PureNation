document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
  
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      // Here you would normally send data to a server
      // For demo, we'll just show an alert
      alert(`Thank you for your message! We'll get back to you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Load featured events
  loadFeaturedEvents();
  
  // Load leaderboard
  loadLeaderboard();
});

// Mock data for featured events
const eventData = [
  {
    id: 1,
    title: "Colombo Beach Cleanup",
    date: "2025-06-15",
    time: "9:00 AM",
    location: "Mount Lavinia Beach",
    description: "Join us for a community cleanup at one of Colombo's most popular beaches. Help remove plastic waste and learn about marine conservation.",
    image: "./ColomboBeachCleanup.jpg",
    status: "active",
    tags: ["Beach", "Plastic", "Community"],
    volunteersJoined: 45,
    volunteersNeeded: 60,
    sponsor: "Blue Ocean Alliance"
  },
  {
    id: 2,
    title: "Kandy Forest Restoration",
    date: "2025-05-22",
    time: "8:30 AM",
    location: "Galle",
    description: "Help us plant native trees and restore the forest ecosystem in this ancient sanctuary. Equipment and saplings will be provided.",
    image: "./KandyForestRestoration.jpg",
    status: "Completed",
    tags: ["Forest", "Planting", "Conservation"],
    volunteersJoined: 28,
    volunteersNeeded: 40,
    sponsor: "Green Earth Foundation"
  },
  {
    id: 3,
    title: "Galle River Cleanup",
    date: "2025-06-14",
    time: "7:00 AM",
    location: "Colombo",
    description: "Help us remove trash and pollutants from this important river ecosystem that serves many local communities.",
   image: "./GalleRiverCleanup.jpg",
    status: "active",
    tags: ["River", "Plastic", "Water"],
    volunteersJoined: 35,
    volunteersNeeded: 50,
    sponsor: "Clean Waters Initiative"
  },
  {
    id: 4,
    title: "Negombo Street Cleanup",
    date: "2025-06-20",
    time: "9:00 AM",
    location: "Negombo Town Center",
    description: "Join our community initiative to clean up the streets of Negombo and raise awareness about proper waste disposal.",
    image: "./NegomboStreetCleanup.jpg",
    status: "active",
    tags: ["Urban", "Community", "Education"],
    volunteersJoined: 18,
    volunteersNeeded: 30,
    sponsor: "Clean Nature"
  }
];

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Sanjana Perera",
    avatar: "https://i.pravatar.cc/150?img=1",
    eventsParticipated: 24,
    hoursContributed: 96,
    points: 4350
  },
  {
    id: 2,
    name: "Asanka Fernando",
    avatar: "https://i.pravatar.cc/150?img=2",
    eventsParticipated: 21,
    hoursContributed: 84,
    points: 3820
  },
  {
    id: 3,
    name: "Dinesha Silva",
    avatar: "https://i.pravatar.cc/150?img=3",
    eventsParticipated: 18,
    hoursContributed: 72,
    points: 3540
  },
  {
    id: 4,
    name: "Malik Jayawardena",
    avatar: "https://i.pravatar.cc/150?img=4",
    eventsParticipated: 16,
    hoursContributed: 64,
    points: 3120
  },
  {
    id: 5,
    name: "Ishara Gunasekara",
    avatar: "https://i.pravatar.cc/150?img=5",
    eventsParticipated: 15,
    hoursContributed: 60,
    points: 2980
  }
];

// Function to load featured events
function loadFeaturedEvents() {
  const featuredEventsContainer = document.getElementById('featuredEvents');
  if (!featuredEventsContainer) return;
  
  eventData.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    // Calculate progress percentage
    const progressPercent = (event.volunteersJoined / event.volunteersNeeded) * 100;
    
    // Format date
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
    
    eventCard.innerHTML = `
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}">
        ${event.status === 'active' ? 
          '<div class="event-status status-active">Active</div>' : 
          '<div class="event-status status-completed">Completed</div>'
        }
      </div>
      <div class="event-content">
        <div class="event-tags">
          ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
        </div>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <i class="fas fa-calendar"></i>
          <span>${formattedDate} • ${event.time}</span>
        </div>
        <div class="event-meta">
          <i class="fas fa-map-marker-alt"></i>
          <span>${event.location}</span>
        </div>
        <p class="event-description">${event.description}</p>
        <div class="volunteer-progress">
          <div class="progress-header">
            <span><i class="fas fa-users"></i> Volunteers</span>
            <span>${event.volunteersJoined}/${event.volunteersNeeded}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        ${event.sponsor ? `<div class="event-sponsor">Sponsored by <span>${event.sponsor}</span></div>` : ''}
        <a href="/event-details.html?id=${event.id}" class="btn-primary" style="width: 100%; text-align: center;">
          ${event.status === 'completed' ? 'View Details' : 'Join Cleanup'}
        </a>
      </div>
    `;
    
    featuredEventsContainer.appendChild(eventCard);
  });
}

// Function to load leaderboard
function loadLeaderboard() {
  const leaderboardContainer = document.getElementById('leaderboardList');
  if (!leaderboardContainer) return;
  
  leaderboardData.forEach((volunteer, index) => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    
    // Special styling for top rank
    const isTopRank = index === 0;
    const rankDisplay = isTopRank ? 
      `<i class="fas fa-trophy rank-1"></i>` : 
      `<span>${index + 1}</span>`;
    
    item.innerHTML = `
      <div class="leaderboard-rank">
        ${rankDisplay}
      </div>
      <div class="leaderboard-avatar">
        <img src="${volunteer.avatar}" alt="${volunteer.name}">
      </div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${volunteer.name}</div>
        <div class="leaderboard-stats">
          ${volunteer.eventsParticipated} events • ${volunteer.hoursContributed} hours
        </div>
      </div>
      <div class="leaderboard-points">
        <div class="points-value">${volunteer.points.toLocaleString()}</div>
        <div class="points-label">points</div>
      </div>
    `;
    
    leaderboardContainer.appendChild(item);
  });
}
