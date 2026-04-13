document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="close-menu"><i class="fas fa-times"></i></div>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="privacy-policy.html">Privacy</a>
        <a href="login.html">Developer Portal</a>
    `;
    document.body.appendChild(mobileNav);

    mobileMenuBtn.onclick = () => mobileNav.classList.add('active');
    mobileNav.querySelector('.close-menu').onclick = () => mobileNav.classList.remove('active');
    mobileNav.querySelectorAll('a').forEach(link => {
        link.onclick = () => mobileNav.classList.remove('active');
    });

    // --- Search Functionality ---
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const apps = document.querySelectorAll('.app-card');
        apps.forEach(app => {
            const title = app.querySelector('h3').innerText.toLowerCase();
            const desc = app.querySelector('p').innerText.toLowerCase();
            if (title.includes(term) || desc.includes(term)) {
                app.style.display = 'flex';
            } else {
                app.style.display = 'none';
            }
        });
    });

    // --- Category Filtering ---
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').innerText.toLowerCase();
            const apps = document.querySelectorAll('.app-card');
            
            // Remove active style from all cards
            categoryCards.forEach(c => c.style.borderColor = 'var(--glass-border)');
            card.style.borderColor = 'var(--primary)';

            apps.forEach(app => {
                const appCategory = app.getAttribute('data-category')?.toLowerCase() || '';
                if (category === 'all' || appCategory === category) {
                    app.style.display = 'flex';
                } else {
                    app.style.display = 'none';
                }
            });

            // Smooth scroll to apps section
            document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    apps.forEach(app => {
        app.style.opacity = '0';
        app.style.transform = 'translateY(20px)';
        app.style.transition = 'all 0.6s ease-out';
        observer.observe(app);
    });
});