// Theme Management
const themeManager = {
    init() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.body.classList.add('light');
        this.initParticles(this.current());
    },
    current() {
        return document.body.classList.contains('light') ? 'light' : 'dark';
    },
    toggle() {
        document.body.classList.toggle('light');
        const t = this.current();
        localStorage.setItem('theme', t);
        this.initParticles(t);
    },
    initParticles(theme) {
        const isLight = theme === 'light';
        const color = isLight ? '#202020' : '#ffffff';
        
        try {
            if (window.pJSDom?.length) {
                window.pJSDom.forEach(d => d.pJS.fn.vendors.destroy());
                window.pJSDom = [];
            }
        } catch (e) {
            document.querySelector('#particles-js canvas')?.remove();
        }

        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: color },
                shape: { type: "circle" },
                opacity: { value: 0.45, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: color, opacity: 0.35, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
};

// Typing Effect
const typingEffect = {
    el: document.getElementById('hero-title'),
    text: "Mehdi Alimohammadi",
    i: 0,
    type() {
        if (this.i < this.text.length) {
            this.el.innerHTML = this.text.substring(0, this.i + 1) + '<span class="typing-cursor"></span>';
            this.i++;
            setTimeout(() => this.type(), 120);
        } else {
            this.el.innerHTML = this.text + '<span class="typing-cursor"></span>';
        }
    }
};

// Scroll Handler
const scrollHandler = {
    stickyHeader: document.getElementById('sticky-header'),
    stickyPic: null,
    stickyName: null,
    toTopBtn: document.getElementById('to-top-btn'),
    init() {
        this.stickyPic = this.stickyHeader.querySelector('.profile-pic');
        this.stickyName = this.stickyHeader.querySelector('.name');
        window.addEventListener("scroll", () => this.handle());
    },
    handle() {
        const heroH = document.querySelector('.hero').offsetHeight;
        const sy = window.scrollY;
        
        // Sticky header visibility
        if (sy > heroH * 0.8) {
            this.stickyHeader.classList.add('visible');
            const prog = Math.min(1, (sy - heroH * 0.8) / 200);
            const sz = 50 - (10 * prog);
            const fs = 1.2 - (0.2 * prog);
            this.stickyPic.style.width = `${sz}px`;
            this.stickyPic.style.height = `${sz}px`;
            this.stickyName.style.fontSize = `${fs}rem`;
        } else {
            this.stickyHeader.classList.remove('visible');
            this.stickyPic.style.width = '50px';
            this.stickyPic.style.height = '50px';
            this.stickyName.style.fontSize = '1.2rem';
        }
        
        // Reveal animations
        document.querySelectorAll(".reveal").forEach(el => {
            const wh = window.innerHeight;
            const et = el.getBoundingClientRect().top;
            if (et < wh - 150) el.classList.add("active");
        });
        
        // Top button
        this.toTopBtn.classList.toggle('visible', sy > 300);
    }
};

// Publication Manager
const pubManager = {
    grid: document.getElementById('publications-grid'),
    statusMap: {
        'published': { class: 'status-published', text: 'Published' },
        'revising': { class: 'status-revising', text: 'Revising' },
        'accepted': { class: 'status-accepted', text: 'Accepted' },
        'finalizing': { class: 'status-finalizing', text: 'Finalizing' },
        'in-prep': { class: 'status-in-prep', text: 'In Preparation' }
    },
    render() {
        this.grid.innerHTML = publications.map(p => this.createCard(p)).join('');
        this.attachEvents();
    },
    createCard(pub) {
        const st = this.statusMap[pub.status] || { class: 'status-in-prep', text: 'Unknown' };
        return `
            <div class="card publication-card reveal" data-status="${pub.status}">
                <div>
                    <p class="title">${pub.title}</p>
                    ${pub.journal ? `<p class="journal">${pub.journal}</p>` : ''}
                    ${pub.link ? `<a href="${pub.link}" target="_blank" rel="noopener" class="paper-link">View Paper <i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${pub.abstract ? `
                        <div class="abstract-container"><p>${pub.abstract}</p></div>
                        <button class="abstract-open-btn">View Abstract</button>
                    ` : ''}
                </div>
                <span class="status ${st.class}">${st.text}</span>
            </div>
        `;
    },
    attachEvents() {
        document.querySelectorAll('.abstract-open-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const abs = btn.previousElementSibling;
                modalManager.open(abs ? abs.innerHTML : '<p>No abstract available.</p>');
            });
        });
    },
    filter(status) {
        document.querySelectorAll('.publication-card').forEach(card => {
            const show = status === 'all' || card.dataset.status === status;
            card.classList.toggle('hide', !show);
        });
    }
};

// Filter Manager
const filterManager = {
    init() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
                });
                pubManager.filter(btn.dataset.filter);
            });
        });
    }
};

// Modal Manager
const modalManager = {
    overlay: document.getElementById('abstract-modal-overlay'),
    body: document.getElementById('abstract-modal-body'),
    close: document.getElementById('abstract-modal-close'),
    init() {
        this.close.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hide();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    },
    open(html) {
        this.body.innerHTML = html;
        this.overlay.style.display = 'flex';
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },
    hide() {
        this.overlay.style.display = 'none';
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    setTimeout(() => typingEffect.type(), 500);
    scrollHandler.init();
    scrollHandler.handle();
    pubManager.render();
    filterManager.init();
    modalManager.init();
    
    document.getElementById('theme-toggle').addEventListener('click', () => themeManager.toggle());
    document.getElementById('to-top-btn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});