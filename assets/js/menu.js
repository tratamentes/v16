// Script para o menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Alterna a classe 'active' quando o botão é clicado
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Altera o símbolo do hamburger quando está aberto
        if (navLinks.classList.contains('active')) {
            hamburger.innerHTML = '&times;'; // Símbolo X
        } else {
            hamburger.innerHTML = '&#9776;'; // Símbolo hamburger
        }
    });
    
    // Fecha o menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '&#9776;';
        });
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '&#9776;';
        }
    });
});