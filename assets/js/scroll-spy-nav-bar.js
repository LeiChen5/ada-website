/**
 * Navigation Scroll Spy & Smooth Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionIds = [
        'intro', 
        'research-questions', 
        'methodology', 
        'story', 
        'sectoral', 
        'contagion', 
        'resilience'
    ];

    const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        
        if (sections[index]) {
            const currentId = sections[index].getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});