document.addEventListener('DOMContentLoaded', () => {
  const bodyPage = document.body.dataset.page;
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === bodyPage) link.classList.add('active');
  });
  document.querySelectorAll('.navbar .nav-link.active').forEach(link => link.setAttribute('aria-current','page'));

  const nav = document.querySelector('.site-navbar');
  const progress = document.querySelector('.scroll-progress');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  if (window.AOS) AOS.init({duration:750, once:true, offset:70, easing:'ease-out-cubic'});

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => {b.classList.remove('active','btn-primary'); b.classList.add('btn-outline-primary');});
      btn.classList.add('active','btn-primary'); btn.classList.remove('btn-outline-primary');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => { item.classList.toggle('d-none', filter !== 'all' && item.dataset.category !== filter); });
      if (window.AOS) AOS.refresh();
    }));
  }

  const search = document.querySelector('#newsSearch');
  const newsItems = document.querySelectorAll('.news-item');
  const emptyNews = document.querySelector('#emptyNews');
  if (search && newsItems.length) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      newsItems.forEach(item => {
        const match = item.dataset.search.includes(q);
        item.classList.toggle('d-none', !match);
        if (match) shown++;
      });
      if (emptyNews) emptyNews.classList.toggle('d-none', shown !== 0);
    });
  }

  const form = document.querySelector('#ppdbForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        feedback.textContent = 'Lengkapi data wajib terlebih dahulu.';
        feedback.className = 'form-feedback mt-3 text-danger';
        return;
      }
      feedback.textContent = 'Pendaftaran berhasil divalidasi.';
      feedback.className = 'form-feedback mt-3 text-success fw-semibold';
      form.reset(); form.classList.remove('was-validated');
    });
  }
});