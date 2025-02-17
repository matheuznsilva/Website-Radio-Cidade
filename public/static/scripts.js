// ------------- Search Button -------------

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o ícone de busca e o balão
  const searchIcon = document.querySelector('.search-icon');
  const searchBox = document.querySelector('.search-box');

  // Adiciona o evento de clique
  searchIcon.addEventListener('click', () => {
    // Alterna a exibição do balão
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
  });
});

// ------------- App button -------------

/* document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const dropdown = document.querySelector('.dropdown');

  menuButton.addEventListener('click', () => {
    // Alterna a visibilidade do menu
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
}); */

document.addEventListener("DOMContentLoaded", () => {
  const appMenu = document.querySelector(".app-menu");
  const dropdown = document.querySelector(".dropdown");

  // Mostra o dropdown ao passar o mouse no menu
  appMenu.addEventListener("mouseenter", () => {
    dropdown.style.display = "block";
  });

  // Oculta o dropdown ao sair do menu
  appMenu.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
  });
});


// ------------- Back to top -------------

window.addEventListener('scroll', function() {
  const backToTopButton = document.getElementById('backToTop');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = 'block'; // Mostra o botão
  } else {
      backToTopButton.style.display = 'none'; // Esconde o botão
  }
});


document.getElementById('backToTop').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// ------------- google ads -------------

(adsbygoogle = window.adsbygoogle || []).push({});
