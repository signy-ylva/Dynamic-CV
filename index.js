// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');
const toggleText = themeToggle.querySelector('.toggle-text');

// Check for saved theme or prefer color scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleIcon.textContent = '☀️';
    toggleText.textContent = 'Light Mode';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleIcon.textContent = '🌙';
    toggleText.textContent = 'Dark Mode';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleIcon.textContent = '🌙';
        toggleText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});

// Language toggle
const langToggleBtn = document.getElementById('langToggle');
let currentLang = 'english';

function setLangToggleButtonText(currentLang) {
    langToggleBtn.textContent = currentLang === 'english' ? 'ICELANDIC' : 'ENGLISH';
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Language initialization
    const enElements = document.querySelectorAll('.lang-en');
    const isElements = document.querySelectorAll('.lang-is');

    // Start with English visible, Icelandic hidden
    enElements.forEach(el => el.style.display = '');
    isElements.forEach(el => el.style.display = 'none');
    currentLang = 'english';
    setLangToggleButtonText(currentLang);
});

langToggleBtn.addEventListener('click', () => {
    const enElements = document.querySelectorAll('.lang-en');
    const isElements = document.querySelectorAll('.lang-is');

    if (currentLang === 'english') {
        enElements.forEach(el => el.style.display = 'none');
        isElements.forEach(el => el.style.display = '');
        currentLang = 'icelandic';
    } else {
        enElements.forEach(el => el.style.display = '');
        isElements.forEach(el => el.style.display = 'none');
        currentLang = 'english';
    }

    setLangToggleButtonText(currentLang);
});

// Simple scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});