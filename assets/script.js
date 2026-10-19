
        const navbar = document.getElementById("navbar");

        let lastScroll = window.scrollY;

        window.addEventListener("scroll", function () {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                // At the top: hide navbar
                navbar.classList.remove("show");
            } else if (currentScroll > lastScroll) {
                // Scrolling down: show navbar
                navbar.classList.add("show");
            } else {
                // Scrolling up: hide navbar
                navbar.classList.remove("show");
            }

            lastScroll = currentScroll;
        });