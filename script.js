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

    // --- Enhanced Project Description Generation ---
    function generateProjectDescription(repo) {
        const name = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');
        const lang = repo.language || 'various technologies';
        let description = '';

        // Heuristic-based description generation
        if (name.toLowerCase().includes('portfolio')) {
            description = `A personal portfolio website built with ${lang} to showcase my skills and projects, featuring a clean UI, responsive design, and dynamic content loading.`;
        } else if (name.toLowerCase().includes('ecommerce') || name.toLowerCase().includes('cart') || name.toLowerCase().includes('shop')) {
            description = `A full-featured e-commerce platform built using ${lang}. This project demonstrates my ability to handle complex user flows, product management, and scalable architecture.`;
        } else if (name.toLowerCase().includes('api')) {
            description = `A robust RESTful API developed with ${lang} to serve data efficiently. It's designed for high performance and showcases my back-end development and data modeling skills.`;
        } else if (name.toLowerCase().includes('dashboard') || name.toLowerCase().includes('admin')) {
            description = `An administrative dashboard application created using ${lang}. It provides tools for data visualization and management, emphasizing a clean user interface and efficient data handling.`;
        } else if (name.toLowerCase().includes('blog')) {
            description = `A content management system and blog engine built with ${lang}. This project highlights skills in database design, user authentication, and creating dynamic web applications.`;
        } else if (name.toLowerCase().includes('ai')) {
            description = `An application that leverages ${lang} to integrate AI-powered features, focusing on user interaction and scalable frontend or backend architecture to deliver intelligent responses.`;
        } else {
            description = `A ${lang}-based application, titled ${name}, that demonstrates modern software development practices. The project focuses on a clean, scalable, and maintainable codebase.`;
        }
        
        return description;
    }

    // --- Fetch and Display GitHub Projects ---
    const GITHUB_USERNAME = 'Zapcart';
    const projectsGrid = document.getElementById('projects-grid');

    async function fetchProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const repos = await response.json();
            projectsGrid.innerHTML = ''; // Clear placeholder

            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const description = repo.description && repo.description.length > 20 
                    ? repo.description 
                    : generateProjectDescription(repo);

                projectCard.innerHTML = `
                    <h3>${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                    <p>${description.length > 150 ? `${description.substring(0, 150)}...` : description}</p>
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
            
            setupProjectCardObserver(); // Set up animations after cards are created

        } catch (error) {
            projectsGrid.innerHTML = '<p style="color: var(--accent-color);">Failed to load projects. Please try again later.</p>';
            console.error('Error fetching GitHub repos:', error);
        }
    }

    fetchProjects();

    // --- EmailJS Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const SERVICE_ID = 'service_semjs1c';
    const TEMPLATE_ID = 'template_a5d68vo';
    const PUBLIC_KEY = 'AtCgBxp7Wiywc80-E';

    (function(){ emailjs.init(PUBLIC_KEY); })();

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.from_name.value || !this.from_email.value || !this.message.value) {
            formStatus.textContent = 'Please fill out all fields.';
            formStatus.style.color = '#ffc107';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(() => {
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
        });
    });

    // --- Scroll Animations ---
    function setupSectionObserver() {
        const sections = document.querySelectorAll('.content-section');
        const options = { root: null, rootMargin: '0px', threshold: 0.1 };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        sections.forEach(section => { observer.observe(section); });
    }

    function setupProjectCardObserver() {
        const projectCards = document.querySelectorAll('.project-card');
        const projectCardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => { projectCardObserver.observe(card); });
    }
    
    setupSectionObserver();
});
