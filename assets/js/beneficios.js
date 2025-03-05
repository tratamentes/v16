document.addEventListener("DOMContentLoaded", function() {
    // Função para animar elementos quando entram na viewport
    function animateOnScroll() {
        const beneficios = document.querySelectorAll('.beneficio');
        const header = document.querySelector('.beneficios-header');
        const intro = document.querySelector('.beneficios-intro');
        const testemunho = document.querySelector('.beneficios-testemunho');
        const cta = document.querySelector('.beneficios-cta');
        
        // Todos os elementos que queremos animar
        const elements = [
            { el: header, delay: 0, class: 'fade-in-top' },
            { el: intro, delay: 200, class: 'fade-in-top' },
            ...Array.from(beneficios).map((el, i) => ({ 
                el, 
                delay: 300 + (i * 150), 
                class: 'fade-in-left' 
            })),
            { el: testemunho, delay: 600, class: 'fade-in-bottom' },
            { el: cta, delay: 800, class: 'fade-in-bottom' }
        ];
        
        // Configuração do Intersection Observer
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Encontrar o elemento e sua configuração
                    const item = elements.find(item => item.el === entry.target);
                    if (item) {
                        // Adicionar classe de animação com atraso
                        setTimeout(() => {
                            item.el.classList.add('animate', item.class);
                        }, item.delay);
                    }
                    // Parar de observar depois de animar
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observar todos os elementos
        elements.forEach(item => {
            if (item.el) {
                // Adicionar classe base de animação
                item.el.classList.add('animate-prepared');
                observer.observe(item.el);
            }
        });
    }
    
    // Adicionar interatividade aos cartões de benefícios
    function setupBeneficioCards() {
        const beneficios = document.querySelectorAll('.beneficio');
        
        beneficios.forEach(card => {
            // Detectar hover para dispositivos não touch
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
            
            // Para dispositivos touch, alternar classe ao clicar
            card.addEventListener('click', function() {
                // Apenas para dispositivos touch
                if (window.matchMedia('(hover: none)').matches) {
                    this.classList.toggle('active');
                }
            });
        });
    }
    
    // Iniciar animações
    animateOnScroll();
    
    // Configurar interatividade
    setupBeneficioCards();
    
    // Adicionar estilos para animações ao documento
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos base para elementos animados */
        .animate-prepared {
            opacity: 0;
            visibility: hidden;
        }
        
        /* Animações quando elementos são visíveis */
        .animate {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        /* Tipos de animações */
        .fade-in-top {
            transform: translateY(-30px);
        }
        
        .fade-in-top.animate {
            transform: translateY(0);
        }
        
        .fade-in-bottom {
            transform: translateY(30px);
        }
        
        .fade-in-bottom.animate {
            transform: translateY(0);
        }
        
        .fade-in-left {
            transform: translateX(-30px);
        }
        
        .fade-in-left.animate {
            transform: translateX(0);
        }
        
        /* Estado ativo para cartões em dispositivos touch */
        .beneficio.active {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .beneficio.active .beneficio-number {
            color: white;
            background: var(--secondary-color, #BF6836);
        }
        
        .beneficio.active .icon-wrapper {
            background: rgba(191, 104, 54, 0.2);
        }
    `;
    document.head.appendChild(style);
});