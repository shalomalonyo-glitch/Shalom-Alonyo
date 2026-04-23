/**
 * ============================================================================
 * PORTFOLIO SHALOM ALONYO — main.js
 * Version 2.0 — 2026
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  GUIDE HOTSPOTS CONTRÔLEUR MCD8 — À RELIRE AVANT DE MODIFIER            │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │                                                                         │
 * │  Image utilisée : assets/agv-controller-hand.jpg                        │
 * │  (photo réelle — Shalom tenant le MCD8 devant un AGV au CH Rodez)       │
 * │                                                                         │
 * │  9 HOTSPOTS MAPPÉS SUR LES VRAIS BOUTONS DU MCD8 :                      │
 * │    1. STOP OVERRIDE  (red — dériver un arrêt de sécurité)               │
 * │    2. ON TRACK       (LED — AGV aligné sur sa voie)                     │
 * │    3. LOAD2          (capteur de charge arrière)                        │
 * │    4. AUT / MAN      (sélecteur auto / manuel)                          │
 * │    5. FW / BW        (avant / arrière en mode manuel)                   │
 * │    6. LOAD1          (capteur de charge avant)                          │
 * │    7. ESTOP          (arrêt d'urgence)                                  │
 * │    8. SPEED          (sélecteur de vitesse)                             │
 * │    9. COM            (LED de communication contrôleur ↔ AGV)            │
 * │                                                                         │
 * │  → Tous les champs "example" contiennent encore "[À préciser : ...]"    │
 * │    Remplacer par une expérience vécue concrète pour chaque bouton.      │
 * │                                                                         │
 * │  POSITIONNER LES HOTSPOTS                                               │
 * │  -------------------------                                              │
 * │  Dans index.html, chaque <button class="ctrl-hotspot"> possède :        │
 * │    style="--x: 44%; --y: 71%"                                           │
 * │  • --x : position horizontale en % (0% = gauche, 100% = droite)        │
 * │  • --y : position verticale en %   (0% = haut, 100% = bas)             │
 * │                                                                         │
 * │  Positions actuelles : 3 rangées de 3 boutons, grille estimée sur       │
 * │  la photo. Ajuster si besoin en ouvrant la page + DevTools.             │
 * │                                                                         │
 * │  MODIFIER LES DONNÉES JSON                                              │
 * │  ------------------------                                               │
 * │  Bloc <script type="application/json" data-hotspots> dans index.html.   │
 * │    {                                                                    │
 * │      "id": 1,              ← correspond au data-hotspot du bouton       │
 * │      "name": "STOP OVERRIDE",                                           │
 * │      "role": "description fonctionnelle",                               │
 * │      "when": "dans quelles situations",                                 │
 * │      "caution": "précaution (laisser \"\" si aucune)",                 │
 * │      "example": "exemple concret vécu (remplacer les [À préciser])"    │
 * │    }                                                                    │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

'use strict';

/* ─────────────────────────────────────────────
   BARRE DE PROGRESSION LECTURE
   ───────────────────────────────────────────── */
(function initProgress() {
  const prog = document.getElementById('progress');
  if (!prog) return;
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    prog.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 + '%';
  }, { passive: true });
})();

/* ─────────────────────────────────────────────
   NAVIGATION — scrolled + active item
   ───────────────────────────────────────────── */
(function initNav() {
  const nav      = document.getElementById('nav');
  const navItems = document.querySelectorAll('.nav-item');
  const secs     = document.querySelectorAll('[id]');

  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', scrollY > 60);
    let cur = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
    navItems.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + cur));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ─────────────────────────────────────────────
   MENU MOBILE
   ───────────────────────────────────────────── */
(function initMobileMenu() {
  const mm      = document.getElementById('mobileMenu');
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('menuClose');

  if (!mm || !menuBtn) return;

  const open  = () => { mm.classList.add('open');    menuBtn.setAttribute('aria-expanded', 'true');  };
  const close = () => { mm.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };

  menuBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  mm.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Fermeture au clic hors menu
  mm.addEventListener('click', e => { if (e.target === mm) close(); });

  // Fermeture à Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mm.classList.contains('open')) close(); });
})();

/* ─────────────────────────────────────────────
   REVEAL AU SCROLL (IntersectionObserver)
   ───────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .tl-entry');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .06, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────────
   SMOOTH SCROLL SUR ANCRES INTERNES
   ───────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ─────────────────────────────────────────────
   COMPTEUR ANIMÉ SUR LES .stat
   ───────────────────────────────────────────── */
(function initCounters() {
  document.querySelectorAll('.stat').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const dur   = 1000;
        const start = performance.now();
        const step  = now => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: .5 });

    obs.observe(el);
  });
})();

/* ─────────────────────────────────────────────
   STAGGER SUR LES CARTES
   ───────────────────────────────────────────── */
(function initStagger() {
  document.querySelectorAll(
    '.card-lt, .skill-lt, .cert-dk, .edu-lt, .contact-pill, .loisir-card, .langues-card'
  ).forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.06 + 's';
  });
})();

/* ─────────────────────────────────────────────
   RETOUR EN HAUT
   ───────────────────────────────────────────── */
(function initBtt() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 500), { passive: true });
  btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─────────────────────────────────────────────
   EFFETS DESKTOP UNIQUEMENT (hover, parallax)
   Conditionné : pointer précis + largeur > 768px
   ───────────────────────────────────────────── */
(function initDesktopFX() {
  if (!matchMedia('(min-width: 769px) and (hover: hover)').matches) return;

  /* Tilt 3D sur les .card-lt */
  document.querySelectorAll('.card-lt').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      c.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });

  /* CTAs magnétiques */
  document.querySelectorAll('.btn-primary, .btn-outline, .cv-btn').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * .2;
      const y = (e.clientY - r.top  - r.height / 2) * .25;
      btn.style.transform = `translate(${x}px, ${y - 2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* Parallax orbes (hero + contact) */
  const orbs = document.querySelectorAll('.hero .orb, .contact .orb');
  document.addEventListener('mousemove', e => {
    const cx = e.clientX / innerWidth  - .5;
    const cy = e.clientY / innerHeight - .5;
    orbs.forEach((o, i) => {
      const depth = (i + 1) * 8;
      o.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });

  /* Parallax scroll léger sur les cartes diptyque */
  const diptychCards = document.querySelectorAll('.diptych-card');
  if (diptychCards.length) {
    window.addEventListener('scroll', () => {
      diptychCards.forEach((card, i) => {
        const rect  = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - innerHeight / 2;
        const shift  = center * (i % 2 === 0 ? .03 : -.03);
        const img    = card.querySelector('img');
        if (img) img.style.transform = `scale(1.06) translateY(${shift}px)`;
      });
    }, { passive: true });
  }

  /* Pseudo-3D rotation au survol de la zone contrôleur */
  const ctrlWrap = document.querySelector('.ctrl-image-wrap');
  const ctrlZone = document.querySelector('.ctrl-image-zone');
  if (ctrlWrap && ctrlZone) {
    ctrlZone.addEventListener('mousemove', e => {
      const r = ctrlZone.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - .5;
      const y = (e.clientY - r.top)   / r.height - .5;
      ctrlWrap.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
    });
    ctrlZone.addEventListener('mouseleave', () => {
      ctrlWrap.style.transform = '';
    });
  }
})();

/* ─────────────────────────────────────────────
   HOTSPOTS — APPARITION EN CASCADE À L'ENTRÉE
   Les hotspots commencent invisibles puis apparaissent
   séquentiellement une fois la section visible.
   ───────────────────────────────────────────── */
(function initHotspotsReveal() {
  const section   = document.getElementById('controller');
  const hotspots  = document.querySelectorAll('.ctrl-hotspot');
  if (!section || !hotspots.length) return;

  // CSS initial : opacité 0, léger scale bas
  hotspots.forEach(hs => {
    hs.style.opacity = '0';
    hs.style.transform = 'translate(-50%, -50%) scale(.6)';
    hs.style.transition = 'opacity .45s, transform .45s';
    hs.style.transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      hotspots.forEach((hs, i) => {
        setTimeout(() => {
          hs.style.opacity = '';
          hs.style.transform = 'translate(-50%, -50%) scale(1)';
        }, i * 80);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: .25 });

  obs.observe(section);
})();

/* ─────────────────────────────────────────────
   MODULE CONTRÔLEUR — HOTSPOTS INTERACTIFS
   ───────────────────────────────────────────── */
(function initController() {
  // ── Lecture des données JSON depuis le <template> ──
  const tpl = document.getElementById('ctrl-data');
  if (!tpl) return;

  const jsonScript = tpl.content.querySelector('[data-hotspots]');
  if (!jsonScript) return;

  let hotspotData = [];
  try {
    hotspotData = JSON.parse(jsonScript.textContent);
  } catch (e) {
    console.warn('[Controller] Données JSON invalides :', e);
  }

  // ── Éléments DOM ──
  const hotspots    = document.querySelectorAll('.ctrl-hotspot');
  const infoCard    = document.querySelector('.ctrl-info-card');
  const infoEmpty   = document.querySelector('.ctrl-info-empty');
  const infoContent = document.querySelector('.ctrl-info-content');
  const navBtns     = document.querySelectorAll('.ctrl-nav-btn');

  if (!hotspots.length || !infoCard) return;

  // ── Affichage d'un hotspot ──
  function showHotspot(id) {
    const data = hotspotData.find(d => d.id === id);

    // Mise à jour des boutons actifs (hotspots + nav)
    hotspots.forEach(hs => {
      const isActive = parseInt(hs.dataset.hotspot, 10) === id;
      hs.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    navBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.hotspot, 10) === id);
    });

    // Mise à jour de la carte
    infoCard.classList.add('active');

    if (!data || !data.name || data.name.startsWith('[')) {
      // Donnée non renseignée → afficher l'état vide avec un message
      if (infoEmpty)   { infoEmpty.style.display = '';      }
      if (infoContent) { infoContent.classList.remove('show'); }
      return;
    }

    // Affichage des données
    if (infoEmpty)   { infoEmpty.style.display = 'none'; }
    if (infoContent) {
      infoContent.innerHTML = buildInfoHTML(data);
      infoContent.classList.add('show');
    }
  }

  // ── Construction du HTML d'info — composition éditoriale premium ──
  // Structure : label métier (Fonction #N/9) + nom en display + 4 blocs avec icônes SVG
  function buildInfoHTML(d) {
    const esc = str => String(str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const total = hotspotData.length;

    // Icônes SVG discrètes pour chaque bloc
    const iconRole =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>';
    const iconWhen =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    const iconCaution =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    const iconExample =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>';

    const field = (label, value, icon, extraClass = '') => {
      if (!value || String(value).startsWith('[')) return '';
      return `<div class="ctrl-info-field ${extraClass}">
        <div class="ctrl-info-field-header">
          <span class="ctrl-info-field-icon">${icon}</span>
          <span class="ctrl-info-field-label">${esc(label)}</span>
        </div>
        <div class="ctrl-info-field-value">${esc(value)}</div>
      </div>`;
    };

    return `
      <div class="ctrl-info-meta">Fonction ${d.id}&thinsp;/&thinsp;${total}</div>
      <div class="ctrl-info-name">${esc(d.name)}</div>
      <div class="ctrl-info-fields">
        ${field('Rôle', d.role, iconRole)}
        ${field('Quand je l\'utilise', d.when, iconWhen)}
        ${field('Précaution', d.caution, iconCaution, 'caution')}
        ${field('Exemple concret', d.example, iconExample)}
      </div>
    `;
  }

  // ── Listeners sur les hotspots ──
  hotspots.forEach(hs => {
    const id = parseInt(hs.dataset.hotspot, 10);

    hs.addEventListener('click', () => {
      // Toggle : re-cliquer sur le même ferme
      const isCurrent = hs.getAttribute('aria-expanded') === 'true';
      if (isCurrent) {
        closeAll();
      } else {
        showHotspot(id);
      }
    });

    // Survol sur desktop — prévisualisation
    if (matchMedia('(hover: hover)').matches) {
      hs.addEventListener('mouseenter', () => showHotspot(id));
      hs.addEventListener('focus',      () => showHotspot(id));
    }
  });

  // ── Listeners sur la navigation numérotée ──
  navBtns.forEach(btn => {
    const id = parseInt(btn.dataset.hotspot, 10);
    btn.addEventListener('click', () => showHotspot(id));
  });

  // ── Fermeture globale ──
  function closeAll() {
    hotspots.forEach(hs => hs.setAttribute('aria-expanded', 'false'));
    navBtns.forEach(btn => btn.classList.remove('active'));
    infoCard.classList.remove('active');
    if (infoEmpty)   { infoEmpty.style.display = ''; }
    if (infoContent) { infoContent.classList.remove('show'); infoContent.innerHTML = ''; }
  }

  // ── Fermeture à Escape ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   SÉLECTEUR DE LANGUE — FR / EN
   ═══════════════════════════════════════════════════════════════════════════
   · Chaque élément traduisible porte data-i18n="<section>.<key>"
   · Si data-i18n-html est présent, le contenu contient du HTML (spans, <br>)
   · Les traductions sont stockées ci-dessous dans `DICT`
   · La langue choisie est sauvegardée dans localStorage
   · Pour ajouter une clé : l'ajouter dans les 2 langues + data-i18n="..." sur
     l'élément HTML correspondant
   ═══════════════════════════════════════════════════════════════════════════ */
(function initI18n() {
  const LANGS = ['fr', 'en'];
  const DEFAULT = 'fr';
  const KEY = 'portfolio-lang';

  const DICT = {
    fr: {
      'nav.parcours':       'Parcours',
      'nav.agv':            'AGV',
      'nav.methode':        'Méthode',
      'nav.experience':     'Expérience',
      'nav.competences':    'Compétences',
      'nav.formation':      'Formation',
      'nav.certifications': 'Certifications',
      'nav.plus':           'Plus',
      'nav.contact':        'Contact&nbsp;&nearr;',

      'hero.available':     'Disponible',
      'hero.tag':           'Alternance BTS Maintenance Industrielle / Production — Rentrée 2026',
      'hero.title':         "Je supervise 6&nbsp;<span class=\"glow\">AGV&nbsp;Swisslog</span><br>et je traite chaque jour<br><span class=\"dim\">les incidents de 1er&nbsp;niveau.</span>",
      'hero.desc':          "Agent logistique au Centre Hospitalier de Rodez. Diagnostic à distance ou intervention physique avec le contrôleur terrain.",
      'hero.cta_contact':   'Me contacter&nbsp;&nbsp;&nearr;',
      'hero.cta_cv':        'Voir mon CV&nbsp;&nbsp;&rarr;',
      'hero.cta_scroll':    'Voir ma pratique&nbsp;&nbsp;&darr;',

      'methode.label':      'Méthode',
      'methode.heading':    'De l\'alerte à la <span class="dim">remise en service</span>',
      'methode.intro':      'Quatre phases structurent chaque intervention : observer, diagnostiquer, agir si nécessaire, puis tracer. C\'est la logique qui rend le flux fiable — et celle que j\'applique au quotidien.',
      'methode.c1_label':   'Supervision',
      'methode.c1_title':   'Observer le flux',
      'methode.c1_desc':    "J'identifie l'AGV concerné, le type d'incident et sa localisation depuis le poste de supervision. La plupart du temps, le diagnostic s'arrête ici.",
      'methode.c2_label':   'Intervention',
      'methode.c2_title':   'Agir sur site',
      'methode.c2_desc':    "Quand une manipulation physique est nécessaire, je me déplace à l'AGV avec le contrôleur MCD8 pour le diagnostic et la remise en service.",
      'methode.c3_label':   'Documentation',
      'methode.c3_title':   'Comprendre le matériel',
      'methode.c3_desc':    "Je m'appuie sur le manuel LAMCAR-R pour comprendre les sous-ensembles — châssis, scrutateurs laser, chaîne d'arrêt d'urgence, bandes de sécurité.",
      'methode.c4_label':   'Traçabilité',
      'methode.c4_title':   'Transmettre l\'info',
      'methode.c4_desc':    "Chaque incident est consigné dans la main courante — date, heure, AGV, problème rencontré, action engagée. L'équipe suivante reprend sur une base claire.",
      'methode.outro':      'Observer, comprendre, agir avec précision, transmettre proprement. <span class="dim">C\'est ce qui me plaît dans les systèmes automatisés.</span>',
    },
    en: {
      'nav.parcours':       'About',
      'nav.agv':            'AGV',
      'nav.methode':        'Method',
      'nav.experience':     'Experience',
      'nav.competences':    'Skills',
      'nav.formation':      'Education',
      'nav.certifications': 'Certifications',
      'nav.plus':           'More',
      'nav.contact':        'Contact&nbsp;&nearr;',

      'hero.available':     'Available',
      'hero.tag':           'Apprenticeship — Industrial Maintenance / Production · 2026',
      'hero.title':         "I supervise 6&nbsp;<span class=\"glow\">Swisslog&nbsp;AGVs</span><br>and I handle<br><span class=\"dim\">first-level incidents every day.</span>",
      'hero.desc':          "Logistics operator at Rodez Hospital (France). Remote diagnostics or on-site intervention with the field controller.",
      'hero.cta_contact':   'Get in touch&nbsp;&nbsp;&nearr;',
      'hero.cta_cv':        'View my résumé&nbsp;&nbsp;&rarr;',
      'hero.cta_scroll':    'See my practice&nbsp;&nbsp;&darr;',

      'methode.label':      'Method',
      'methode.heading':    'From alert to <span class="dim">back in service</span>',
      'methode.intro':      'Four phases structure every intervention: observe, diagnose, act when needed, then log. It\'s the logic that keeps the flow reliable — and the one I apply every day.',
      'methode.c1_label':   'Supervision',
      'methode.c1_title':   'Watch the flow',
      'methode.c1_desc':    "I identify the affected AGV, the type of incident and its location from the supervision station. Most of the time, the diagnosis stops here.",
      'methode.c2_label':   'Intervention',
      'methode.c2_title':   'Act on site',
      'methode.c2_desc':    "When physical handling is required, I go to the AGV with the MCD8 field controller to diagnose and bring it back in service.",
      'methode.c3_label':   'Documentation',
      'methode.c3_title':   'Understand the hardware',
      'methode.c3_desc':    "I rely on the LAMCAR-R manual to understand sub-assemblies — chassis, laser scanners, emergency-stop chain, safety strips.",
      'methode.c4_label':   'Traceability',
      'methode.c4_title':   'Pass the info on',
      'methode.c4_desc':    "Every incident is logged in the logbook — date, time, AGV, problem, action taken. The next team picks up on a clear basis.",
      'methode.outro':      'Observe, understand, act precisely, hand off cleanly. <span class="dim">That\'s what I enjoy about automated systems.</span>',
    },
  };

  function applyLang(lang) {
    if (!LANGS.includes(lang)) lang = DEFAULT;
    const dict = DICT[lang];

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val === undefined) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val.replace(/&nbsp;/g, '\u00a0').replace(/&mdash;/g, '—').replace(/&rarr;/g, '→').replace(/&nearr;/g, '↗').replace(/&darr;/g, '↓');
      }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }

  // Initialisation : lire localStorage, sinon auto-détection navigator
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  const browser = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
  const initial = saved || (LANGS.includes(browser) ? browser : DEFAULT);

  // Bind toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });

  applyLang(initial);
})();
