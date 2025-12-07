// === CONTACT PAGE SPECIFIC LOGIC ===

// 1. COPY EMAIL FUNCTION
// Fungsi ini dipanggil saat user klik email di halaman contact
function copyEmail() {
    const emailElement = document.getElementById('email-text');
    
    // Pastikan elemen ada sebelum dijalankan agar tidak error
    if(emailElement) {
        const email = emailElement.innerText;
        
        navigator.clipboard.writeText(email).then(() => {
            const msg = document.getElementById('copy-msg');
            if(msg) {
                msg.style.opacity = '1';
                setTimeout(() => { msg.style.opacity = '0'; }, 2000);
            }
        }).catch(err => {
            console.error('Gagal menyalin text: ', err);
        });
    }
}

// 2. LIVE TIME UPDATE (Footer)
function updateTime() {
    // Selector diperbaiki agar lebih spesifik menargetkan span waktu di footer
    // Mencari span terakhir di dalam footer
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        const timeElement = footerElement.querySelector('span:last-child');
        
        if (timeElement) {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // Jam 0 menjadi 12
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            timeElement.innerText = hours + ':' + minutes + ' ' + ampm;
        }
    }
}

// Jalankan fungsi waktu
setInterval(updateTime, 1000);
updateTime(); // Jalankan sekali di awal agar tidak menunggu 1 detik

// === 3. SEND EMAIL FUNCTION (MAILTO) ===
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman refresh

            // 1. Ambil nilai dari input
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value; // Email pengirim (untuk referensi di body)
            const message = document.getElementById('user-message').value;

            // 2. Format Pesan Email
            // Tujuan Email Anda (Sesuai contact.html)
            const myEmail = "maulanamalik0213@gmail.com"; 
            
            const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nContact Email: ${email}\n\nMessage:\n${message}`);

            // 3. Buka Aplikasi Email User
            window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
            
            // 4. Reset Form (Opsional)
            // contactForm.reset(); 
        });
    }