// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdowns = document.querySelectorAll('.dropdown');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Scroll to top of menu when opening on mobile
    if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
        setTimeout(() => {
            navMenu.scrollTop = 0;
        }, 100);
    }
});

// Close mobile menu when clicking on actual page links (not dropdown toggles)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if this link is NOT a dropdown toggle
        const isDropdownToggle = link.parentElement.classList.contains('dropdown');
        
        if (!isDropdownToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Close menu when clicking on dropdown menu items (actual links inside dropdowns)
document.querySelectorAll('.dropdown-menu a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Also close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Dropdown menu functionality for mobile
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    // Toggle dropdown on click for mobile
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            
            const wasActive = dropdown.classList.contains('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            
            // If dropdown was just opened, scroll it into view
            if (!wasActive && dropdown.classList.contains('active')) {
                setTimeout(() => {
                    // Scroll the dropdown into view smoothly
                    dropdown.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 350); // Wait for dropdown animation to complete
            }
        }
    });
    
    // Show dropdown on hover for desktop
    if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('active');
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Back to top button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .welcome-image, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Function to check if element is in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
};

// Function to handle scroll animations
const handleScrollAnimations = () => {
    const welcomeCard = document.querySelector('.welcome-card');
    
    if (welcomeCard && isInViewport(welcomeCard)) {
        welcomeCard.classList.add('visible');
    }
};

// Add scroll event listener for welcome card animation
window.addEventListener('scroll', handleScrollAnimations);

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    
    // Add animation classes to elements
    const cards = document.querySelectorAll('.card');
    const welcomeImage = document.querySelector('.welcome-image');
    const contactForm = document.querySelector('.contact-form');
    const welcomeCard = document.querySelector('.welcome-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    if (welcomeImage) {
        welcomeImage.style.opacity = '0';
        welcomeImage.style.transform = 'translateX(50px)';
        welcomeImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
    }
    
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateX(-50px)';
        contactForm.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
    }
    
    if (welcomeCard) {
        welcomeCard.style.opacity = '0';
        welcomeCard.style.transform = 'translateY(50px)';
        welcomeCard.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
    }
    
    // Initial check for elements in viewport
    setTimeout(animateOnScroll, 500);
    
    // Add welcome card to elements that should animate on scroll
    const elements = document.querySelectorAll('.card, .welcome-card, .welcome-image, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Create a simple interactive globe (placeholder - can be enhanced with a library like Three.js)
const createGlobe = () => {
    const globe = document.getElementById('globe');
    
    if (!globe) return;
    
    // This is a simple placeholder for the globe
    // In a real implementation, you might want to use a library like Three.js
    // or D3.js to create an interactive 3D globe
    globe.innerHTML = `
        <div class="globe-inner">
            <div class="globe-lines"></div>
            <div class="globe-highlight"></div>
        </div>
    `;
    
    // Add mousemove effect for the globe
    globe.addEventListener('mousemove', (e) => {
        const rect = globe.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (x - centerX) / 20;
        
        globe.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    // Reset rotation when mouse leaves
    globe.addEventListener('mouseleave', () => {
        globe.style.transform = 'rotateX(0) rotateY(0)';
    });
};

// Initialize the globe when the page loads
window.addEventListener('load', createGlobe);

// Add loading animation
window.addEventListener('load', () => {
    // Remove loading class from body when everything is loaded
    document.body.classList.add('loaded');
    
    // Add animation for the hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        
        // Trigger reflow
        void heroContent.offsetWidth;
        
        // Add the animation class
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Handle window resize events
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

