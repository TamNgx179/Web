
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.footer-toggle');

    toggles.forEach(toggle => {
        toggle.onclick = () => {
            const list = toggle.nextElementSibling;
            if (list.style.display === 'block') {
                list.style.display = 'none';
                toggle.querySelector('span').textContent = '▼';
            } else {
                list.style.display = 'block';
                toggle.querySelector('span').textContent = '▲';
            }
        };
    });
});
