function register() {
  const nama = document.getElementById("reg-nama").value.trim()
  const username = document.getElementById("reg-username").value.trim()
  const password = document.getElementById("reg-password").value
  const confirm = document.getElementById("reg-confirm").value
  const msg = document.getElementById("reg-message")

  // Validasi
  if (!nama || !username || !password || !confirm) {
    msg.innerText = "Semua kolom wajib diisi!"
    msg.style.color = "red"
    return
  }

  if (password !== confirm) {
    msg.innerText = "Password dan konfirmasi tidak cocok!"
    msg.style.color = "red"
    return
  }

  if (localStorage.getItem("user_" + username)) {
    msg.innerText = "Username sudah terdaftar!"
    msg.style.color = "red"
    return
  }

  // Simpan data
  localStorage.setItem("user_" + username, password)
  localStorage.setItem("nama_" + username, nama)

  // Berhasil
  msg.style.color = "green"
  msg.innerText = "Berhasil daftar! Mengalihkan ke login..."

  setTimeout(() => {
    window.location.href = "login.html"
  }, 1500)
}

function login() {
  const username = document.getElementById("login-username").value
  const password = document.getElementById("login-password").value
  const storedPass = localStorage.getItem("user_" + username)

  if (storedPass && storedPass === password) {
    localStorage.setItem("login", username)
    window.location.href = "dashboard.html"
  } else {
    document.getElementById("login-message").innerText = "Username atau password salah!"
  }
}


function logout() {
  localStorage.removeItem("login")
  window.location.href = "login.html"
}

let bukuList = JSON.parse(localStorage.getItem("bukuList")) || []

function renderTabel() {
  const tbody = document.querySelector("tbody")
  tbody.innerHTML = ""
  bukuList.forEach((buku, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${buku.judul}</td>
        <td>${buku.pengarang}</td>
        <td>${buku.tahun}</td>
        <td>
          <button class="primary-btn" onclick="editBuku(${i})">Edit</button>
          <button class="primary-btn" onclick="hapusBuku(${i})" style="background:#dc3545">Hapus</button>
        </td>
      </tr>
    `
  })
}

function bukaModalTambah() {
  document.getElementById("modal-title").innerText = "Tambah Buku"
  document.getElementById("editIndex").value = ""
  document.getElementById("judul").value = ""
  document.getElementById("pengarang").value = ""
  document.getElementById("tahun").value = ""
  document.getElementById("modal").style.display = "block"
}

function tutupModal() {
  document.getElementById("modal").style.display = "none"
}

function simpanBuku() {
  const judul = document.getElementById("judul").value
  const pengarang = document.getElementById("pengarang").value
  const tahun = document.getElementById("tahun").value
  const index = document.getElementById("editIndex").value
  if (judul && pengarang && tahun) {
    const data = { judul, pengarang, tahun }
    if (index === "") {
      bukuList.push(data)
    } else {
      bukuList[index] = data
    }
    localStorage.setItem("bukuList", JSON.stringify(bukuList))
    renderTabel()
    tutupModal()
  }
}

function editBuku(i) {
  const buku = bukuList[i]
  document.getElementById("modal-title").innerText = "Edit Buku"
  document.getElementById("editIndex").value = i
  document.getElementById("judul").value = buku.judul
  document.getElementById("pengarang").value = buku.pengarang
  document.getElementById("tahun").value = buku.tahun
  document.getElementById("modal").style.display = "block"
}

function hapusBuku(i) {
  if (confirm("Yakin ingin menghapus buku ini?")) {
    bukuList.splice(i, 1)
    localStorage.setItem("bukuList", JSON.stringify(bukuList))
    renderTabel()
  }
}

if (location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("login")) {
    window.location.href = "login.html"
  } else {
    renderTabel()
  }
}
