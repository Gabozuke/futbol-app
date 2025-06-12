document.addEventListener('DOMContentLoaded', () => {
  const email = localStorage.getItem('loggedInUser');
  if (!email) {
    window.location.href = "login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || {});
  const userData = users[email] || {};

  // Cargar datos
  document.getElementById('nombre').value = userData.nombre || '';
  document.getElementById('posicion').value = userData.posicion || '';
  document.getElementById('habilidades').value = userData.habilidades || '';
  document.getElementById('disponibilidad').value = userData.disponibilidad || '';
  document.getElementById('preview').src = userData.imagen || '';

  // Subir imagen
  document.getElementById('imagen').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      document.getElementById('preview').alt = "Cargando...";
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Guardar cambios
  document.getElementById('perfil-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value.trim();
    const habilidades = document.getElementById("habilidades").value.trim();
    const disponibilidad = document.getElementById("disponibilidad").value.trim();
    const imagen = document.getElementById("preview").src;

    if (!nombre || !posicion || !habilidades || !disponibilidad) {
      alert("Por favor completa todos los campos.");
      return;
    }

    users[email] = { ...users[email], nombre, posicion, habilidades, disponibilidad, imagen };
    localStorage.setItem('users', JSON.stringify(users));
    alert("Perfil actualizado correctamente.");
    window.location.href = "jugadores.html";
  });

  // Cerrar sesión
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
  });
});