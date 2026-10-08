const NOMOR_WA = "6283870513717";

const PRODUK = [
    {
        img: "tambang.jpg",
        alt: "Kue Tambang",
        nama: "Kue Tambang",
        desc: "Kue berbentuk seperti tambang dengan tekstur renyah dan rasa gurih.",
        harga: "Rp15.000"
    },
    {
        img: "sistik.jpg",
        alt: "Sistik",
        nama: "Sistik",
        desc: "Camilan berbentuk stik dengan tekstur renyah dan rasa gurih.",
        harga: "Rp12.000"
    }
];

const PROMO_CARD = [
    {
        icon: "🔥",
        title: "Promo 1",
        text: "Beli 2 Kue Tambang",
        bonus: "Gratis 1 Sistik",
        harga: "Rp30.000"
    },
    {
        icon: "🎉",
        title: "Promo Akhir Tahun",
        text: "Beli 3 Sistik",
        bonus: "Gratis 2 Tambang",
        harga: "Rp36.000"
    },
    {
        icon: "💰",
        title: "Paket Hemat",
        text: "Tambang + Sistik",
        bonus: "Rp25.000",
        harga: ""
    }
];

const HARGA = {
    tambang: 15000,
    sistik: 12000
};

const PROMO = [
    {
        id: "jumlahPromo1",
        nama: "Promo 1 (Beli 2 Tambang Gratis 1 Sistik)",
        harga: 30000
    },
    {
        id: "jumlahAkhirTahun",
        nama: "Promo Akhir Tahun (Beli 3 Sistik Gratis 2 Tambang)",
        harga: 36000
    },
    {
        id: "jumlahHemat",
        nama: "Paket Hemat (Tambang + Sistik)",
        harga: 25000
    }
];

let jenis = "";

// Menampilkan langkah tertentu
function tampilkanLangkah(id) {
    const daftarLangkah = [
        "langkahJenis",
        "langkahForm"
    ];

    daftarLangkah.forEach(function(nama) {
        const elemen = document.getElementById(nama);

        if (elemen) {
            elemen.style.display = "none";
        }
    });

    const tujuan = document.getElementById(id);

    if (tujuan) {
        tujuan.style.display = "block";
    }
}

// Membuka modal pemesanan
function pesan() {
    const modal = document.getElementById("modalPesan");

    if (modal) {
        modal.classList.add("aktif");
        tampilkanLangkah("langkahJenis");
    }
}

// Menutup modal
function tutupModal() {
    const modal = document.getElementById("modalPesan");

    if (modal) {
        modal.classList.remove("aktif");
    }
}

// Memilih jenis pesanan
function pilihJenis(pilihan) {
    jenis = pilihan;

    const judulForm = document.getElementById("judulForm");

    if (judulForm) {
        if (jenis === "promo") {
            judulForm.textContent = "Pesan Promo";
        } else {
            judulForm.textContent = "Pesan Biasa";
        }
    }

    const pilihanPromo = document.getElementById("pilihanPromo");
    const pilihanBiasa = document.getElementById("pilihanBiasa");

    if (pilihanPromo) {
        pilihanPromo.style.display =
            jenis === "promo" ? "block" : "none";
    }

    if (pilihanBiasa) {
        pilihanBiasa.style.display =
            jenis === "biasa" ? "block" : "none";
    }

    hitungTotal();
    tampilkanLangkah("langkahForm");
}

function kembali() {
    tampilkanLangkah("langkahJenis");
}

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function ambilJumlah(id) {
    const input = document.getElementById(id);

    if (!input) {
        return 0;
    }

    return Number(input.value) || 0;
}

function hitungTotal() {
    let total = 0;

    if (jenis === "biasa") {

        const jumlahTambang =
            ambilJumlah("jumlahTambang");

        const jumlahSistik =
            ambilJumlah("jumlahSistik");

        total =
            (jumlahTambang * HARGA.tambang) +
            (jumlahSistik * HARGA.sistik);

    } else if (jenis === "promo") {

        PROMO.forEach(function(promo) {

            const jumlah =
                ambilJumlah(promo.id);

            total +=
                jumlah * promo.harga;
        });
    }

    const totalElement =
        document.getElementById("total");

    if (totalElement) {
        totalElement.textContent = rupiah(total);
    }

    return total;
}

function kirimPesanan(event) {

    event.preventDefault();

    const total = hitungTotal();

    if (total <= 0) {
        alert("Jumlah pesanan belum diisi!");
        return;
    }

    let daftar = "";

    if (jenis === "biasa") {

        const tambang =
            ambilJumlah("jumlahTambang");

        const sistik =
            ambilJumlah("jumlahSistik");

        if (tambang > 0) {
            daftar +=
                "- Kue Tambang x" +
                tambang +
                "\n";
        }

        if (sistik > 0) {
            daftar +=
                "- Sistik x" +
                sistik +
                "\n";
        }

    } else {

        PROMO.forEach(function(promo) {

            const jumlah =
                ambilJumlah(promo.id);

            if (jumlah > 0) {

                daftar +=
                    "- " +
                    promo.nama +
                    " x" +
                    jumlah +
                    "\n";
            }
        });
    }

    const nama =
        document.getElementById("nama").value;

    const telepon =
        document.getElementById("telepon").value;

    const alamat =
        document.getElementById("alamat").value;

    const metodeBayarEl =
        document.getElementById("metodeBayar");

    const metodeBayar =
        metodeBayarEl
            ? metodeBayarEl.value
            : "Tidak dipilih";

    const teksPesanan =
        "PESANAN KUERENYAH\n" +
        "====================\n" +
        "Nama: " +
        nama +
        "\n" +
        "No. Telepon: " +
        telepon +
        "\n" +
        "Alamat: " +
        alamat +
        "\n" +
        "Jenis Pesanan: " +
        (
            jenis === "promo"
                ? "Promo"
                : "Biasa"
        ) +
        "\n\n" +
        "Pesanan:\n" +
        daftar +
        "\n" +
        "Metode Pembayaran: " +
        metodeBayar +
        "\n" +
        "Total Bayar: " +
        rupiah(total) +
        "\n\n" +
        "Terima kasih sudah memesan di KueRenyah!";

    const url =
        "https://wa.me/" +
        NOMOR_WA +
        "?text=" +
        encodeURIComponent(teksPesanan);

    window.location.href = url;
}

function renderProduk() {

    const list =
        document.getElementById("produkList");

    if (!list) {
        return;
    }

    list.innerHTML = PRODUK.map(function(item) {

        return `
            <div class="card product-card">

                <img 
                    src="${item.img}" 
                    alt="${item.alt}"
                >

                <h3>${item.nama}</h3>

                <p class="description">
                    ${item.desc}
                </p>

                <p class="price">
                    ${item.harga}
                </p>

            </div>
        `;

    }).join("");
}

function renderPromo() {

    const list =
        document.getElementById("promoList");

    if (!list) {
        return;
    }

    list.innerHTML =
        PROMO_CARD.map(function(item) {

            const harga =
                item.harga
                    ? `<p class="promo-price">${item.harga}</p>`
                    : "";

            return `
                <div class="card promo-card">

                    <div class="promo-icon">
                        ${item.icon}
                    </div>
                    <h3>
                        ${item.title}
                    </h3>
                    <p>
                        ${item.text}
                    </p>
                    <b>
                        ${item.bonus}
                    </b>
                    ${harga}
                </div>
            `;
        }).join("");
}

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProduk();
        renderPromo();

    }
);

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("modalPesan");
        if (
            modal &&
            event.target === modal
        ) {
            tutupModal();
        }
    }
);