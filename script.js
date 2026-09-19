document.addEventListener('DOMContentLoaded', () => {
    const navigationLinks = document.querySelectorAll('.nav-links a');

    const setActiveNavigationLink = (sectionId) => {
        navigationLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            link.toggleAttribute('aria-current', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    navigationLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveNavigationLink(link.getAttribute('href').slice(1));
        });
    });

    if (window.location.hash) {
        setActiveNavigationLink(window.location.hash.slice(1));
    }

    window.addEventListener('hashchange', () => {
        setActiveNavigationLink(window.location.hash.slice(1));
    });

    // Dynamic Work Filtering
    const tabs = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const portfolioForm = document.getElementById('portfolioForm');
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const subject = `Portfolio message from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tusharnimbekar264%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(gmailUrl, '_blank');
            alert('Message delivered successfully!');
            portfolioForm.reset();
        });
    }

});