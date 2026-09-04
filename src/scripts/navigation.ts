export function initializeNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#navigation');
  const header = document.querySelector<HTMLElement>('.header');
  const backTop = document.querySelector<HTMLButtonElement>('.back-top');
  const progressRing = document.querySelector<SVGCircleElement>('.back-top-progress');

  backTop?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#hero-title')?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  });

  const links = [...(nav?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((section): section is HTMLElement => Boolean(section));

  function closeMenu(): void {
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menú');
    nav?.classList.remove('open');
  }

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav?.classList.toggle('open', open);
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !header?.contains(event.target)) closeMenu();
  });

  const mobile = window.matchMedia('(max-width: 1000px)');
  mobile.addEventListener('change', closeMenu);
  let queued = false;

  function updateNavigation(): void {
    queued = false;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const scroll = Math.max(0, window.scrollY);
    const progress = maxScroll <= 0
      ? 0
      : maxScroll - scroll <= 1
        ? 1
        : Math.min(1, scroll / maxScroll);

    progressRing?.style.setProperty('stroke-dashoffset', String(100 * (1 - progress)));
    const showBackTop = maxScroll > 0 && scroll > Math.min(180, maxScroll * 0.25);
    backTop?.classList.toggle('is-visible', showBackTop);
    backTop?.setAttribute('aria-hidden', String(!showBackTop));
    if (backTop) backTop.tabIndex = showBackTop ? 0 : -1;

    const height = header?.offsetHeight ?? 90;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
    header?.classList.toggle('scrolled', window.scrollY > 40);

    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= height + 100) current = section.id;
    }
    links.forEach((link) => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleNavigation(): void {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateNavigation);
    }
  }

  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleNavigation);
    if (header) resizeObserver.observe(header);
    resizeObserver.observe(document.body);
  }
  window.addEventListener('load', scheduleNavigation, { once: true });
  window.addEventListener('pageshow', scheduleNavigation);
  updateNavigation();
}
