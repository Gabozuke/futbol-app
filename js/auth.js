document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  const hashPassword = (password) => {
    const salt = "futbolapp_salt";
    return btoa(password + salt);
  };

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email.includes('@') || password.length < 6) {
        alert("Email inválido o contraseña demasiado corta (mínimo 6 caracteres).");
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[email]) {
        alert("El usuario ya está registrado.");
        return;
      }

      const newUser = { 
        nombre, 
        email, 
        password: hashPassword(password),
        posicion: "",
        habilidades: "",
        disponibilidad: "",
        imagen: "images/default-avatar.jpg"
      };

      users[email] = newUser;
      localStorage.setItem('users', JSON.stringify(users));

      const jugadores = JSON.parse(localStorage.getItem('jugadores') || []);
      jugadores.push({
        nombre: nombre,
        posicion: "",
        habilidades: "",
        disponibilidad: "",
        foto: "images/default-avatar.jpg",
        email: email
      });
      localStorage.setItem('jugadores', JSON.stringify(jugadores));

      alert("Registro exitoso");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-login').value.trim();
      const password = document.getElementById('password-login').value.trim();

      const users = JSON.parse(localStorage.getItem('users') || {});
      const user = users[email];
      
      if (!user || user.password !== hashPassword(password)) {
        alert("Correo o contraseña incorrectos.");
        return;
      }

      localStorage.setItem('loggedInUser', email);
      window.location.href = "perfil.html";
    });
  }
});

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }
});