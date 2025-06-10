function mostrarJugadores(filtroPos = '', filtroDisp = '') {
  const tabla = document.getElementById("tabla-jugadores");
  tabla.innerHTML = "";
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  for (let email in users) {
    const user = users[email];
    if (filtroPos && !user.posicion?.toLowerCase().includes(filtroPos.toLowerCase())) continue;
    if (filtroDisp && !user.disponibilidad?.toLowerCase().includes(filtroDisp.toLowerCase())) continue;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${user.imagen || ''}" width="60" style="border-radius:50%;"></td>
      <td>${user.nombre || ''}</td>
      <td>${user.email}</td>
      <td>${user.posicion || ''}</td>
      <td>${user.habilidades || ''}</td>
      <td>${user.disponibilidad || ''}</td>
      <td><button onclick="eliminarUsuario('${email}')">Eliminar</button></td>
    `;
    tabla.appendChild(row);
  }
}

function filtrar() {
  const pos = document.getElementById("filtro-posicion").value;
  const disp = document.getElementById("filtro-disponibilidad").value;
  mostrarJugadores(pos, disp);
}

function eliminarUsuario(email) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (confirm(`¿Estás seguro de eliminar al usuario: ${email}?`)) {
    delete users[email];
    localStorage.setItem('users', JSON.stringify(users));
    mostrarJugadores();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarJugadores();
});

function exportarJSON() {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const datos = Object.values(users);
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'jugadores.json';
  a.click();
}

function toggleTheme() {
  const dark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modoOscuro", dark ? "1" : "0");
}

function aplicarTema() {
  const modo = localStorage.getItem("modoOscuro");
  if (modo === "1") document.body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarTema();
  mostrarJugadores();
});

function mostrarJugadores(filtroPos = '', filtroDisp = '') {
  const tabla = document.getElementById("tabla-jugadores");
  tabla.innerHTML = "";
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  let contador = 0;

  for (let email in users) {
    const user = users[email];
    if (filtroPos && !user.posicion?.toLowerCase().includes(filtroPos.toLowerCase())) continue;
    if (filtroDisp && !user.disponibilidad?.toLowerCase().includes(filtroDisp.toLowerCase())) continue;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${user.imagen || ''}" width="60" style="border-radius:50%;"></td>
      <td>${user.nombre || ''}</td>
      <td>${user.email}</td>
      <td>${user.posicion || ''}</td>
      <td>${user.habilidades || ''}</td>
      <td>${user.disponibilidad || ''}</td>
      <td><button onclick="eliminarUsuario('${email}')">Eliminar</button></td>
    `;
    tabla.appendChild(row);
    contador++;
  }

  document.getElementById("contador-jugadores").textContent = `Se han registrado ${contador} jugador(es).`;
}