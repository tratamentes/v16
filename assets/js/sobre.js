document.addEventListener("DOMContentLoaded", function () {
    const btnSaberMais = document.getElementById("btnSaberMais");
    const btnFechar = document.getElementById("btnFechar");
    const maisInfo = document.getElementById("maisInfo");

    btnSaberMais.addEventListener("click", function () {
        maisInfo.style.display = "block";
        btnSaberMais.style.display = "none"; // Esconde o botão depois de abrir
    });

    btnFechar.addEventListener("click", function () {
        maisInfo.style.display = "none";
        btnSaberMais.style.display = "inline-block"; // Volta a exibir o botão
    });
});
