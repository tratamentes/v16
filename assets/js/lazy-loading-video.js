document.addEventListener("DOMContentLoaded", function() {
    // Obter todos os containers de vídeo
    const videoContainers = document.querySelectorAll('.video-container.autoplay-video');
    
    if (videoContainers.length === 0) return;
    
    // Para cada container de vídeo
    videoContainers.forEach(container => {
        // Verificar se já foi processado
        if (container.hasAttribute('data-processed')) return;
        
        // Marcar como processado para evitar duplicação
        container.setAttribute('data-processed', 'true');
        
        // Obter o caminho base do vídeo (sem o tamanho)
        const videoSrc = container.getAttribute('data-video-src');
        if (!videoSrc) return;
        
        // Determinar o tamanho do dispositivo
        const screenWidth = window.innerWidth;
        let sizePrefix;
        
        if (screenWidth <= 480) {
            sizePrefix = "small";
        } else if (screenWidth <= 768) {
            sizePrefix = "medium";
        } else if (screenWidth <= 1200) {
            sizePrefix = "large";
        } else {
            sizePrefix = "extra-large";
        }
        
        // Construir caminhos de vídeo baseados no tamanho do dispositivo
        // Exemplo: converte "terapia-craniana.webm" para "terapia-craniana-small.webm"
        const baseFileName = videoSrc.substring(0, videoSrc.lastIndexOf('.'));
        const extension = videoSrc.substring(videoSrc.lastIndexOf('.'));
        const responsiveVideoPath = `${baseFileName}-${sizePrefix}${extension}`;
        
        console.log(`Tamanho da tela: ${screenWidth}px, usando vídeo: ${responsiveVideoPath}`);
        
        // Criar o elemento de vídeo
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = false;
        
        // Mostrar indicador de carregamento
        container.classList.add('loading');
        
        // Lista de possíveis formatos para tentar (mantendo a preferência por WebM)
        const webmPath = responsiveVideoPath;
        const mp4Path = responsiveVideoPath.replace('.webm', '.mp4');
        
        // Adicionar sources ao vídeo na ordem de preferência
        const sourceWebm = document.createElement('source');
        sourceWebm.src = webmPath;
        sourceWebm.type = 'video/webm';
        video.appendChild(sourceWebm);
        
        const sourceMp4 = document.createElement('source');
        sourceMp4.src = mp4Path;
        sourceMp4.type = 'video/mp4';
        video.appendChild(sourceMp4);
        
        // Adicionar eventos para monitorar o carregamento
        video.addEventListener('loadeddata', function() {
            const loadedSource = this.querySelector('source[src]').src;
            console.log("Vídeo carregado com sucesso:", loadedSource);
            container.classList.remove('loading');
            container.classList.add('playing');
        });
        
        video.addEventListener('error', function(e) {
            console.error("Erro ao carregar as versões responsivas do vídeo, tentando versão padrão...");
            
            // Remover as sources atuais
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            
            // Tentar carregar a versão padrão (sem o sufixo de tamanho)
            const defaultWebm = `${baseFileName}${extension}`;
            const defaultMp4 = defaultWebm.replace('.webm', '.mp4');
            
            const fallbackWebm = document.createElement('source');
            fallbackWebm.src = defaultWebm;
            fallbackWebm.type = 'video/webm';
            this.appendChild(fallbackWebm);
            
            const fallbackMp4 = document.createElement('source');
            fallbackMp4.src = defaultMp4;
            fallbackMp4.type = 'video/mp4';
            this.appendChild(fallbackMp4);
            
            // Recarregar o vídeo
            this.load();
            
            // Se mesmo assim falhar, remover o loading
            this.addEventListener('error', function() {
                console.error("Falha em todas as tentativas de carregamento de vídeo");
                container.classList.remove('loading');
            }, { once: true });
        });
        
        // Iniciar tentativa de reprodução
        video.addEventListener('canplay', function() {
            const playPromise = this.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.warn("Autoplay não permitido:", err);
                    container.classList.remove('loading');
                });
            }
        });
        
        // Adicionar vídeo ao DOM
        container.appendChild(video);
        
        // Remover o vídeo de fallback se existir
        const fallbackVideo = container.querySelector('.fallback-video');
        if (fallbackVideo) {
            fallbackVideo.remove();
        }
        
        // Configurar para reproduzir quando a aba for ativada
        const tabPanel = container.closest('.tab-panel');
        if (tabPanel) {
            const tabId = tabPanel.getAttribute('id');
            const tabButton = document.querySelector(`[aria-controls="${tabId}"]`);
            
            if (tabButton) {
                tabButton.addEventListener('click', function() {
                    if (container.classList.contains('playing')) {
                        const v = container.querySelector('video');
                        if (v && v.paused) {
                            v.play().catch(e => console.warn("Não foi possível reproduzir o vídeo:", e));
                        }
                    }
                });
            }
        }
    });
    
    // Configurar observador para carregamento lazy
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                // Verificar se o vídeo já foi inicializado
                const video = container.querySelector('video');
                if (video && video.paused) {
                    video.play().catch(e => console.warn("Erro no autoplay:", e));
                }
                observer.unobserve(container);
            }
        });
    }, { rootMargin: '100px' });
    
    // Observar todos os containers para lazy loading
    videoContainers.forEach(container => {
        observer.observe(container);
    });
    
    // Recalcular vídeo a ser exibido em caso de redimensionamento da janela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recarregar vídeos apenas se a mudança for significativa
            const newScreenWidth = window.innerWidth;
            const currentSizeCategory = getSizeCategory(newScreenWidth);
            
            if (currentSizeCategory !== getSizeCategory(screenWidth)) {
                console.log("Mudança significativa no tamanho da tela, recarregando vídeos...");
                location.reload(); // Opção simples: recarregar a página
                // Alternativa mais sofisticada: remover e recriar apenas os elementos de vídeo
            }
        }, 500); // Aguardar meio segundo após o redimensionamento parar
    });
    
    // Função auxiliar para determinar categoria de tamanho
    function getSizeCategory(width) {
        if (width <= 480) return "small";
        if (width <= 768) return "medium";
        if (width <= 1200) return "large";
        return "extra-large";
    }
});