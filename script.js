// Data buku
const buku = [
  {
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    genre: "Drama",
    tahun: 2005,
    warna: "#c0713a",
    sinopsis: "Kisah sepuluh anak dari keluarga sederhana di Belitung yang berjuang mendapatkan pendidikan di sekolah yang hampir roboh, dibimbing oleh guru-guru yang penuh dedikasi."
  },
  {
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    genre: "Sejarah",
    tahun: 1980,
    warna: "#7b4b3a",
    sinopsis: "Minke, seorang pribumi terpelajar di masa kolonial Hindia Belanda, bertemu Nyai Ontosoroh dan jatuh cinta pada Annelies sambil menghadapi ketidakadilan zaman."
  },
  {
    judul: "Pergi",
    penulis: "Tere Liye",
    genre: "Aksi",
    tahun: 2018,
    warna: "#35566b",
    sinopsis: "Bujang kembali menjalani dunia shadow economy dan menelusuri jejak pengkhianatan yang mengancam keluarganya, dalam perjalanan penuh intrik dan pertarungan."
  },
  {
    judul: "Dilan 1990",
    penulis: "Pidi Baiq",
    genre: "Romantis",
    tahun: 2014,
    warna: "#b0506a",
    sinopsis: "Kisah cinta Milea dan Dilan, siswa SMA di Bandung tahun 1990, dengan gaya merayu yang unik dan penuh kejutan."
  },
  {
    judul: "Negeri 5 Menara",
    penulis: "Ahmad Fuadi",
    genre: "Drama",
    tahun: 2009,
    warna: "#4f7a5a",
    sinopsis: "Alif bersama lima sahabat di pesantren belajar arti kerja keras dan impian dengan semboyan 'man jadda wajada', siapa yang bersungguh-sungguh pasti berhasil."
  },
  {
    judul: "Harry Potter dan Batu Bertuah",
    penulis: "J.K. Rowling",
    genre: "Fantasi",
    tahun: 1997,
    warna: "#6a4c93",
    sinopsis: "Harry, anak yatim yang tinggal bersama bibinya, mengetahui dirinya seorang penyihir dan memulai petualangan di Sekolah Sihir Hogwarts."
  },
  {
    judul: "Sherlock Holmes: A Study in Scarlet",
    penulis: "Arthur Conan Doyle",
    genre: "Misteri",
    tahun: 1887,
    warna: "#3f3f46",
    sinopsis: "Penampilan pertama detektif Sherlock Holmes dan Dr. Watson saat mengungkap misteri pembunuhan dengan tulisan 'RACHE' di dinding."
  },
  {
    judul: "Cantik Itu Luka",
    penulis: "Eka Kurniawan",
    genre: "Sejarah",
    tahun: 2002,
    warna: "#8a5a2b",
    sinopsis: "Dewi Ayu bangkit dari kubur setelah dua puluh satu tahun dan mengisahkan sejarah keluarganya yang bercampur dengan sejarah Indonesia."
  }
];

// Ambil elemen
const daftar = document.getElementById("daftar-buku");
const kosong = document.getElementById("kosong");
const inputCari = document.getElementById("cari");
const selectFilter = document.getElementById("filter");
const modal = document.getElementById("modal");

// Isi pilihan genre dari data (tanpa duplikat)
const genreUnik = [...new Set(buku.map(b => b.genre))];
genreUnik.forEach(g => {
  const opsi = document.createElement("option");
  opsi.value = g;
  opsi.textContent = g;
  selectFilter.appendChild(opsi);
});

// Tampilkan daftar buku
function tampilkan(data) {
  daftar.innerHTML = "";
  kosong.hidden = data.length > 0;

  data.forEach(b => {
    const kartu = document.createElement("article");
    kartu.className = "kartu";
    kartu.innerHTML = `
      <div class="sampul" style="background:${b.warna}">${b.judul}</div>
      <div class="kartu-teks">
        <h3>${b.judul}</h3>
        <p>${b.penulis}</p>
        <span class="label">${b.genre}</span>
      </div>
    `;
    kartu.addEventListener("click", () => bukaDetail(b));
    daftar.appendChild(kartu);
  });
}

// Cari + filter
function saring() {
  const kata = inputCari.value.toLowerCase();
  const genre = selectFilter.value;

  const hasil = buku.filter(b => {
    const cocokKata =
      b.judul.toLowerCase().includes(kata) ||
      b.penulis.toLowerCase().includes(kata);
    const cocokGenre = genre === "semua" || b.genre === genre;
    return cocokKata && cocokGenre;
  });

  tampilkan(hasil);
}

// Jendela detail
function bukaDetail(b) {
  document.getElementById("m-judul").textContent = b.judul;
  document.getElementById("m-penulis").textContent = "oleh " + b.penulis;
  document.getElementById("m-info").textContent = b.genre + " • " + b.tahun;
  document.getElementById("m-sinopsis").textContent = b.sinopsis;
  modal.hidden = false;
}

function tutupDetail() {
  modal.hidden = true;
}

document.getElementById("tutup").addEventListener("click", tutupDetail);
modal.addEventListener("click", e => {
  if (e.target === modal) tutupDetail();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") tutupDetail();
});

inputCari.addEventListener("input", saring);
selectFilter.addEventListener("change", saring);

// Tampilan awal
tampilkan(buku);
