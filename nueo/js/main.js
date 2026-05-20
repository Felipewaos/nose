document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'mensajes de helldivers';

    const btnEnviar = document.querySelector('.btn-steam');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', (event) => {
            event.preventDefault();

            // Crear el contenedor para el GIF y el mensaje
            const contenedor = document.createElement('div');
            contenedor.style.position = 'fixed';
            contenedor.style.top = '50%';
            contenedor.style.left = '50%';
            contenedor.style.transform = 'translate(-50%, -50%)';
            contenedor.style.zIndex = '1000';
            contenedor.style.textAlign = 'center';
            contenedor.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            contenedor.style.padding = '2rem';
            contenedor.style.borderRadius = '8px';
            contenedor.style.border = '2px solid #FFE600';

            // Crear el mensaje
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Gracias por su apoyo Helldiver';
            mensaje.style.color = '#FFE600';
            mensaje.style.fontSize = '1.5rem';
            mensaje.style.marginBottom = '1.5rem';
            mensaje.style.fontWeight = 'bold';

            // Crear el GIF
            const gif = document.createElement('img');
            gif.src = './img/helldivers-salute.gif';
            gif.alt = 'Gracias por su apoyo Helldiver';
            gif.style.width = '300px';

            // Agregar el mensaje y GIF al contenedor
            contenedor.appendChild(mensaje);
            contenedor.appendChild(gif);
            document.body.appendChild(contenedor);

            // Cerrar después de 5 segundos
            setTimeout(() => {
                contenedor.remove();
            }, 5000);
        });
    }

    const muralText = document.getElementById('mural-text');
    const muralSend = document.getElementById('mural-send');
    const muralBoard = document.getElementById('mural-board');

    function cargarMensajes() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        try {
            const mensajes = JSON.parse(raw);
            return Array.isArray(mensajes) ? mensajes : [];
        } catch (error) {
            return [];
        }
    }

    function guardarMensajes(mensajes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mensajes));
    }

    function crearNota(texto) {
        const note = document.createElement('div');
        note.className = 'mural-note';
        note.textContent = texto;
        return note;
    }

    function renderMensajes() {
        if (!muralBoard) return;
        muralBoard.innerHTML = '';
        const mensajes = cargarMensajes();

        mensajes.forEach((texto) => {
            muralBoard.appendChild(crearNota(texto));
        });
    }

    function agregarMensaje(texto) {
        if (!texto) return;
        const mensajes = cargarMensajes();
        mensajes.push(texto);
        guardarMensajes(mensajes);
        if (muralBoard) {
            muralBoard.appendChild(crearNota(texto));
        }
    }

    if (muralSend && muralText && muralBoard) {
        muralSend.addEventListener('click', () => {
            const texto = muralText.value.trim();
            if (!texto) return;
            agregarMensaje(texto);
            muralText.value = '';
        });
    }

    renderMensajes();
});


