function toggleTheme() {
  const dark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modoOscuro", dark ? "1" : "0");
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("modoOscuro") === "1") {
    document.body.classList.add("dark-mode");
  }
});