/* ZEBS STORE - Core Logic 
   Pastikan file ini terhubung dengan Index.html dan Form.html
*/

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initGameSelection();
});

// 1. Fungsi Loading Screen (Fade Out Smooth)
function initLoadingScreen() {
    // Membuat elemen loader jika belum ada di HTML
    const loader = document.createElement('div');
    loader.id = 'loader-overlay';
    loader.style.cssText = `
        position: fixed; inset: 0; background: #0a0510; z-index: 9999;
        display: flex; justify-content: center; align-items: center;
        transition: opacity 0.8s ease;
    `;
    loader.innerHTML = '<div class="loader"></div>'; 
    document.body.appendChild(loader);

    // Hilangkan loader saat halaman selesai dimuat
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 800);
        }, 500);
    });
}

// 2. Fungsi Klik Game Card (Simpan Data & Pindah Halaman)
function initGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah pindah halaman langsung
            
            const gameTitle = this.querySelector('h4').innerText;
            const targetUrl = this.getAttribute('href');

            // Efek Visual: Tambahkan class active
            gameCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Simpan nama game ke localStorage agar bisa dibaca di Form.html
            localStorage.setItem('selectedGame', gameTitle);

            // Tampilkan Toast Modern
            showToast(`Menyiapkan Top Up ${gameTitle}...`);

            // Animasi Fade Out Halaman sebelum pindah
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            }, 1000);
        });
    });
}

// 3. System Toast (Notifikasi Melayang)
function showToast(message) {
    let toast = document.querySelector('.toast');
    
    // Buat elemen toast jika belum ada
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    
    // Tambahkan class show untuk memunculkan (animasi di CSS)
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hilangkan otomatis setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Logika Tambahan untuk Halaman Form (Jika script ini dipakai di Form.html juga)
if (window.location.pathname.includes('form.html')) {
    const displayTitle = document.getElementById('game-title');
    if (displayTitle) {
        const savedGame = localStorage.getItem('selectedGame');
        displayTitle.innerText = savedGame ? "Top Up " + savedGame : "Top Up Game";
    }
}
