// LOGIN
function login() {
  const user = document.getElementById("user").value.trim();
  if (!user) {
    alert("Introduce un usuario");
    return;
  }
  document.getElementById("login").style.display = "none";
  document.getElementById("os").classList.remove("hidden");
  startClock();
  startMatrix();
  startGlitch();
  startBrightness();
  startMouseEffects();
}

// RELOJ
function startClock() {
  const clock = document.getElementById("clock");
  setInterval(() => {
    clock.innerText = new Date().toLocaleTimeString();
  }, 1000);
}

// APPS abrir / cerrar
function openApp(id) {
  const app = document.getElementById(id);
  if (!app) return;
  app.style.zIndex = getMaxZ() + 1;
  app.classList.remove("hidden");
}
function closeApp(id) {
  document.getElementById(id).classList.add("hidden");
}

// START menú
function toggleStart() {
  document.getElementById("startMenu").classList.toggle("hidden");
}

// DRAG WINDOWS
let current, ox, oy;
function dragStart(e, el) {
  current = el;
  ox = e.clientX - el.offsetLeft;
  oy = e.clientY - el.offsetTop;
  document.onmousemove = drag;
  document.onmouseup = () => (current = null);
}
function drag(e) {
  if (current) {
    current.style.left = e.clientX - ox + "px";
    current.style.top = e.clientY - oy + "px";
  }
}

// MÁXIMO Z-INDEX para ventanas
function getMaxZ() {
  const windows = document.querySelectorAll(".window");
  let max = 10;
  windows.forEach((w) => {
    const z = parseInt(window.getComputedStyle(w).zIndex) || 0;
    if (z > max) max = z;
  });
  return max;
}

// SISTEMA DE ARCHIVOS (localStorage)
function saveFile() {
  const content = document.getElementById("noteArea").value;
  let files = JSON.parse(localStorage.getItem("files") || "[]");
  files.push({ name: "file" + Date.now() + ".txt", content });
  localStorage.setItem("files", JSON.stringify(files));
  alert("Archivo guardado");
}

function loadFiles() {
  let files = JSON.parse(localStorage.getItem("files") || "[]");
  let html = "";
  files.forEach((f) => {
    html += `<p onclick="openFile('${f.name}')">${f.name}</p>`;
  });
  document.getElementById("fileList").innerHTML = html;
}
setInterval(loadFiles, 1000);

function openFile(name) {
  let files = JSON.parse(localStorage.getItem("files") || "[]");
  let file = files.find((f) => f.name === name);
  if (!file) return alert("Archivo no encontrado");
  openApp("notepad");
  document.getElementById("noteArea").value = file.content;
}

// TERMINAL
function runCmd(e) {
  if (e.key !== "Enter") return;
  const input = e.target.value.trim();
  const term = document.getElementById("term");
  let output = "";

  if (input === "help") output = "help, clear, date, echo";
  else if (input === "date") output = new Date().toString();
  else if (input.startsWith("echo ")) output = input.slice(5);
  else if (input === "clear") {
    term.innerHTML = "";
    e.target.value = "";
    return;
  } else output = "comando no reconocido";

  term.innerHTML += `> ${input}<br>${output}<br>`;
  term.scrollTop = term.scrollHeight;
  e.target.value = "";
}

// NAVEGADOR
function loadPage(e) {
  if (e.key !== "Enter") return;
  const url = e.target.value.trim();
  if (!url) return;
  const frame = document.getElementById("frame");
  if (!url.startsWith("http")) {
    frame.src = "https://" + url;
  } else {
    frame.src = url;
  }
}

// FONDO GLITCH
function startGlitch() {
  const desktop = document.querySelector(".desktop");
  setInterval(() => {
    desktop.classList.add("glitch");
    setTimeout(() => desktop.classList.remove("glitch"), 200);
  }, 3000);
}

// BRILLO DINÁMICO
function startBrightness() {
  const desktop = document.querySelector(".desktop");
  setInterval(() => {
    const val = 0.8 + Math.random() * 0.3;
    desktop.style.filter = `brightness(${val})`;
  }, 2000);
}

// EFECTO MATRIX
function startMatrix() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  let width, height;
  let columns;
  let drops;

  function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#0f0";
    ctx.font = "20px monospace";

    for (let i = 0; i < columns; i++) {
      const text = String.fromCharCode(0x30a0 + Math.random() * 96);
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();

  window.onresize = init;
}

// EFECTOS MOUSE CYBERPUNK
function startMouseEffects() {
  const desktop = document.querySelector(".desktop");
  desktop.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    desktop.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
  });
}
