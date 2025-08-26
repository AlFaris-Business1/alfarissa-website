(function() {
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      alert('قائمة الجوال: يمكن تنفيذها لاحقاً حسب الحاجة.');
    });
  }

  const grid = document.getElementById('services-grid');
  const chips = document.querySelectorAll('.chip[data-filter]');
  if (grid && chips.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.dataset.filter;
        const cards = grid.querySelectorAll('.card.service');
        cards.forEach(card => {
          const group = card.getAttribute('data-group');
          card.style.display = (f === 'all' || f === group) ? '' : 'none';
        });
      });
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    const tabButtons = tabs.querySelectorAll('.tab');
    const panels = tabs.querySelectorAll('.tab-panel');
    const activate = (name) => {
      tabButtons.forEach(btn => {
        const active = btn.dataset.tab === name;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(p => p.classList.toggle('active', p.id === name));
    };
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.tab));
    });
  });

  document.querySelectorAll('.accordion').forEach(acc => {
    acc.querySelectorAll('.accordion-item').forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        acc.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
})();
