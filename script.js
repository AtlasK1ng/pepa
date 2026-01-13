const texts = {
  es: {
    hero: { badge: "OPORTUNIDAD", title: "Tesla Model 3", subtitle: "Long Range AWD · 2019" },
    description: { title: "Descripción", p1: "Tesla Model 3 Long Range AWD (Dual Motor). 140.000 km, impecable. Sonido premium y FSD incluido.", priceText: "Precio hoy:" },
    specs: { title: "Ficha técnica", year: "Año", km: "Kilómetros", drive: "Tracción", range: "Autonomía", price: "Precio Final" },
    contact: { title: "Contacto", name: "Nombre", email: "Email", msg: "Oferta o dudas", btn: "Enviar Mensaje" },
    gallery: { title: "Galería" }
  },
  en: {
    hero: { badge: "BEST DEAL", title: "Tesla Model 3", subtitle: "Long Range AWD · 2019" },
    description: { title: "Description", p1: "2019 Tesla Model 3 Long Range AWD (Dual Motor). 140,000 km, mint condition. Premium audio & FSD included.", priceText: "Current Price:" },
    specs: { title: "Specifications", year: "Year", km: "Mileage", drive: "Drivetrain", range: "Range", price: "Final Price" },
    contact: { title: "Contact", name: "Name", email: "Email", msg: "Offer or questions", btn: "Send Message" },
    gallery: { title: "Gallery" }
  }
};

function changeLanguage(lang) {
  localStorage.setItem('selectedLang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${lang}`).classList.add('active');

  document.querySelectorAll('[data-section]').forEach(el => {
    const section = el.getAttribute('data-section');
    const value = el.getAttribute('data-value');
    if (texts[lang][section] && texts[lang][section][value]) el.innerText = texts[lang][section][value];
  });

  document.getElementById('form-name').placeholder = texts[lang].contact.name;
  document.getElementById('form-email').placeholder = texts[lang].contact.email;
  document.getElementById('form-msg').placeholder = texts[lang].contact.msg;
  document.getElementById('form-btn').innerText = texts[lang].contact.btn;
  renderSpecs(lang);
}

function renderSpecs(lang) {
  const grid = document.getElementById('spec-grid');
  const s = texts[lang].specs;
  grid.innerHTML = `
    <li><span>${s.year}</span><strong>2019</strong></li>
    <li><span>${s.km}</span><strong>140k km</strong></li>
    <li><span>${s.drive}</span><strong>AWD</strong></li>
    <li><span>${s.range}</span><strong>~450 km</strong></li>
    <li class="price-box"><span>${s.price}</span><strong>23.000 €</strong></li>
  `;
}

// Modal y Observer
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.style.display = 'flex';
  });
});
modal.addEventListener('click', () => { modal.style.display = 'none'; });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

window.onload = () => {
  const savedLang = localStorage.getItem('selectedLang') || 'es';
  changeLanguage(savedLang);
};