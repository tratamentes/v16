document.addEventListener("DOMContentLoaded", function () {
    const hero = document.getElementById("hero");
    const overlay = document.querySelector(".hero-overlay");
    const buttons = document.querySelectorAll(".hero-buttons button");

    // Configurar Overlay
    if (hero.dataset.overlay === "true") {
        overlay.classList.add("active");
    }

    // Ajustar posição do texto
    const position = hero.dataset.position;
    if (position) {
        hero.classList.add(position);
    }

    // Ativar Paralaxe
    if (hero.dataset.parallax === "true") {
        window.addEventListener("scroll", function () {
            let offset = window.pageYOffset;
            hero.style.backgroundPositionY = `${offset * 0.5}px`;
        });
    }

    // Configurar botões dinamicamente
        buttons.forEach(button => {
          button.addEventListener("click", function () {
            const action = button.dataset.action;
            if (action === "link") {
              const url = button.dataset.url;
              if (url && isValidURL(url)) {
                window.location.href = url;
              }
            } else if (action === "function") {
              const funcName = button.dataset.func;
              if (typeof window[funcName] === "function") {
                window[funcName]();
              }
            }
          });
        });

    // Função para validar URLs (evita XSS)
    function isValidURL(url) {
        try {
            let testURL = new URL(url, window.location.origin);
            return testURL.protocol === "http:" || testURL.protocol === "https:";
        } catch (error) {
            console.error("URL inválida:", url);
            return false;
        }
    }
});

// Exemplo de função para o botão "Saber Mais"
function showMoreInfo() {
    alert("Mais informações sobre Terapia Manual Integrativa.");
}
