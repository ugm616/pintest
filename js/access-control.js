function updateNavigation() {
    console.log("Updating navigation...");
    const accessLevels = JSON.parse(sessionStorage.getItem('accessLevels') || '[]');
    console.log("Current access levels:", accessLevels);
    
    document.querySelectorAll('[data-access]').forEach(element => {
        console.log("Checking element:", element.dataset.access);
        if (!accessLevels.includes(element.dataset.access)) {
            console.log("Hiding element:", element.dataset.access);
            element.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    checkAuthentication();
    
    fetch('/includes/nav.html')
        .then(response => response.text())
        .then(html => {
            console.log("Navigation loaded");
            document.getElementById('nav-placeholder').innerHTML = html;
            updateNavigation();
        })
        .catch(error => console.log("Error loading navigation:", error));
});
