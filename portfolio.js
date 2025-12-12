// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

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
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style. transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe all service cards, portfolio items, etc.
const observeElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content');
observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver. observe(el);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections. forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section. getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window. pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style. transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero heading (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('Portfolio website loaded successfully! ');
});

// Floating Action Button & Modal
const fabButton = document. getElementById('fabButton');
const postModal = document.getElementById('postModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const postForm = document.getElementById('postForm');
const imageInput = document.getElementById('activityImage');
const imagePreview = document.getElementById('imagePreview');

// Open modal
fabButton.addEventListener('click', () => {
  postModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
});

// Close modal function
function closePostModal() {
  postModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scroll
  postForm.reset();
  imagePreview.classList.remove('active');
  imagePreview.innerHTML = '';
}

// Close modal events
closeModal.addEventListener('click', closePostModal);
cancelBtn.addEventListener('click', closePostModal);

// Close modal when clicking outside
postModal. addEventListener('click', (e) => {
  if (e.target === postModal) {
    closePostModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && postModal.classList.contains('active')) {
    closePostModal();
  }
});

// Image preview
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
      imagePreview.classList.add('active');
    };
    reader.readAsDataURL(file);
  }
});

// Form submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('activityTitle').value;
  const description = document.getElementById('activityDescription').value;
  const category = document.getElementById('activityCategory').value;
  const image = imageInput.files[0];

  // Create activity object
  const activity = {
    title:  title,
    description: description,
    category: category,
    timestamp: new Date().toISOString(),
    image: image ?  image.name : null
  };

  // Log to console (you can replace this with actual posting logic)
  console.log('New Activity Posted:', activity);

  // Show success message
  alert('Activity posted successfully!  🎉');

  // Close modal and reset form
  closePostModal();

  // Here you would typically: 
  // 1. Send data to a server/database
  // 2. Update the UI with the new activity
  // 3. Store in localStorage or state management
});