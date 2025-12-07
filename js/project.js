// === PROJECT PAGE SPECIFIC LOGIC ===

// 1. REGISTER GSAP PLUGINS
{
gsap.registerPlugin(ScrollTrigger);

// 2. HERO SECTION ENTRANCE ANIMATION
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.hero-line span', { 
        translateY: 0, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: 'power4.out' 
    })
    .to(['.hero-btns', '.hero-status'], { 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out' 
    }, '-=0.5');
});

// 3. SCROLL-TRIGGERED REVEAL (PROJECT CARDS)
gsap.utils.toArray('.project-card-wrapper').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { 
            trigger: card, 
            start: 'top 90%', 
            toggleActions: 'play none none reverse' 
        },
        y: 120, 
        opacity: 0, 
        duration: 1.2, 
        ease: 'power3.out'
    });
});

// 4. THREE.JS BACKGROUND (INTERACTIVE STARFIELD)
const canvasEl = document.getElementById('webgl-canvas');
if (canvasEl) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- SETUP BINTANG (Tetap Double Layer: Putih & Emas) ---
    
    // Layer 1: Bintang kecil jauh (Putih)
    const geo1 = new THREE.BufferGeometry();
    const vert1 = [];
    for(let i=0; i<4000; i++) vert1.push((Math.random()-0.5)*2500, (Math.random()-0.5)*2500, (Math.random()-0.5)*2500);
    geo1.setAttribute('position', new THREE.Float32BufferAttribute(vert1, 3));
    const stars1 = new THREE.Points(geo1, new THREE.PointsMaterial({color: 0xffffff, size: 1, transparent: true, opacity: 0.8}));
    scene.add(stars1);

    // Layer 2: Debu Emas (Lebih besar)
    const geo2 = new THREE.BufferGeometry();
    const vert2 = [];
    for(let i=0; i<1000; i++) vert2.push((Math.random()-0.5)*1500, (Math.random()-0.5)*1500, (Math.random()-0.5)*1500);
    geo2.setAttribute('position', new THREE.Float32BufferAttribute(vert2, 3));
    const stars2 = new THREE.Points(geo2, new THREE.PointsMaterial({color: 0xc4a773, size: 3, transparent: true, opacity: 0.3}));
    scene.add(stars2);

    camera.position.z = 1000;

    // --- LOGIKA MENGIKUTI CURSOR ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    function animateThree() {
        requestAnimationFrame(animateThree);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Rotasi Smooth mengikuti mouse (Layer 1)
        stars1.rotation.y += 0.05 * (targetX - stars1.rotation.y);
        stars1.rotation.x += 0.05 * (targetY - stars1.rotation.x);

        // Rotasi Smooth mengikuti mouse (Layer 2 - sedikit lebih cepat untuk efek parallax)
        stars2.rotation.y += 0.08 * (targetX - stars2.rotation.y);
        stars2.rotation.x += 0.08 * (targetY - stars2.rotation.x);

        renderer.render(scene, camera);
    }
    animateThree();

    window.addEventListener('resize', () => { 
        camera.aspect = window.innerWidth/window.innerHeight; 
        camera.updateProjectionMatrix(); 
        renderer.setSize(window.innerWidth, window.innerHeight); 
    });
}

// 5. CURSOR & HOVER EFFECTS
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power3.out' });
    });

    document.querySelectorAll('.hover-mag, a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(ring, { 
                scale: 2.5, 
                borderColor: '#c4a773', 
                backgroundColor: 'rgba(196, 167, 115, 0.05)' 
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(ring, { 
                scale: 1, 
                borderColor: 'rgba(196, 167, 115, 0.4)', 
                backgroundColor: 'transparent' 
            });
        });
    });
}

// 6. VANILLA TILT INIT
if (document.querySelectorAll(".js-tilt").length > 0) {
    VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        gyroscope: false
    });
}
}