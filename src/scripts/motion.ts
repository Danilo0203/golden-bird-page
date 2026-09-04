import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let dispose: (() => void) | undefined;

/** Enhance the static page without changing its layout or native scrolling. */
export function initializeMotion() {
  dispose?.();
  const media = gsap.matchMedia();
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  media.add(
    {
      mobile: '(max-width: 700px)',
      desktop: '(min-width: 701px)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      // matchMedia reverts every tween when this preference changes live.
      if (context.conditions?.reduced) return;
      const mobile = Boolean(context.conditions?.mobile);
      const amount = mobile ? 0.6 : 1;
      const floats: gsap.core.Tween[] = [];
      let heroVisible = false;

      function float(selector: string, vars: gsap.TweenVars) {
        floats.push(gsap.to(selector, {
          ...vars,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: true,
        }));
      }

      // Separate elements drift at slightly different speeds. The existing
      // photo angles are retained by using relative rotation values.
      float('.hero-image', { y: -5 * amount, duration: 5.8 });
      float('.ninfa-bubble', { y: -9 * amount, x: 3 * amount, duration: 4.6 });
      float('.companion-photo', {
        y: 7 * amount, rotation: `+=${1.5 * amount}`, duration: 5.2,
      });
      float('.round-note', {
        y: -6 * amount, rotation: `-=${1.3 * amount}`, duration: 6.4,
      });
      float('.orbit-dot', { y: 10 * amount, x: -3 * amount, duration: 7 });

      function syncFloating() {
        const running = heroVisible && !document.hidden;
        floats.forEach(tween => tween.paused(!running));
      }

      const visibility = ScrollTrigger.create({
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: self => {
          heroVisible = self.isActive;
          syncFloating();
        },
      });
      heroVisible = visibility.isActive;
      syncFloating();
      document.addEventListener('visibilitychange', syncFloating);

      // The collage moves as a whole with the scroll; child float transforms
      // remain independent. No pinning, snapping, or scroll replacement.
      gsap.to('.hero-visual', {
        y: -20 * amount,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      const entrances = new Map<HTMLElement, gsap.core.Tween>();
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(element => {
        const bounds = element.getBoundingClientRect();
        // Preserve already-read content on restored pages and direct anchors.
        if (bounds.bottom <= 0 || (window.scrollY > 0 && bounds.top < window.innerHeight)) return;
        const cards = element.matches('.bird-card, .pet-card, .catalog-card');
        const index = cards ? Array.from(element.parentElement!.children).indexOf(element) : 0;
        const tween = gsap.from(element, {
          y: mobile ? 14 : 22,
          opacity: 0,
          duration: 0.8,
          delay: mobile ? 0 : index * 0.09,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        });
        entrances.set(element, tween);
      });

      // Keyboard users must never land on an invisible animated link.
      function revealFocused(event: FocusEvent) {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<HTMLElement>('.reveal');
        if (element) entrances.get(element)?.progress(1);
      }
      document.addEventListener('focusin', revealFocused);

      gsap.utils.toArray<HTMLElement | SVGElement>(
        '.decor-layer .outline-circle, .decor-layer .squiggle',
      ).forEach((decoration, index) => {
        const section = decoration.closest('section');
        if (!section) return;
        gsap.to(decoration, {
          y: (index % 2 ? -16 : 18) * amount,
          rotation: `+=${index % 2 ? 3 : -3}`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      });

      return () => {
        document.removeEventListener('visibilitychange', syncFloating);
        document.removeEventListener('focusin', revealFocused);
      };
    },
  );

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  let active = true;
  void document.fonts?.ready.then(() => { if (active) refresh(); });

  const cleanup = () => {
    active = false;
    media.revert();
    window.removeEventListener('load', refresh);
    window.removeEventListener('pagehide', cleanup);
  };
  window.addEventListener('pagehide', cleanup, { once: true });
  dispose = cleanup;
}

// Back/forward cache restores the document without rerunning its scripts.
window.addEventListener('pageshow', event => {
  if (event.persisted) initializeMotion();
});
