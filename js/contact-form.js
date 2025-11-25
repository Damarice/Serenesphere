// Contact Form Handler - Uses PHP backend
(function() {
    'use strict';
    
    const FORM_ENDPOINT = 'https://serenesephere.com/contact-handler.php';
    
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Create form data
            const formData = new FormData();
            formData.append('firstName', this.querySelector('[name="firstName"]').value);
            formData.append('lastName', this.querySelector('[name="lastName"]').value);
            formData.append('phone', this.querySelector('[name="phone"]').value);
            formData.append('email', this.querySelector('[name="email"]').value);
            formData.append('service', this.querySelector('[name="service"]').value);
            formData.append('message', this.querySelector('[name="message"]').value);
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert(result.message);
                    this.reset();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Network error. Please try again or email us directly at info@serenesephere.com');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
})();
