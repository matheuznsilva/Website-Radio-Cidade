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