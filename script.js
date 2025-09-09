// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.feature, .timeline-item, .skill-item, .education-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});


// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Counter animation for skills
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPercentages = document.querySelectorAll('.skill-header span:last-child');
                skillPercentages.forEach(span => {
                    const percentage = parseInt(span.textContent);
                    animateCounter(span, percentage);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);
}

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Portfolio Modal/Lightbox functionality
function createPortfolioModal() {
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body">
                    <img class="modal-image" src="" alt="">
                    <div class="modal-info">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                        <div class="modal-tech"></div>
                        <div class="modal-links">
                            <a href="https://frontend-production-1f79.up.railway.app/" class="modal-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> ดูผลงาน
                            </a>
                            <a href="#" class="modal-link" target="_blank">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .portfolio-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .portfolio-modal.active {
            display: flex;
        }

        .modal-overlay {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-content {
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            color: #64748b;
            cursor: pointer;
            z-index: 10001;
            background: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .modal-close:hover {
            color: #2563eb;
        }

        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }

        .modal-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 10px;
        }

        .modal-info h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 1rem;
        }

        .modal-info p {
            color: #64748b;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .modal-links {
            display: flex;
            gap: 1rem;
        }

        .modal-link {
            padding: 10px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .modal-link:hover {
            background: #fbbf24;
            transform: translateY(-2px);
        }

        .tech-tag {
            background: #f1f5f9;
            color: #2563eb;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
                gap: 1rem;
                padding: 1rem;
            }
            
            .modal-image {
                height: 200px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(modal);

    return modal;
}

// Initialize portfolio modal
let portfolioModal = null;

document.addEventListener('DOMContentLoaded', () => {
    portfolioModal = createPortfolioModal();

    // Add click events to portfolio items
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioItem = link.closest('.portfolio-item');
            const image = portfolioItem.querySelector('.portfolio-image img');
            const title = portfolioItem.querySelector('.portfolio-content h3');
            const description = portfolioItem.querySelector('.portfolio-content p');
            const techTags = portfolioItem.querySelectorAll('.tech-tag');
            
            // Get links from data attributes
            const websiteUrl = portfolioItem.getAttribute('data-website');
            const githubUrl = portfolioItem.getAttribute('data-github');

            // Populate modal content
            portfolioModal.querySelector('.modal-image').src = image.src;
            portfolioModal.querySelector('.modal-image').alt = image.alt;
            portfolioModal.querySelector('.modal-title').textContent = title.textContent;
            portfolioModal.querySelector('.modal-description').textContent = description.textContent;

            // Clear and populate tech tags
            const modalTech = portfolioModal.querySelector('.modal-tech');
            modalTech.innerHTML = '';
            techTags.forEach(tag => {
                const techTag = document.createElement('span');
                techTag.className = 'tech-tag';
                techTag.textContent = tag.textContent;
                modalTech.appendChild(techTag);
            });

            // Update modal links
            const modalLinks = portfolioModal.querySelectorAll('.modal-link');
            if (modalLinks[0]) {
                modalLinks[0].href = websiteUrl || '#';
            }
            if (modalLinks[1]) {
                modalLinks[1].href = githubUrl || '#';
            }

            // Show modal
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    const closeModal = () => {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    portfolioModal.querySelector('.modal-close').addEventListener('click', closeModal);
    portfolioModal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Certificate Modal functionality
function createCertificateModal() {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body">
                    <img class="modal-image" src="" alt="">
                </div>
            </div>
        </div>
    `;

    // Add certificate modal styles
    const modalStyles = `
        .certificate-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .certificate-modal.active {
            display: flex;
        }

        .certificate-modal .modal-overlay {
            background: transparent;
            border-radius: 15px;
            max-width: 100vw;
            width: 100%;
            max-height: 100vh;
            overflow: hidden;
        }

        .certificate-modal .modal-body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        .certificate-modal .modal-image {
            max-width: 100vw;
            max-height: 100vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
            .certificate-modal .modal-body {
                padding: 0;
            }
            
            .certificate-modal .modal-image {
                max-width: 100vw;
                max-height: 100vh;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(modal);

    return modal;
}

// Initialize certificate modal
let certificateModal = null;

document.addEventListener('DOMContentLoaded', () => {
    certificateModal = createCertificateModal();

    // Add click events to certificate items
    const certificateLinks = document.querySelectorAll('.certificate-link');
    certificateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const certificateItem = link.closest('.certificate-item');
            const image = certificateItem.querySelector('.certificate-image img');

            // Populate modal content - only image
            certificateModal.querySelector('.modal-image').src = image.src;
            certificateModal.querySelector('.modal-image').alt = image.alt;

            // Show modal
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close certificate modal functionality
    const closeCertificateModal = () => {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    certificateModal.querySelector('.modal-close').addEventListener('click', closeCertificateModal);
    certificateModal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeCertificateModal();
        }
    });

    // Close certificate modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature, .timeline-content, .education-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
});
