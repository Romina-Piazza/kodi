document.addEventListener('DOMContentLoaded', () => {
    // Gestione della Navbar Laterale
    const menuToggle = document.getElementById('menuToggle');
    const sidebarNav = document.getElementById('sidebarNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section, #homepage'); // Tutte le sezioni, inclusa la homepage

    // Funzione per mostrare una specifica sezione e nascondere le altre
    function showSection(targetId) {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active'); // Mostra la sezione
            } else {
                section.classList.remove('active'); // Nasconde le altre
            }
        });

        // Aggiorna lo stato "attivo" nella navbar
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 1. Al caricamento della pagina: Mostra la homepage (o la sezione dall'hash URL)
    const initialHash = window.location.hash ? window.location.hash.substring(1) : 'homepage';
    showSection(initialHash);


    // Toggle della navbar al click del menu icon
    menuToggle.addEventListener('click', () => {
        sidebarNav.classList.toggle('open');
        menuToggle.classList.toggle('active'); // Attiva l'animazione dell'icona "X"
    });

    // Chiudi la sidebar e mostra la sezione quando si clicca su un link della navbar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previeni il comportamento di default del link
            const targetId = link.getAttribute('href').substring(1); // Ottieni l'ID della sezione (es. 'homepage', 'kod-i')

            showSection(targetId); // Mostra la sezione corrispondente

            // Aggiorna l'URL senza ricaricare la pagina per mantenere l'hash
            history.pushState(null, '', `#${targetId}`);

            // Chiudi la navbar
            sidebarNav.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });

    // Gestisci il click sul pulsante "indietro" del browser
    window.addEventListener('popstate', () => {
        const targetId = window.location.hash ? window.location.hash.substring(1) : 'homepage';
        showSection(targetId);
    });

    // Chiudi la sidebar se si clicca all'esterno di essa
    document.addEventListener('click', (e) => {
        // Verifica se il click non è all'interno della sidebar e non è sul menu toggle
        if (!sidebarNav.contains(e.target) && !menuToggle.contains(e.target) && sidebarNav.classList.contains('open')) {
            sidebarNav.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });

    // CAROSELLO SISTEMATO - Più semplice e funzionale
    const carouselSlide = document.getElementById('carouselSlide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    let currentIndex = 0;
    const totalSlides = carouselItems.length;
    
    // Autoplay più veloce e fluido
    const autoplayInterval = 4000;
    let autoplayTimer;

    function updateCarousel() {
        if (totalSlides === 0) return;

        const translateX = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${translateX}%)`;
        
        updateIndicators();
    }

    function updateIndicators() {
        indicatorsContainer.innerHTML = '';
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoplay();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function startAutoplay() {
        if (totalSlides > 1) {
            autoplayTimer = setInterval(nextSlide, autoplayInterval);
        }
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Pausa autoplay al hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayTimer);
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Inizializzazione
    updateCarousel();
    startAutoplay();
});