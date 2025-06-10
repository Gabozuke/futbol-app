// Registro e inicio de sesión con localStorage
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[email]) {
        alert("El usuario ya está registrado.");
        return;
      }

      users[email] = { nombre, email, password };
      localStorage.setItem('users', JSON.stringify(users));
      alert("Registro exitoso");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-login').value;
      const password = document.getElementById('password-login').value;

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (!users[email] || users[email].password !== password) {
        alert("Correo o contraseña incorrectos.");
        return;
      }

      localStorage.setItem('loggedInUser', email);
      window.location.href = "perfil.html";
    });
  }
});