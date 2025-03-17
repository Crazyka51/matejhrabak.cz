document.addEventListener('DOMContentLoaded', () => {
    const background = document.querySelector('.background');

    document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        if (background) {
            background.style.maskImage = `radial-gradient(circle 1200px at ${x}px ${y}px, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`;
        }
    });
});
