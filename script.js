
document.addEventListener('DOMContentLoaded', function() {
    // GitHub API Integration
    fetchGitHubProjects();

    // Firebase Contact Form
    setupContactForm();

    // Scroll Animations
    setupScrollAnimations();

    // Typing Effect
    setupTypingEffect();

    // Particles Background
    setupParticles();
});

function fetchGitHubProjects() {
    const username = 'Zapcart';
    const projectsGrid = document.querySelector('#projects .grid');
    const githubStats = document.querySelector('#github .grid');

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
        .then(response => response.json())
        .then(repos => {
            projectsGrid.innerHTML = ''; // Clear existing projects
            let repoCount = 0;
            repos.forEach(repo => {
                if (repo.fork) return; // Skip forked repos
                repoCount++;
                const projectCard = document.createElement('div');
                projectCard.classList.add('card');

                let description = repo.description || 'No description provided.';
                // Truncate long descriptions
                if (description.length > 100) {
                    description = description.substring(0, 100) + '...';
                }

                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${description}</p>
                    <ul class="tech-list">
                        ${repo.language ? `<li>${repo.language}</li>` : ''}
                    </ul>
                    <a href="${repo.html_url}" target="_blank" class="btn">View on GitHub</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn">Live Demo</a>` : ''}
                `;
                projectsGrid.appendChild(projectCard);
            });
             if (githubStats) {
                fetch(`https://api.github.com/users/${username}`)
                    .then(response => response.json())
                    .then(user => {
                        githubStats.innerHTML = `
                            <div class="card">
                                <strong style="font-size:3rem;">${user.public_repos}</strong><br>Repositories
                            </div>
                            <div class="card">
                                <strong style="font-size:3rem;">${user.followers}</strong><br>Followers
                            </div>
                        `;
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            projectsGrid.innerHTML = '<p style="color: #ff4444; text-align: center;">Failed to load projects from GitHub.</p>';
        });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusDiv.textContent = 'Sending your message...';
            statusDiv.style.color = 'var(--accent-teal)';

            const name = document.getElementById('from_name').value;
            const email = document.getElementById('from_email').value;
            const message = document.getElementById('message').value;

            // Replace with your Firebase Function URL
            const firebaseFunctionUrl = '';

            fetch(firebaseFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    statusDiv.textContent = 'Message sent successfully! I will get back to you shortly.';
                    statusDiv.style.color = '#00ff00';
                    form.reset();
                } else {
                    throw new Error(data.error || 'Something went wrong.');
                }
            })
            .catch(error => {
                console.error('Firebase function error:', error);
                statusDiv.innerHTML = 'Failed to send message. Please set up your Firebase function URL in script.js';
                statusDiv.style.color = '#ff4444';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
}


function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(sec => observer.observe(sec));
}

function setupTypingEffect() {
    const typingText = document.querySelector('.typing');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        window.addEventListener('load', type);
    }
}

function setupParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#00ffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#a78bfa', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2 }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' } }
            }
        });
    }
}
