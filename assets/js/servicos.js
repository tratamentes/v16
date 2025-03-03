document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-agendar").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = this.href;
    });
});
