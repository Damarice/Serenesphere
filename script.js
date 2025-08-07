 let mobileMenuOpen = false;

        function toggleMobileMenu() {
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const body = document.body;

            mobileMenuOpen = !mobileMenuOpen;

            mobileMenuOverlay.classList.toggle('active', mobileMenuOpen);
            toggle.classList.toggle('active', mobileMenuOpen);
            body.classList.toggle('menu-open', mobileMenuOpen);
        }

        // Toggle dropdowns inside mobile menu
        document.querySelectorAll('.nav-items-mobile .has-dropdown > .nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parentItem = this.parentElement;

                    // Close other active dropdowns
                    document.querySelectorAll('.nav-items-mobile .has-dropdown.active').forEach(item => {
                        if (item !== parentItem) {
                            item.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    parentItem.classList.toggle('active');
                }
            });
        });

        // Close menu when clicking dropdown links
        document.querySelectorAll('.nav-items-mobile .dropdown-content a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu if screen resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                toggleMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenuOpen && 
                !e.target.closest('.mobile-menu-overlay') && 
                !e.target.closest('.mobile-menu-toggle')) {
                toggleMobileMenu();
            }
        });