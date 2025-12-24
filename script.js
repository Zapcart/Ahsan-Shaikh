document.addEventListener('DOMContentLoaded', () => {

    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Fetch and Display GitHub Projects
    const GITHUB_USERNAME = 'Zapcart';
    const projectsGrid = document.getElementById('projects-grid');

    async function fetchProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const repos = await response.json();

            projectsGrid.innerHTML = ''; // Clear placeholder

            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const description = repo.description ? 
                    (repo.description.length > 150 ? `${repo.description.substring(0, 150)}...` : repo.description)
                    : 'No description available. This repository showcases my skills in building robust applications.';

                projectCard.innerHTML = `
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${description}</p>
                    <div class="project-tech-stack">
                        ${repo.language ? `<span>${repo.language}</span>` : ''}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-secondary">GitHub</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
                    </div>
                `;
                projectsGrid.appendChild(projectCard);
            });

        } catch (error) {
            projectsGrid.innerHTML = '<p style="color: var(--accent-color);">Failed to load projects. Please try again later.</p>';
            console.error('Error fetching GitHub repos:', error);
        }
    }

    fetchProjects();

    // EmailJS Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const SERVICE_ID = 'service_semjs1c';
    const TEMPLATE_ID = 'template_a5d68vo';
    const PUBLIC_KEY = 'AtCgBxp7Wiywc80-E';

    (function(){
        emailjs.init(PUBLIC_KEY);
    })();

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!this.from_name.value || !this.from_email.value || !this.message.value) {
            formStatus.textContent = 'Please fill out all fields.';
            formStatus.style.color = '#ffc107';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                contactForm.reset();
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'var(--accent-color)';
                setTimeout(() => formStatus.textContent = '', 5000);
            }, (err) => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                formStatus.textContent = `Failed to send. Error: ${JSON.stringify(err)}`;
                formStatus.style.color = '#dc3545';
                console.error('EmailJS Error:', err);
            });
    });

    // Scroll Animations
    const sections = document.querySelectorAll('.content-section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
