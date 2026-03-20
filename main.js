const projects = [
    {
        title: 'Dashboard Analytics',
        short: 'Painel moderno com gráficos e filtros interativos.',
        details: 'Construído com HTML, CSS, JavaScript e Chart.js. Inclui autenticação simulada e filtros dinâmicos para análise de dados em tempo real.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
        image: 'https://via.placeholder.com/300x200?text=Analytics',
        liveUrl: '#',
        repoUrl: 'https://github.com/ariellhc'
    },
    {
        title: 'App de Tarefas',
        short: 'Aplicativo para gerenciar tarefas com persistência local.',
        details: 'Implementado com React e localStorage para sincronização automática. Inclui categorias, arrastar e soltar, e filtros por status.',
        technologies: ['React', 'JavaScript', 'CSS'],
        image: 'https://via.placeholder.com/300x200?text=ToDo+App',
        liveUrl: '#',
        repoUrl: 'https://github.com/ariellhc'
    },
    {
        title: 'API de Blog',
        short: 'Backend RESTful para gerenciamento de posts e usuários.',
        details: 'API desenvolvida com Node.js e Express. Documentação via Swagger e testes automatizados com Jest.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Jest'],
        image: 'https://via.placeholder.com/300x200?text=API+Blog',
        liveUrl: '#',
        repoUrl: 'https://github.com/ariellhc'
    }
];

const projectsGrid = document.getElementById('projectsGrid');

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-short">${project.short}</p>
            <div class="project-details" aria-hidden="true">
                <p>${project.details}</p>
                <p><strong>Tecnologias:</strong> ${project.technologies.join(', ')}</p>
                <div class="project-links">
                    <a class="btn small" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Ver ao vivo</a>
                    <a class="btn small" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">Repositório</a>
                </div>
            </div>
            <button type="button" class="btn toggle-details" aria-expanded="false">Ver detalhes</button>
        </div>
    `;

    const toggle = card.querySelector('.toggle-details');
    const details = card.querySelector('.project-details');

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        details.setAttribute('aria-hidden', String(expanded));
        toggle.textContent = expanded ? 'Ver detalhes' : 'Ocultar detalhes';
    });

    return card;
}

function renderProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project));
    });
}

function setupScrollBehavior() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupContactForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        if (!name || !email || !message) return;

        alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
        form.reset();
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.classList.toggle('open', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupScrollReveal() {
    const revealElements = document.querySelectorAll('section, .skill-item, .project-card');
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
    });

    revealElements.forEach(el => observer.observe(el));
}

function setupActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (entry.isIntersecting && link) {
                navLinks.forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');
            }
        });
    }, {
        threshold: 0.4,
    });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupScrollBehavior();
    setupContactForm();
    setupMobileMenu();
    setupScrollReveal();
    setupActiveNavLink();
});
