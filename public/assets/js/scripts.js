document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar componentes HTML
    async function loadComponent(placeholderId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            document.getElementById(placeholderId).innerHTML = text;
        } catch (error) {
            console.error(`Erro ao carregar o componente ${filePath}:`, error);
        }
    }

    // Carregar cabeçalho e rodapé
    // A inicialização das funcionalidades agora ocorrerá *apenas* após o header ser carregado.
    loadComponent('header-placeholder', '../components/header.html')
        .then(() => {
            initializeHeaderFeatures(); // Inicializa funcionalidades que dependem do header
        })
        .catch(error => {
            console.error("Falha ao carregar o cabeçalho, funcionalidades podem não ser inicializadas:", error);
        });

    loadComponent('footer-placeholder', '../components/footer.html');


    function initializeHeaderFeatures() {
        // --- Lógica do Botão de Busca ---
        const searchIcon = document.querySelector('.search-icon');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.getElementById('searchInput'); // Certifique-se de que o input tem este ID no seu header.html

        if (searchIcon && searchBox && searchInput) {
            searchIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Impede que o clique no ícone se propague e feche imediatamente
                searchBox.classList.toggle('active'); // Alterna a classe 'active'
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                }
            });

            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    searchSite();
                }
            });
        }

        // --- Lógica do Menu Mobile (Hambúrguer) ---
        const menuIcon = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');

        if (menuIcon && navbar) {
            menuIcon.addEventListener('click', () => {
                navbar.classList.toggle('active');
                // Altera o ícone: se a navbar tem 'active', mostra 'bx-x', senão 'bx-menu'
                if (menuIcon.classList.contains('bx-menu')) {
                    menuIcon.classList.replace('bx-menu', 'bx-x');
                } else if (menuIcon.classList.contains('bx-x')) {
                    menuIcon.classList.replace('bx-x', 'bx-menu');
                }
                // Adicionalmente, se você usa o Font Awesome (fa-bars/fa-xmark)
                if (menuIcon.classList.contains('fa-bars')) {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                } else if (menuIcon.classList.contains('fa-xmark')) {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            });

            // Fechar o menu mobile quando um link é clicado
            const navLinks = navbar.querySelectorAll('ul a'); // Seleciona todos os links dentro da navbar
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbar.classList.remove('active'); // Remove a classe 'active' para fechar o menu
                    // Garante que o ícone retorne ao estado original
                    if (menuIcon.classList.contains('bx-x')) {
                        menuIcon.classList.replace('bx-x', 'bx-menu');
                    }
                    if (menuIcon.classList.contains('fa-xmark')) {
                        menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    }
                });
            });
        }

        // --- Lógica dos Dropdowns de Menu (Contato, App) ---
        const menuButtons = document.querySelectorAll('.menu-button');

        menuButtons.forEach(button => {
            // Verifica se o próximo elemento irmão existe e é um dropdown
            const dropdown = button.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                button.addEventListener('click', (event) => {
                    event.stopPropagation(); // Impede que o clique se propague e feche o dropdown imediatamente
                    // Fecha todos os outros dropdowns que não sejam o atual
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) {
                            d.style.display = 'none';
                        }
                    });
                    // Alterna a visibilidade do dropdown atual
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                });
            }
        });

        // --- Fechar menus ao clicar fora ---
        document.addEventListener('click', (event) => {
            // Fecha dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                // Verifica se o dropdown está visível e se o clique não foi dentro dele ou no botão que o abriu
                if (d.style.display === 'block' && !d.contains(event.target) && !event.target.closest('.menu-button')) {
                    d.style.display = 'none';
                }
            });

            // Fecha a caixa de busca
            if (searchBox && searchBox.classList.contains('active') && !searchBox.contains(event.target) && !event.target.closest('.search-icon')) {
                searchBox.classList.remove('active'); // Remove a classe 'active'
            }

            // Fecha o menu mobile se estiver aberto e o clique for fora da navbar ou do ícone
            if (navbar && navbar.classList.contains('active') && !navbar.contains(event.target) && !event.target.closest('#menu-icon')) {
                navbar.classList.remove('active');
                // Garante que o ícone retorne ao estado original
                if (menuIcon) { // Verifica se menuIcon existe antes de manipular
                    if (menuIcon.classList.contains('bx-x')) {
                        menuIcon.classList.replace('bx-x', 'bx-menu');
                    }
                    if (menuIcon.classList.contains('fa-xmark')) {
                        menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    }
                }
            }
        });


        // --- Marca o link de navegação ativo ---
        // Certifique-se de que os links no seu header.html tenham a classe 'nav-link'
        // e um atributo 'data-page' com o nome do arquivo HTML (ex: data-page="index", data-page="programacao")
        const navLinks = document.querySelectorAll('.navbar ul a'); // Seleciona todos os links dentro da navbar

        navLinks.forEach(link => {
            // Remove a classe 'active' de todos os links primeiro
            link.classList.remove('active');

            // Verifica se o href do link corresponde ao pathname atual
            const linkPath = link.getAttribute('href');
            const currentPath = window.location.pathname;

            // Lógica para marcar o link ativo
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else if (linkPath === 'index.html' && (currentPath === '/' || currentPath === '/index.html')) {
                // Lida com o caso da página inicial (index.html ou '/')
                link.classList.add('active');
            }
        });
    }

    // --- Função de Busca no Site ---
    function searchSite() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) {
            console.error("Elemento 'searchInput' não encontrado para a função searchSite.");
            return;
        }
        const query = searchInput.value.trim();

        if (!query) return;

        const hostname = window.location.hostname;
        let googleSearchUrl;

        if (hostname === "localhost" || hostname === "127.0.0.1") {
            googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        } else {
            googleSearchUrl = `https://www.google.com/search?q=site:${hostname}+${encodeURIComponent(query)}`;
        }

        window.open(googleSearchUrl, '_blank');
        // Opcional: Fechar a caixa de busca após a pesquisa
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.classList.remove('active');
        }
    }


    // --- Botão Voltar ao Topo ---
    window.addEventListener('scroll', function() {
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('#backToTop')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // --- Google Ads (Mantenha se estiver usando) ---
    // Certifique-se de que o script do Google Ads está no seu HTML
    if (window.adsbygoogle) {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});