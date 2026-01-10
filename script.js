// Modal imágenes
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.style.display = 'flex';
  });
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImg.src = '';
});

// Animaciones on-scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form (placeholder)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Formulario pendiente de activar.');
});
