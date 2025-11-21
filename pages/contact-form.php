<?php
/**
 * Contact Form Integration
 * This file loads WordPress and displays Contact Form 7 with custom styling
 */

// Load WordPress
require_once('../wp/wp-load.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Serenesephere</title>
    
    <!-- Your existing CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/contact.css">
    <link rel="stylesheet" href="../css/footer.css">
    <link rel="stylesheet" href="../css/mobile-responsive-enhanced.css">
    <link rel="stylesheet" href="../css/mobile-fixes-final.css">
    
    <!-- Contact Form 7 Styling Override -->
    <style>
        /* Hide CF7 default styling */
        .wpcf7 .screen-reader-response {
            display: none;
        }
        
        .wpcf7-form p {
            margin: 0;
        }
        
        /* Style CF7 inputs to match your design */
        .wpcf7-form input[type="text"],
        .wpcf7-form input[type="email"],
        .wpcf7-form input[type="tel"],
        .wpcf7-form select,
        .wpcf7-form textarea {
            width: 100%;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .wpcf7-form input:focus,
        .wpcf7-form select:focus,
        .wpcf7-form textarea:focus {
            outline: none;
            border-color: #2BA6A0;
        }
        
        .wpcf7-form .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .wpcf7-form .form-group {
            margin-bottom: 20px;
        }
        
        .wpcf7-form .wpcf7-submit {
            background: #2BA6A0;
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .wpcf7-form .wpcf7-submit:hover {
            background: #0C4F58;
        }
        
        .wpcf7-response-output {
            margin: 20px 0;
            padding: 15px;
            border-radius: 5px;
        }
        
        .wpcf7-mail-sent-ok {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .wpcf7-validation-errors,
        .wpcf7-mail-sent-ng {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        @media (max-width: 768px) {
            .wpcf7-form .form-row {
                grid-template-columns: 1fr;
            }
        }
    </style>
    
    <?php wp_head(); ?>
</head>
<body>
    <!-- Your existing header/topbar code here -->
    
    <main>
        <section class="contact-content-section">
            <div class="container">
                <div class="contact-intro">
                    <h2>Begin Your Journey to Stillness</h2>
                    <p>We are committed to a high-touch, personalized experience from the moment you connect with us.</p>
                </div>

                <div class="contact-main-grid">
                    <!-- Left Side - Contact Info -->
                    <div class="contact-info-section">
                        <h3 class="contact-section-title">Send Us A Message</h3>
                        <p class="contact-section-subtitle">For team</p>

                        <div class="contact-info-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Phone Number</h4>
                                <p>+1 443-825-6937</p>
                            </div>
                        </div>

                        <div class="contact-info-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Email Address</h4>
                                <p>info@serenesephere.com</p>
                            </div>
                        </div>

                        <div class="contact-info-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Kenya Office</h4>
                                <p>Rehema House<br>Kimathi Street<br>Phone: 0704405018</p>
                            </div>
                        </div>

                        <div class="contact-info-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-details">
                                <h4>US Office</h4>
                                <p>Baltimore<br>Phone: +1 443-825-6937</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Contact Form -->
                    <div class="contact-form-section">
                        <?php echo do_shortcode('[contact-form-7 id="a2d984a" title="Contact form 1"]'); ?>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <?php wp_footer(); ?>
</body>
</html>
