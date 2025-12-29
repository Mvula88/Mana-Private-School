// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const enquiryForm = document.getElementById('enquiryForm');
const registrationForm = document.getElementById('registrationForm');

// School's WhatsApp number (international format without +)
const WHATSAPP_NUMBER = '264814008847';

// ===== Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const demoBannerHeight = document.querySelector('.demo-banner').offsetHeight;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when past demo banner
    if (currentScroll > demoBannerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// ===== Back to Top =====
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== WhatsApp Enquiry Form =====
enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const parentName = document.getElementById('parentName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const childName = document.getElementById('childName').value.trim();
    const childAge = document.getElementById('childAge').value.trim();
    const grade = document.getElementById('grade').value;
    const message = document.getElementById('message').value.trim();

    // Validate required fields
    if (!parentName || !phone || !childName || !childAge || !grade) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create WhatsApp message
    let whatsappMessage = `*NEW ENQUIRY - MANA PRIVATE SCHOOL*\n\n`;
    whatsappMessage += `*Parent/Guardian Name:* ${parentName}\n`;
    whatsappMessage += `*Phone Number:* ${phone}\n`;
    whatsappMessage += `*Child's Name:* ${childName}\n`;
    whatsappMessage += `*Child's Age:* ${childAge} years\n`;
    whatsappMessage += `*Grade Applying For:* ${grade}\n`;

    if (message) {
        whatsappMessage += `\n*Additional Message:*\n${message}\n`;
    }

    whatsappMessage += `\n---\n_Sent via Mana Private School Website_`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success message
    showNotification('Redirecting to WhatsApp...', 'success');

    // Reset form
    enquiryForm.reset();
});

// ===== WhatsApp Registration Form =====
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const parentName = document.getElementById('regParentName').value.trim();
    const parentID = document.getElementById('regParentID').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const address = document.getElementById('regAddress').value.trim();

    const childName = document.getElementById('regChildName').value.trim();
    const childDOB = document.getElementById('regChildDOB').value;
    const childGender = document.getElementById('regChildGender').value;
    const grade = document.getElementById('regGrade').value;
    const medical = document.getElementById('regMedical').value.trim();

    const emergencyName = document.getElementById('regEmergencyName').value.trim();
    const emergencyPhone = document.getElementById('regEmergencyPhone').value.trim();
    const relationship = document.getElementById('regRelationship').value.trim();

    const agreed = document.getElementById('regAgree').checked;

    // Validate required fields
    if (!parentName || !parentID || !phone || !address || !childName || !childDOB || !childGender || !grade || !emergencyName || !emergencyPhone || !relationship) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!agreed) {
        alert('Please agree to the terms and conditions.');
        return;
    }

    // Format date
    const dobDate = new Date(childDOB);
    const formattedDOB = dobDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    // Create WhatsApp message
    let whatsappMessage = `*NEW REGISTRATION - MANA PRIVATE SCHOOL*\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    whatsappMessage += `*PARENT/GUARDIAN INFORMATION*\n`;
    whatsappMessage += `• Name: ${parentName}\n`;
    whatsappMessage += `• ID Number: ${parentID}\n`;
    whatsappMessage += `• Phone: ${phone}\n`;
    if (email) {
        whatsappMessage += `• Email: ${email}\n`;
    }
    whatsappMessage += `• Address: ${address}\n\n`;

    whatsappMessage += `*CHILD INFORMATION*\n`;
    whatsappMessage += `• Name: ${childName}\n`;
    whatsappMessage += `• Date of Birth: ${formattedDOB}\n`;
    whatsappMessage += `• Age: ${age} years\n`;
    whatsappMessage += `• Gender: ${childGender}\n`;
    whatsappMessage += `• Grade Applying For: ${grade}\n`;
    if (medical) {
        whatsappMessage += `• Medical/Allergies: ${medical}\n`;
    }
    whatsappMessage += `\n`;

    whatsappMessage += `*EMERGENCY CONTACT*\n`;
    whatsappMessage += `• Name: ${emergencyName}\n`;
    whatsappMessage += `• Phone: ${emergencyPhone}\n`;
    whatsappMessage += `• Relationship: ${relationship}\n\n`;

    whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappMessage += `_Terms & Conditions Accepted: Yes_\n`;
    whatsappMessage += `_Sent via Mana Private School Website_`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success message
    showNotification('Redirecting to WhatsApp with your registration details...', 'success');

    // Reset form
    registrationForm.reset();
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Add animation class to elements
document.querySelectorAll('.program-card, .fee-card, .contact-card, .step, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    animateOnScroll.observe(el);
});

// Add animate-in styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    highlightNavLink();

    // Add loading animation
    document.body.classList.add('loaded');
});

// ===== Phone Number Click Tracking =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated');
    });
});

// ===== Email Click Tracking =====
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email initiated');
    });
});
