document.addEventListener("DOMContentLoaded", function () {
    const btnSaberMais = document.getElementById("btnSaberMais");
    const btnFechar = document.getElementById("btnFechar");
    const maisInfo = document.getElementById("maisInfo");

    // Verificar se os elementos existem para evitar erros
    if (!btnSaberMais || !btnFechar || !maisInfo) return;

    btnSaberMais.addEventListener("click", function () {
        // Mostrar o conteúdo adicional com animação
        maisInfo.style.display = "block";
        
        // Atualizar atributos ARIA para acessibilidade
        btnSaberMais.setAttribute("aria-expanded", "true");
        maisInfo.setAttribute("aria-hidden", "false");
        
        // Esconder o botão "Saber Mais"
        btnSaberMais.style.display = "none";
        
        // Fazer scroll suave até o conteúdo expandido
        setTimeout(() => {
            maisInfo.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    });

    btnFechar.addEventListener("click", function () {
        // Esconder o conteúdo adicional
        maisInfo.style.display = "none";
        
        // Atualizar atributos ARIA para acessibilidade
        btnSaberMais.setAttribute("aria-expanded", "false");
        maisInfo.setAttribute("aria-hidden", "true");
        
        // Mostrar o botão "Saber Mais" novamente
        btnSaberMais.style.display = "inline-block";
        
        // Fazer scroll suave de volta ao topo da seção
        document.getElementById("sobre-titulo").scrollIntoView({ behavior: "smooth" });
    });
    
    // Adicionar efeito de animação ao texto quando visível na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Observar elementos que devem ser animados
    const elementsToObserve = document.querySelectorAll('.sobre-header, .sobre-img, .intro, .sobre-citacao');
    elementsToObserve.forEach(el => {
        observer.observe(el);
        el.classList.add('animate-on-scroll');
    });
});