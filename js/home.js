// === HOME PAGE SPECIFIC LOGIC ===

// 1. SMOOTH SCROLL (Lenis)
const lenis = new Lenis({ 
    duration: 1.5, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP ANIMATIONS & SCROLL TRIGGER
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // Reveal Text Animation
    gsap.to('.reveal-text-span', { translateY: 0, duration: 2, ease: 'power4.out', stagger: 0.2 });
    gsap.to('.reveal-load', { opacity: 1, duration: 1.5, stagger: 0.2, delay: 0.5 });
});

// Horizontal Scroll Logic
const container = document.querySelector('.space-journey-wrapper');
if (container) {
    gsap.to(container, {
        xPercent: -100 * (4 - 1) / 4, // Logic untuk 4 panel, sesuaikan jika panel bertambah
        ease: "none",
        scrollTrigger: {
            trigger: "#cosmos",
            pin: true,
            scrub: 1,
            end: "+=3000"
        }
    });
}

// 3. TILT EFFECT (3D Card)
const tiltContainer = document.querySelector('.hover-tilt');
if (tiltContainer) {
    window.addEventListener('mousemove', (e) => {
        const rect = tiltContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        gsap.to(tiltContainer, { 
            rotationX: (y - centerY) / 20, 
            rotationY: (centerX - x) / 20, 
            duration: 0.5, 
            ease: 'power2.out' 
        });
    });
    
    tiltContainer.addEventListener('mouseleave', () => {
        gsap.to(tiltContainer, { rotationX: 0, rotationY: 0, duration: 0.5 });
    });
}