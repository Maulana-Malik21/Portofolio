// === 1. THREE.JS STARFIELD BACKGROUND ===
// Mengecek apakah elemen canvas ada sebelum menjalankan
{
const canvasEl = document.getElementById('webgl-canvas') || document.getElementById('starfield');

if (canvasEl) {
    const scene = new THREE.Scene();
    // Menambahkan sedikit kabut agar lebih realistis
    scene.fog = new THREE.FogExp2(0x000000, 0.001); 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 6000; i++) {
        vertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
        const color = new THREE.Color();
        // Variasi warna bintang (putih kebiruan)
        Math.random() > 0.8 ? color.setHSL(0.1, 1, 0.6) : color.setHSL(0, 0, 1);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const stars = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    // Interaksi Mouse untuk rotasi background
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function animateStars() {
        requestAnimationFrame(animateStars);
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Rotasi konstan + pengaruh mouse
        stars.rotation.x += 0.0002 + (targetY - stars.rotation.x) * 0.001;
        stars.rotation.y += 0.0002 + (targetX - stars.rotation.y) * 0.001;

        renderer.render(scene, camera);
    }
    animateStars();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// === 2. CUSTOM CURSOR & HOVER EFFECTS ===
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
    });

    // Efek Magnetic pada elemen interaktif
    document.querySelectorAll('.hover-mag, a, button, .orbit-icon, .core-data-box, .skill-orb').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(ring, { scale: 2, borderColor: '#c4a773', mixBlendMode: 'normal', opacity: 0.5 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(ring, { scale: 1, borderColor: 'rgba(196,167,115,0.3)', mixBlendMode: 'screen', opacity: 1 });
        });
    });
}

function updateGlobalTime() {
    const timeElement = document.getElementById('time-display');
    if (timeElement) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        timeElement.innerText = hours + ':' + minutes + ' ' + ampm;
    }
}

// Jalankan setiap detik
setInterval(updateGlobalTime, 1000);
updateGlobalTime(); // Jalankan langsung saat load

// === 3. BACKGROUND MUSIC SYSTEM (INTERSTELLAR) ===
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    
    if (audio) {
        audio.volume = 0.4; // Volume 40% agar tidak terlalu kencang

        // 1. Cek apakah ada simpanan durasi dari halaman sebelumnya
        const savedTime = sessionStorage.getItem('bg_music_time');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        // 2. Fungsi untuk memutar musik
        const playMusic = () => {
            // Browser modern memblokir autoplay suara.
            // Kita coba play, jika gagal, tunggu interaksi user.
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay dicegah browser. Menunggu interaksi user.");
                    // Tambahkan listener satu kali klik untuk memutar musik
                    document.addEventListener('click', () => {
                        audio.play();
                    }, { once: true });
                });
            }
        };

        // Coba putar langsung
        playMusic();

        // 3. Simpan durasi saat user meninggalkan halaman (agar continuous)
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('bg_music_time', audio.currentTime);
        });
    }
});

// ... (Kode sebelumnya biarkan saja) ...

// === 4. MOBILE MENU LOGIC ===
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu(show) {
    if (mobileOverlay) {
        if (show) {
            // Buka Menu
            mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
            mobileOverlay.classList.add('opacity-100', 'pointer-events-auto');
            
            // Animasi Link Muncul satu per satu (Optional GSAP)
            if(typeof gsap !== 'undefined') {
                gsap.fromTo('.mobile-link', 
                    {y: 50, opacity: 0},
                    {y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out'}
                );
            }
        } else {
            // Tutup Menu
            mobileOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
    }
}

// Event Listeners
if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu(true));
if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

// Tutup menu otomatis saat link diklik
mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

}