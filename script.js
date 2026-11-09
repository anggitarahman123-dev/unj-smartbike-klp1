document.addEventListener("DOMContentLoaded", function() {
    updateLabelDurasi();
    
    const paketSelect = document.getElementById('paket');
    if (paketSelect) {
        paketSelect.addEventListener('change', updateLabelDurasi);
    }
});

// Fungsi Interaktif dari Katalog ke Kalkulator
function pilihPaketDariKatalog(nilaiPaket, tipeWaktu) {
    const paketSelect = document.getElementById('paket');
    paketSelect.value = nilaiPaket;
    updateLabelDurasi();

    // Scroll halus ke area kalkulator
    const areaKalkulator = document.getElementById('calc-section');
    areaKalkulator.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Efek highlight kotak kalkulator
    const box = document.querySelector('.calculator-box');
    box.style.boxShadow = '0 0 0 5px rgba(174, 172, 120, 0.4)';
    setTimeout(() => {
        box.style.boxShadow = '0 10px 30px rgba(76, 69, 65, 0.05)';
    }, 1000);
}

// Menyesuaikan label durasi berdasarkan paket yang dipilih
function updateLabelDurasi() {
    const paketSelect = document.getElementById('paket');
    if (!paketSelect) return;
    
    const selectedOption = paketSelect.options[paketSelect.selectedIndex];
    const tipe = selectedOption.getAttribute('data-tipe');
    const labelDurasi = document.getElementById('labelDurasi');

    if (!labelDurasi) return;

    if (tipe === 'jam') {
        labelDurasi.innerText = 'Durasi Unit yang Disewa (Jam):';
    } else if (tipe === 'hari') {
        labelDurasi.innerText = 'Durasi Unit yang Disewa (Hari):';
    } else if (tipe === 'minggu') {
        labelDurasi.innerText = 'Durasi Unit yang Disewa (Minggu):';
    }
}

// Logika Kalkulator Harga & Diskon (Software Engineer 1 & 2)
function hitungTotal() {
    const paketEl = document.getElementById('paket');
    const durasiEl = document.getElementById('durasi');
    const promoEl = document.getElementById('promo');
    const jenisKendaraan = document.querySelector('input[name="jenisKendaraan"]:checked').value;

    if (!paketEl || !durasiEl) return;

    const hargaPaket = parseFloat(paketEl.value);
    const durasi = parseFloat(durasiEl.value);
    const kodePromo = promoEl.value.trim().toUpperCase();

    if (isNaN(durasi) || durasi <= 0) {
        alert("Harap masukkan durasi sewa yang valid.");
        return;
    }

    // Perhitungan subtotal (Harga x Durasi)
    const subtotal = hargaPaket * durasi;
    let diskon = 0;

    // Logika Percabangan Kondisi Diskon Promo (SE 2)
    if (kodePromo === 'UNJHEMAT') {
        diskon = subtotal * 0.10; // Diskon 10%
    } else if (kodePromo === 'GREENKAMPUS') {
        diskon = 15000; // Potongan langsung Rp 15.000
        if (diskon > subtotal) diskon = subtotal; 
    } else if (kodePromo !== '') {
        alert("Kode promo tidak valid atau telah kadaluarsa.");
    }

    const totalBayar = subtotal - diskon;

    // Menampilkan hasil ke elemen HTML
    document.getElementById('kendaraanOutput').innerText = jenisKendaraan;
    document.getElementById('subtotalOutput').innerText = formatRupiah(subtotal);
    document.getElementById('diskonOutput').innerText = '- ' + formatRupiah(diskon);
    document.getElementById('totalOutput').innerText = formatRupiah(totalBayar);

    document.getElementById('resultBox').style.display = 'block';
}

function prosesPembayaran() {
    const jenisKendaraan = document.querySelector('input[name="jenisKendaraan"]:checked').value;
    const paymentMethod = document.getElementById('paymentMethod').options[document.getElementById('paymentMethod'].selectedIndex].text;
    const totalOutput = document.getElementById('totalOutput').innerText;
    
    alert(`Pesanan Berhasil Dikonfirmasi!\n\nKendaraan: ${jenisKendaraan}\nTotal Pembayaran: ${totalOutput}\nMetode Pembayaran: ${paymentMethod}\n\nSilakan selesaikan pembayaran dan ambil unit di Station UNJ SmartBike.`);
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('ID-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
}
