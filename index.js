// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleTheme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme when button is clicked
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Animation for statistics on scroll
document.addEventListener('DOMContentLoaded', () => {
    const statElements = document.querySelectorAll('.stats-container li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stat-highlight');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(stat => {
        observer.observe(stat);
    });
});

// Add navigation menu for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Create navigation links for sections
    const sections = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'impact-environnemental', title: 'Impact environnemental' },
        { id: 'modele-economique', title: 'Modèle économique' },
        { id: 'alternatives', title: 'Alternatives' },
        { id: 'conclusion', title: 'Conclusion' }
    ];
    
    // Create a navigation element
    const nav = document.createElement('nav');
    nav.className = 'sticky top-0 bg-teal-600 text-white py-2 z-10 shadow-md';
    nav.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center">
                <div class="text-lg font-bold">Navigation</div>
                <div class="hidden md:flex space-x-4">
                    ${sections.map(section => 
                        `<a href="#${section.id}" class="hover:text-teal-200 transition">${section.title}</a>`
                    ).join('')}
                </div>
                <button id="mobileMenuToggle" class="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <div id="mobileMenu" class="md:hidden hidden py-2">
                ${sections.map(section => 
                    `<a href="#${section.id}" class="block py-1 hover:text-teal-200 transition">${section.title}</a>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Insert the navigation after the header
    const header = document.querySelector('header');
    header.parentNode.insertBefore(nav, header.nextSibling);
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});