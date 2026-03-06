/**
 * Fitness Trainer - Основной скрипт
 * Мобильное меню, плавный скролл, форма
 */

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }
    
    // Изменение шапки при скролле
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
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
                message: formData.get('message'),
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
    
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    document.querySelectorAll('.program-card, .review-card, .result-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Показ уведомления
function showNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Маска для телефона
const phoneInput = document.getElementById('phone');
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
