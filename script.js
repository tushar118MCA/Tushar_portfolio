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
        portfolioForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = portfolioForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch('https://formsubmit.co/ajax/tusharnimbekar264@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        name: portfolioForm.elements.name.value.trim(),
                        email: portfolioForm.elements.email.value.trim(),
                        message: portfolioForm.elements.message.value.trim(),
                        _subject: 'New portfolio contact message',
                        _template: 'table',
                        _captcha: 'false'
                    })
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(errorDetails || 'The message could not be sent.');
                }

                alert('Your response has been recorded and sent successfully.');
                portfolioForm.reset();
            } catch (error) {
                alert('We could not send your response. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

});