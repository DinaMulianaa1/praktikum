const KEY = "daftarMahasiswa";
const PILIH_KEY = "mhsTerpilih";
const seed = [
  { nim: "2225001", nama: "Widia Hastuti", prodi: "Teknik Informatika", angkatan: "2025", foto: "whatsapp image 2026-04-14 at 16.43.49.jpeg" },
  { nim: "2225002", nama: "Budi Santoso", prodi: "Sistem Informasi", angkatan: "2025", foto: "" },
  { nim: "2225003", nama: "Citra Lestari", prodi: "Teknik Informatika", angkatan: "2025", foto: "" },
  { nim: "2225004", nama: "Dewa Putu Arya", prodi: "Manajemen Informatika", angkatan: "2025", foto: "" },
];

function getData() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(d) && d.length) {
      // lengkapi data lama yang belum punya angkatan/foto
      return d.map(m => {
        const s = seed.find(x => x.nim === m.nim);
        return s ? { ...s, ...m, angkatan: m.angkatan || s.angkatan, foto: m.foto || s.foto } : m;
      });
    }
  } catch (e) {}
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}
function saveData(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); return true; }
  catch (e) { alert("Penyimpanan penuh. Gunakan foto yang lebih kecil."); return false; }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function inisial(nama) {
  return nama.split(/\s+/).filter(Boolean).slice(0, 2).map(k => k[0].toUpperCase()).join("");
}

// Kecilkan foto agar muat di localStorage
function kecilkanFoto(file, maks = 300) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("File harus berupa gambar (JPG/PNG)."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const g = new Image();
      g.onerror = () => reject(new Error("Gambar tidak dapat dibuka."));
      g.onload = () => {
        const skala = Math.min(1, maks / Math.max(g.width, g.height));
        const c = document.createElement("canvas");
        c.width = Math.round(g.width * skala);
        c.height = Math.round(g.height * skala);
        c.getContext("2d").drawImage(g, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.85));
      };
      g.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Identitas mahasiswa terpilih ---------- */
function tampilkanIdentitas() {
  if (!document.getElementById("kartuIdentitas")) return;
  const data = getData();
  const nim = localStorage.getItem(PILIH_KEY);
  const m = data.find(x => x.nim === nim) || data[0];
  const img = document.getElementById("fotoProfil");
  const avatar = document.getElementById("avatar");

  document.getElementById("idNama").textContent = m.nama;
  document.getElementById("idNim").textContent = m.nim;
  document.getElementById("idProdi").textContent = m.prodi;
  document.getElementById("idAngkatan").textContent = m.angkatan || "-";
  document.getElementById("namaFoto").textContent = m.nama;
  avatar.textContent = inisial(m.nama);
  document.getElementById("btnEdit").href = "form-mahasiswa.html?nim=" + encodeURIComponent(m.nim);

  if (m.foto) {
    avatar.style.display = "none";
    img.style.display = "block";
    img.alt = "Foto " + m.nama;
    img.src = m.foto;
  } else {
    img.style.display = "none";
    avatar.style.display = "block";
  }
  document.querySelectorAll("#tabelBody tr[data-nim]").forEach(tr =>
    tr.classList.toggle("selected", tr.dataset.nim === m.nim));
}

function pilihMahasiswa(nim) {
  localStorage.setItem(PILIH_KEY, nim);
  tampilkanIdentitas();
}

/* ---------- Tabel ---------- */
function renderTabel(keyword = "") {
  const body = document.getElementById("tabelBody");
  if (!body) return;
  const q = keyword.trim().toLowerCase();
  const hasil = getData().filter(m =>
    m.nim.toLowerCase().includes(q) || m.nama.toLowerCase().includes(q));
  body.innerHTML = hasil.length
    ? hasil.map(m => `<tr data-nim="${esc(m.nim)}"><td>${esc(m.nim)}</td><td>${esc(m.nama)}</td><td>${esc(m.prodi)}</td></tr>`).join("")
    : `<tr><td colspan="3" class="kosong">Data mahasiswa tidak ditemukan.</td></tr>`;

  // Jika hasil pencarian tinggal satu, langsung tampilkan identitasnya
  if (q && hasil.length === 1 && document.getElementById("kartuIdentitas")) {
    localStorage.setItem(PILIH_KEY, hasil[0].nim);
  }
  tampilkanIdentitas();
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("tabelBody");
  const kartu = document.getElementById("kartuIdentitas");

  // Pencarian
  const cari = document.getElementById("cari");
  const clear = document.getElementById("clearBtn");
  if (cari) {
    cari.addEventListener("input", () => renderTabel(cari.value));
    clear.addEventListener("click", () => { cari.value = ""; renderTabel(); cari.focus(); });
  }

  // Klik baris -> tampilkan data mahasiswa di kartu identitas
  if (body && kartu) {
    body.classList.add("bisa-dipilih");
    body.addEventListener("click", e => {
      const tr = e.target.closest("tr[data-nim]");
      if (tr) pilihMahasiswa(tr.dataset.nim);
    });
  }

  // Foto rusak/tidak ada -> tampilkan inisial
  const img = document.getElementById("fotoProfil");
  if (img) img.addEventListener("error", () => {
    img.style.display = "none";
    document.getElementById("avatar").style.display = "block";
  });

  // Ganti foto mahasiswa yang sedang ditampilkan
  const inputFoto = document.getElementById("inputFoto");
  if (inputFoto) inputFoto.addEventListener("change", async () => {
    const file = inputFoto.files[0];
    if (!file) return;
    try {
      const foto = await kecilkanFoto(file);
      const data = getData();
      const nim = localStorage.getItem(PILIH_KEY) || data[0].nim;
      const m = data.find(x => x.nim === nim) || data[0];
      m.foto = foto;
      if (saveData(data)) tampilkanIdentitas();
    } catch (err) { alert(err.message); }
    inputFoto.value = "";
  });

  // Hapus mahasiswa yang sedang ditampilkan
  const btnHapus = document.getElementById("btnHapus");
  if (btnHapus) btnHapus.addEventListener("click", () => {
    const data = getData();
    const nim = localStorage.getItem(PILIH_KEY) || data[0].nim;
    const m = data.find(x => x.nim === nim) || data[0];
    if (data.length <= 1) { alert("Data terakhir tidak bisa dihapus. Minimal harus ada satu mahasiswa."); return; }
    if (!confirm(`Hapus mahasiswa "${m.nama}" (${m.nim})?\nTindakan ini tidak dapat dibatalkan.`)) return;
    if (!saveData(data.filter(x => x.nim !== m.nim))) return;
    localStorage.removeItem(PILIH_KEY);
    renderTabel(cari ? cari.value : "");
  });

  renderTabel();

  // Form tambah / edit mahasiswa
  const form = document.getElementById("formMahasiswa");
  if (form) {
    const nimLama = new URLSearchParams(location.search).get("nim");
    const mhsEdit = nimLama ? getData().find(x => x.nim === nimLama) : null;
    if (mhsEdit) {
      document.title = "Edit Mahasiswa";
      document.getElementById("judulForm").textContent = "Edit Mahasiswa";
      document.getElementById("deskForm").textContent = "Ubah data mahasiswa, lalu simpan.";
      document.getElementById("btnSimpan").textContent = "Simpan Perubahan";
      document.getElementById("labelFoto").textContent = "Foto (kosongkan jika tidak diganti)";
      form.nim.value = mhsEdit.nim;
      form.nama.value = mhsEdit.nama;
      form.prodi.value = mhsEdit.prodi;
      form.angkatan.value = mhsEdit.angkatan || "";
    }

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const nim = form.nim.value.trim().toUpperCase();
      const nama = form.nama.value.trim();
      const prodi = form.prodi.value;
      const angkatan = form.angkatan.value.trim();
      const file = form.foto.files[0];
      const msg = document.getElementById("pesan");
      const gagal = t => { msg.className = "msg err"; msg.textContent = t; };
      const data = getData();
      const target = mhsEdit ? data.find(x => x.nim === nimLama) : null;

      if (!/^[A-Z0-9]{5,}$/.test(nim)) return gagal("NIM hanya boleh huruf dan angka, minimal 5 karakter.");
      if (nama.length < 3) return gagal("Nama minimal 3 karakter.");
      if (!/^\d{4}$/.test(angkatan)) return gagal("Angkatan harus 4 digit, contoh: 2025.");
      if (data.some(m => m.nim === nim && m !== target)) return gagal("NIM sudah terdaftar.");

      let foto = target ? target.foto : "";
      if (file) {
        try { foto = await kecilkanFoto(file); } catch (err) { return gagal(err.message); }
      }

      if (target) {
        Object.assign(target, { nim, nama, prodi, angkatan, foto });
      } else {
        data.push({ nim, nama, prodi, angkatan, foto });
      }
      if (!saveData(data)) return;
      localStorage.setItem(PILIH_KEY, nim);
      msg.className = "msg ok";
      if (target) {
        msg.textContent = "Perubahan berhasil disimpan. Mengalihkan...";
        setTimeout(() => { location.href = "index.html"; }, 800);
      } else {
        form.reset();
        msg.textContent = "Mahasiswa berhasil ditambahkan.";
      }
    });
  }
});
