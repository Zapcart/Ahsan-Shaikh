document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Typing effect
    const typingElement = document.querySelector('.typing');
    const textArray = ["Senior Full-Stack Developer", "React.js Expert", "Node.js Specialist"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typingElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    type();

    // Fetch GitHub Repos
    const projectsContainer = document.getElementById('projects-container');
    fetch('https://api.github.com/users/Zapcart/repos?sort=updated&direction=desc')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <div class="tech-stack">
                        ${repo.language ? `<span>${repo.language}</span>` : ''}
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn">View on GitHub</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching GitHub repos:', error));

    // EmailJS Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Replace with your EmailJS credentials
    const serviceID = 'service_semjs1c';
    const templateID = 'template_a5d68vo';
    const userID = 'AtCgBxp7Wiywc80-E';

    emailjs.init(userID);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        formStatus.textContent = 'Sending...';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                contactForm.reset();
            }, (err) => {
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.style.color = 'red';
                console.error('EmailJS error:', err);
            });
    });

    // Smooth scroll and section reveal
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});
