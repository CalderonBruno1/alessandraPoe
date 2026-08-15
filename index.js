// Control del botón de Música ON / OFF
const audio = document.getElementById('audioPlayer');
const btnMusica = document.getElementById('btnMusica');
audio.volume = 0.2;

btnMusica.addEventListener('click', () => {
    if (audio.paused) {
        audio.currentTime = 9;
        audio.play().then(() => {
            btnMusica.textContent = "🔊 Música: ON";
            btnMusica.style.borderColor = "#4CAF50"; // Verde sutil cuando suena
        }).catch(error => {
            console.log("No se pudo reproducir:", error);
        });
    } else {
        audio.pause();
        btnMusica.textContent = "🔇 Música: OFF";
        btnMusica.style.borderColor = "#c5a059";
    }
});

function ajustarFlipbook() {
    let anchoDeseado = window.innerWidth * 0.8;
    let altoDeseado = window.innerHeight * 0.8;

    const aspectWidth = 1200;
    const aspectHeight = 720;
    const aspect = aspectWidth / aspectHeight;

    if (anchoDeseado / altoDeseado > aspect) {
        anchoDeseado = altoDeseado * aspect;
    } else {
        altoDeseado = anchoDeseado / aspect;
    }

    if ($(".flipbook").turn("is")) {
        $(".flipbook").turn("size", anchoDeseado, altoDeseado);
    } else {
        // Inicializamos el flipbook
        $(".flipbook").turn({
            width: anchoDeseado,
            height: altoDeseado,
            autoCenter: true,
            gradients: true,
            elevation: 50
        });

        // 🔊 Evento para reproducir sonido al pasar la página y encender música en la página 2
        $(".flipbook").bind("turned", function(event, page, view) {
            
            // 🎵 Si llega a la página 2, encendemos la música automáticamente si está pausada
            if (page === 2) {
                if (audio.paused) {
                    audio.currentTime = 9;
                    audio.play().then(() => {
                        btnMusica.textContent = "🔊 Música: ON";
                        btnMusica.style.borderColor = "#4CAF50";
                    }).catch(error => {
                        console.log("El navegador bloqueó la reproducción automática:", error);
                    });
                }
                return; // Evita que suene el efecto de pasar página en esta misma página 2
            }
            if (page === 18) {
                if (!audio.paused) {
                    audio.pause();
                    btnMusica.textContent = "🔇 Música: OFF";
                    btnMusica.style.borderColor = "#c5a059";
                }
                return; // Evita que suene el efecto de pasar página en esta misma página
            }

            // Sonido de pasar página para el resto de páginas
            const soundPage = document.getElementById('soundPage');
            if (soundPage) {
                soundPage.currentTime = 0; 
                soundPage.play().catch(error => {
                    console.log("El navegador bloqueó el sonido de página:", error);
                });
            }
        }); 
    }
}

// Inicializar al cargar la página
$(document).ready(function() {
    ajustarFlipbook();
});

// Recalcular automáticamente si el usuario cambia el tamaño de la ventana o rota el dispositivo
$(window).resize(function() {
    ajustarFlipbook();
});

// Lógica del botón "No" huyendo
function moverNo() {
    const btnNo = document.getElementById('btn-no');
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 100;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Lógica cuando acepta
function aceptar() {
    $(".flipbook").turn("page", 14); // Salta a la página de celebración
}
function irInicio() {
    $(".flipbook").turn("page", 1);
    
    // Apagar la música si está reproduciéndose
    if (!audio.paused) {
        audio.pause();
        btnMusica.textContent = "🔇 Música: OFF";
        btnMusica.style.borderColor = "#c5a059";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.video-fondo');
    // Ajusta este número: 1 es normal, 0.5 es la mitad de velocidad, 0.25 es muy lento
    video.playbackRate = 0.4; 
  });