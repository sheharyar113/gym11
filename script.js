document.addEventListener('DOMContentLoaded', function () {

    // 1. Initialize AOS (Animate on Scroll) library for general page animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 2. Video Modal Control: Pause video when modal is hidden
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('modalVideoPlayer');

    if (videoModal && videoPlayer) { // Ensure both elements exist
        videoModal.addEventListener('hide.bs.modal', () => { // Use arrow function for brevity
            videoPlayer.pause();
        });
    }

    // 3. Initialize Bootstrap Carousel for the services section
    const servicesCarouselElement = document.getElementById('servicesCarousel');
    if (servicesCarouselElement) {
        new bootstrap.Carousel(servicesCarouselElement, {
            interval: false, // No auto-sliding
            wrap: true      // Allows continuous looping
        });
    }

    // 4. Card Action Button Toggle for white background in services section
    const cardActionButtons = document.querySelectorAll('.service-card .card-action-btn');
    cardActionButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            this.classList.toggle('active-white');

            // Optional: Only one button 'active-white' at a time
            cardActionButtons.forEach(otherButton => {
                if (otherButton !== this && otherButton.classList.contains('active-white')) {
                    otherButton.classList.remove('active-white');
                }
            });
        });
    });

    // 5. Intersection Observer for Service Card Scroll Animation
    const animatedCards = document.querySelectorAll('.service-card');
    if (animatedCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // 10% of card visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // To make animation run only once:
                    // observer.unobserve(entry.target);
                }
                // To reverse animation on scroll out (optional):
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedCards.forEach(card => {
            scrollObserver.observe(card);
        });
    }

}); // End of DOMContentLoaded