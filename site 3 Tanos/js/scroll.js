document.addEventListener('DOMContentLoaded', () => {
    const image = document.querySelector('.scrolling');
    const container = document.getElementById('main_img');
    let scrollX = 0;

    image.addEventListener('animationend', () => {
        image.classList.remove('animated_right-2');
    });

    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        scrollX -= event.deltaY;

        image.style.transform = `translateX(${scrollX}px)`;
    }, { passive: false });
})


