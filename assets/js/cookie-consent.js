document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");
    const openSettingsButton = document.getElementById("open-cookie-settings");

    if (!banner || !settings || !openSettingsButton) {
        console.error("Erro: Elementos do cookie consent não encontrados no HTML.");
        return;
    }

    // Verificar se já existe consentimento salvo
    const cookiePrefs = JSON.parse(localStorage.getItem("cookieConsent")) || {};

    if (!cookiePrefs.set) {
        banner.style.display = "block";
    } else {
        openSettingsButton.style.display = "block"; // Mostrar botão "Gerir Cookies"
    }

    document.getElementById("accept-all").addEventListener("click", function () {
        saveConsent({ essential: true, analytics: true, marketing: true });
    });

    document.getElementById("reject-all").addEventListener("click", function () {
        saveConsent({ essential: true, analytics: false, marketing: false });
    });

    document.getElementById("customize-cookies").addEventListener("click", function () {
        banner.style.display = "none";
        settings.style.display = "block";
    });

    document.getElementById("save-cookie-settings").addEventListener("click", function () {
        const analytics = document.getElementById("analytics-cookies").checked;
        const marketing = document.getElementById("marketing-cookies").checked;

        saveConsent({ essential: true, analytics, marketing });
    });

    openSettingsButton.addEventListener("click", function () {
        settings.style.display = "block";
    });

    function saveConsent(consent) {
        localStorage.setItem("cookieConsent", JSON.stringify({ ...consent, set: true }));
        banner.style.display = "none";
        settings.style.display = "none";
        openSettingsButton.style.display = "block"; // Mostrar botão "Gerir Cookies"
        applyConsent();
    }

    function applyConsent() {
        const prefs = JSON.parse(localStorage.getItem("cookieConsent"));

        console.log("Preferências de cookies carregadas:", prefs);

        // Carregar Google Analytics e Microsoft Clarity
        if (prefs.analytics) {
            loadGoogleAnalytics();
            loadMicrosoftClarity();
        }

        // Carregar Facebook Pixel
        if (prefs.marketing) {
            loadFacebookPixel();
        }
    }

    function loadGoogleAnalytics() {
        console.log("Google Analytics ativado.");
        loadScript("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"); // Substituir pelo teu ID
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX'); // Substituir pelo teu ID
    }

    function loadMicrosoftClarity() {
        console.log("Microsoft Clarity ativado.");
        loadScript("https://www.clarity.ms/tag/YOUR_CLARITY_ID"); // Substituir pelo teu ID do Clarity
    }

    function loadFacebookPixel() {
        console.log("Facebook Pixel ativado.");
        !function(f,b,e,v,n,t,s) {
            if(f.fbq)return; n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
            n.queue=[]; t=b.createElement(e); t.async=!0;
            t.src=v; s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
        }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', 'YOUR_FACEBOOK_PIXEL_ID'); // Substituir pelo teu ID
        fbq('track', 'PageView');
    }

    function loadScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => console.log(`Script carregado: ${src}`);
        script.onerror = () => console.log(`Erro ao carregar: ${src}`);
        document.head.appendChild(script);
    }

    applyConsent();
});
