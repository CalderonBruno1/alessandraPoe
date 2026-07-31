$(".flipbook").turn({
      width: 900,
      height: 550,
      autoCenter: true,
      gradients: true,
      elevation: 50
    });

    // Lógica del botón "No" huyendo
    function moverNo() {
      const btnNo = document.getElementById('btn-no');
      const randomX = (Math.random() - 0.5) * 150;
      const randomY = (Math.random() - 0.5) * 100;
      btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // Lógica cuando acepta
    function aceptar() {
      alert("¡Sabía que dirías que sí! ❤️ Pasa a la última página.");
      $(".flipbook").turn("page", 6); // Salta a la página de celebración
    }