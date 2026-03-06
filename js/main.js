/**
 * Fitness Trainer - TapLink Style
 * Анимации, форма, плавный скролл
 */

document.addEventListener('DOMContentLoaded', function() {
    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Анимация появления блоков при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдение за секциями
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                goal: formData.get('goal'),
                date: new Date().toLocaleString('ru-RU')
            };

            // Сохранение в localStorage
            const leads = JSON.parse(localStorage.getItem('fitnessLeads') || '[]');
            leads.push(data);
            localStorage.setItem('fitnessLeads', JSON.stringify(leads));

            // Показ уведомления
            showNotification();

            // Очистка формы
            this.reset();
        });
    }

    // Маска для телефона
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('8')) {
                    value = value.slice(1);
                }
                if (value.startsWith('7')) {
                    value = value.slice(1);
                }
                value = '+7 (' + value.slice(0, 3);
                if (value.length > 6) value = value.slice(0, 6) + ') ' + value.slice(6, 9);
                if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11, 13);
                if (value.length > 13) value = value.slice(0, 13) + '-' + value.slice(13, 15);
            }
            e.target.value = value;
        });
    }
});

// Показ уведомления
function showNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}
