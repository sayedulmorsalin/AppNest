// AppNest JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="close-menu">
            <i class="fas fa-times"></i>
        </div>
        <a href="index.html">Home</a>
        <a href="#">Categories</a>
        <a href="#">Featured</a>
        <a href="#">Trending</a>
        <a href="#">Developers</a>
        <a href="#">Login</a>
    `;
    document.body.appendChild(mobileNav);

    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.add('active'));
    mobileNav.querySelector('.close-menu').addEventListener('click', () => mobileNav.classList.remove('active'));

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('active'));
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    document.querySelector('.search-bar').appendChild(searchResults);

    const apps = [
        { name: 'Spotify', category: 'Music' },
        { name: 'Figma', category: 'Design' },
        { name: 'Zoom', category: 'Productivity' },
        { name: 'Procreate', category: 'Design' },
        { name: 'Notion', category: 'Productivity' },
        { name: 'Discord', category: 'Communication' },
        { name: 'Canva', category: 'Design' },
        { name: 'Slack', category: 'Productivity' },
        { name: 'TikTok', category: 'Entertainment' }
    ];

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length > 0) {
            const filtered = apps.filter(app =>
                app.name.toLowerCase().includes(query) || app.category.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                searchResults.classList.add('active');
                filtered.forEach(app => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `<strong>${app.name}</strong><br><small>${app.category}</small>`;
                    item.addEventListener('click', () => {
                        searchInput.value = app.name;
                        searchResults.classList.remove('active');
                        alert(`Searching for ${app.name}...`);
                    });
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.classList.add('active');
                const noRes = document.createElement('div');
                noRes.className = 'search-result-item';
                noRes.textContent = 'No apps found';
                searchResults.appendChild(noRes);
            }
        } else {
            searchResults.classList.remove('active');
        }
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.search-bar')) searchResults.classList.remove('active');
    });

    // ✅ APP DOWNLOAD BUTTONS (NO IMAGE DOWNLOAD NEEDED)
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const appCard = this.closest('.app-card');
            const appName = appCard.querySelector('h3').textContent.trim();
            const downloadUrl = this.href;

            if (!downloadUrl || downloadUrl === window.location.href) {
                alert('No download link available.');
                return;
            }

            // Optional: confirmation
            if (confirm(`Do you want to download or open "${appName}"?`)) {
                // Open in same tab (or new tab if preferred)
                window.location.href = downloadUrl;
                // OR: window.open(downloadUrl, '_blank');
            }
        });
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.querySelector('h3').textContent;
            alert(`Showing apps in ${cat} category`);
        });
    });

    // Trending items
    document.querySelectorAll('.trending-item').forEach(item => {
        item.addEventListener('click', () => {
            const app = item.querySelector('h4').textContent;
            alert(`Showing details for ${app}`);
        });
    });

    // CTA buttons
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            alert(btn.textContent.includes('Submit') 
                ? 'Redirecting to developer portal...' 
                : 'Redirecting to app catalog...');
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.category-card, .app-card, .trending-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
});