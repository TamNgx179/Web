document.addEventListener('DOMContentLoaded', () => {

    function initFooterToggle() {
        const toggles = document.querySelectorAll('.footer-toggle');

        if (window.innerWidth < 600) {
            toggles.forEach(toggle => {
                const list = toggle.nextElementSibling;

                // Mới load: đóng hết footer 
                list.style.display = 'none';
                const span = toggle.querySelector('span');
                if(span) span.textContent = '▼';

                // Gán onclick
                toggle.onclick = () => {
                    if (list.style.display === 'block') {
                        list.style.display = 'none';
                        if(span) span.textContent = '▼';
                    } else {
                        list.style.display = 'block';
                        if(span) span.textContent = '▲';
                    }
                };
            });
        } 
        else { // màn hình >= 600
            toggles.forEach(toggle => {
                toggle.onclick = null; // huỷ onclick
                const list = toggle.nextElementSibling;
                list.style.display = 'block'; // luôn hiển thị
                const span = toggle.querySelector('span');
                if(span) span.textContent = '▲'; // reset icon
            });
        }
    }

    initFooterToggle(); // chạy khi load trang

    window.addEventListener('resize', () => {
        document.querySelectorAll('.footer-toggle').forEach(toggle => {
            toggle.onclick = null;
        });
        initFooterToggle();
    });

});
