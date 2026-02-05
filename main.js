
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');

    // Placeholder images - replace with your actual drone images
    const images = [
        'https://images.unsplash.com/photo-1517538222413-3b1d369a0c23?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541753236788-b0d1c4a5827c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1508873760731-9c3d026b279c?q=80&w=2070&auto=format&fit=crop',
    ];

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '드론 촬영 사진';
        galleryContainer.appendChild(img);
    });
});
