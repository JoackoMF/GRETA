// Scroll suave a secciones
function scrollToContact() {
    document.getElementById('contacto').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Selección de plan
function selectPlan(planName) {
    const selectElement = document.getElementById('plan');
    const planValue = planName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    selectElement.value = planValue;
    
    // Scroll al formulario
    scrollToContact();
    
    // Animación del campo select
    selectElement.style.transform = 'scale(1.05)';
    selectElement.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        selectElement.style.transform = 'scale(1)';
    }, 300);
    
    // Mostrar mensaje
    showNotification(`Has seleccionado el Plan ${planName}`);
}

// Manejo del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                plan: document.getElementById('plan').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Validación básica
            if (!formData.nombre || !formData.email || !formData.telefono || !formData.plan || !formData.mensaje) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío del formulario
            showNotification('¡Enviando tu solicitud...', 'info');
            
            // Simular delay de envío
            setTimeout(() => {
                showNotification('¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Confeti de celebración
                createConfetti();
            }, 1500);
        });
    }
    
    // Animación de aparición al hacer scroll
    observeElements();
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    // Remover notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.animation = 'slideInRight 0.5s ease, slideOutRight 0.5s ease 3s';
    notification.style.maxWidth = '400px';
    
    // Colores según tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #B8E6D5 0%, #8FD9C4 100%)';
        notification.style.color = '#2C3E50';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FFD4E5 0%, #FFB3D9 100%)';
        notification.style.color = '#2C3E50';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #D4F1E8 0%, #B8E6D5 100%)';
        notification.style.color = '#2C3E50';
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3.5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3500);
}

// Animaciones al hacer scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar tarjetas de planes
    document.querySelectorAll('.plan-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observar tarjetas de beneficios
    document.querySelectorAll('.beneficio-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
}

// Crear efecto de confeti
function createConfetti() {
    const colors = ['#B8E6D5', '#FFD4E5', '#8FD9C4', '#FFB3D9', '#D4F1E8'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `fall ${2 + Math.random() * 2}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// Agregar estilos de animación para el confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto parallax suave en hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Contador animado para los precios
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animar precios cuando sean visibles
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const finalValue = parseInt(entry.target.textContent);
            entry.target.textContent = '0';
            animateValue(entry.target, 0, finalValue, 1000);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.amount').forEach(amount => {
        priceObserver.observe(amount);
    });
});