
function toggleMobileMenu() {
    const menu = document.querySelector(".nav-menu");
    menu.classList.toggle("open");
}


document.addEventListener("click", (e) => {
    const menu = document.querySelector(".nav-menu");

   
    if (e.target.closest(".dropdown-toggle")) {
        const dropdown = e.target.closest(".dropdown");

        // Only toggle on mobile
        if (window.innerWidth < 768) {
            dropdown.classList.toggle("open-mobile");
        }
        return;
    }

   
    document.querySelectorAll(".dropdown").forEach((d) => {
        d.classList.remove("open-mobile");
    });
});

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type=\"email\"]').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
    event.target.reset();
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact Form Data:', data);
    alert(`Thank you ${data.name}! We've received your message and will get back to you within 24 hours.`);
    event.target.reset();
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    // Simple validation (frontend only)
    if (email === 'admin@stackly.com' && password === 'admin123') {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: 'John Doe',
            loggedIn: true
        }));
        
        // Redirect to dashboard
        window.location.href = './dashboard.html';
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Invalid email or password. Try: admin@stackly.com / admin123';
    }
}

// Signup Form Handler
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const errorDiv = document.getElementById('signup-error');
    
    // Validation
    if (password !== confirm) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Passwords do not match!';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Password must be at least 6 characters long!';
        return;
    }
    
    // Store user data
    localStorage.setItem('user', JSON.stringify({
        email: email,
        name: name,
        loggedIn: true
    }));
    
    alert(`Welcome ${name}! Your account has been created successfully.`);
    window.location.href = './dashboard.html';
}

// Show Signup Form
function showSignup(event) {
    event.preventDefault();
    document.querySelector('.login-box:not(#signup-box)').style.display = 'none';
    document.getElementById('signup-box').style.display = 'block';
}

// Show Login Form
function showLogin(event) {
    event.preventDefault();
    document.querySelector('.login-box:not(#signup-box)').style.display = 'block';
    document.getElementById('signup-box').style.display = 'none';
}

// Logout Handler
function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}

// Check Authentication for Dashboard
function checkAuth() {
    // Authentication disabled — dashboard always accessible
    return;

    }


// Dashboard Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update active menu item
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
        }
    });
    
    // Prevent default anchor behavior
    event.preventDefault();
}

// Blog Filter Function
function filterBlog(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Update active button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter blogs
    blogCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            if (card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^=\"#\"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .service-item, .testimonial-card, .portfolio-item, .blog-card, .project-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = '';
            navMenu.style.flexDirection = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.padding = '';
            navMenu.style.boxShadow = '';
        }
    });
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        if (finalValue.includes('+')) {
            animateCounter(stat, parseInt(finalValue));
        }
    });
});

// Counter Animation Function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (window.innerWidth < 768 && navMenu && mobileToggle) {
        if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        }
    }
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add active state to current page in navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === `./${currentPage}` || (currentPage === '' && linkHref === './index.html')) {
            link.style.color = 'var(--primary-color)';
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading state to buttons on form submit
document.addEventListener('submit', function(e) {
    const submitBtn = e.target.querySelector('button[type=\"submit\"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Console welcome message
