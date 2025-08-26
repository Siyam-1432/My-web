// ==================== Portfolio Filtering ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ==================== Skills Progress Animation ====================
const progressBars = document.querySelectorAll('.progress');

function animateProgress() {
  const triggerBottom = window.innerHeight * 0.85;
  progressBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const percent = bar.getAttribute('data-percent');
    if (barTop < triggerBottom && !bar.classList.contains('filled')) {
      bar.style.width = percent;
      bar.classList.add('filled');
    }
  });
}

window.addEventListener('scroll', animateProgress);
window.addEventListener('load', animateProgress);

// ==================== EmailJS Contact Form ====================
(function(){
  emailjs.init("SzkQKnyS-7IyV0ZlA");
})();

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  emailjs.sendForm('Siyam_14321', 'template_wx3mz8s', this)
    .then(() => {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#0f0";
      formMessage.classList.add('show');
      setTimeout(() => {
        formMessage.classList.remove('show');
        contactForm.reset();
      }, 3000);
    }, (error) => {
      formMessage.textContent = "Failed to send message. Please try again.";
      formMessage.style.color = "#f00";
      formMessage.classList.add('show');
      setTimeout(() => {
        formMessage.classList.remove('show');
      }, 3000);
      console.error('EmailJS Error:', error);
    });
});

// ==================== Dark Mode Toggle ====================
const themeSwitch = document.getElementById('themeSwitch');

themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    themeSwitch.checked = true;
    document.body.classList.add('dark');
  }
});

// ==================== Floating Hero Icons ====================
const icons = document.querySelectorAll('.floating-icon');

icons.forEach(icon => {
  let angle = Math.random() * 360;
  let radius = 50 + Math.random() * 30;
  let speed = 0.5 + Math.random() * 0.5;

  function animateIcon() {
    angle += speed;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);
    icon.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateIcon);
  }

  animateIcon();
});

// ==================== Header Hide/Show & Mobile Menu ====================
let lastScrollTop = 0;
const header = document.querySelector('.header');
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

// menu toggle button
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); 
  navbar.classList.toggle("active");
});

// বাইরে click করলে navbar বন্ধ হবে
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
    navbar.classList.remove("active");
  }
});

// scroll এ header hide/show
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop) {
    header.style.top = "-80px"; 
  } else {
    header.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ==================== Typing Effect for Skills ====================
const skills = ["Frontend Developer", "App Developer", "Ethical Hacker", "UI/UX Learner"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentSkill = skills[index];
  let displayText = currentSkill.substring(0, charIndex);
  document.getElementById("skills").innerText = displayText;

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex < currentSkill.length) {
    charIndex++;
  } else if (!isDeleting && charIndex === currentSkill.length) {
    isDeleting = true;
    typingSpeed = 1000;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % skills.length;
    typingSpeed = 300;
  }

  setTimeout(typeEffect, typingSpeed);
}
typeEffect();

// ==================== Section Scroll Reveal Animation ====================
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.classList.add("reveal-section");
  sectionObserver.observe(section);
});

// ==================== Hide Loading Screen ====================
window.addEventListener("load", function() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
});
