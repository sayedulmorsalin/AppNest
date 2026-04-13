// Firebase Configuration (Replace with your own Firebase Project settings)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "appnests.firebaseapp.com",
    projectId: "appnests",
    storageBucket: "appnests.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Function to fetch apps for the homepage
async function fetchFeaturedApps() {
    const appsContainer = document.getElementById('apps-container');
    if (!appsContainer) return;

    try {
        const snapshot = await db.collection('apps').where('featured', '==', true).get();
        appsContainer.innerHTML = ''; // Clear loading spinner

        if (snapshot.empty) {
            appsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No apps found.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const appCard = `
                <div class="app-card" data-category="${data.category || ''}">
                    <div class="app-image">
                        <img src="${data.iconUrl || 'https://via.placeholder.com/150/0f172a/6366f1?text=App'}" alt="${data.name}">
                    </div>
                    <div class="app-info">
                        <h3>${data.name}</h3>
                        <p>${data.description}</p>
                        <div class="app-meta">
                            <span class="app-rating">
                                <i class="fas fa-star"></i> ${data.rating || 'N/A'}
                            </span>
                            <span>${data.size || data.category || ''}</span>
                        </div>
                        <a href="${data.playStoreUrl || '#'}" class="download-btn">Download Now</a>
                    </div>
                </div>
            `;
            appsContainer.innerHTML += appCard;
        });
    } catch (error) {
        console.error("Error fetching apps:", error);
        appsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">Failed to load apps from database.</p>';
    }
}

// Check if we are on the home page and load apps
if (document.getElementById('apps-container')) {
    fetchFeaturedApps();
}
