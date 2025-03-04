// In servicos.js
document.addEventListener("DOMContentLoaded", function () {
    const btnAgendar = document.querySelector(".btn-agendar");
    if (btnAgendar) {
        btnAgendar.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = this.href;
        });
    }
});