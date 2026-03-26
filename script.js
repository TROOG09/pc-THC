<script>
    // 1. Efecto de carga inicial
    window.onload = () => {
        setTimeout(() => {
            const boot = document.getElementById('boot-screen');
            boot.style.opacity = '0';
            setTimeout(() => { 
                boot.style.display = 'none';
                document.getElementById('login-screen').style.display = 'flex';
            }, 1000);
        }, 3000); // 3 segundos de carga
    };

    // 2. Función de Login
    function iniciarSesion() {
        const user = document.getElementById('username').value;
        if (user.trim() !== "") {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('desktop').style.display = 'block';
            console.log("Sesión iniciada: " + user);
        } else {
            alert("Por favor, introduce un nombre.");
        }
    }

    // 3. Función del Navegador con PROXY
    function irALaWeb() {
        let url = document.getElementById('url-input').value.trim();
        const iframe = document.getElementById('browser-frame');
        
        if (url === "") return;

        // Auto-completar https si falta
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        // Usamos AllOrigins como proxy para saltar el bloqueo de seguridad (X-Frame)
        // Esto permite que la web se vea DENTRO de tu página
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        
        iframe.src = proxyUrl + encodeURIComponent(url);
        document.getElementById('url-input').value = url;
    }

    // 4. Utilidades
    function toggleBrowser() {
        const win = document.getElementById('browser-window');
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    }

    function reloadPage() {
        const iframe = document.getElementById('browser-frame');
        iframe.src = iframe.src; // Recarga la URL actual del proxy
    }

    // Escuchar tecla Enter en la barra de direcciones
    document.getElementById('url-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') irALaWeb();
    });
</script>
