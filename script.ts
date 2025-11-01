// Types
type Theme = 'light' | 'dark';
type PublicationStatus = 'published' | 'revising' | 'accepted' | 'finalizing' | 'in-prep';

interface Publication {
    status: PublicationStatus;
    title: string;
    journal?: string;
    link?: string;
    abstract?: string;
}

interface StatusInfo {
    class: string;
    text: string;
}

// Theme Manager
class ThemeManager {
    private current(): Theme {
        return document.body.classList.contains('light') ? 'light' : 'dark';
    }

    init(): void {
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved === 'light') document.body.classList.add('light');
        this.initParticles(this.current());
    }

    toggle(): void {
        document.body.classList.toggle('light');
        const theme = this.current();
        localStorage.setItem('theme', theme);
        this.initParticles(theme);
    }

    private initParticles(theme: Theme): void {
        const isLight = theme === 'light';
        const color = isLight ? '#202020' : '#ffffff';
        
        try {
            if (window.pJSDom?.length) {
                window.pJSDom.forEach((d: any) => d.pJS.fn.vendors.destroy());
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
}

// Typing Effect
class TypingEffect {
    private el: HTMLElement;
    private text: string = "Mehdi Alimohammadi";
    private i: number = 0;

    constructor(elementId: string) {
        this.el = document.getElementById(elementId)!;
    }

    type(): void {
        if (this.i < this.text.length) {
            this.el.innerHTML = this.text.substring(0, this.i + 1) + '<span class="typing-cursor"></span>';
            this.i++;
            setTimeout(() => this.type(), 120);
        } else {
            this.el.innerHTML = this.text + '<span class="typing-cursor"></span>';
        }
    }
}

// Scroll Handler
class ScrollHandler {
    private stickyHeader: HTMLElement;
    private stickyPic: HTMLElement;
    private stickyName: HTMLElement;
    private toTopBtn: HTMLElement;

    constructor() {
        this.stickyHeader = document.getElementById('sticky-header')!;
        this.stickyPic = this.stickyHeader.querySelector('.profile-pic')!;
        this.stickyName = this.stickyHeader.querySelector('.name')!;
        this.toTopBtn = document.getElementById('to-top-btn')!;
    }

    init(): void {
        window.addEventListener("scroll", () => this.handle());
    }

    private handle(): void {
        const heroH = document.querySelector('.hero')!.clientHeight;
        const sy = window.scrollY;
        
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
        
        document.querySelectorAll(".reveal").forEach(el => {
            const wh = window.innerHeight;
            const et = el.getBoundingClientRect().top;
            if (et < wh - 150) el.classList.add("active");
        });
        
        this.toTopBtn.classList.toggle('visible', sy > 300);
    }
}

// Publication Manager
class PublicationManager {
    private grid: HTMLElement;
    private statusMap: Record<PublicationStatus, StatusInfo> = {
        'published': { class: 'status-published', text: 'Published' },
        'revising': { class: 'status-revising', text: 'Revising' },
        'accepted': { class: 'status-accepted', text: 'Accepted' },
        'finalizing': { class: 'status-finalizing', text: 'Finalizing' },
        'in-prep': { class: 'status-in-prep', text: 'In Preparation' }
    };

    constructor(gridId: string) {
        this.grid = document.getElementById(gridId)!;
    }

    render(publications: Publication[]): void {
        this.grid.innerHTML = publications.map(p => this.createCard(p)).join('');
        this.attachEvents();
    }

    private createCard(pub: Publication): string {
        const st = this.statusMap[pub.status];
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
    }

    private attachEvents(): void {
        document.querySelectorAll('.abstract-open-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const abs = btn.previousElementSibling as HTMLElement;
                const modal = new ModalManager('abstract-modal-overlay', 'abstract-modal-body');
                modal.open(abs ? abs.innerHTML : '<p>No abstract available.</p>');
            });
        });
    }

    filter(status: string): void {
        document.querySelectorAll('.publication-card').forEach(card => {
            const cardEl = card as HTMLElement;
            const show = status === 'all' || cardEl.dataset.status === status;
            card.classList.toggle('hide', !show);
        });
    }
}

// Filter Manager
class FilterManager {
    private pubManager: PublicationManager;

    constructor(pubManager: PublicationManager) {
        this.pubManager = pubManager;
    }

    init(): void {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
                });
                const btnEl = btn as HTMLElement;
                this.pubManager.filter(btnEl.dataset.filter!);
            });
        });
    }
}

// Modal Manager
class ModalManager {
    private overlay: HTMLElement;
    private body: HTMLElement;
    private closeBtn: HTMLElement;

    constructor(overlayId: string, bodyId: string) {
        this.overlay = document.getElementById(overlayId)!;
        this.body = document.getElementById(bodyId)!;
        this.closeBtn = document.getElementById('abstract-modal-close')!;
        this.initEvents();
    }

    private initEvents(): void {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hide();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    }

    open(html: string): void {
        this.body.innerHTML = html;
        this.overlay.style.display = 'flex';
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    hide(): void {
        this.overlay.style.display = 'none';
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const typingEffect = new TypingEffect('hero-title');
    const scrollHandler = new ScrollHandler();
    const pubManager = new PublicationManager('publications-grid');
    const filterManager = new FilterManager(pubManager);

    themeManager.init();
    setTimeout(() => typingEffect.type(), 500);
    scrollHandler.init();
    pubManager.render((window as any).publications);
    filterManager.init();
    
    document.getElementById('theme-toggle')!.addEventListener('click', () => themeManager.toggle());
    document.getElementById('to-top-btn')!.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});