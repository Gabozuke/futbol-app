document.addEventListener('DOMContentLoaded', function() {
  // Verificar tema oscuro
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }

  // Cargar jugadores
  let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
  
  if (jugadores.length === 0) {
    jugadores = [
      {
        nombre: "Luis Gabriel",
        posicion: "Delantero",
        habilidades: "Velocidad y fuerza de remate",
        disponibilidad: "Entre semana",
        foto: "images/default-avatar.jpg"
      },
      {
        nombre: "María Rodríguez",
        posicion: "Mediocampista",
        habilidades: "Visión de juego y pases precisos",
        disponibilidad: "Fines de semana",
        foto: "images/default-avatar.jpg"
      },
      {
        nombre: "Carlos Sánchez",
        posicion: "Defensa",
        habilidades: "Fuerza y marcaje estrecho",
        disponibilidad: "Ambos",
        foto: "images/default-avatar.jpg"
      }
    ];
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
  }

  actualizarContador(jugadores.length);
  mostrarJugadores(jugadores);

  function mostrarJugadores(jugadores) {
    const tabla = document.getElementById('tabla-jugadores');
    tabla.innerHTML = '';

    jugadores.forEach((jugador, index) => {
      const fila = document.createElement('tr');
      const imagenSrc = jugador.foto || 'images/default-avatar.jpg';
      
      fila.innerHTML = `
        <td><img src="${imagenSrc}" alt="${jugador.nombre}" class="player-avatar" onerror="this.src='images/default-avatar.jpg'"></td>
        <td>${jugador.nombre}</td>
        <td>${jugador.posicion}</td>
        <td>${jugador.habilidades}</td>
        <td>${jugador.disponibilidad}</td>
        <td><button class="btn-delete" data-index="${index}">🗑️</button></td>
      `;
      
      tabla.appendChild(fila);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        eliminarJugador(index);
      });
    });
  }

  function actualizarContador(total) {
    document.getElementById('contador-jugadores').textContent = `Total: ${total} jugador${total !== 1 ? 'es' : ''}`;
  }

  function eliminarJugador(index) {
    const jugadores = JSON.parse(localStorage.getItem('jugadores'));
    jugadores.splice(index, 1);
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    mostrarJugadores(jugadores);
    actualizarContador(jugadores.length);
  }

  window.filtrar = function() {
    const nombre = document.getElementById('filtro-nombre').value.toLowerCase();
    const posicion = document.getElementById('filtro-posicion').value;

    const jugadores = JSON.parse(localStorage.getItem('jugadores'));
    const jugadoresFiltrados = jugadores.filter(jugador => {
      return (nombre === '' || jugador.nombre.toLowerCase().includes(nombre)) &&
             (posicion === '' || jugador.posicion === posicion);
    });

    mostrarJugadores(jugadoresFiltrados);
    actualizarContador(jugadoresFiltrados.length);
  };

  window.exportarJSON = function() {
    const jugadores = JSON.parse(localStorage.getItem('jugadores'));
    const dataStr = JSON.stringify(jugadores, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'jugadores.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
});