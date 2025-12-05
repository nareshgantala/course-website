/**
 * =============================================================================
 * Main JavaScript - AI Assisted Jira Cloud Bootcamp
 * =============================================================================
 * SDLC Phase: Development - frontend interactivity
 * Vanilla JavaScript for dynamic functionality.
 * =============================================================================
 */

// =============================================================================
// Mobile Menu Toggle
// =============================================================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
});

// =============================================================================
// Smooth Scroll for Anchor Links
// =============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================================================
// Header Scroll Effect
// =============================================================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = '';
    }

    lastScroll = currentScroll;
});

// =============================================================================
// Form Validation Enhancement
// =============================================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.validity.valid) {
                this.style.borderColor = '#00875A';
            } else if (this.value) {
                this.style.borderColor = '#DE350B';
            }
        });

        input.addEventListener('input', function () {
            this.style.borderColor = '';
        });
    });
}

// =============================================================================
// Intersection Observer for Animations
// =============================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to cards
document.querySelectorAll('.module-card, .tool-card, .highlight-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(card);
});

// CSS class for visible state
const style = document.createElement('style');
style.textContent = `
  .fade-in-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// =============================================================================
// Copy to Clipboard (for future code snippets)
// =============================================================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// =============================================================================
// Simple Notification
// =============================================================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#00875A' : '#DE350B'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyframe animations
const animations = document.createElement('style');
animations.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(animations);

// =============================================================================
// Console Easter Egg (for developers)
// =============================================================================
console.log(`
%c🚀 AI Assisted Jira Cloud Bootcamp

%cInterested in learning how this website was built?
Join our bootcamp to master:
• Node.js & Express.js
• Docker & AWS ECS
• Bitbucket Pipelines CI/CD
• And much more!

Visit: /courses

%cBuilt with ❤️ for Telugu IT Professionals
`,
    'font-size: 20px; font-weight: bold; color: #0052CC;',
    'font-size: 14px; color: #505F79;',
    'font-size: 12px; color: #6B778C;'
);

// =============================================================================
// Service Worker Registration (PWA-ready)
// TODO: Uncomment when service worker is implemented
// =============================================================================
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('ServiceWorker registered:', registration);
//       })
//       .catch(error => {
//         console.log('ServiceWorker registration failed:', error);
//       });
//   });
// }
