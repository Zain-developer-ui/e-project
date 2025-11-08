/*
===========================================
WINGS OF WISDOM - JAVASCRIPT FILE
===========================================


PAGE-WISE FUNCTIONALITY:
- index.html: Animations, Counters, Scroll Effects
- contact.html: Team Modals, Form Validation
- nomination.html: Timeline Modals
- gallery.html: Image Gallery, Scroll Animations
- winners.html: Search & Filter Functions
- All Pages: Chatbot, Scroll to Top, FAQ
===========================================
*/

// Modern Wings of Wisdom JavaScript with Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeSearch();
    initializeForms();
    initializeFAQ();
    initializeGallery();
    initializeScrollEffects();
    initializeEventTimer();
    initializeQuiz();
    initializeScrollToTop();
    initializeChatbot();
    initializeEventTimer();
    resetFilters(); // <-- Add this line
});

// ========================================
// HOMEPAGE (index.html) - ANIMATIONS & COUNTERS
// ========================================

// Modern Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stats-number');
    
    if (counters.length === 0) return; // Exit if no counters on page
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (!target) return; // Skip if no data-count attribute
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stats-number');
                if (counter && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    });

    document.querySelectorAll('.stats-card').forEach(card => {
        counterObserver.observe(card);
    });
}

// ========================================
// WINNERS PAGE (winners.html) - SEARCH & FILTER
// ========================================

// Enhanced Search with Filters
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', performSearch);
    }
}

function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    
    performSearch();
}

function performSearch() {
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const yearFilter = document.getElementById('yearFilter');
    const resultsContainer = document.getElementById('winnersResults');
    
    if (!searchInput || !resultsContainer) return; // Exit if elements don't exist
    
    const searchTerm = searchInput.value.toLowerCase() || '';
    const category = categoryFilter ? categoryFilter.value : '';
    const year = yearFilter ? yearFilter.value : '';
    
    // Show simple loading
    resultsContainer.innerHTML = `
        <div class="text-center py-5">
            <div class="simple-spinner"></div>
            <p class="mt-3 text-muted">Searching Nobel laureates...</p>
        </div>
    `;
    
    // Simulate API call delay
    setTimeout(() => {
        const winners = getFilteredWinners(searchTerm, category, year);
        displaySearchResults(winners);
    }, 800);
}

function getFilteredWinners(searchTerm, category, year) {
    const allWinners = [
  {
    name: "Takaaki Kajita",
    year: 2015,
    category: "physics",
    achievement: "For the discovery of neutrino oscillations, which shows that neutrinos have mass.",
    country: "Japan"
  },
  {
    name: "Fraser Stoddart",
    year: 2016,
    category: "chemistry",
    achievement: "For the design and synthesis of molecular machines.",
    country: "United Kingdom"
  },
  {
    name: "Rainer Weiss",
    year: 2017,
    category: "physics",
    achievement: "For decisive contributions to the LIGO detector and the observation of gravitational waves.",
    country: "USA"
  },
  {
    name: "Denis Mukwege",
    year: 2018,
    category: "peace",
    achievement: "For efforts to end the use of sexual violence as a weapon of war and armed conflict.",
    country: "Democratic Republic of the Congo"
  },
  {
    name: "Abhijit Banerjee",
    year: 2019,
    category: "economics",
    achievement: "For their experimental approach to alleviating global poverty.",
    country: "India/USA"
  },
  {
    name: "Emmanuelle Charpentier",
    year: 2020,
    category: "chemistry",
    achievement: "For the development of a method for genome editing (CRISPR-Cas9).",
    country: "France"
  },
  {
    name: "Abdulrazak Gurnah",
    year: 2021,
    category: "literature",
    achievement: "For his uncompromising and compassionate penetration of the effects of colonialism.",
    country: "Tanzania/UK"
  },
  {
    name: "Svante Pääbo",
    year: 2022,
    category: "medicine",
    achievement: "For his discoveries concerning the genomes of extinct hominins and human evolution.",
    country: "Sweden"
  },
  {
    name: "Narges Mohammadi",
    year: 2023,
    category: "peace",
    achievement: "For her fight against the oppression of women in Iran and promoting human rights and freedom.",
    country: "Iran"
  },
  {
    name: "Pierre Agostini",
    year: 2024,
    category: "physics",
    achievement: "For experimental methods that generate attosecond pulses of light for the study of electron dynamics in matter.",
    country: "France/USA"
  }
];

    
    return allWinners.filter(winner => {
        const matchesSearch = !searchTerm || 
            winner.name.toLowerCase().includes(searchTerm) ||
            winner.achievement.toLowerCase().includes(searchTerm) ||
            winner.country.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || winner.category === category;
        const matchesYear = !year || winner.year.toString() === year;
        
        return matchesSearch && matchesCategory && matchesYear;
    });
}

function displaySearchResults(winners) {
    const resultsContainer = document.getElementById('winnersResults');
    if (!resultsContainer) return;
    
    if (winners.length === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No Results Found</h4>
                <p class="text-muted">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <div class="row g-4">
            ${winners.map(winner => `
                <div class="col-lg-6">
                    <div class="card h-100 modern-card">
                        <div class="card-body" onclick="showWinnerModal('${getWinnerModalId(winner)}')">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h5 class="card-title fw-bold">${winner.name}</h5>
                                <span class="badge bg-primary">${winner.year}</span>
                            </div>
                            <p class="text-primary fw-semibold mb-2">
                                <i class="fas fa-award me-2"></i>${winner.category.charAt(0).toUpperCase() + winner.category.slice(1)}
                            </p>
                            <p class="card-text text-muted mb-3">${winner.achievement}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">
                                    <i class="fas fa-globe me-1"></i>${winner.country}
                                </small>
                        <button class="btn btn-outline-primary btn-sm" onclick="showWinnerDetails('${winner.name}')">

                                    Learn More <i class="fas fa-arrow-right ms-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

function getWinnerModalId(winner) {
    const name = winner.name.toLowerCase();

    if (name.includes('kajita')) return 'kajita';
    if (name.includes('stoddart')) return 'stoddart';
    if (name.includes('weiss')) return 'weiss';
    if (name.includes('mukwege')) return 'mukwege';
    if (name.includes('banerjee')) return 'banerjee';
    if (name.includes('charpentier')) return 'charpentier';
    if (name.includes('gurnah')) return 'gurnah';
    if (name.includes('paabo') || name.includes('pääbo')) return 'paabo';
    if (name.includes('mohammadi')) return 'mohammadi';
    if (name.includes('agostini')) return 'agostini';

    return 'fallback-modal'; // Replace with a real fallback
}


function resetFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    if (categoryFilter) categoryFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    performSearch();
}

// Enhanced Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading me-2"></div>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    
    // For contact form, validate specific fields
    if (form.id === 'contactForm') {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldId => {
            const field = form.querySelector(`#${fieldId}`);
            if (field && !validateField({ target: field })) {
                isValid = false;
            }
        });
    } else {
        // Generic validation for other forms
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Clear previous errors
    clearFieldError({ target: field });
    
    // Name validation
    if (field.id === 'name') {
        if (!value) {
            isValid = false;
            message = 'Name is required';
        } else if (value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
        }
    }
    
    // Email validation
    if (field.id === 'email') {
        if (!value) {
            isValid = false;
            message = 'Email is required';
        } else if (!isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Subject validation
    if (field.id === 'subject') {
        if (!value) {
            isValid = false;
            message = 'Please select a subject';
        }
    }
    
    // Message validation
    if (field.id === 'message') {
        if (!value) {
            isValid = false;
            message = 'Message is required';
        } else if (value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Modern Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${getToastIcon(type)} me-2"></i>${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function getOrCreateToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    return container;
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        danger: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Enhanced FAQ with Bootstrap Collapse
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i') || this.querySelector('span:last-child');
            
            // Toggle answer
            answer.classList.toggle('active');
            
            // Rotate icon
            if (icon) {
                icon.style.transform = answer.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
            }
        });
    });
}

// Enhanced Gallery with Bootstrap Modal
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                showImageModal(img.src, img.alt);
            }
        });
    });
}

function showImageModal(src, alt) {
    // Create or get modal
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = createImageModal();
    }
    
    const modalImg = modal.querySelector('.modal-body img');
    const modalTitle = modal.querySelector('.modal-title');
    
    modalImg.src = src;
    modalImg.alt = alt;
    modalTitle.textContent = alt;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="" alt="" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
        }
    });
    
    // Smooth scroll for anchor links
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
}

// Winner Details Modal
function showWinnerModal(winnerId) {
   const winners = {
  kajita: {
    title: 'Takaaki Kajita - Physics Prize 2015',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Takaaki Kajita">
          <h6 class="text-primary">Japan</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-primary mb-3">Biography</h5>
          <p>Takaaki Kajita is a Japanese physicist known for his work on neutrinos at the Super-Kamiokande detector.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2015<br>
          <strong>Category:</strong> Physics<br>
          <strong>Citation:</strong> For the discovery of neutrino oscillations, which shows that neutrinos have mass.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Prize with Arthur B. McDonald.</p>
        </div>
      </div>
    `
  },
  stoddart: {
    title: 'Fraser Stoddart - Chemistry Prize 2016',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFRUXFxUXFxUVFxgWFRUYFRUWFxUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0mHyUtLS0tLSstLS8rKy0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABBEAACAQIEBAQDBAcGBgMAAAABAgADEQQFEiEGMUFREyJhcYGRoQcywdEUQlJyseHwFSMzgpLxFiRiorLCQ1NU/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKhEAAgICAgEDBAEFAQAAAAAAAAECEQMhEjEEEyJBFFFhkQUyQlJxwRX/2gAMAwEAAhEDEQA/AOYYbDW9Qd7yuxtVybEm3aXOGWpYKRYDnJ+Ky5HW6jecylT2elGMZQ+zKbh9VD3ax7XlrxDS2upHLeZwKQxXcG9vrL/GuqUwt9TMI2t2XCSUdIpsIOhF7ydSwlSxATb1lhw1l5R/EqL5egMueJMQQo8NdIPXtE5bo05NwUWQMvyUuo8Z9Kjpf84eNyZFXyHnsDtF5MrVyFsTbcm/ODEYkBnXqu1ugjTKSyVxRErcOqoB1dPrFZkK3gaAdhzt2kjIcOazXdid+U0GcZctLDswO9oXumKWJqNvTKLgekwa7uQCLWvL7GcOpVq6hsRvqvveYZMZV0gBbH0mq4TxFSsbVqmkC3oTFLWzWOGUo8i/yzLmAOpyx7tymX4gySs1a6rqm5zTE00p2VwNuc59UzSoCf79vlFia7PO8xSXXQweGMTz0Qf8NYn9j6x8ZxV//Q3yEMZlU5/pD/KbckefxY3T4VxR5IPnHP8AhPFfsj5yblwxVYlaVWq3wAHzljg8ixlT71dk/eIJ+AUH8JLyRXZccU5dDGTcN4hLgsFB7GRuL8reig0tqJ6d5PzLIMZTUsKzVLcwh83+kjf4XMzGEr4h6lqhZh0uJm3F7R6XiRmnU9JDWU5RUSor1aflb1v85t81y+g9EJbTce0cymwpnxLFRyv0tKXN8TSrU9SPe3ITJTbkdXtitGcpYWnSq6g/3Tz9PxnScpejUCbjvvOZ1sP1ZLXh4DEugKqW2O1t5rOFo0eNxivya77QHRiqpT1EHe3K0z+DyJyA21j07TYZTltatSUvYnb3l3l+WU6f+Jz9ZClSpFQyrDLk1bOaZji3paKVTZB19JAXM6lJ2NBjoPptymv4uypGcFDcX3H5Sqo1KVEMrAWMpSQpS9SbmZVsVWS78i0i0C7uCxPPf+UvswTSodRqW/SQaNUOSNNjNL0YZYqU1xbLhMMGTQgB25npGsNhxRBDEX626iN4usaFLY7n+vhK/D5sbMCPMdgecz4t7ObykmkgnxpFQeEvm5j8rSTm2YvWKpV8i/siRcrw1TWWC3bn6gekUMHUrVGbc8xc7W+Edo4Upt0iBUwSAkB1I94UfbLaYNiRf3/nBL5f7K4ZfsP4nNwoOnct9BJGUZmW8gB1H5Shp0tZsJqstyzwUFQbnrFKkjsipSl+CszXLXpkvzv6SDh6zawxHIzoupXpgMBuOUzlfLlF+nWKMr7Noxh8sm0MaXG2wA3PSVeb50XGgC4Eqnxbjyj7t5IxFTRbSBuN4+I5LWjScDo7KxG177yqz3KKiVSVJOs727mS8mzHwqZI5e8sst4kRjdluRyiTadm0IJO2XPAvDj0lL1ebchGvtEpsKYANtxsOsmYPNKtTdVIA5SQlEsxNYfOHzZk8qlK2Y/hTArUcLUPmPIHbaarH5KuGGpN79LyPnpoUKiVVIDcrD2vJ1GhUxaG7BUt8TJyXRt9RNxUa9phM1xo8SxN/ToPhL/B5ejICR9JQ53lq4erY3a+9/zM1mXMrIpHKwmkEjD+Sio4k0xunlKdvpJ1HJk7fSO0FuZNLhFLHkBc29JpxR4dtukSstprTp6E5knURzNukeBsRKwVwpD32O9/3t4b5ghNhUUntfecM9s9jDHjGi2V97SK+ESzsVF1Gq9u3P8AjGaNa+9xGsfjyEqqBe9Nx8SOnwEmKVmk7+DJ8R4BsSwFJyoP3rE2I9bc5JXJlweHvpDNbn1J9ZOyPCqijUxJi8fSrVLjT5RyPO/wjba0dKa/tOdZniXqkb7X5TZ8McOM6qwt0mUzTLqlN9bU7C/TlNNwbxAyuKai99uc6LuOio4ck1cTpOFRKSgOQD/GY7jLGrrD6jYXuAe/WwknirHVKSio4AFwLE9/xlRjcEmIpeIr+a3K+xmSQejxXKXyQMltVrBmY6Cdrn05RPGHDimpqRtj8vhKscO4rT4gaw56RNNl+VPVVTUc7dD6S3S2hRnFO/2ZDE4FqVMre47QsnwS1BqbZwe00uZU6QOksL/jINDCjxNNwCencRqVrZnnknO4oreJMrcIGG47CVeTZczuTp5dDtaa/MfEpI5YXUC4mMp50zOCbKO4EcW6OXJK1bLkZkbHyAVE8vowjOFzNwrBV0knckXkOipr1Cq8r872Bll/ZjLrNxYDobzPtnHjjyyJLVkRPDI3Zb7329YIgX/+oQTWket9I0Jy/KHQ6rbD6ydRzMXKAf7xta1c0ht3Ez9RHSqLXBvc+sSXLs45SdJo2WGFQbtcA/SVPE4qGwVSFtue8tlzYCnY7m20z2Pzt2upii2aONqyTgaKLSDVBb+usmtw8joHDHfkO0Ophi+FBv0vC4aeq6svIWsPQSm20aZJS0m7RUMtMeQHcHeavg7hNKgNV22HIe3WZjBZRUNZtIvZtzOgYJiiCkBpuINpKjaDbhxrZFw2YBMR4SONI+ks80x1KnZme/LraY/P8jRH1+JYk72JEzmYk6iCxK+pvKUbMJ79zRqs+qU8Q6lT3+trTf5LRp0aCjsBz9BMLwBkPieZgbDe02mP0Ovhg6QNudvrIyK1RtLyOWOONKq7Zi+Ns0Rrqtr359pZ5H/hKB2Ej47h+mGG9wep/OXuX4cKoC8hKxV8HB5iXp3fySqNMASUFup/rrG0tJBIIt0mzVqjy4vjJMrjh1CaHJIKgXN7333lG3DYepd9VhbQ2sWFuxtr+vyl3jXKkBOgsBfby9PflIdWtRKOGxPh1Rt4m4VD+yCwsQetjvOGmnR7SlFxTZDz7Jai1S1OrUAutqenUn3VB5EHpyvJeIw9QUiC92KeYjpffTzP7Nuck5eStMu+JSs//SQRYfq9z8ZDzTN1p01bQQKjkW3P3VBJ/wC4Q3dFQpu0QzjhTABNrdZLpcQalABFu8yGMzanUfTci56w8ywLU6dwdj1G0fH7m03ctFvn2bBmFK4YNty5X6zQcHcLgMKvy6c+85fldIvWW5uLjnO7ZPUZaA077S2uKouHlZIRcF8me+0XAGpoHNVPL4bGUvDuORV8MqSRNDxSahpM9wNrb9Jj8Ii4cF9erVuBtf4QTtUa+pKeNYqX/TSrjC5Koh5drShz6pikQhdvhuIOGuJiK1qgsDy9Jqc4xtOqDYX25+8KaZnmXovil2ceo1H16zfVfmY8lWqKvidQQfwtNVmVCnQS7gb/ADmafFKtRSpupPymi2YY5rppmgr5vVq0zZNrbj4TKUcEC/brabNMTSSnflcTLY3EBqg0jyjmRIi+6OfLjkk7FUcrqNfRt1v0jtJ3RlQn7zBTfl7yNgaBcl2dlT3O9vSR8bjRZrC9th79xBJ2cGPI4T5LtGhqYYqbaxt2glBRz3yjVfV12Hw+kOPhI9H/ANFfkvcXiXVAFXlKXMMw5Fh5hNN+lLRF6tjYTI59jkruCi2EcY7E5VHRrciwqYmhqfYnaQMRkGmoFI2J2PpJfDq+FSG9+tr8pbHG+Lz2t1kW09G2LK4LoafL9FPSttPK5Mr8JgzTaynYyVjqdR1IVj8JGy4VFcB+8fwLHF5JbNNh8MKNIvy6yjo5v49a1PzEXuI/xNiS1MrTPTeU/B9Hw6hYW3HXraVFasltxl+A+JcCXN2Yhu15K4X4ZBu9VSQOV5VY96lXFFrkqrbL37mdOwWMQUlUWBtveXeqNnki4UohhPDpHwgF2nLsVXxQqsTUPM+3wm2zXMm1lUa/tyEjVeFqtRNV9zBNfJphWKKbyrT6IeX49KtIrqu1ufr1mhyVCKQvvOX+PToswp3dgSCx2W4PNQD5h6m0Ris5rVBZqr6f2QdK/wClbA/GEY0zyfJnGapHTMfnVCj/AIlVQf2R5m/0rc/OZ7OuOz4bLhkZWIt4j2uP3EBO/qeXaYfxZIywg1qOrl41G/t4i3+k0OPijsGEyQYbCUEaxdU/vTe5Z6hZy+o9SWIv6Qqlam67FlI5gWv7e06RiaCONJQlfS1v9pzrMOGaVRrYepR8zW0CsSABuSjFSb7ctx6zGUPk6seStEZqeHWxbSX306gLqT1EzX2gitSqUDYCjUpvo6+dW/vQ4PI7ra3T2nQ8r4PCedwKhHLeyJblpNxf3tzkD7U8oByvUq70KlJk9FOmmx9rMYoxpjnl+Ys4pUAJuec1gxNGrh/D8QarWsdj6bnn8Jkq3cRoVZbgmEPJnB32XOR4dkr8rzoOZZ09Ch5OZ2t2v1M5jhc1el909Rsdx9eU6BwuBjEOrn6xSVdnp+Pnw5JcnqvgzhzPE1dqrFlJ5cppcgyejoLsPgd/9pLThchwOnvJeZNSoroYgbd5Lp6idWfPBNLF+zK56aVAqwXa8awnEA16FFwR9Zc59lSVsMHUg2FxMDh8OytyKsDtKW9BOcvJmr3Rq89yCrVTVq9hb+cx2Jy2ohAZdP4+021biFaSoLhieW/L4SHnOJNQoxXYWubfxkx5HFnaWq2iDmdIHCrobzD8plcJXKHzC4m1x4pW22LCRKHDwZTfnzBjTS0zF8k1KLM4ce7tYbKAbAD+t5No4AFVDEDVytvb1Mi0G0OyEAEEi80WS4OxZwNiABfl8JGZ0zhxqLn7ioGX4cbFjeCPY6uoqNenc35wRcn9j0fSh/gTeJcIDT1auUzmV4XVUFzLvPKV0Xz3v0EqKOCdfMAZcehxx37q0a/DZdqt5yAOkk5mE8M+GbEAzH0M2q6wnLvJuNxSooF7k85PB3sE3JNxJXCebEVLPv2mzxJRhqtvaZnAvQKKbC4lmcYCQVG0Grdjg5Xxso8LTepVYMTpudppcJgRT8w6iRTRpU0aoSNW5tKrEcWjwgFHm9ZotlZOL9sUXGU0qfjOTa/rKziEM9b+6ZgRe+m/4TT8P5WjIK1TmReWFIULkge/84WkTgkoSuatfY5jXrVaXNW9zNBmPFrrgmAOl6g8MdCAwOsjsQt/iRN5WyyjVT7otOT8e0Vp4kUk5JTB/wA1Q3/8QvzjW2Z+RnuLf6Rli2/9f13i7xlzHpoeUKKkevtHaPMH1H8YdAXsPYb7D3J6cxJGa4U0KlSmWRym2qkwem3lDeRxz529wYgPRjZJVqkeNWbwxcGmCbEeWwPToehlXgcnpU8TVw5XSVtiMO4JW6E/3ibHmGvv01jtNlg21ID3APzF5T8U4IMqOKgpVFbSlS4BAqjQ4352Ulv8kxmn2dOGaVxl0yJkeutWqkMDh6b6Ee1nrOttZYjZlVrgbcxLPizAePgsTRH69Goo9yh0/W0lZfgUo01p0xZEGkfDqT1J5k+slEbEH0lRTXZnkacvatHkxTdQR1APzjdZAB8RLHMsJ4VatS5eHVqJ8FcgfQCQqw2+M0MyDUO4/rvN39nma6EZAPMre+zC4+uqYWsNx8Zrvs4wZqNXINtKU/mWa30BimrRv4zrIvyXmZcY1Fq6VU+U79JR8RVHxTiowIFtvzl8mSHxCzKTv22Ml5u9OnT862/ORSrR7mT0koxu2yHwlRqBPDb7vT/eXeIyxHJXSCR1tE5JmNCpTHhsNXKP4pmpEEEXYzNto5Y2pNpnMM7yarSqm4O52P8ACM0syrINB39TvOmZufGSwW5HMzneaYgU3K2lwly7NMcISblNmiyDCrWCtUsLb+kLiDNVpnSm19tvzlZkzPXGmmbW+kqc/pMtUU3Yty+pkVctmWRR249EbBUWqVzci9ySek0Rxa1XSjTayotr8rt195D8anSUIgIDbMxHmPe0Vhq1OkqtTU2BuXfa59BziyPkzyoySlbNXTyehYaufWCZNuI3ubrfc72giqR6a/kca+GU2W5soI8TcCX/APxRhittG49JihR9YYoes6ngTZ531Mqo09fOsMx1BbH2lVWxlIm95XjDjvFjCjvLWFlQ8yULqi2y/M6SHzdZObiemBZQbCZv9F9YYwnrH6DYn5suXIt/7aRidZJB6dJDo4ynqYnkeUjjB+sWMAO8pePIUfOlGfJdmywXHFNKegg8rRNTjOl4ZAB1H0mQ/QB3i1y8d4fSsn66V2aN+O6oQIp5SjzXHGs7VW5uQfkoA+gEQuWjvI7b79Og7ASJ4nDsJeQ8vY1U5R4SNWMcSpJMyTSO/wDXSLZdrRgPvJJiA9S8LV/EwmGf9rD0G+dJTK/i1XBoutF6wHiqQgDFDUQKjlSe/Xp8dkfZvX1Zbgz2oIv+gaP/AFmiN7zOUbVFxdOwsGreGmqwYKtwNwDbkD1tHXH8PzidUD/hGhM85faNhvDzPFjozq4/z00Y/UmV2SYfBsXbG12pIoGlaalqtRiwJCqBy0qwJJFi6npNF9ryWzM/9VCifrUX/wBRMBjW81uwH5/jLJF55iKL1qjYdGp0S5NNH+8qnkpsTyN+p2tvHeHc6bCVTUXe6lWXuOYPuCB9ZUVW3EWgv79PyjY02mdEpfagoH+C3zEzPEnFjYsjy6VHSQqOFRlBtzH16xX6Ek3j43ygfly6GMDm7Un1ASbmHFdWpbdgRvzkc4JIRwqQfjMS8uS6ZbYHjqpTWxW5PW8z2YZm1Vy5Frm8fegnaMvRXtJ+mor6qbVWSMo4hfD6tI5xh81Z6oqNzvzO8YamO0QVHaS8KH68+rNXkNQVXZiNbAGw6Ko6yDmTayp3FMHcD1O9hGOH8eaTkDk40n0HcRrDYoozdQT8t9rTB4XytGbZpGzpU8qUVKiwBOxO3WFMvisWdZt3gkekybIcUIiKAnegFqYsNGhFgSkxDgaLVowIsS1ITQ+GjitIwMWrS1MlxJIMUGjIeLDy+SIcR2+xlfXq9F+ckYiuAu/8zK2pUPaw9ZyeRK5G2JUhNQx3Di9v6/jIpJjuH5ETA0JSSTRa6+234j+vSREjlFrN+9t+X9esQHoH7J8ZfLKI6q1ZPlVcgfIib+hWDID15H4Tln2OVNWCdf2K7f8AciN+c6NhTbbofoZmMmhd7327et+d5GxVTzG3t+ccWta57CQzADi/2wIRmFNu+GQf6alX85zjGm7t72+QA/CdL+2Rv+coelD+FR5zCo17nuSfnLQiM53h6rco253j1FmttaUBY4DEhhbkRvb8ZILyvoobgkWPcbXHr0khmnZiye2jGUNjpeNs8bvEmU5goimeNO8MiIYTNyKSQ2zRBMURCtIZQukY4YykeEEJhrhnO4U2glj/AGww2UAKNhBMfd9hFOFh2jgWDTNgsQFigIoLFaZVAN2irRYWK0QoBsRYhhIoJGAkQ7wwkVojEQ8QDqB7CJQ9SJKxVLy37fwkQbzmyLZcehp2J9pKagFUW3vffvsLQgggqVLKAejbexB/GJNUxsCtvA42gUxYEkZ1r7EsXeniV2+/Tbc2sdLKT630idRVT0YD2F/x/Cca+xarpq4kXsCtLb1vU/Kdkw9QHv8AKZvspDlSo7kgeRQR5hY6zbcb9L9LfGNV3dRs6X/6k1fRWEFIU9TsC5J0k3JKDbbR036+sbr1QeRMQHGvtlqE4ml38KxsCBfVc2B95zota2wPoeXxnRPtiA/SKZvuFt8wCP4Gc5qHnNEIPEIAqbbkXJ+X5wKlh+EVit2C9gLet/8AYR5Ogbl37S5dkojrU6W5fOSi8bOktYXv3tHdM0xLVikxJeJJjmmAzUixu8SY5aERALGWjd486xu0hlWJSPCNWjqwQBwQ4IxCxFAQWihKIsTpi9ENRFwCxASK0RQhx0AnRFaYYhwALTDCwxDgFhqsqcXh9DbcjuPylwohV6GtbH4Hse8mceSKTopVdoKyX94T6lJU8xFo05ujUYSp0MfW/S/xk1uHcS1Lx1oOafPUBzHcL94j1AtK+jiNI33HT0i0+htNdnVvsiwpRHqlb+I5AJ/ZpqRt/mZvlOm/2gEBaodCKCzMdgFUXJJ7AAzznk3GGOwwC0MQyKL2UqjqLm5AV1NtyZPzz7Rcfi6H6PWdNBILFUCs9jcK1tit7G1t7SXG2OzofCv2kJicdUw7KKVCq3/Kk7HUNrPfa9T73oxtve86FUHYX9ek8ohyT5b3BuLcwe4tym2xX2l5tURUDinYAF0phXcgW1MzXsx5nTbeNxQ0m+kaf7W8CNOtrKSEZdRsWIZlYL38p6TlOJbSNN+e9u21rx7FUcRVc1KpZ3PNqjamPxJvNxw5wngkpriMbXWo33vCp1FKKo5BwBqb1Gw95LlGJosOR/BkRkeJFMYl8PVWiQNNVqbCmRbY6yLWPQ8jeRK9MH0M9F5fmYenrpEFCNgd1dbcmB2KkdOxnCuL8DSXHVadDaidFRVH6i1Ka1NHwLED0tDHP1HROXG8ZV4Wltf4D2j+iLtBO+KpUcbdjemDTFkwCMVjRWJKx4iJNoBYyVjTpJJjVSS0NMYIhqYq0QJLLsdghQQESAIdododpZApbQyIFEUICCAilhiGBAYRMFooLD0wGBUigkNY8iwEIVYoiPCnDNOAFTm+FuuoDdefqP5fiYXCeGSriqaVACu7aTyYruFPp6dbS30SqwJ/R8ajC2kG4HTzKdj6XmGaOrRtifuSZ21sUFUN025dPSwmD434Up4hP0vBBWJuaiJ+vbmygbagQbja/vzuMJjVxGFxFMi5ZagABF9TIbBb+pEyOULWwy6qNYpq6Lupt6H9baefB8T2o+P6ypGMpU25hSfh+MWMFUP6vzsJra5qVahqODUY8yVtfpvpt844cGTbTSVf3mvf5nl6TV5Wax/iY/3SMpQw70zq227b/wBCa3BpSZAxU6jvYWsPa8bfLupKL87QxUoooU4gWHQadvxkyk5Gv0scKqMv2S30WA0Hblcgj15coaVyv3QPnf6GVb5nhl/+Vj7FvwsJGqZ3Q6KW9dI/iSZPGT+CHKC7yI6DwFitKVaW42crfcAG50r2A7TmdCm1izm7sdTH8JPwnEBJPhrptvfVbn+6BGSwPS3oOX1nZ40Gm2zyfPljlSxuxrTCKiPC0BAnYeaMFYemPWg0wAYIhaZIKwrQAjlI29OSmETaKgIRpGNOssSkYrptJaGmRRDhCCSWTLQwIFEUBLIFLDCwopYCDUR6lTvEIslUUAgAQoCKFAR0RcYDIoCLWmI7aHAABYCscEMiADHhzN8RD+8P7qzVgTK8Rf4x/wAn/jM8vRePsi0MY6HZuXK/Mex5iHQzioha1iG5gjyk97d5GqCMNOakzpWSUdplk+fVz+sB7KBI9TMqzc6jfO0iQR8UOWfLLuT/AGLaoTzJPuYm8KCMzbbDWLEQsWDEBa5Gly/sv4y2ND0vK/hvnV/yf+0uTUnTBe1GM3si6D2EbalJJqCNs4lkEUi0AYx1vaIgMGuFrirQlgIGuDUIloVoALaN1FMPSYRU94AQ3Q3hSWaJ7woqAKKUiFBEMWYoGCCMQsGGGgggAsMe8VrPeCCMBxah7yRTJ62gggBIEUYIIwCEzHFH+KP3V/i0EEzyf0lw7Kto08EE5kbCIIIIxAimgggASxaw4IgLrIB5XPdh9B/OWZEEE6of0oxn2JIiCIIJRIkwrQQQAEIwQQASYCYUEQA1ekIv6QQQGFrhwQQA/9k=" class="img-fluid rounded mb-3" alt="Fraser Stoddart">
          <h6 class="text-success">United Kingdom</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-success mb-3">Biography</h5>
          <p>Sir Fraser Stoddart is a Scottish chemist recognized for his work on molecular machines.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2016<br>
          <strong>Category:</strong> Chemistry<br>
          <strong>Citation:</strong> For the design and synthesis of molecular machines.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Prize with Jean-Pierre Sauvage and Bernard L. Feringa.</p>
        </div>
      </div>
    `
  },
  weiss: {
    title: 'Rainer Weiss - Physics Prize 2017',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Rainer Weiss">
          <h6 class="text-primary">USA</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-primary mb-3">Biography</h5>
          <p>Rainer Weiss is a German-born American physicist and professor emeritus at MIT.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2017<br>
          <strong>Category:</strong> Physics<br>
          <strong>Citation:</strong> For decisive contributions to the LIGO detector and the observation of gravitational waves.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Prize with Barry C. Barish and Kip S. Thorne.</p>
        </div>
      </div>
    `
  },
  mukwege: {
    title: 'Denis Mukwege - Peace Prize 2018',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Denis Mukwege">
          <h6 class="text-danger">Democratic Republic of the Congo</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-danger mb-3">Biography</h5>
          <p>Denis Mukwege is a Congolese gynecologist and human rights activist.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2018<br>
          <strong>Category:</strong> Peace<br>
          <strong>Citation:</strong> For efforts to end the use of sexual violence as a weapon of war and armed conflict.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Peace Prize with Nadia Murad.</p>
        </div>
      </div>
    `
  },
  banerjee: {
    title: 'Abhijit Banerjee - Economics Prize 2019',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Abhijit Banerjee">
          <h6 class="text-warning">India / USA</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-warning mb-3">Biography</h5>
          <p>Abhijit Banerjee is an Indian-American economist and professor at MIT.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2019<br>
          <strong>Category:</strong> Economics<br>
          <strong>Citation:</strong> For their experimental approach to alleviating global poverty.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Prize with Esther Duflo and Michael Kremer.</p>
        </div>
      </div>
    `
  },
  charpentier: {
    title: 'Emmanuelle Charpentier - Chemistry Prize 2020',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Emmanuelle Charpentier">
          <h6 class="text-success">France</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-success mb-3">Biography</h5>
          <p>Emmanuelle Charpentier is a French professor and researcher in microbiology, genetics, and biochemistry.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2020<br>
          <strong>Category:</strong> Chemistry<br>
          <strong>Citation:</strong> For the development of a method for genome editing (CRISPR-Cas9).</p>
          <h6 class="text-info mt-3">More</h6>
          <p>She shared the Nobel Prize with Jennifer Doudna.</p>
        </div>
      </div>
    `
  },
  gurnah: {
    title: 'Abdulrazak Gurnah - Literature Prize 2021',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Abdulrazak Gurnah">
          <h6 class="text-primary">Tanzania / UK</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-primary mb-3">Biography</h5>
          <p>Abdulrazak Gurnah is a Tanzanian-born British novelist and academic.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2021<br>
          <strong>Category:</strong> Literature<br>
          <strong>Citation:</strong> For his uncompromising and compassionate penetration of the effects of colonialism.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He is best known for his novels exploring the refugee experience.</p>
        </div>
      </div>
    `
  },
  paabo: {
    title: 'Svante Pääbo - Medicine Prize 2022',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Svante Pääbo">
          <h6 class="text-info">Sweden</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-info mb-3">Biography</h5>
          <p>Svante Pääbo is a Swedish geneticist specializing in evolutionary genetics.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2022<br>
          <strong>Category:</strong> Medicine<br>
          <strong>Citation:</strong> For his discoveries concerning the genomes of extinct hominins and human evolution.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He is a pioneer in paleogenetics.</p>
        </div>
      </div>
    `
  },
  mohammadi: {
    title: 'Narges Mohammadi - Peace Prize 2023',
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ39GIUeBqloa6ODVwBaT2iE5_etICiVoENQ&s" class="img-fluid rounded mb-3" alt="Narges Mohammadi">
          <h6 class="text-danger">Iran</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-danger mb-3">Biography</h5>
          <p>Narges Mohammadi is an Iranian human rights activist and journalist.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2023<br>
          <strong>Category:</strong> Peace<br>
          <strong>Citation:</strong> For her fight against the oppression of women in Iran and promoting human rights and freedom.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>She has been imprisoned multiple times for her activism.</p>
        </div>
      </div>
    `
  },
  agostini: {
    title: "Pierre Agostini - Physics Prize 2024",
    content: `
      <div class="row">
        <div class="col-md-4 text-center">
          <img src="data:image/jpeg;base64,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" class="img-fluid rounded mb-3" alt="Pierre Agostini">
          <h6 class="text-primary">France / USA</h6>
        </div>
        <div class="col-md-8">
          <h5 class="text-primary mb-3">Biography</h5>
          <p>Pierre Agostini is a French physicist known for his work in ultrafast laser science.</p>
          <h6 class="text-success mt-3">Nobel Prize Achievement</h6>
          <p><strong>Year:</strong> 2024<br>
          <strong>Category:</strong> Physics<br>
          <strong>Citation:</strong> For experimental methods that generate attosecond pulses of light for the study of electron dynamics in matter.</p>
          <h6 class="text-info mt-3">More</h6>
          <p>He shared the Nobel Prize with Ferenc Krausz and Anne L'Huillier.</p>
        </div>
      </div>
    `
  }
};


    const winner = winners[winnerId];
    if (winner) {
        document.getElementById('winnerModalTitle').innerHTML = winner.title;
        document.getElementById('winnerModalBody').innerHTML = winner.content;
        
        const modal = new bootstrap.Modal(document.getElementById('winnerModal'));
        modal.show();
    }
}

// History Details Modal
function showHistoryModal(eventId) {
    const events = {
        birth: {
            title: 'Alfred Nobel\'s Birth - 1833',
            content: `
                <h5 class="text-primary mb-3">Early Life</h5>
                <p>Alfred Bernhard Nobel was born on October 21, 1833, in Stockholm, Sweden. He was the third son of Immanuel Nobel and Andriette (Ahlsell) Nobel. His father was an inventor and engineer who built bridges and buildings in Stockholm.</p>
                
                <h6 class="text-success mt-3">Family Background</h6>
                <ul>
                    <li><strong>Father:</strong> Immanuel Nobel - Inventor and engineer</li>
                    <li><strong>Mother:</strong> Andriette Ahlsell Nobel</li>
                    <li><strong>Brothers:</strong> Robert, Ludvig, and Emil Nobel</li>
                </ul>
                
                <h6 class="text-warning mt-3">Early Challenges</h6>
                <p>The family faced financial difficulties when Alfred was young. His father's business ventures failed, leading the family to move to Russia in 1842 when Alfred was nine years old.</p>
            `
        },
        dynamite: {
            title: 'Invention of Dynamite - 1867',
            content: `
                <h5 class="text-warning mb-3">Revolutionary Invention</h5>
                <p>In 1867, Alfred Nobel invented dynamite, a safer and more powerful explosive than existing alternatives. This invention made him incredibly wealthy and famous worldwide.</p>
                
                <h6 class="text-success mt-3">Technical Innovation</h6>
                <ul>
                    <li>Stabilized nitroglycerin with diatomaceous earth</li>
                    <li>Made explosives safer to transport and handle</li>
                    <li>Revolutionized mining, construction, and warfare</li>
                    <li>Led to the construction of tunnels, canals, and railways</li>
                </ul>
                
                <h6 class="text-info mt-3">Business Impact</h6>
                <p>Nobel established factories across Europe and America, creating a global business empire. By the time of his death, he held 355 patents and controlled factories in 20 countries.</p>
            `
        },
        obituary: {
            title: 'The Premature Obituary - 1888',
            content: `
                <h5 class="text-danger mb-3">A Life-Changing Mistake</h5>
                <p>In 1888, a French newspaper mistakenly published Alfred Nobel's obituary instead of his brother Ludvig's, calling him "the merchant of death" for his invention of dynamite.</p>
                
                <h6 class="text-warning mt-3">The Obituary's Impact</h6>
                <p>The obituary read: "Dr. Alfred Nobel, who became rich by finding ways to kill more people faster than ever before, died yesterday." This deeply troubled Nobel, as he realized how he would be remembered.</p>
                
                <h6 class="text-success mt-3">A Turning Point</h6>
                <ul>
                    <li>Made Nobel reflect on his legacy</li>
                    <li>Motivated him to use his wealth for positive purposes</li>
                    <li>Led to his decision to establish the Nobel Prizes</li>
                    <li>Transformed his image from "merchant of death" to benefactor of humanity</li>
                </ul>
            `
        },
        will: {
            title: 'Nobel\'s Last Will - 1895',
            content: `
                <h5 class="text-success mb-3">The Testament That Changed History</h5>
                <p>On November 27, 1895, Alfred Nobel signed his last will and testament at the Swedish-Norwegian Club in Paris, establishing the Nobel Prizes.</p>
                
                <h6 class="text-primary mt-3">The Will's Provisions</h6>
                <ul>
                    <li>Left 94% of his assets (31 million Swedish kronor) for the prizes</li>
                    <li>Established five prize categories: Physics, Chemistry, Medicine, Literature, and Peace</li>
                    <li>Specified that prizes should go to those who "conferred the greatest benefit to humankind"</li>
                    <li>Required that nationality should not be considered in awarding prizes</li>
                </ul>
                
                <h6 class="text-warning mt-3">Controversy and Challenges</h6>
                <p>The will was controversial and faced legal challenges from Nobel's family and various governments. It took five years to establish the Nobel Foundation and begin awarding prizes.</p>
            `
        },
        death: {
            title: 'Nobel\'s Death - 1896',
            content: `
                <h5 class="text-info mb-3">The End of an Era</h5>
                <p>Alfred Nobel died on December 10, 1896, at his villa in San Remo, Italy, at the age of 63. He suffered a stroke and died alone, attended only by his servants.</p>
                
                <h6 class="text-danger mt-3">Final Years</h6>
                <ul>
                    <li>Lived as a recluse in his later years</li>
                    <li>Suffered from poor health, including heart problems</li>
                    <li>Never married and had no children</li>
                    <li>Maintained correspondence with Bertha von Suttner, a peace activist</li>
                </ul>
                
                <h6 class="text-success mt-3">Legacy Begins</h6>
                <p>His death triggered the implementation of his will, leading to the establishment of the Nobel Foundation in 1900 and the first Nobel Prize ceremony in 1901.</p>
            `
        },
        first: {
            title: 'First Nobel Prizes - 1901',
            content: `
                <h5 class="text-primary mb-3">Historic First Awards</h5>
                <p>On December 10, 1901, the first Nobel Prizes were awarded in Stockholm and Kristiania (now Oslo), exactly five years after Alfred Nobel's death.</p>
                
                <h6 class="text-success mt-3">The First Laureates</h6>
                <ul>
                    <li><strong>Physics:</strong> Wilhelm Röntgen (Germany) - Discovery of X-rays</li>
                    <li><strong>Chemistry:</strong> Jacobus van 't Hoff (Netherlands) - Chemical thermodynamics</li>
                    <li><strong>Medicine:</strong> Emil von Behring (Germany) - Serum therapy for diphtheria</li>
                    <li><strong>Literature:</strong> Sully Prudhomme (France) - Poetic composition</li>
                    <li><strong>Peace:</strong> Henry Dunant (Switzerland) and Frédéric Passy (France)</li>
                </ul>
                
                <h6 class="text-warning mt-3">Ceremony Details</h6>
                <p>The ceremony was held at the Royal Academy of Music in Stockholm, with King Oscar II of Sweden presenting the awards. The Peace Prize was awarded separately in Kristiania, Norway.</p>
            `
        },
        economics: {
            title: 'Economics Prize Established - 1969',
            content: `
                <h5 class="text-secondary mb-3">The Sixth Nobel Prize</h5>
                <p>In 1969, the Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel was established by the Swedish National Bank to commemorate the bank's 300th anniversary.</p>
                
                <h6 class="text-primary mt-3">Key Details</h6>
                <ul>
                    <li>Not technically a "Nobel Prize" but administered by the Nobel Foundation</li>
                    <li>First awarded in 1969 to Ragnar Frisch and Jan Tinbergen</li>
                    <li>Recognizes contributions to economic sciences</li>
                    <li>Follows the same selection process as other Nobel Prizes</li>
                </ul>
                
                <h6 class="text-success mt-3">Notable Laureates</h6>
                <ul>
                    <li>Milton Friedman (1976) - Monetary theory</li>
                    <li>Amartya Sen (1998) - Welfare economics</li>
                    <li>Paul Krugman (2008) - International trade theory</li>
                    <li>Esther Duflo (2019) - First woman to win, development economics</li>
                </ul>
            `
        }
    };

    const event = events[eventId];
    if (event) {
        document.getElementById('historyModalTitle').innerHTML = event.title;
        document.getElementById('historyModalBody').innerHTML = event.content;
        
        const modal = new bootstrap.Modal(document.getElementById('historyModal'));
        modal.show();
    }
}

// Event Timer
function initializeEventTimer() {
    // Check if timer elements exist
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return; // Exit if timer elements don't exist on this page
    }
    
    const eventDate = new Date('December 10, 2025 16:30:00 GMT+0100').getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            const timerContainer = document.getElementById('eventTimer');
            if (timerContainer) {
                timerContainer.innerHTML = '<h3 class="text-warning">Event has started!</h3>';
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }, 1000);
}

// Event Modal
function showEventModal(eventType) {
    const events = {
        upcoming: {
            title: 'Upcoming Nobel Prize Events',
            content: `
                <h5 class="text-success mb-3">2025 Nobel Prize Ceremony</h5>
                <p><strong>Date:</strong> December 10, 2025</p>
                <p><strong>Time:</strong> 4:30 PM CET</p>
                <p><strong>Location:</strong> Stockholm Concert Hall, Sweden</p>
                
                <h6 class="text-primary mt-3">Schedule</h6>
                <ul>
                    <li><strong>October 2025:</strong> Prize announcements throughout the month</li>
                    <li><strong>December 8:</strong> Nobel Prize lectures begin</li>
                    <li><strong>December 10:</strong> Award ceremony and banquet</li>
                </ul>
                
                <h6 class="text-warning mt-3">How to Watch</h6>
                <p>The ceremony will be broadcast live on Nobel Prize official website, YouTube, and major international news networks.</p>
            `
        },
        past: {
            title: 'Recent Nobel Prize Ceremonies',
            content: `
                <h5 class="text-info mb-3">2024 Nobel Prize Ceremony</h5>
                <p>The 2024 ceremony celebrated groundbreaking achievements in AI and protein research.</p>
                
                <h6 class="text-primary mt-3">2024 Highlights</h6>
                <ul>
                    <li><strong>Physics:</strong> Geoffrey Hinton and John Hopfield for artificial neural networks</li>
                    <li><strong>Chemistry:</strong> David Baker, Demis Hassabis, and John Jumper for protein design</li>
                    <li><strong>Medicine:</strong> Victor Ambros and Gary Ruvkun for microRNA discovery</li>
                </ul>
                
                <h6 class="text-success mt-3">2023 Ceremony</h6>
                <p>Honored Katalin Karikó and Drew Weissman for mRNA vaccine technology that was crucial in fighting COVID-19.</p>
            `
        },
        info: {
            title: 'Nobel Prize Ceremony Information',
            content: `
                <h5 class="text-primary mb-3">Ceremony Details</h5>
                
                <h6 class="text-success">Location & Timing</h6>
                <ul>
                    <li><strong>Stockholm Concert Hall:</strong> Physics, Chemistry, Medicine, Literature, Economics</li>
                    <li><strong>Oslo City Hall:</strong> Peace Prize (Norway)</li>
                    <li><strong>Date:</strong> December 10th (anniversary of Alfred Nobel's death)</li>
                    <li><strong>Time:</strong> 4:30 PM CET</li>
                </ul>
                
                <h6 class="text-warning mt-3">Ceremony Program</h6>
                <ul>
                    <li>Royal Swedish Academy presentations</li>
                    <li>Prize presentations by Swedish Royal Family</li>
                    <li>Nobel lectures by laureates</li>
                    <li>Musical performances</li>
                    <li>Nobel Banquet following ceremony</li>
                </ul>
                
                <h6 class="text-info mt-3">Attendance</h6>
                <p>Limited to 1,300 invited guests including laureates' families, diplomats, scientists, and cultural figures.</p>
            `
        }
    };

    const event = events[eventType];
    if (event) {
        document.getElementById('eventModalTitle').innerHTML = event.title;
        document.getElementById('eventModalBody').innerHTML = event.content;
        
        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        modal.show();
    }
}

// Add modals for other pages
function showAboutModal(section) {
    const sections = {
        mission: {
            title: 'Our Mission - NobelVision',
            content: `
                <h5 class="text-primary mb-3">Dedicated to Excellence</h5>
                <p>NobelVision was founded with the vision of making Nobel Prize achievements accessible to everyone worldwide. We believe that the stories of Nobel laureates can inspire future generations of scientists, writers, and peacemakers.</p>
                
                <h6 class="text-success mt-3">Our Goals</h6>
                <ul>
                    <li>Preserve and share Nobel Prize history</li>
                    <li>Inspire young minds through laureate stories</li>
                    <li>Promote scientific literacy and peace</li>
                    <li>Bridge the gap between complex research and public understanding</li>
                </ul>
                
                <h6 class="text-warning mt-3">Educational Impact</h6>
                <p>Through interactive content, detailed biographies, and comprehensive resources, we aim to make Nobel Prize achievements understandable and inspiring for students, educators, and curious minds everywhere.</p>
            `
        },
        vision: {
            title: 'Our Vision - Creating Global Impact',
            content: `
                <h5 class="text-primary mb-3">A World Inspired by Excellence</h5>
                <p>We envision a world where Nobel Prize achievements serve as beacons of hope and inspiration, encouraging innovation, peace, and human progress across all cultures and communities.</p>
                
                <h6 class="text-success mt-3">Digital Innovation</h6>
                <ul>
                    <li>Interactive learning experiences</li>
                    <li>Virtual museum exhibitions</li>
                    <li>AI-powered research tools</li>
                    <li>Global educational partnerships</li>
                </ul>
                
                <h6 class="text-info mt-3">Future Plans</h6>
                <p>We're developing virtual reality experiences, mobile applications, and partnerships with educational institutions worldwide to make Nobel Prize stories more accessible than ever before.</p>
            `
        },
        values: {
            title: 'Our Core Values',
            content: `
                <h5 class="text-danger mb-3">Principles That Guide Us</h5>
                
                <h6 class="text-primary">Excellence in Research and Innovation</h6>
                <p>We maintain the highest standards in presenting accurate, well-researched information about Nobel Prize achievements and their impact on humanity.</p>
                
                <h6 class="text-success">Commitment to Human Progress</h6>
                <p>Every story we share aims to highlight how individual achievements contribute to the betterment of all humanity.</p>
                
                <h6 class="text-warning">Educational Accessibility</h6>
                <p>We believe knowledge should be free and accessible to everyone, regardless of background, location, or economic status.</p>
                
                <h6 class="text-info">Global Collaboration</h6>
                <p>We work with international partners, educators, and institutions to create a truly global platform for Nobel Prize education.</p>
            `
        },
        foundation: {
            title: 'The Nobel Foundation - Legacy of Excellence',
            content: `
                <h5 class="text-primary mb-3">Guardians of Nobel's Vision</h5>
                <p>The Nobel Foundation, established in 1900, serves as the legal owner and functional administrator of the funds and institutions connected with the Nobel Prizes.</p>
                
                <h6 class="text-success mt-3">Key Responsibilities</h6>
                <ul>
                    <li>Managing Nobel Prize endowment funds</li>
                    <li>Overseeing prize selection processes</li>
                    <li>Organizing annual Nobel Prize ceremonies</li>
                    <li>Promoting Nobel Prize ideals globally</li>
                </ul>
                
                <h6 class="text-warning mt-3">Global Impact</h6>
                <p>The Foundation ensures that Alfred Nobel's vision of recognizing those who "confer the greatest benefit to humankind" continues to inspire and reward excellence across generations.</p>
                
                <h6 class="text-info mt-3">Modern Initiatives</h6>
                <p>Today, the Foundation actively promotes science education, peace initiatives, and cultural exchange programs worldwide.</p>
            `
        }
    };

    const section_data = sections[section];
    if (section_data) {
        document.getElementById('aboutModalTitle').innerHTML = section_data.title;
        document.getElementById('aboutModalBody').innerHTML = section_data.content;
        
        const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
        modal.show();
    }
}

// Team Modal
function showTeamModal(memberId) {
    const members = {
        zain: {
            title: 'Zain Ansari - Team Leader',
            content: `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 120px; height: 120px;">
                            <i class="fas fa-crown text-white fa-4x"></i>
                        </div>
                        <h6 class="text-primary">Team Leader</h6>
                    </div>
                    <div class="col-md-8">
                        <h5 class="text-primary mb-3">About Zain Ansari</h5>
                        <p>Zain Ansari leads the Wings of Wisdom project with passion and dedication. As the team leader, he coordinates all aspects of the project and ensures that the team works together effectively to create an outstanding educational platform about Nobel Prize.</p>
                        
                        <h6 class="text-success mt-3">Leadership Skills</h6>
                        <ul>
                            <li>Project Management & Leadership</li>
                            <li>Team Coordination & Development</li>
                            <li>Strategic Planning</li>
                            <li>Quality Assurance</li>
                        </ul>
                        
                        <h6 class="text-warning mt-3">Contact</h6>
                        <p><i class="fas fa-envelope me-2"></i>gamerzain131@gmail.com</p>
                        
                        <h6 class="text-info mt-3">Vision</h6>
                        <p>Zain Ansari is passionate about making educational content accessible and engaging. He believes in the power of teamwork and strives to bring out the best in every team member.</p>
                    </div>
                </div>
            `
        },
        abdul: {
            title: 'Abdul wasay - Frontend Developer',
            content: `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 120px; height: 120px;">
                            <i class="fas fa-code text-white fa-4x"></i>
                        </div>
                        <h6 class="text-success">Frontend Developer</h6>
                    </div>
                    <div class="col-md-8">
                        <h5 class="text-success mb-3">About Abdul wasay</h5>
                        <p>Abdul wasay is a skilled frontend developer who brings the Wings of Wisdom website to life. He specializes in creating responsive, interactive web interfaces using modern technologies.</p>
                        
                        <h6 class="text-primary mt-3">Technical Skills</h6>
                        <ul>
                            <li>HTML5, CSS3, JavaScript</li>
                            <li>Bootstrap & Responsive Design</li>
                            <li>Frontend Frameworks</li>
                            <li>User Interface Development</li>
                        </ul>
                        
                        <h6 class="text-warning mt-3">Contact</h6>
                        <p><i class="fas fa-envelope me-2"></i>aw3922179@gmail.com</p>
                        
                        <h6 class="text-info mt-3">Approach</h6>
                        <p>Abdul focuses on creating clean, maintainable code and ensuring the website works perfectly across all devices and browsers.</p>
                    </div>
                </div>
            `
        },
        ayan: {
            title: 'Ayan - UI/UX Designer',
            content: `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 120px; height: 120px;">
                            <i class="fas fa-palette text-white fa-4x"></i>
                        </div>
                        <h6 class="text-warning">UI/UX Designer</h6>
                    </div>
                    <div class="col-md-8">
                        <h5 class="text-warning mb-3">About Ayan</h5>
                        <p>Ayan is the creative designer behind Wings of Wisdom's beautiful and intuitive interface. He focuses on creating user-friendly designs that make learning about Nobel Prize winners engaging and accessible.</p>
                        
                        <h6 class="text-primary mt-3">Design Skills</h6>
                        <ul>
                            <li>User Interface Design</li>
                            <li>User Experience Design</li>
                            <li>Visual Design & Graphics</li>
                            <li>Design Systems</li>
                        </ul>
                        
                        <h6 class="text-success mt-3">Contact</h6>
                        <p><i class="fas fa-envelope me-2"></i>aayanahmer2k@gmail.com</p>
                        
                        <h6 class="text-info mt-3">Philosophy</h6>
                        <p>Ayan believes that great design should be both beautiful and functional, creating experiences that users love and find easy to navigate.</p>
                    </div>
                </div>
            `
        },
        basit: {
            title: 'Basit - Content Researcher',
            content: `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="bg-info rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 120px; height: 120px;">
                            <i class="fas fa-search text-white fa-4x"></i>
                        </div>
                        <h6 class="text-info">Content Researcher</h6>
                    </div>
                    <div class="col-md-8">
                        <h5 class="text-info mb-3">About Basit</h5>
                        <p>Basit is responsible for researching and curating accurate, engaging content about Nobel Prize winners and their achievements. He ensures all information on the platform is factual and well-presented.</p>
                        
                        <h6 class="text-primary mt-3">Research Skills</h6>
                        <ul>
                            <li>Academic Research</li>
                            <li>Content Curation</li>
                            <li>Fact Verification</li>
                            <li>Information Organization</li>
                        </ul>
                        
                        <h6 class="text-success mt-3">Contact</h6>
                        <p><i class="fas fa-envelope me-2"></i>abdulbasitnadeem0707@gmail.com</p>
                        
                        <h6 class="text-warning mt-3">Focus</h6>
                        <p>Basit is dedicated to making complex scientific and literary achievements accessible to everyone through clear, engaging content.</p>
                    </div>
                </div>
            `
        },
        gull: {
            title: 'Gull Aman - Analyst',
            content: `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 120px; height: 120px;">
                            <i class="fas fa-chart-line text-white fa-4x"></i>
                        </div>
                        <h6 class="text-danger">Analyst</h6>
                    </div>
                    <div class="col-md-8">
                        <h5 class="text-danger mb-3">About Gull Aman</h5>
                        <p>Gull Aman serves as the project analyst for Wings of Wisdom, focusing on research, data analysis, and content strategy. He ensures that the information presented is accurate and well-organized.</p>
                        
                        <h6 class="text-primary mt-3">Analytical Skills</h6>
                        <ul>
                            <li>Data Analysis</li>
                            <li>Research & Documentation</li>
                            <li>Content Strategy</li>
                            <li>Quality Control</li>
                        </ul>
                        
                        <h6 class="text-success mt-3">Contact</h6>
                        <p><i class="fas fa-envelope me-2"></i>gulamankhan095@gmail.com</p>
                        
                        <h6 class="text-info mt-3">Methodology</h6>
                        <p>Gull Aman believes in thorough research and data-driven decisions. He ensures that all content is factually accurate and presented in the most effective way.</p>
                    </div>
                </div>
            `
        }
    };

    const member = members[memberId];
    if (member) {
        document.getElementById('teamModalTitle').innerHTML = member.title;
        document.getElementById('teamModalBody').innerHTML = member.content;
        
        const modal = new bootstrap.Modal(document.getElementById('teamModal'));
        modal.show();
    }
}

// Timeline Modal for Nomination Page
function showTimelineModal(timelineId) {
    const timelineData = {
        deadline: {
            title: 'Nomination Deadline - February 1st',
            content: `
                <div class="row">
                    <div class="col-md-12">
                        <h5 class="text-danger mb-3">Submission Requirements</h5>
                        <p>All nominations for Nobel Prizes must be submitted by February 1st each year. This strict deadline ensures adequate time for the comprehensive review process.</p>
                        
                        <h6 class="text-primary mt-3">Required Documents</h6>
                        <ul>
                            <li>Detailed nomination letter explaining the nominee's contributions</li>
                            <li>Curriculum vitae of the nominee</li>
                            <li>List of most important publications or achievements</li>
                            <li>Supporting documentation and evidence</li>
                        </ul>
                        
                        <h6 class="text-success mt-3">Submission Process</h6>
                        <p>Nominations must be submitted through official channels by qualified nominators. Self-nominations are not accepted for any Nobel Prize category.</p>
                        
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Important:</strong> Late submissions are not considered under any circumstances.
                        </div>
                    </div>
                </div>
            `
        },
        review: {
            title: 'Expert Evaluation Period - March to August',
            content: `
                <div class="row">
                    <div class="col-md-12">
                        <h5 class="text-warning mb-3">Comprehensive Review Process</h5>
                        <p>During this period, expert committees conduct thorough evaluations of all nominations with the help of international specialists.</p>
                        
                        <h6 class="text-primary mt-3">Review Stages</h6>
                        <ol>
                            <li><strong>Initial Screening:</strong> All nominations are reviewed for completeness and eligibility</li>
                            <li><strong>Expert Assessment:</strong> Specialists in relevant fields evaluate the scientific/literary merit</li>
                            <li><strong>Committee Deliberation:</strong> Nobel committees discuss and debate the nominations</li>
                            <li><strong>External Review:</strong> Additional experts may be consulted for specialized knowledge</li>
                        </ol>
                        
                        <h6 class="text-success mt-3">Evaluation Criteria</h6>
                        <ul>
                            <li>Significance of the contribution to humanity</li>
                            <li>Originality and innovation of the work</li>
                            <li>Impact on the respective field</li>
                            <li>Adherence to Alfred Nobel's vision</li>
                        </ul>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Confidentiality:</strong> All deliberations are kept strictly confidential for 50 years.
                        </div>
                    </div>
                </div>
            `
        },
        announcement: {
            title: 'Winner Announcement - October',
            content: `
                <div class="row">
                    <div class="col-md-12">
                        <h5 class="text-success mb-3">Public Revelation</h5>
                        <p>The Nobel Prize winners are announced to the world during the first two weeks of October, creating global excitement and recognition.</p>
                        
                        <h6 class="text-primary mt-3">Announcement Schedule</h6>
                        <ul>
                            <li><strong>Physiology or Medicine:</strong> First Monday of October</li>
                            <li><strong>Physics:</strong> Tuesday following Medicine</li>
                            <li><strong>Chemistry:</strong> Wednesday following Physics</li>
                            <li><strong>Literature:</strong> Thursday (date varies)</li>
                            <li><strong>Peace Prize:</strong> Friday (announced in Oslo)</li>
                            <li><strong>Economics:</strong> Second Monday of October</li>
                        </ul>
                        
                        <h6 class="text-warning mt-3">Media Coverage</h6>
                        <p>The announcements receive worldwide media attention, with press conferences held immediately after each announcement to provide detailed information about the laureates and their achievements.</p>
                        
                        <h6 class="text-info mt-3">Laureate Notification</h6>
                        <p>Winners are typically contacted by phone shortly before the public announcement. Many laureates describe receiving "the call" as a life-changing moment.</p>
                        
                        <div class="alert alert-success">
                            <i class="fas fa-trophy me-2"></i>
                            <strong>Recognition:</strong> Becoming a Nobel laureate brings international recognition and responsibility.
                        </div>
                    </div>
                </div>
            `
        },
        ceremony: {
            title: 'Nobel Prize Ceremony - December 10th',
            content: `
                <div class="row">
                    <div class="col-md-12">
                        <h5 class="text-primary mb-3">Grand Celebration</h5>
                        <p>The Nobel Prize ceremony takes place annually on December 10th, the anniversary of Alfred Nobel's death, in Stockholm (except Peace Prize in Oslo).</p>
                        
                        <h6 class="text-warning mt-3">Ceremony Locations</h6>
                        <ul>
                            <li><strong>Stockholm, Sweden:</strong> Physics, Chemistry, Medicine, Literature, and Economics</li>
                            <li><strong>Oslo, Norway:</strong> Peace Prize (as specified in Nobel's will)</li>
                        </ul>
                        
                        <h6 class="text-success mt-3">Ceremony Highlights</h6>
                        <ul>
                            <li>Formal presentation by the Swedish Royal Family</li>
                            <li>Nobel lectures by the laureates</li>
                            <li>Traditional Nobel banquet</li>
                            <li>Cultural performances and celebrations</li>
                            <li>Global television broadcast</li>
                        </ul>
                        
                        <h6 class="text-info mt-3">Prize Components</h6>
                        <ul>
                            <li><strong>Gold Medal:</strong> Unique design for each category</li>
                            <li><strong>Diploma:</strong> Artistic work created specifically for each laureate</li>
                            <li><strong>Prize Money:</strong> Currently 10 million Swedish kronor per prize</li>
                        </ul>
                        
                        <div class="alert alert-primary">
                            <i class="fas fa-crown me-2"></i>
                            <strong>Tradition:</strong> The ceremony maintains traditions established over more than a century.
                        </div>
                    </div>
                </div>
            `
        }
    };

    const timeline = timelineData[timelineId];
    if (timeline) {
        document.getElementById('timelineModalTitle').innerHTML = timeline.title;
        document.getElementById('timelineModalBody').innerHTML = timeline.content;
        
        const modal = new bootstrap.Modal(document.getElementById('timelineModal'));
        modal.show();
    }
}

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Laureate Modal
function showLaureateModal(laureateId) {
    const laureates = {
        einstein: {
            title: 'Albert Einstein - Physics Prize 1921',
            content: `
                <h5 class="text-primary mb-3">The Genius of Modern Physics</h5>
                <p>Albert Einstein revolutionized our understanding of space, time, and gravity with his theories of relativity.</p>
                
                <h6 class="text-success mt-3">Key Achievements</h6>
                <ul>
                    <li>Special Theory of Relativity (1905)</li>
                    <li>General Theory of Relativity (1915)</li>
                    <li>Explanation of Photoelectric Effect</li>
                    <li>Mass-Energy Equivalence (E=mc²)</li>
                </ul>
                
                <h6 class="text-warning mt-3">Nobel Prize</h6>
                <p><strong>Year:</strong> 1921<br><strong>Citation:</strong> "For his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect"</p>
            `
        },
        curie: {
            title: 'Marie Curie - Double Nobel Laureate',
            content: `
                <h5 class="text-success mb-3">Pioneer in Radioactivity</h5>
                <p>Marie Curie was the first woman to win a Nobel Prize and remains the only person to win Nobel Prizes in two different scientific fields.</p>
                
                <h6 class="text-primary mt-3">Nobel Prizes</h6>
                <ul>
                    <li><strong>1903 Physics:</strong> Joint research on radiation phenomena</li>
                    <li><strong>1911 Chemistry:</strong> Discovery of radium and polonium</li>
                </ul>
                
                <h6 class="text-warning mt-3">Legacy</h6>
                <p>Her work opened the path for nuclear physics and chemistry, and she broke barriers for women in science.</p>
            `
        },
        mandela: {
            title: 'Nelson Mandela - Peace Prize 1993',
            content: `
                <h5 class="text-info mb-3">Champion of Human Rights</h5>
                <p>Nelson Mandela fought against apartheid and became South Africa's first Black president, promoting reconciliation and human rights.</p>
                
                <h6 class="text-success mt-3">Achievements</h6>
                <ul>
                    <li>Led anti-apartheid movement</li>
                    <li>27 years in prison for his beliefs</li>
                    <li>First Black President of South Africa</li>
                    <li>Promoted racial reconciliation</li>
                </ul>
                
                <h6 class="text-warning mt-3">Nobel Peace Prize</h6>
                <p><strong>Year:</strong> 1993 (shared with F.W. de Klerk)<br><strong>Citation:</strong> "For their work for the peaceful termination of the apartheid regime"</p>
            `
        },
        teresa: {
            title: 'Mother Teresa - Peace Prize 1979',
            content: `
                <h5 class="text-warning mb-3">Saint of the Gutters</h5>
                <p>Mother Teresa dedicated her life to serving the poorest of the poor in Calcutta, India, becoming a symbol of compassion worldwide.</p>
                
                <h6 class="text-success mt-3">Humanitarian Work</h6>
                <ul>
                    <li>Worked with the dying and destitute in Calcutta</li>
                    <li>Established Missionaries of Charity</li>
                    <li>Opened homes for orphans and the sick</li>
                    <li>Canonized as Saint Teresa of Calcutta</li>
                </ul>
                
                <h6 class="text-primary mt-3">Nobel Peace Prize</h6>
                <p><strong>Year:</strong> 1979<br><strong>Citation:</strong> "For work undertaken in the struggle to overcome poverty and distress"</p>
            `
        }
    };

    const laureate = laureates[laureateId];
    if (laureate) {
        document.getElementById('historyModalTitle').innerHTML = laureate.title;
        document.getElementById('historyModalBody').innerHTML = laureate.content;
        
        const modal = new bootstrap.Modal(document.getElementById('historyModal'));
        modal.show();
    }
}

// Category Modal
function showCategoryModal(categoryId) {
    const categories = {
        physics: {
            title: 'Physics Prize History',
            content: `
                <h5 class="text-primary mb-3">Advancing Human Understanding</h5>
                <p>The Nobel Prize in Physics has recognized groundbreaking discoveries that have revolutionized our understanding of the universe.</p>
                
                <h6 class="text-success mt-3">Notable Discoveries</h6>
                <ul>
                    <li><strong>1901:</strong> Wilhelm Röntgen - X-rays</li>
                    <li><strong>1921:</strong> Albert Einstein - Photoelectric effect</li>
                    <li><strong>1965:</strong> Richard Feynman - Quantum electrodynamics</li>
                    <li><strong>2020:</strong> Roger Penrose - Black hole formation</li>
                </ul>
                
                <h6 class="text-warning mt-3">Impact</h6>
                <p>Physics laureates have given us technologies like lasers, transistors, MRI machines, and GPS systems that shape modern life.</p>
            `
        },
        chemistry: {
            title: 'Chemistry Prize History',
            content: `
                <h5 class="text-success mb-3">Transforming Matter and Life</h5>
                <p>Chemistry Nobel Prizes have recognized discoveries that have transformed medicine, materials, and our understanding of life itself.</p>
                
                <h6 class="text-primary mt-3">Breakthrough Discoveries</h6>
                <ul>
                    <li><strong>1911:</strong> Marie Curie - Radium and polonium</li>
                    <li><strong>1962:</strong> DNA structure determination</li>
                    <li><strong>1985:</strong> Fullerenes discovery</li>
                    <li><strong>2020:</strong> CRISPR gene editing</li>
                </ul>
                
                <h6 class="text-warning mt-3">Applications</h6>
                <p>Chemistry laureates have developed plastics, pharmaceuticals, catalysts, and tools that have revolutionized industry and medicine.</p>
            `
        },
        medicine: {
            title: 'Medicine Prize History',
            content: `
                <h5 class="text-danger mb-3">Saving Lives and Healing</h5>
                <p>The Nobel Prize in Physiology or Medicine has honored discoveries that have saved millions of lives and advanced human health.</p>
                
                <h6 class="text-success mt-3">Life-Saving Discoveries</h6>
                <ul>
                    <li><strong>1945:</strong> Alexander Fleming - Penicillin</li>
                    <li><strong>1988:</strong> Discovery of HIV</li>
                    <li><strong>2015:</strong> Treatments for parasitic diseases</li>
                    <li><strong>2023:</strong> mRNA vaccine technology</li>
                </ul>
                
                <h6 class="text-warning mt-3">Medical Revolution</h6>
                <p>Medicine laureates have given us antibiotics, vaccines, cancer treatments, and diagnostic tools that have transformed healthcare.</p>
            `
        }
    };

    const category = categories[categoryId];
    if (category) {
        document.getElementById('historyModalTitle').innerHTML = category.title;
        document.getElementById('historyModalBody').innerHTML = category.content;
        
        const modal = new bootstrap.Modal(document.getElementById('historyModal'));
        modal.show();
    }
}
// Nobel Prize Information Modal
function showNobelInfoModal(infoType) {
    const nobelInfo = {
        history: {
            title: 'How Nobel Prize Started',
            content: `
                <h5 class="text-primary mb-3">Alfred Nobel's Story</h5>
                <p>Alfred Nobel was a Swedish scientist who invented dynamite in 1867. He became very rich but was worried about how people would remember him.</p>
                
                <h6 class="text-success mt-3">The Turning Point</h6>
                <p>In 1888, a newspaper accidentally printed his obituary (death notice) calling him "the merchant of death" because his inventions were used in wars. This made him very sad.</p>
                
                <h6 class="text-warning mt-3">His Decision</h6>
                <p>Nobel decided to use his money to create prizes for people who help humanity instead of harm it. When he died in 1896, he left most of his fortune to create these awards.</p>
                
                <h6 class="text-info mt-3">First Awards</h6>
                <p>The first Nobel Prizes were given in 1901, exactly 5 years after Nobel's death. Since then, they've been awarded every year (except during world wars).</p>
            `
        },
        purpose: {
            title: 'Why Nobel Prize Exists',
            content: `
                <h5 class="text-success mb-3">Rewarding Good Work</h5>
                <p>The Nobel Prize exists to find and reward people who make the world a better place through their work and discoveries.</p>
                
                <h6 class="text-primary mt-3">What Kind of Work Gets Rewarded?</h6>
                <ul>
                    <li><strong>Science:</strong> Discovering new medicines, understanding how the universe works</li>
                    <li><strong>Literature:</strong> Writing books that inspire and educate people</li>
                    <li><strong>Peace:</strong> Helping countries stop fighting, protecting human rights</li>
                    <li><strong>Economics:</strong> Finding better ways to manage money and resources</li>
                </ul>
                
                <h6 class="text-warning mt-3">The Goal</h6>
                <p>Nobel wanted to encourage people to work for the "greatest benefit to humankind" - meaning their work should help as many people as possible.</p>
                
                <h6 class="text-info mt-3">Recognition</h6>
                <p>Winners get a gold medal, a diploma, and prize money (about $1 million). But most importantly, they get worldwide recognition for their amazing work.</p>
            `
        },
        impact: {
            title: 'How Nobel Prize Changed the World',
            content: `
                <h5 class="text-warning mb-3">Real-World Impact</h5>
                <p>Nobel Prize winners have given us many things we use every day and have saved millions of lives.</p>
                
                <h6 class="text-success mt-3">Medical Breakthroughs</h6>
                <ul>
                    <li><strong>Antibiotics:</strong> Medicines that fight infections (like penicillin)</li>
                    <li><strong>Vaccines:</strong> Shots that prevent diseases like polio and COVID-19</li>
                    <li><strong>X-rays:</strong> Pictures of inside your body to find broken bones</li>
                    <li><strong>Blood types:</strong> Making blood transfusions safe</li>
                </ul>
                
                <h6 class="text-primary mt-3">Technology We Use</h6>
                <ul>
                    <li><strong>Lasers:</strong> Used in surgery, DVD players, and internet</li>
                    <li><strong>Transistors:</strong> Make computers and phones possible</li>
                    <li><strong>GPS:</strong> Helps you find directions on your phone</li>
                    <li><strong>Internet:</strong> Connects the whole world</li>
                </ul>
                
                <h6 class="text-info mt-3">Peace & Literature</h6>
                <p>Peace Prize winners have helped end wars, fight racism, and protect human rights. Literature winners have written books that teach us about different cultures and inspire us to be better people.</p>
            `
        }
    };

    const info = nobelInfo[infoType];
    if (info) {
        document.getElementById('nobelInfoModalTitle').innerHTML = info.title;
        document.getElementById('nobelInfoModalBody').innerHTML = info.content;
        
        const modal = new bootstrap.Modal(document.getElementById('nobelInfoModal'));
        modal.show();
    }
}
// Recent Laureates Modal
function showRecentLaureateModal(laureateId) {
    const recentLaureates = {
        physics2024: {
            title: '2024 Physics Prize - AI Neural Networks',
            content: `
                <h5 class="text-primary mb-3">Geoffrey Hinton & John Hopfield</h5>
                <p>Awarded for foundational discoveries and inventions that enable machine learning with artificial neural networks.</p>
                
                <h6 class="text-success mt-3">Geoffrey Hinton - "Godfather of AI"</h6>
                <ul>
                    <li>Developed backpropagation algorithm</li>
                    <li>Pioneer in deep learning research</li>
                    <li>Created neural networks that can learn</li>
                    <li>His work powers modern AI like ChatGPT</li>
                </ul>
                
                <h6 class="text-warning mt-3">John Hopfield - Neural Network Pioneer</h6>
                <ul>
                    <li>Created Hopfield networks in 1982</li>
                    <li>Showed how networks can store memories</li>
                    <li>Bridged physics and computer science</li>
                    <li>Inspired modern AI architectures</li>
                </ul>
                
                <h6 class="text-info mt-3">Impact on Daily Life</h6>
                <p>Their work enables voice assistants, image recognition, language translation, and recommendation systems we use every day.</p>
            `
        },
        chemistry2024: {
            title: '2024 Chemistry Prize - Protein Design',
            content: `
                <h5 class="text-success mb-3">David Baker, Demis Hassabis & John Jumper</h5>
                <p>Recognized for computational protein design and protein structure prediction using AI.</p>
                
                <h6 class="text-primary mt-3">David Baker - Protein Designer</h6>
                <ul>
                    <li>Created entirely new proteins from scratch</li>
                    <li>Designed proteins for medicine and industry</li>
                    <li>Developed Rosetta software for protein design</li>
                    <li>Made proteins that can fight diseases</li>
                </ul>
                
                <h6 class="text-warning mt-3">Demis Hassabis & John Jumper - AlphaFold Creators</h6>
                <ul>
                    <li>Created AlphaFold AI system</li>
                    <li>Predicted structure of 200 million proteins</li>
                    <li>Solved 50-year-old protein folding problem</li>
                    <li>Made protein data freely available to all scientists</li>
                </ul>
                
                <h6 class="text-info mt-3">Medical Revolution</h6>
                <p>Their work accelerates drug discovery, helps understand diseases, and enables creation of new medicines and materials.</p>
            `
        },
        medicine2024: {
            title: '2024 Medicine Prize - MicroRNA Discovery',
            content: `
                <h5 class="text-danger mb-3">Victor Ambros & Gary Ruvkun</h5>
                <p>Honored for the discovery of microRNA and its role in post-transcriptional gene regulation.</p>
                
                <h6 class="text-success mt-3">What is MicroRNA?</h6>
                <p>MicroRNAs are tiny molecules that control which genes are active in our cells. They act like switches that turn genes on or off.</p>
                
                <h6 class="text-primary mt-3">Victor Ambros - First Discovery</h6>
                <ul>
                    <li>Discovered the first microRNA (lin-4) in 1993</li>
                    <li>Showed how it controls development in worms</li>
                    <li>Opened entirely new field of research</li>
                    <li>Professor at University of Massachusetts</li>
                </ul>
                
                <h6 class="text-warning mt-3">Gary Ruvkun - Mechanism Discovery</h6>
                <ul>
                    <li>Discovered how microRNAs work</li>
                    <li>Found the target genes they control</li>
                    <li>Showed microRNAs exist in all animals</li>
                    <li>Professor at Harvard Medical School</li>
                </ul>
                
                <h6 class="text-info mt-3">Medical Importance</h6>
                <p>MicroRNAs are involved in cancer, heart disease, and many other conditions. Understanding them helps develop new treatments.</p>
            `
        }
    };

    const laureate = recentLaureates[laureateId];
    if (laureate) {
        document.getElementById('nobelInfoModalTitle').innerHTML = laureate.title;
        document.getElementById('nobelInfoModalBody').innerHTML = laureate.content;
        
        const modal = new bootstrap.Modal(document.getElementById('nobelInfoModal'));
        modal.show();
    }
}
// Floating Quote Widget
function initializeFloatingQuote() {
    const quotes = [
        {
            text: "Imagination is more important than knowledge.",
            author: "Albert Einstein, Physics 1921"
        },
        {
            text: "Nothing in life is to be feared, it is only to be understood.",
            author: "Marie Curie, Physics 1903, Chemistry 1911"
        },
        {
            text: "Education is the most powerful weapon which you can use to change the world.",
            author: "Nelson Mandela, Peace 1993"
        },
        {
            text: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney (Honorary mention)"
        },
        {
            text: "If you want to live a happy life, tie it to a goal, not to people or things.",
            author: "Albert Einstein, Physics 1921"
        }
    ];
    
    setTimeout(() => {
        showRandomQuote(quotes);
    }, 3000);
}

function showRandomQuote(quotes) {
    const floatingQuote = document.getElementById('floatingQuote');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (!floatingQuote) return;
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote.text;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
    
    floatingQuote.classList.add('show');
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        floatingQuote.classList.remove('show');
    }, 10000);
}

function closeQuote() {
    const floatingQuote = document.getElementById('floatingQuote');
    if (floatingQuote) {
        floatingQuote.classList.remove('show');
    }
}

// Nobel Prize Quiz
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizQuestions = [
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Dorothy Hodgkin", "Rosalyn Yalow", "Barbara McClintock"],
        correct: 0
    },
    {
        question: "In which year were the first Nobel Prizes awarded?",
        options: ["1895", "1900", "1901", "1905"],
        correct: 2
    },
    {
        question: "Which Nobel Prize category was added most recently?",
        options: ["Economics", "Peace", "Literature", "Medicine"],
        correct: 0
    },
    {
        question: "Who invented dynamite and established the Nobel Prizes?",
        options: ["Alfred Nobel", "Albert Einstein", "Niels Bohr", "Ernest Rutherford"],
        correct: 0
    },
    {
        question: "How many Nobel Prize categories are there?",
        options: ["5", "6", "7", "8"],
        correct: 1
    }
];

function initializeQuiz() {
    if (!document.getElementById('quizContent')) return;
    
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    loadQuestion();
}

function loadQuestion() {
    const questionText = document.getElementById('questionText');
    const quizOptions = document.getElementById('quizOptions');
    const currentQ = document.getElementById('currentQ');
    const nextButton = document.getElementById('nextQuestion');
    
    if (!questionText) return;
    
    const question = quizQuestions[currentQuestion];
    questionText.textContent = question.question;
    currentQ.textContent = currentQuestion + 1;
    
    quizOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index, optionDiv);
        quizOptions.appendChild(optionDiv);
    });
    
    nextButton.disabled = true;
    selectedAnswer = null;
}

function selectAnswer(answerIndex, optionElement) {
    // Remove previous selections
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
    
    selectedAnswer = answerIndex;
    optionElement.classList.add('selected');
    
    document.getElementById('nextQuestion').disabled = false;
}

function nextQuestion() {
    // Show correct answer
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options[question.correct].classList.add('correct');
    if (selectedAnswer !== question.correct) {
        options[selectedAnswer].classList.add('wrong');
    } else {
        score++;
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
}

function restartQuiz() {
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    initializeQuiz();
}
// Scroll to Top Button
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Chatbot Functions
let chatbotOpen = false;

function initializeChatbot() {
    const chatbotBody = document.getElementById('chatbotBody');
    if (chatbotBody) {
        chatbotBody.classList.remove('show');
    }
}

function toggleChatbot() {
    const chatbotBody = document.getElementById('chatbotBody');
    
    if (!chatbotBody) return;
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbotBody.classList.add('show');
    } else {
        chatbotBody.classList.remove('show');
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    showChatLoader();
    
    // Try API first, fallback to local
    sendToNobelAPI(message).catch(() => {
        removeChatLoader();
        const response = getNobelResponse(message);
        addMessage(response, 'bot');
    });
}

async function sendToNobelAPI(message) {
    const API_KEY = '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';
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: 'system',
                        content: 'You are a Nobel Prize expert. Only answer questions about Nobel Prize, winners, categories, and achievements. Keep responses under 100 words.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 80,
                temperature: 0.7
            })
        });
        
        removeChatLoader();
        
        if (response.ok) {
            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                addMessage(data.choices[0].message.content, 'bot');
            } else {
                throw new Error('Invalid response');
            }
        } else {
            throw new Error('API failed');
        }
        
    } catch (error) {
        throw error; // Let the catch in sendMessage handle it
    }
}

function getNobelResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! I'm your Nobel Prize assistant. Ask me about Nobel laureates and their achievements!";
    }
    
    if (msg.includes('what is nobel') || msg.includes('nobel prize')) {
        return "The Nobel Prize is awarded annually to individuals who have made outstanding contributions in Physics, Chemistry, Medicine, Literature, Peace, and Economics.";
    }
    
    if (msg.includes('physics')) {
        return "Nobel Prize in Physics recognizes discoveries in the field of physics. Famous winners include Einstein (1921) and Marie Curie (1903).";
    }
    
    if (msg.includes('chemistry')) {
        return "Nobel Prize in Chemistry honors chemical discoveries. Marie Curie also won this in 1911, making her the first person to win Nobel Prizes in two different sciences.";
    }
    
    if (msg.includes('medicine')) {
        return "Nobel Prize in Physiology or Medicine recognizes medical breakthroughs. Recent winners have contributed to cancer research, vaccines, and genetic discoveries.";
    }
    
    if (msg.includes('literature')) {
        return "Nobel Prize in Literature celebrates outstanding literary work. Winners include authors like Ernest Hemingway, Gabriel García Márquez, and Toni Morrison.";
    }
    
    if (msg.includes('peace')) {
        return "Nobel Peace Prize honors efforts toward peace. Notable winners include Martin Luther King Jr., Nelson Mandela, and Malala Yousafzai.";
    }
    
    if (msg.includes('economics')) {
        return "Nobel Prize in Economic Sciences recognizes contributions to economics. It was first awarded in 1969.";
    }
    
    if (msg.includes('einstein')) {
        return "Albert Einstein won the Nobel Prize in Physics in 1921 for his explanation of the photoelectric effect, not for relativity theory.";
    }
    
    if (msg.includes('marie curie')) {
        return "Marie Curie was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences (Physics 1903, Chemistry 1911).";
    }
    
    return "I can help you learn about Nobel Prize winners, categories (Physics, Chemistry, Medicine, Literature, Peace, Economics), and their achievements. What would you like to know?";
}

function showChatLoader() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const loaderDiv = document.createElement('div');
    loaderDiv.className = 'chat-loader';
    loaderDiv.id = 'chatLoader';
    loaderDiv.innerHTML = `
        <span>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
        </span>
    `;
    
    chatMessages.appendChild(loaderDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeChatLoader() {
    const loader = document.getElementById('chatLoader');
    if (loader) {
        loader.remove();
    }
}

async function sendToOpenRouter(message) {
    const API_KEY = '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';
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b:free",
                messages: [
                    {
                        role: 'system',
                        content: `
You are Wings of Wisdom, the Nobel Prize AI assistant. Only answer questions related to the Nobel Prize, including winners, achievements, discoveries, categories, and history.

If the user says "hello" or similar greetings, reply politely with a greeting but remind them you are a Nobel Prize assistant. For any unrelated questions, reply strictly with: "I'm sorry, I can only answer questions related to the Nobel Prize and its winners."
                        `.trim()},
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 100,
                temperature: 0.8
            })
        });
        
        removeChatLoader();
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const botResponse = data.choices[0].message.content;
            addMessage(botResponse, 'bot');
        } else {
            throw new Error('Invalid API response format');
        }
        
    } catch (error) {
        removeChatLoader();
        addMessage(getBotResponse(message), 'bot');
    }
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <i class="fas fa-cat"></i>
        <span class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <i class="fas fa-cat"></i>
            <span>${message}</span>
        `;
    } else {
        messageDiv.innerHTML = `<span>${message}</span>`;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('einstein')) {
        return "Albert Einstein won the Nobel Prize in Physics in 1921 for his explanation of the photoelectric effect. He's famous for the theory of relativity!";
    } else if (lowerMessage.includes('curie') || lowerMessage.includes('marie')) {
        return "Marie Curie was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences - Physics (1903) and Chemistry (1911)!";
    } else if (lowerMessage.includes('peace')) {
        return "The Nobel Peace Prize is awarded to those who have done the most for fraternity between nations. Recent winners include activists and organizations promoting peace.";
    } else if (lowerMessage.includes('how many') || lowerMessage.includes('total')) {
        return "Since 1901, over 965 Nobel Prizes have been awarded to individuals and organizations for outstanding achievements in Physics, Chemistry, Medicine, Literature, Peace, and Economics.";
    } else if (lowerMessage.includes('when') || lowerMessage.includes('start')) {
        return "The Nobel Prizes were first awarded in 1901, five years after Alfred Nobel's death. The Economics Prize was added later in 1969.";
    } else if (lowerMessage.includes('categories') || lowerMessage.includes('fields')) {
        return "There are 6 Nobel Prize categories: Physics, Chemistry, Physiology or Medicine, Literature, Peace, and Economic Sciences.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm here to help you learn about Nobel Prize winners and their amazing discoveries. What would you like to know?";
    } else {
        return "That's an interesting question! You can explore our website to learn more about Nobel Prize winners, their discoveries, and the history of these prestigious awards.";
    }
}


