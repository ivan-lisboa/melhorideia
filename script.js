document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu Hamburguer ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    // Verifica se os elementos do menu existem antes de adicionar event listeners
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu
            navMenu.classList.toggle('active');
            // Alterna os ícones do Font Awesome (fa-bars <-> fa-times)
            const icon = hamburgerMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Gerencia o atributo aria-expanded para acessibilidade
            const isExpanded = navMenu.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });

        // Fechar menu ao clicar em um item de navegação (útil principalmente em mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Se o menu estiver aberto, fecha-o
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    // Retorna o ícone do hambúrguer ao estado original
                    const icon = hamburgerMenu.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Efeito de scroll para o header ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animação de elementos ao scroll ---
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .section-title, .contact-details p');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Inicializa a animação ao carregar a página
    animateOnScroll();
    
    // Adiciona evento de scroll para animar elementos
    window.addEventListener('scroll', animateOnScroll);

    // --- Smooth scroll para links de âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Pula para links #
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Botão de voltar ao topo ---
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Destacar link ativo no menu ---
    const highlightActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightActiveLink);
});