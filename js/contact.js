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