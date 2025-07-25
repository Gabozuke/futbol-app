document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  // Hashear contraseña (solución básica, no para producción)
  const hashPassword = (password) => {
    const salt = "futbolapp_salt";
    return btoa(password + salt); // Base64 (mejor que texto plano)
  };

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      // Validaciones
      if (!email.includes('@') || password.length < 6) {
        alert("Email inválido o contraseña demasiado corta (mínimo 6 caracteres).");
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || {});
      if (users[email]) {
        alert("El usuario ya está registrado.");
        return;
      }

      users[email] = { 
        nombre, 
        email, 
        password: hashPassword(password), // Contraseña hasheada
        posicion: "",
        habilidades: "",
        disponibilidad: "",
        imagen: ""
      };
      localStorage.setItem('users', JSON.stringify(users));
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