document.querySelector("#login-form")?.addEventListener("submit", e => {
  e.preventDefault();
  // TODO: Add real auth
  window.location.href = "mines.html";
});

document.querySelector("#register-form")?.addEventListener("submit", e => {
  e.preventDefault();
  // TODO: Save user to DB
  window.location.href = "mines.html";
});
