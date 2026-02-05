
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');

    // Placeholder images - replace with your actual drone images
    const images = []; // Cleared the images array

    if (galleryContainer) {
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = '드론 촬영 사진';
            galleryContainer.appendChild(img);
        });
    }

    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    themeSwitcher.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
});
