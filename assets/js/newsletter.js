document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const msg = document.getElementById("newsletter-msg");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            msg.textContent = "Obrigado por subscrever!";
            msg.style.color = "green";
            emailInput.value = "";
        } else {
            msg.textContent = "Por favor, insere um email válido.";
            msg.style.color = "red";
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
