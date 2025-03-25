// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset validation
            removeValidationStyles(nameInput);
            removeValidationStyles(emailInput);
            removeValidationStyles(messageInput);
            
            // Validate name
            if (!nameInput.value.trim()) {
                addValidationStyles(nameInput, false, 'Por favor, ingresa tu nombre');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                addValidationStyles(emailInput, false, 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                addValidationStyles(messageInput, false, 'Por favor, ingresa tu mensaje');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const alertContainer = document.getElementById('formAlert');
                alertContainer.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>¡Gracias por tu mensaje!</strong> Nos pondremos en contacto contigo pronto.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    function addValidationStyles(input, isValid, message) {
        if (isValid) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'invalid-feedback';
            feedbackElement.textContent = message;
            
            // Remove any existing feedback
            const existingFeedback = input.parentNode.querySelector('.invalid-feedback');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            input.parentNode.appendChild(feedbackElement);
        }
    }
    
    function removeValidationStyles(input) {
        input.classList.remove('is-valid', 'is-invalid');
        const existingFeedback = input.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }
    
    // Animation for timeline items on strategy page
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        function checkIfInView() {
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.8);
                
                if (isVisible) {
                    item.classList.add('show-timeline-item');
                }
            });
        }
        
        // Add initial class to timeline items
        timelineItems.forEach(item => {
            item.classList.add('timeline-item-hidden');
        });
        
        // Run on load
        checkIfInView();
        
        // Run on scroll
        window.addEventListener('scroll', checkIfInView);
    }
    
    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});
