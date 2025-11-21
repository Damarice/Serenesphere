// Load WordPress Contact Form 7 via AJAX
(function() {
    'use strict';
    
    const FORM_ENDPOINT = 'https://serenesephere.com/wp/wp-json/contact-form-7/v1/contact-forms/a2d984a/feedback';
    
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
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
                
                if (result.status === 'mail_sent') {
                    // Success
                    alert('Thank you! Your message has been sent successfully.');
                    this.reset();
                } else {
                    // Error
                    alert('Sorry, there was an error sending your message. Please try again or email us directly at info@serenesephere.com');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Sorry, there was an error. Please email us directly at info@serenesephere.com');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
})();
