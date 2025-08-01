document.addEventListener('DOMContentLoaded', () => {
    /**
     * Função assíncrona para carregar componentes HTML em um placeholder.
     * @param {string} placeholderId - O ID do elemento onde o HTML será carregado.
     * @param {string} filePath - O caminho para o arquivo HTML do componente.
     */
    async function loadComponent(placeholderId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status} ao carregar ${filePath}`);
            }
            const text = await response.text();
            document.getElementById(placeholderId).innerHTML = text;
        } catch (error) {
            console.error(`Erro ao carregar o componente ${filePath}:`, error);
        }
    }

    loadComponent('header-placeholder', '../components/header.html')
        .then(() => {
            initializeHeaderFeatures();
        })
        .catch(error => {
            console.error("Falha ao carregar o cabeçalho, funcionalidades podem não ser inicializadas:", error);
        });

    loadComponent('footer-placeholder', '../components/footer.html')
        .catch(error => {
            console.error("Falha ao carregar o rodapé:", error);
        });

    function initializeHeaderFeatures() {
        const searchIcon = document.querySelector('.search-icon');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.getElementById('searchInput');
        // Identificamos o botão de busca pelo seu seletor
        const searchButton = document.querySelector('.search-box button'); // Adicionado

        if (searchIcon && searchBox && searchInput && searchButton) {
            searchIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                searchBox.classList.toggle('active');
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                }
            });

            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    searchSite();
                }
            });

            // Adicionamos o evento de clique ao botão de busca
            searchButton.addEventListener('click', () => {
                searchSite();
            });
        } else {
            console.warn("Elementos de busca não encontrados. Verifique se .search-icon, .search-box, #searchInput e o botão de busca existem.");
        }

        const menuIcon = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');

        if (menuIcon && navbar) {
            menuIcon.addEventListener('click', () => {
                navbar.classList.toggle('active');
                if (menuIcon.classList.contains('bx-menu')) {
                    menuIcon.classList.replace('bx-menu', 'bx-x');
                } else if (menuIcon.classList.contains('bx-x')) {
                    menuIcon.classList.replace('bx-x', 'bx-menu');
                }
                if (menuIcon.classList.contains('fa-bars')) {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                } else if (menuIcon.classList.contains('fa-xmark')) {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            });

            const navLinks = navbar.querySelectorAll('ul a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbar.classList.remove('active');
                    if (menuIcon.classList.contains('bx-x')) {
                        menuIcon.classList.replace('bx-x', 'bx-menu');
                    }
                    if (menuIcon.classList.contains('fa-xmark')) {
                        menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    }
                });
            });
        } else {
            console.warn("Elementos do menu mobile não encontrados. Verifique se #menu-icon e .navbar existem.");
        }

        const menuButtons = document.querySelectorAll('.menu-button');
        menuButtons.forEach(button => {
            const dropdown = button.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) {
                            d.style.display = 'none';
                        }
                    });
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                });
            }
        });

        document.addEventListener('click', (event) => {
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d.style.display === 'block' && !d.contains(event.target) && !event.target.closest('.menu-button')) {
                    d.style.display = 'none';
                }
            });

            if (searchBox && searchBox.classList.contains('active') && !searchBox.contains(event.target) && !event.target.closest('.search-icon')) {
                searchBox.classList.remove('active');
            }

            if (navbar && navbar.classList.contains('active') && !navbar.contains(event.target) && !event.target.closest('#menu-icon')) {
                navbar.classList.remove('active');
                if (menuIcon) {
                    if (menuIcon.classList.contains('bx-x')) {
                        menuIcon.classList.replace('bx-x', 'bx-menu');
                    }
                    if (menuIcon.classList.contains('fa-xmark')) {
                        menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    }
                }
            }
        });

        const navLinks = document.querySelectorAll('.navbar ul a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            const currentPath = window.location.pathname;

            if (linkPath === currentPath) {
                link.classList.add('active');
            } else if (linkPath === 'index.html' && (currentPath === '/' || currentPath === '/index.html')) {
                link.classList.add('active');
            }
        });
    }

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
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.classList.remove('active');
        }
    }

    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        let carouselCards = Array.from(document.querySelectorAll('.carousel-card'));
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');

        const totalRealCards = carouselCards.length;
        const numClones = 1;

        for (let i = 0; i < numClones; i++) {
            const clone = carouselCards[totalRealCards - 1 - i].cloneNode(true);
            carouselTrack.prepend(clone);
        }
        for (let i = 0; i < numClones; i++) {
            const clone = carouselCards[i].cloneNode(true);
            carouselTrack.append(clone);
        }

        carouselCards = Array.from(document.querySelectorAll('.carousel-card'));
        const totalClonedCards = carouselCards.length;
        let currentIndex = numClones;

        carouselCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const instagramUrl = card.getAttribute('data-instagram');
                if (instagramUrl) {
                    window.open(instagramUrl, '_blank');
                } else {
                    console.warn('Este card não possui um link do Instagram definido.');
                }
            });
        });

        function updateCarousel(instant = false) {
            if (instant) {
                carouselTrack.classList.add('no-transition');
                carouselCards.forEach(card => card.classList.add('no-transition'));
            }

            carouselCards.forEach((card, index) => {
                card.classList.remove('active');
                let offset = index - currentIndex;

                const zIndex = 10 - Math.abs(offset);
                card.style.zIndex = zIndex.toString();

                const baseTranslateX = 320;
                const baseTranslateZ = -200;
                const baseScale = 0.8;

                if (offset === 0) {
                    card.style.transform = `translateX(0) scale(1) rotateY(0deg) translateZ(0px)`;
                    card.style.opacity = '1';
                    card.classList.add('active');
                } else if (offset === 1) {
                    card.style.transform = `translateX(${baseTranslateX}px) scale(${baseScale}) rotateY(-15deg) translateZ(${baseTranslateZ}px)`;
                    card.style.opacity = '0.5';
                } else if (offset === -1) {
                    card.style.transform = `translateX(-${baseTranslateX}px) scale(${baseScale}) rotateY(15deg) translateZ(${baseTranslateZ}px)`;
                    card.style.opacity = '0.5';
                } else {
                    card.style.transform = `translateX(${offset * baseTranslateX * 1.5}px) scale(${baseScale * 0.5}) rotateY(${offset > 0 ? -25 : 25}deg) translateZ(${baseTranslateZ * 1.5}px)`;
                    card.style.opacity = '0';
                }
            });

            if (instant) {
                requestAnimationFrame(() => {
                    carouselTrack.classList.remove('no-transition');
                    carouselCards.forEach(card => card.classList.remove('no-transition'));
                });
            }
        }

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
            if (currentIndex >= totalClonedCards - numClones) {
                setTimeout(() => {
                    currentIndex = numClones;
                    updateCarousel(true);
                }, 500);
            }
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
            if (currentIndex < numClones) {
                setTimeout(() => {
                    currentIndex = totalClonedCards - (numClones * 2);
                    updateCarousel(true);
                }, 500);
            }
        });

        updateCarousel(true);
    } else {
        console.warn("Elemento '.carousel-track' não encontrado. O carrossel não será inicializado.");
    }

    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Elemento '#backToTop' não encontrado. O botão de voltar ao topo não funcionará.");
    }
});