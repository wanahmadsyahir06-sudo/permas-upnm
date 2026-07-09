/* =========================================================
   INTERACTIVE BEHAVIOUR
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

    if (mobileToggle && mainNav && mobileIcon) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileIcon.classList.toggle('fa-bars');
            mobileIcon.classList.toggle('fa-times');
        });
    }

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();

            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileIcon) {
                    mobileIcon.classList.add('fa-bars');
                    mobileIcon.classList.remove('fa-times');
                }
            }

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });

            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    const orgChartPreview = document.querySelector('.org-chart-preview');
    const chartButtons = document.querySelectorAll('.chart-btn');
    const chartImages = {
        full: 'images/cartaOrganisasi (1).png',
        executive: 'images/cartaOrganisasi (1).png',
        bureau: 'images/cartaOrganisasi (1).png'
    };

    chartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const chartType = this.getAttribute('data-chart');
            chartButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            if (orgChartPreview) {
                orgChartPreview.src = chartImages[chartType] || chartImages.full;
            }
        });
    });

    const yearParagraph = document.querySelector('.copyright p');
    if (yearParagraph) {
        yearParagraph.innerHTML = yearParagraph.innerHTML.replace('2025', new Date().getFullYear());
    }
});
