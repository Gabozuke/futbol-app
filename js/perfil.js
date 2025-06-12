document.addEventListener('DOMContentLoaded', () => {
  // Aplicar tema oscuro
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }

  const email = localStorage.getItem('loggedInUser');
  if (!email) {
    window.location.href = "login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const userData = users[email] || {};

  document.getElementById('nombre').value = userData.nombre || '';
  document.getElementById('posicion').value = userData.posicion || 'Delantero';
  document.getElementById('habilidades').value = userData.habilidades || '';
  document.getElementById('disponibilidad').value = userData.disponibilidad || 'Entre semana';
  document.getElementById('preview').src = userData.imagen || 'images/default-avatar.jpg';

  document.getElementById('imagen').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona una imagen válida (JPEG, PNG, etc.)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('preview');
        preview.src = event.target.result;
        preview.onerror = () => {
          preview.src = 'images/default-avatar.jpg';
        };
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('perfil-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const posicion = document.getElementById('posicion').value;
    const habilidades = document.getElementById('habilidades').value.trim();
    const disponibilidad = document.getElementById('disponibilidad').value;
    const imagen = document.getElementById('preview').src;

    if (!nombre || !posicion || !habilidades || !disponibilidad) {
      alert("⚠️ Completa todos los campos obligatorios.");
      return;
    }

    users[email] = { 
      ...users[email], 
      nombre, 
      posicion, 
      habilidades, 
      disponibilidad, 
      imagen: imagen.includes('default-avatar') ? 'images/default-avatar.jpg' : imagen 
    };
    localStorage.setItem('users', JSON.stringify(users));

    const jugadores = JSON.parse(localStorage.getItem('jugadores') || []);
    const userIndex = jugadores.findIndex(j => j.email === email);
    
    if (userIndex !== -1) {
      jugadores[userIndex] = {
        ...jugadores[userIndex],
        nombre,
        posicion,
        habilidades,
        disponibilidad,
        foto: imagen.includes('default-avatar') ? 'images/default-avatar.jpg' : imagen
      };
    }
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    alert("✅ Perfil actualizado correctamente.");
    setTimeout(() => window.location.href = "jugadores.html", 1000);
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
  });
});