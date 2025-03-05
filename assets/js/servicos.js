document.addEventListener("DOMContentLoaded", function() {
    // Funcionalidade de abas (tabs)
    setupTabs();
    
    // Animações ao scroll
    setupScrollAnimations();
    
    // Função para configurar abas interativas
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Desativar todos os botões e painéis
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Ativar botão clicado
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                // Ativar painel correspondente
                const panelId = button.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);
                
                if (panel) {
                    panel.classList.add('active');
                    
                    // Animação sutil
                    panel.style.opacity = 0;
                    setTimeout(() => {
                        panel.style.opacity = 1;
                    }, 50);
                }
            });
        });
        
        // Swipe para mobile (navegação lateral)
        const tabsContent = document.querySelector('.tabs-content');
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (tabsContent) {
            tabsContent.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            tabsContent.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }
        
        function handleSwipe() {
            // Determinar se foi um swipe esquerda ou direita
            if (touchEndX < touchStartX - 50) {
                // Swipe para esquerda - próxima aba
                const activeTab = document.querySelector('.tab-button.active');
                const nextTab = activeTab.nextElementSibling;
                if (nextTab && nextTab.classList.contains('tab-button')) {
                    nextTab.click();
                }
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe para direita - aba anterior
                const activeTab = document.querySelector('.tab-button.active');
                const prevTab = activeTab.previousElementSibling;
                if (prevTab && prevTab.classList.contains('tab-button')) {
                    prevTab.click();
                }
            }
        }
    }
    
    // Animações ao scroll
    function setupScrollAnimations() {
        const elements = [
            { selector: '.servicos-header', className: 'fade-in-top', delay: 0 },
            { selector: '.servicos-intro', className: 'fade-in-top', delay: 200 },
            { selector: '.servicos-tabs', className: 'fade-in', delay: 400 },
            { selector: '.servicos-info', className: 'fade-in-bottom', delay: 600 },
            { selector: '.servicos-cta', className: 'fade-in-bottom', delay: 800 }
        ];
        
        // Adicionar classes de preparação
        elements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.classList.add('animate-prepared');
            }
        });
        
        // Observar elementos e animar quando visíveis
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Encontrar configuração do elemento
                    const elementConfig = elements.find(item => 
                        entry.target.matches(item.selector)
                    );
                    
                    if (elementConfig) {
                        setTimeout(() => {
                            entry.target.classList.add('animate', elementConfig.className);
                        }, elementConfig.delay);
                    }
                    
                    // Parar de observar após animar
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observar todos os elementos
        elements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                observer.observe(element);
            }
        });
    }
    
    // Adicionar estilos para animações
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos base para animações */
        .animate-prepared {
            opacity: 0;
            visibility: hidden;
        }
        
        .animate {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
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
        
        .fade-in {
            transform: scale(0.98);
        }
        
        .fade-in.animate {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
});