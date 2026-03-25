function openApp(app) {
  document.getElementById(app).classList.remove("hidden");
}

function closeApp(app) {
  document.getElementById(app).classList.add("hidden");
}

function toggleStart() {
  document.getElementById("startMenu").classList.toggle("hidden");
}
