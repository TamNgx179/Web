    // Lấy tất cả link trong nav
    const navLinks = document.querySelectorAll('nav ul li a');

    // Lấy đường dẫn hiện tại (tên file)
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if(linkPage === currentPage){
            link.classList.add('active');
        }
    });