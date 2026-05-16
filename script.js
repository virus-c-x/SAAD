/**
 * Virus Team | Premium Portfolio - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Cinematic Loading Sequence
    const loader = document.getElementById('loader');
    const percentageText = document.querySelector('.loader-percentage');
    const statusText = document.querySelector('.status-text');
    const loaderBar = document.querySelector('.loader-bar');
    const particleContainer = document.querySelector('.loader-particles');
    let progress = 0;

    const statusMessages = [
        "INITIALIZING SYSTEMS",
        "SYNCING CORE ASSETS",
        "ESTABLISHING SECURE UPLINK",
        "OPTIMIZING NEURAL INTERFACE",
        "LOADING PERSONAL MODULES",
        "READY FOR DEPLOYMENT"
    ];

    // Create background data particles
    const createParticles = () => {
        if (!particleContainer) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const moveX = (Math.random() - 0.5) * 300;
            const moveY = (Math.random() - 0.5) * 300;
            const duration = 3 + Math.random() * 5;
            const delay = Math.random() * 2;

            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.animationDelay = `${delay}s`;

            particleContainer.appendChild(particle);
        }
    };

    const updateLoader = () => {
        createParticles();
        const startTime = Date.now();
        const timeout = 6000; // 6s Max loading time safety

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            
            // Accelerate progress if random is too slow
            progress += Math.random() * 8 + (elapsed / 1000); 
            
            if (progress >= 100 || elapsed >= timeout) {
                progress = 100;
                clearInterval(interval);
                finishLoading();
            }
            
            if (percentageText) percentageText.textContent = `${Math.floor(progress)}%`;
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            
            // Update status messages
            const msgIndex = Math.min(
                Math.floor((progress / 100) * statusMessages.length),
                statusMessages.length - 1
            );
            if (statusText && statusText.textContent !== statusMessages[msgIndex]) {
                statusText.textContent = statusMessages[msgIndex];
            }
        }, 80);
    };

    const finishLoading = () => {
        setTimeout(() => {
            if (loader) loader.classList.add('fade-out');
            
            // Re-initialize icons when content becomes visible
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Start revealing content
            setTimeout(() => {
                revealOnLoad();
            }, 300);

            // Clean up loader from DOM after transition
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
                document.body.style.overflow = 'auto'; // Ensure scroll is enabled
            }, 1200);
        }, 300);
    };

    updateLoader();

    // 3. Scroll Reveal Logic
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    function revealOnLoad() {
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            profileSection.style.opacity = '1';
            profileSection.style.transform = 'translateY(0)';
            profileSection.classList.add('visible');
        }
        
        // Also ensure all visible elements on screen are revealed
        const onScreenElements = document.querySelectorAll('[data-reveal]');
        onScreenElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }

    // 4. Mouse Move Ambient Parallax
    const auroras = document.querySelectorAll('.aurora, .profile-glow-aura');
    const container = document.querySelector('.aurora-container');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        auroras.forEach((aurora, index) => {
            const factor = (index + 1) * 0.5;
            aurora.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });

    // 5. Interactive Button Physics Feel
    const cards = document.querySelectorAll('.glass-panel');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            card.style.setProperty('--rotateX', `${rotateX}deg`);
            card.style.setProperty('--rotateY', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotateX', `0deg`);
            card.style.setProperty('--rotateY', `0deg`);
        });
    });

    // 6. Smooth Scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Music Box Toggle Logic
    const musicToggle = document.getElementById('music-toggle');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const visualizerBars = document.querySelectorAll('.bar');
    let isPlaying = false;

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                visualizerBars.forEach(bar => bar.style.animationPlayState = 'running');
            } else {
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                visualizerBars.forEach(bar => bar.style.animationPlayState = 'paused');
            }
        });

        // Initialize as paused
        visualizerBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }
});
