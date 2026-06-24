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
    navItems.forEach(l => {
      const isActive = l.getAttribute('href') === '#' + cur;
      l.classList.toggle('on', isActive);
      if (isActive) l.setAttribute('aria-current', 'location');
      else l.removeAttribute('aria-current');
    });
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
    const lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'fr';
    const pick = k => (lang === 'en' ? (d[k + '_en'] || d[k]) : d[k]);
    const L = {
      meta:    lang === 'en' ? 'Function' : 'Fonction',
      role:    lang === 'en' ? 'Role' : 'Rôle',
      when:    lang === 'en' ? 'When I use it' : "Quand je l'utilise",
      caution: lang === 'en' ? 'Caution' : 'Précaution',
      example: lang === 'en' ? 'Real example' : 'Exemple concret',
    };

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
      <div class="ctrl-info-meta">${L.meta} ${d.id}&thinsp;/&thinsp;${total}</div>
      <div class="ctrl-info-name">${esc(d.name)}</div>
      <div class="ctrl-info-fields">
        ${field(L.role, pick('role'), iconRole)}
        ${field(L.when, pick('when'), iconWhen)}
        ${field(L.caution, pick('caution'), iconCaution, 'caution')}
        ${field(L.example, pick('example'), iconExample)}
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
      'nav.methode':        'Méthode',
      'nav.mcd8':           'MCD8',
      'nav.agv':            'AGV',
      'nav.experience':     'Expérience',
      'nav.competences':    'Compétences',
      'nav.formation':      'Formation',
      'nav.certifications': 'Certifications',
      'nav.plus':           'Plus',
      'nav.contact':        'Contact&nbsp;&nearr;',

      'hero.available':     'Disponible',
      'hero.tag':           'Alternance BTS Maintenance des Systèmes — Rentrée 2026',
      'hero.title':         "Je supervise 6&nbsp;<span class=\"glow\">AGV&nbsp;Swisslog</span><br>et je traite chaque jour<br><span class=\"dim\">les incidents de 1er&nbsp;niveau.</span>",
      'hero.desc':          "Agent logistique au Centre Hospitalier de Rodez : diagnostic à distance ou intervention physique avec le contrôleur terrain. Je prépare un BTS Maintenance des Systèmes en alternance et je recherche mon entreprise d'accueil pour la rentrée 2026.",
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

      'controller.label':       'Outil terrain',
      'controller.heading':     'Le <span style="color:var(--accent-soft)">contrôleur MCD8</span>',
      'controller.intro':       'Commande manuelle Swisslog utilisée lors des interventions physiques sur les AGV. 5 vues, 9 commandes, 3 modes.',
      'controller.tab_face':      'Face',
      'controller.tab_34':        '3/4',
      'controller.tab_top':       'Dessus',
      'controller.tab_connector': 'Connecteur',
      'controller.tab_context':   'En usage',
      'controller.callout_title': 'Connecteur 4 broches',
      'controller.callout_desc':  'Liaison contrôleur ↔ AGV — verrouillage 1/4 de tour',
      'controller.hint':        'Cliquez sur un point pour en savoir plus',
      'controller.panel_label': 'Fonctions du contrôleur',
      'controller.panel_title': 'Choisissez<br><span style="color:var(--accent-soft)">un point</span>',
      'controller.panel_sub':   'Cliquez ou survolez un point numéroté sur la vue Face pour afficher sa fonction.',
      'controller.info_empty':  'Sélectionnez un point numéroté sur le contrôleur pour afficher sa fonction.',
      'controller.modes_label': 'Sélecteur de mode',
      'controller.modes_title': '3 positions physiques',
      'controller.mode_aut_title': 'Automatique',
      'controller.mode_aut_desc':  "L'AGV suit son parcours automatique, piloté par la supervision. Le contrôleur ne sert qu'à surveiller.",
      'controller.mode_sea_title': 'Position intermédiaire',
      'controller.mode_sea_desc':  "Position neutre du sélecteur — utilisée en transition, l'AGV ne reçoit aucune commande active.",
      'controller.mode_man_title': 'Manuel',
      'controller.mode_man_desc':  'Pilotage depuis le contrôleur — FW/BW, SPEED, puis remise sur la voie guidée.',
      'controller.flow1_title': 'Prise en manuel',
      'controller.flow1_desc':  'Passage du sélecteur en MAN, vérification du voyant COM et de la charge avant toute commande.',
      'controller.flow2_title': 'Déplacement',
      'controller.flow2_desc':  "Commande FW ou BW à vitesse contrôlée jusqu'à la position souhaitée — sortie de zone, recentrage.",
      'controller.flow3_title': 'Réinsertion',
      'controller.flow3_desc':  "Vérification du voyant ON TRACK, retour en AUT. L'AGV reprend son circuit automatique.",

      'nav.capot':          'Explorer',

      'explorer.label':       'Explorer',
      'explorer.heading':     'Comprendre l\'objet technique',
      'explorer.intro':       "L'AGV en exploitation, son architecture intérieure, et l'outil que j'utilise pour intervenir.",
      'explorer.fleet':       "AGV supervisés au quotidien — flotte LAMCAR-R en service au CH de Rodez.",
      'explorer.bridge_eye':  'L\'objet technique',
      'explorer.bridge_arrow':'L\'outil d\'intervention',
      'explorer.bridge_cta':  'Découvrir le contrôleur MCD8  ↓',
      'explorer.toggle_view':    'Vue',
      'explorer.btn_ext':        'Extérieur',
      'explorer.btn_open':       'Ouvert',
      'explorer.btn_schema':     'Voir le schéma',
      'explorer.btn_schema_label':'Voir le schéma',
      'explorer.modal_eyebrow':  'Support technique · LAMCAR-R',
      'explorer.modal_title':    'Vue schématique des sous-ensembles',
      'explorer.modal_foot':     'Extrait du manuel LAMCAR-R utilisé sur le terrain. Sert de support à la compréhension générale — n\'engage aucune prétention de maintenance experte.',
      'explorer.panel_label': '5 grandes familles',
      'explorer.panel_hint':  'Passe sur une lettre pour voir le détail.',
      'explorer.z1_title':    'Énergie',
      'explorer.z1_desc':     "Batteries et alimentation. Conditionnent l'autonomie et les cycles de recharge en zone dédiée.",
      'explorer.z2_title':    'Commande & électronique',
      'explorer.z2_desc':     "Cartes, câblage, logique interne. Orchestrent le fonctionnement de l'AGV et sa liaison à la supervision.",
      'explorer.z3_title':    'Sécurité',
      'explorer.z3_desc':     "Arrêt d'urgence, scrutateurs laser, bandes sensibles. Assurent l'interaction sûre avec l'environnement.",
      'explorer.z4_title':    'Mécanique & déplacement',
      'explorer.z4_desc':     "Motorisation, transmission, table de levage. La partie qui fait avancer et lever la charge.",
      'explorer.z5_title':    'Structure & accès',
      'explorer.z5_desc':     "Châssis, capot, habillage. Donnent sa forme à l'AGV et permettent l'accès pour maintenance.",

      'role.intro':     "Mon périmètre concret — et celui qui dépasse mon rôle. Ce cadre me permet de travailler en confiance dans un environnement automatisé exigeant.",
      'role.col_mine':  'Ce que je fais',
      'role.col_tech':  'Ce que fait le technicien maintenance',
      'role.m1': 'Supervision du flux',
      'role.m2': 'Diagnostic 1er niveau',
      'role.m3': 'Déplacement sur site',
      'role.m4': 'Usage du contrôleur MCD8',
      'role.m5': 'Remise en service',
      'role.m6': 'Main courante',
      'role.t1': 'Diagnostic expert',
      'role.t2': 'Maintenance électrique interne',
      'role.t3': 'Interventions mécaniques lourdes',
      'role.t4': 'Paramétrage et programmation',
      'role.t5': 'Remplacement de composants complexes',
      'role.t6': 'Maintenance préventive lourde',

      'contact.cv_view':     'Voir mon CV',
      'contact.cv_download': 'Télécharger le CV',

      'fb.fab':          'Feedback',
      'fb.label':        'Retour privé',
      'fb.title':        'Dites-moi ce qui peut être mieux',
      'fb.sub':          "Le message part directement dans mon mail — ni commentaires publics, ni stockage en ligne.",
      'fb.cat_legend':   'Catégorie du retour',
      'fb.cat_clarity':  'Clarté',
      'fb.cat_design':   'Design',
      'fb.cat_bug':      'Bug',
      'fb.cat_other':    'Autre',
      'fb.msg_label':    'Votre retour',
      'fb.msg_ph':       "Ce qui vous a marqué, ce qui manque, un bug précis…",
      'fb.cancel':       'Annuler',
      'fb.send':         'Envoyer',

      'parcours.label':        'À propos',
      'parcours.heading':      'Mon <span class="dim">parcours</span> en un coup d\'œil',
      'parcours.subtext':      "De la conception technique au dépannage de systèmes automatisés, chaque étape m'a rapproché de l'industrie.",
      'parcours.about_kicker': 'À propos',
      'parcours.about_bio':    "Profil technique junior, orienté maintenance, production et systèmes automatisés. 21 ans. Agent logistique au Centre Hospitalier de Rodez : supervision de 6 AGV Swisslog, diagnostic d'incidents de 1er niveau, intervention physique avec le contrôleur terrain. Bac STI2D ITEC. Permis B, véhiculé. Je prépare un BTS Maintenance des Systèmes en alternance et je recherche mon entreprise d'accueil pour la rentrée 2026.",
      'parcours.agv_title':    'Agent logistique — CH Rodez',
      'parcours.agv_desc':     "Je supervise 6 AGV Swisslog qui approvisionnent l'ensemble des services hospitaliers : repas, linge, déchets. Lorsqu'un AGV présente un incident, j'identifie la cause depuis le poste de supervision et j'assure la remise en service sur les pannes de 1er niveau. Si l'incident nécessite une intervention physique, je me déplace à l'AGV avec le contrôleur terrain. 2 à 4 interventions par jour.",
      'parcours.stat_agv':     'AGV Swisslog supervisés',
      'parcours.sti_title':    'Bac STI2D ITEC',
      'parcours.sti_desc':     'SolidWorks, impression 3D, Arduino, analyse fonctionnelle, éco-conception. La base de ma culture technique.',
      'parcours.bts_title':    'BTS Bâtiment',
      'parcours.bts_desc':     '2 ans complétés. Lecture de plans, métrés, chiffrage, AutoCAD, Revit, RDM, GanttProject. Stage chez Rey Massol BTP.',
      'parcours.stat_int':     'Interventions par jour (moyenne)',

      'exp.label':    'Expérience',
      'exp.heading':  'Ce que j\'ai fait <span class="dim">concrètement</span>',
      'exp.subtext':  "Du terrain au diagnostic, chaque poste m'a donné des compétences directement transférables à l'industrie.",
      'exp.e1_thumb': 'Poste de supervision',
      'exp.e1_when':  'Depuis mars 2026 · CH Rodez',
      'exp.e1_what':  'Agent logistique — Supervision AGV / Maintenance 1er niveau',
      'exp.e1_where': 'Centre Hospitalier de Rodez',
      'exp.e1_how':   "Supervision quotidienne de 6 AGV Swisslog assurant l'approvisionnement de l'ensemble des services hospitaliers. Diagnostic et remise en service des incidents de 1er niveau en autonomie (prise d'embase, capteurs, détection défaillante). Si l'incident nécessite une intervention physique, déplacement à l'AGV avec le contrôleur terrain. Rédaction de la main courante, suivi des anomalies, coordination avec le technicien de maintenance. 2 à 4 interventions par jour.",
      'exp.e2_when':  'Août 2025 — Février 2026',
      'exp.e2_what':  'Agent des Services Hospitaliers',
      'exp.e2_where': 'Centre Hospitalier de Rodez',
      'exp.e2_how':   "Bio-nettoyage et désinfection de 8 chambres par jour. Distribution des repas, gestion du linge, entretien des espaces de soins. Application stricte des protocoles d'hygiène hospitalière.",
      'exp.e3_when':  '2024',
      'exp.e3_what':  'Stagiaire Technicien Études',
      'exp.e3_where': 'Rey Massol BTP',
      'exp.e3_how':   "Métrés et chiffrage sur chantier : relevés terrain, saisie des quantités. Participation aux études de prix et à l'élaboration des dossiers d'appels d'offres. Appui à la planification des travaux en lien avec le conducteur de travaux.",
      'exp.e4_when':  '2022',
      'exp.e4_what':  'Employé mise en rayon et caisse',
      'exp.e4_where': 'Intersport',
      'exp.e4_how':   'Mise en rayon, gestion du stock, encaissement.',
      'exp.e5_when':  '2019',
      'exp.e5_what':  "Stage d'observation",
      'exp.e5_where': 'Collège Saint Joseph — Restauration Collective',
      'exp.e5_how':   "Découverte de la gestion des stocks et de l'approvisionnement en restauration.",

      'comp.label':   'Compétences',
      'comp.heading': 'Ce que je <span class="dim">sais faire</span>',
      'comp.subtext': "Technique, outils, méthode. Tout ce que j'ai accumulé et qui sert au quotidien.",
      'comp.s1': 'Systèmes automatisés & maintenance',
      'comp.s2': 'CAO / Conception',
      'comp.s3': 'Outils & Logiciels',
      'comp.s4': 'Qualités',
      'comp.t_diag':  "Diagnostic d'incidents",
      'comp.t_rms':   'Remise en service',
      'comp.t_m1':    'Maintenance 1er niveau',
      'comp.t_anom':  "Suivi d'anomalies",
      'comp.t_coord': 'Coordination maintenance',
      'comp.t_3d':    'Impression 3D',
      'comp.q1': 'Rigueur',
      'comp.q2': "Esprit d'analyse",
      'comp.q3': 'Réactivité',
      'comp.q4': 'Travail en équipe',
      'comp.q5': 'Adaptabilité',
      'comp.q6': 'Autonomie',

      'cert.label':    'Certifications',
      'cert.heading':  'Certifications <span class="dim">complémentaires</span>',
      'cert.subtext':  'Je complète mon parcours par des formations en ligne et une veille continue sur les outils numériques.',
      'cert.wip':      'En cours',
      'cert.ok':       'Obtenue',
      'cert.link':     'Voir le programme ↗',
      'cert.link_pix': 'Voir Pix.fr ↗',
      'cert.pix_desc': 'Compétences numériques',

      'form.label':    'Formation',
      'form.heading':  'Parcours <span class="dim">académique</span>',
      'form.f1_title': 'Parcours en BTS Bâtiment',
      'form.f2_title': 'Bac STI2D — Spécialité ITEC',
      'form.f3_title': 'Brevet du Collège',
      'form.obtained': 'Obtenu',

      'plus.label':     'En plus',
      'plus.heading':   "Langues &amp; <span class=\"dim\">centres d'intérêt</span>",
      'plus.langues_h': 'Langues',
      'plus.l_fr':      'Français — langue maternelle',
      'plus.l_en':      'Anglais — B2',
      'plus.l_es':      'Espagnol — B1',
      'plus.loisirs_h': 'Loisirs',
      'plus.li_sport':  'Musculation & Football',
      'plus.li_voyage': 'Voyage',
      'plus.li_photo':  'Photographie',
      'plus.li_veille': 'Veille technologique',

      'contact.label':    'Contact',
      'contact.heading':  'On travaille <span class="dim">ensemble</span>&nbsp;?',
      'contact.subtext':  'Je recherche une alternance en maintenance industrielle, production ou systèmes automatisés pour la rentrée 2026.<br>Actuellement au Centre Hospitalier de Rodez. Installation à Blagnac (31) à la rentrée 2026 · Permis B, véhiculé.',
      'contact.loc':      'Rodez (12)',
      'contact.map_hint': 'Voir sur la carte ↗',

      'footer.text': '© 2026 Shalom Alonyo — Fait avec détermination.',
    },
    en: {
      'nav.parcours':       'About',
      'nav.methode':        'Method',
      'nav.mcd8':           'MCD8',
      'nav.agv':            'AGV',
      'nav.experience':     'Experience',
      'nav.competences':    'Skills',
      'nav.formation':      'Education',
      'nav.certifications': 'Certifications',
      'nav.plus':           'More',
      'nav.contact':        'Contact&nbsp;&nearr;',

      'hero.available':     'Available',
      'hero.tag':           'Apprenticeship — Systems Maintenance · 2026',
      'hero.title':         "I supervise 6&nbsp;<span class=\"glow\">Swisslog&nbsp;AGVs</span><br>and I handle<br><span class=\"dim\">first-level incidents every day.</span>",
      'hero.desc':          "Logistics operator at Rodez Hospital: remote diagnostics or on-site intervention with the field controller. I'm starting a Systems Maintenance BTS as an apprentice and looking for my host company for autumn 2026.",
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

      'controller.label':       'Field tool',
      'controller.heading':     'The <span style="color:var(--accent-soft)">MCD8 controller</span>',
      'controller.intro':       'Swisslog manual pendant used during on-site interventions on AGVs. 5 views, 9 commands, 3 modes.',
      'controller.tab_face':      'Face',
      'controller.tab_34':        '3/4',
      'controller.tab_top':       'Top',
      'controller.tab_connector': 'Connector',
      'controller.tab_context':   'In use',
      'controller.callout_title': '4-pin connector',
      'controller.callout_desc':  'Controller ↔ AGV link — quarter-turn lock',
      'controller.hint':        'Click a point to learn more',
      'controller.panel_label': 'Controller functions',
      'controller.panel_title': 'Pick<br><span style="color:var(--accent-soft)">a point</span>',
      'controller.panel_sub':   'Click or hover a numbered point on the Face view to see its function.',
      'controller.info_empty':  'Select a numbered point on the controller to display its function.',
      'controller.modes_label': 'Mode selector',
      'controller.modes_title': '3 physical positions',
      'controller.mode_aut_title': 'Automatic',
      'controller.mode_aut_desc':  "The AGV follows its automated route, driven by the supervision system. The controller only monitors.",
      'controller.mode_sea_title': 'Intermediate',
      'controller.mode_sea_desc':  "Neutral selector position — used in transition. The AGV receives no active commands.",
      'controller.mode_man_title': 'Manual',
      'controller.mode_man_desc':  'Hand-driving from the controller — FW/BW, SPEED, then back onto the guided path.',
      'controller.flow1_title': 'Switch to manual',
      'controller.flow1_desc':  'Selector to MAN, check the COM indicator and battery before any command.',
      'controller.flow2_title': 'Move',
      'controller.flow2_desc':  'FW or BW at controlled speed to the desired position — exit zone, re-align.',
      'controller.flow3_title': 'Re-entry',
      'controller.flow3_desc':  "Check the ON TRACK indicator, switch back to AUT. The AGV resumes its automated route.",

      'nav.capot':          'Explorer',

      'explorer.label':       'Explorer',
      'explorer.heading':     'Understanding the machine',
      'explorer.intro':       "The AGV in operation, its interior architecture, and the tool I use to intervene.",
      'explorer.fleet':       "AGVs supervised every day — LAMCAR-R fleet operating at Rodez Hospital.",
      'explorer.bridge_eye':  'The machine',
      'explorer.bridge_arrow':'The intervention tool',
      'explorer.bridge_cta':  'Discover the MCD8 controller  ↓',
      'explorer.toggle_view':    'View',
      'explorer.btn_ext':        'Outside',
      'explorer.btn_open':       'Open',
      'explorer.btn_schema':     'View diagram',
      'explorer.btn_schema_label':'View diagram',
      'explorer.modal_eyebrow':  'Technical reference · LAMCAR-R',
      'explorer.modal_title':    'Schematic view of sub-assemblies',
      'explorer.modal_foot':     'Excerpt from the LAMCAR-R manual used on site. Serves as a high-level reference — does not imply expert maintenance work.',
      'explorer.panel_label': '5 main families',
      'explorer.panel_hint':  'Hover a letter to see the detail.',
      'explorer.z1_title':    'Energy',
      'explorer.z1_desc':     "Batteries and power supply. Drive autonomy and recharging cycles in the dedicated zone.",
      'explorer.z2_title':    'Control & electronics',
      'explorer.z2_desc':     "Boards, wiring, internal logic. Orchestrate the AGV's operation and its link to the supervision system.",
      'explorer.z3_title':    'Safety',
      'explorer.z3_desc':     "Emergency stop, laser scanners, pressure-sensitive strips. Ensure safe interaction with the environment.",
      'explorer.z4_title':    'Mechanics & motion',
      'explorer.z4_desc':     "Drive, transmission, lift table. The part that moves the AGV and raises the load.",
      'explorer.z5_title':    'Structure & access',
      'explorer.z5_desc':     "Chassis, hood, casing. Give the AGV its shape and allow access for maintenance.",

      'role.intro':     "My concrete scope — and what goes beyond my role. This framework lets me work confidently in a demanding automated environment.",
      'role.col_mine':  'What I do',
      'role.col_tech':  'What the maintenance engineer does',
      'role.m1': 'Flow supervision',
      'role.m2': 'First-level diagnosis',
      'role.m3': 'On-site response',
      'role.m4': 'MCD8 controller operation',
      'role.m5': 'Back-in-service',
      'role.m6': 'Incident log',
      'role.t1': 'Expert diagnosis',
      'role.t2': 'Internal electrical maintenance',
      'role.t3': 'Heavy mechanical work',
      'role.t4': 'Configuration and programming',
      'role.t5': 'Complex component replacement',
      'role.t6': 'Scheduled preventive maintenance',

      'contact.cv_view':     'View my résumé',
      'contact.cv_download': 'Download résumé',

      'fb.fab':          'Feedback',
      'fb.label':        'Private feedback',
      'fb.title':        'Tell me what can be better',
      'fb.sub':          'The message opens directly in my mail client — no public comments, no online storage.',
      'fb.cat_legend':   'Feedback category',
      'fb.cat_clarity':  'Clarity',
      'fb.cat_design':   'Design',
      'fb.cat_bug':      'Bug',
      'fb.cat_other':    'Other',
      'fb.msg_label':    'Your feedback',
      'fb.msg_ph':       'What stood out, what\'s missing, a specific bug…',
      'fb.cancel':       'Cancel',
      'fb.send':         'Send',

      'parcours.label':        'About',
      'parcours.heading':      'My <span class="dim">background</span> at a glance',
      'parcours.subtext':      'From technical design to troubleshooting automated systems, every step has brought me closer to industry.',
      'parcours.about_kicker': 'About',
      'parcours.about_bio':    "Junior technical profile, focused on maintenance, production and automated systems. 21 years old. Logistics operator at Rodez Hospital (France): supervising 6 Swisslog AGVs, first-level incident diagnosis, on-site intervention with the field controller. STI2D ITEC diploma. Driving licence, own car. I'm starting a Systems Maintenance BTS as an apprentice and looking for my host company for autumn 2026.",
      'parcours.agv_title':    'Logistics operator — Rodez Hospital',
      'parcours.agv_desc':     'I supervise 6 Swisslog AGVs that supply every hospital department: meals, linen, waste. When an AGV has an incident, I identify the cause from the supervision station and bring it back into service for first-level faults. If physical handling is needed, I go to the AGV with the field controller. 2 to 4 interventions a day.',
      'parcours.stat_agv':     'Swisslog AGVs supervised',
      'parcours.sti_title':    'STI2D ITEC diploma',
      'parcours.sti_desc':     'SolidWorks, 3D printing, Arduino, functional analysis, eco-design. The foundation of my technical culture.',
      'parcours.bts_title':    'Construction BTS',
      'parcours.bts_desc':     '2 years completed. Blueprint reading, quantity take-offs, costing, AutoCAD, Revit, strength of materials, GanttProject. Internship at Rey Massol BTP.',
      'parcours.stat_int':     'Interventions per day (avg.)',

      'exp.label':    'Experience',
      'exp.heading':  'What I have done <span class="dim">concretely</span>',
      'exp.subtext':  'From the field to diagnosis, each role has given me skills directly transferable to industry.',
      'exp.e1_thumb': 'Supervision station',
      'exp.e1_when':  'Since March 2026 · Rodez Hospital',
      'exp.e1_what':  'Logistics operator — AGV supervision / 1st-level maintenance',
      'exp.e1_where': 'Rodez Hospital (France)',
      'exp.e1_how':   'Daily supervision of 6 Swisslog AGVs supplying every hospital department. Autonomous diagnosis and return-to-service of first-level incidents (docking base, sensors, faulty detection). When physical handling is needed, I go to the AGV with the field controller. Writing the logbook, tracking anomalies, coordinating with the maintenance technician. 2 to 4 interventions a day.',
      'exp.e2_when':  'Aug 2025 — Feb 2026',
      'exp.e2_what':  'Hospital services operator',
      'exp.e2_where': 'Rodez Hospital (France)',
      'exp.e2_how':   'Bio-cleaning and disinfection of 8 rooms a day. Meal distribution, linen management, upkeep of care areas. Strict application of hospital hygiene protocols.',
      'exp.e3_when':  '2024',
      'exp.e3_what':  'Design-office intern',
      'exp.e3_where': 'Rey Massol BTP',
      'exp.e3_how':   'On-site quantity take-offs and costing: field surveys, quantity entry. Support to pricing studies and tender files. Help with works planning alongside the site manager.',
      'exp.e4_when':  '2022',
      'exp.e4_what':  'Retail & checkout assistant',
      'exp.e4_where': 'Intersport',
      'exp.e4_how':   'Shelving, stock management, checkout.',
      'exp.e5_when':  '2019',
      'exp.e5_what':  'Observation internship',
      'exp.e5_where': 'Saint Joseph school — Catering',
      'exp.e5_how':   'Introduction to stock management and supply in catering.',

      'comp.label':   'Skills',
      'comp.heading': 'What I <span class="dim">can do</span>',
      'comp.subtext': 'Technique, tools, method. Everything I have built up and use every day.',
      'comp.s1': 'Automated systems & maintenance',
      'comp.s2': 'CAD / Design',
      'comp.s3': 'Tools & Software',
      'comp.s4': 'Strengths',
      'comp.t_diag':  'Incident diagnosis',
      'comp.t_rms':   'Return to service',
      'comp.t_m1':    '1st-level maintenance',
      'comp.t_anom':  'Anomaly tracking',
      'comp.t_coord': 'Maintenance coordination',
      'comp.t_3d':    '3D printing',
      'comp.q1': 'Rigor',
      'comp.q2': 'Analytical mindset',
      'comp.q3': 'Responsiveness',
      'comp.q4': 'Teamwork',
      'comp.q5': 'Adaptability',
      'comp.q6': 'Autonomy',

      'cert.label':    'Certifications',
      'cert.heading':  'Additional <span class="dim">certifications</span>',
      'cert.subtext':  'I round out my path with online courses and a continuous watch on digital tools.',
      'cert.wip':      'In progress',
      'cert.ok':       'Completed',
      'cert.link':     'View program ↗',
      'cert.link_pix': 'Visit Pix.fr ↗',
      'cert.pix_desc': 'Digital skills',

      'form.label':    'Education',
      'form.heading':  'Academic <span class="dim">background</span>',
      'form.f1_title': 'Construction BTS (2 years)',
      'form.f2_title': 'STI2D Baccalauréat — ITEC',
      'form.f3_title': 'Middle-school diploma',
      'form.obtained': 'Obtained',

      'plus.label':     'More',
      'plus.heading':   'Languages &amp; <span class="dim">interests</span>',
      'plus.langues_h': 'Languages',
      'plus.l_fr':      'French — native',
      'plus.l_en':      'English — B2',
      'plus.l_es':      'Spanish — B1',
      'plus.loisirs_h': 'Interests',
      'plus.li_sport':  'Fitness & Football',
      'plus.li_voyage': 'Travel',
      'plus.li_photo':  'Photography',
      'plus.li_veille': 'Tech watch',

      'contact.label':    'Contact',
      'contact.heading':  "Let's work <span class=\"dim\">together</span>?",
      'contact.subtext':  "I'm looking for an apprenticeship in industrial maintenance, production or automated systems for autumn 2026.<br>Currently at Rodez Hospital. Moving to Blagnac (31) for the new term · Driving licence, own car.",
      'contact.loc':      'Rodez (France)',
      'contact.map_hint': 'View on map ↗',

      'footer.text': '© 2026 Shalom Alonyo — Built with determination.',
    },
  };

  function applyLang(lang) {
    if (!LANGS.includes(lang)) lang = DEFAULT;
    const dict = DICT[lang];

    // Expose le dictionnaire courant pour les modules qui en ont besoin (ex: initAgvExplorer)
    window.__EXPL_DICT__ = DICT;

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

    // Placeholders (textarea, input)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = dict[key];
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    // Trigger : code + label aria
    const code = document.querySelector('[data-lang-code]');
    if (code) code.textContent = lang.toUpperCase();
    const trigger = document.getElementById('langTrigger');
    if (trigger) {
      const label = lang === 'fr' ? 'Choisir la langue — actuel : Français' : 'Language — current: English';
      trigger.setAttribute('aria-label', label);
    }

    // Options dans le menu (desktop) + boutons mobile
    document.querySelectorAll('.lang-option, .lang-option-mobile').forEach(btn => {
      const on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('on', on);
      btn.setAttribute(btn.classList.contains('lang-option') ? 'aria-checked' : 'aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }

  // Initialisation : lire localStorage, sinon auto-détection navigator
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  const browser = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
  const initial = saved || (LANGS.includes(browser) ? browser : DEFAULT);

  // Bind des options (menu desktop + menu mobile)
  document.querySelectorAll('.lang-option, .lang-option-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.getAttribute('data-lang'));
      // Ferme le menu desktop après sélection
      const picker = document.querySelector('.lang-picker');
      if (picker) picker.classList.remove('open');
      const trg = document.getElementById('langTrigger');
      if (trg) trg.setAttribute('aria-expanded', 'false');
    });
  });

  // Toggle du menu desktop (clic sur globe)
  const trigger = document.getElementById('langTrigger');
  const picker = document.querySelector('.lang-picker');
  if (trigger && picker) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = picker.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Clic en dehors → ferme
    document.addEventListener('click', (e) => {
      if (picker.classList.contains('open') && !picker.contains(e.target)) {
        picker.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    // Escape → ferme
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && picker.classList.contains('open')) {
        picker.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  }

  applyLang(initial);
})();

/* ═══════════════════════════════════════════════════════════════════════════
   CV BUTTONS — Force download robuste (fallback mobile Safari)
   ═══════════════════════════════════════════════════════════════════════════
   · data-cv-view    → ouvre le PDF dans un nouvel onglet (comportement natif)
   · data-cv-download → force le téléchargement via fetch + Blob si l'attribut
     download est ignoré (comportement sur iOS Safari notamment)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initCVButtons() {
  document.querySelectorAll('[data-cv-download]').forEach(link => {
    link.addEventListener('click', async (e) => {
      // Laisse le comportement natif si Chrome/Firefox desktop (download OK)
      // Intercepte uniquement sur iOS Safari (ou tout navigateur qui ignore `download`)
      const ua = navigator.userAgent;
      const isIOS = /iP(ad|hone|od)/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua);
      if (!isIOS) return; // Laisse faire le navigateur

      e.preventDefault();
      const url = link.getAttribute('href');
      const filename = link.getAttribute('download') || 'Shalom_Alonyo_CV.pdf';

      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const objUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(objUrl);
          a.remove();
        }, 400);
      } catch (err) {
        // Fallback ultime : ouvrir dans un nouvel onglet
        window.open(url, '_blank', 'noopener');
      }
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   CONTRÔLEUR v4 — Onglets de vues (faux 360 par crossfade)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initControllerTabs() {
  const tabs  = document.querySelectorAll('.ctrl-tab');
  const views = document.querySelectorAll('.ctrl-view');
  const hint  = document.querySelector('.ctrl-hint');
  const bgImg = document.querySelector('.ctrl-bg-blur img');

  if (!tabs.length || !views.length) return;

  // Sources des fonds flous par vue (pour crossfade du background)
  const bgMap = {
    face:      'assets/ctrl-face.jpg',
    '34':      'assets/ctrl-34-clean.jpg',
    top:       'assets/ctrl-top-clean.jpg',
    connector: 'assets/ctrl-connector.png',
    context:   'assets/agv-controller-hand.jpg',
  };

  function switchView(viewName) {
    tabs.forEach(t => {
      const on = t.getAttribute('data-view') === viewName;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    views.forEach(v => {
      const on = v.getAttribute('data-view') === viewName;
      v.classList.toggle('on', on);
      if (on) v.removeAttribute('hidden');
      else    v.setAttribute('hidden', '');
    });
    // Mise à jour du fond flou
    if (bgImg && bgMap[viewName]) bgImg.src = bgMap[viewName];
    // Masquer le hint hors vue Face
    if (hint) hint.setAttribute('data-hidden', viewName === 'face' ? 'false' : 'true');
  }

  tabs.forEach(t => t.addEventListener('click', () => {
    switchView(t.getAttribute('data-view'));
    stopAutoRotate();
  }));

  // Quand un bouton de nav .ctrl-nav-btn (panneau latéral) est cliqué,
  // on force le retour sur la vue Face pour que le hotspot soit visible
  document.querySelectorAll('.ctrl-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.querySelector('.ctrl-view.on');
      if (active && active.getAttribute('data-view') !== 'face') switchView('face');
      stopAutoRotate();
    });
  });

  /* ── Rotation automatique entre vues (face → 3/4 → top → face) ──
     Donne l'impression "objet héros qui tourne sur lui-même"
     Démarre quand la section entre dans le viewport, s'arrête à la 1re interaction.
     Désactivée si prefers-reduced-motion. */
  let autoRotateTimer = null;
  let userInteracted  = false;

  function stopAutoRotate() {
    userInteracted = true;
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  // Aussi stop auto-rotate sur clic d'un hotspot
  document.querySelectorAll('.ctrl-hotspot').forEach(h => {
    h.addEventListener('click', stopAutoRotate, { once: true });
  });

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctrlSection = document.getElementById('controller');
  if (ctrlSection && !reduceMotion) {
    const sequence = ['face', '34', 'top'];
    let idx = 0;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !userInteracted && !autoRotateTimer) {
          autoRotateTimer = setInterval(() => {
            if (userInteracted) { stopAutoRotate(); return; }
            idx = (idx + 1) % sequence.length;
            switchView(sequence[idx]);
          }, 4200);
        }
      });
    }, { threshold: 0.35 });
    obs.observe(ctrlSection);
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   AGV EXPLORER — Toggles vue/mode + hotspots interactifs
   ═══════════════════════════════════════════════════════════════════════════ */
(function initAgvExplorer() {
  const stage = document.getElementById('explStage');
  if (!stage) return;

  // ── Données des 5 familles ──
  const ZONES = {
    energie: {
      letter: 'A',
      titleKey: 'explorer.z1_title',
      descKey:  'explorer.z1_desc',
    },
    commande: {
      letter: 'B',
      titleKey: 'explorer.z2_title',
      descKey:  'explorer.z2_desc',
    },
    securite: {
      letter: 'C',
      titleKey: 'explorer.z3_title',
      descKey:  'explorer.z3_desc',
    },
    mecanique: {
      letter: 'D',
      titleKey: 'explorer.z4_title',
      descKey:  'explorer.z4_desc',
    },
    structure: {
      letter: 'E',
      titleKey: 'explorer.z5_title',
      descKey:  'explorer.z5_desc',
    },
  };

  // ── Éléments DOM ──
  const toggleBtns    = document.querySelectorAll('.expl-toggle-btn');
  const hotspots      = document.querySelectorAll('.expl-hotspot');
  const zoneItems     = document.querySelectorAll('.expl-zone-item');
  const panelEmpty    = document.getElementById('explPanelEmpty');
  const panelContent  = document.getElementById('explPanelContent');
  const panelLetter   = document.getElementById('explPanelLetter');
  const panelTitle    = document.getElementById('explPanelTitle');
  const panelDesc     = document.getElementById('explPanelDesc');

  // ── État courant ──
  let curView  = 'ext';   // 'ext' | 'open'
  let curZone  = null;

  // ── Toggle vue (Extérieur / Ouvert) ──
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      curView = val;

      stage.classList.toggle('is-ext',  curView === 'ext');
      stage.classList.toggle('is-open', curView === 'open');

      // Marquer le bouton actif
      document.querySelectorAll('.expl-toggle-btn[data-toggle="view"]').forEach(b => {
        const on = b.getAttribute('data-val') === val;
        b.classList.toggle('on', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
      });

      // Quitter la vue Ouvert ferme le panneau hotspot
      if (curView !== 'open') closePanel();

      stage.setAttribute('aria-label', `AGV Swisslog — ${btn.textContent.trim()}`);
    });
  });

  // ── Affichage panneau ──
  function openPanel(key) {
    const zone = ZONES[key];
    if (!zone) return;
    curZone = key;

    // Marquer actif sur hotspots et zone items
    hotspots.forEach(h  => h.classList.toggle('on', h.getAttribute('data-expl') === key));
    zoneItems.forEach(z => z.classList.toggle('on', z.getAttribute('data-expl') === key));

    // Remplir le panneau — on lit le texte depuis les éléments data-i18n
    // existants dans la zone-list pour rester cohérent avec l'i18n courante
    const titleEl = document.querySelector(`.expl-zone-item[data-expl="${key}"] span:last-child`);
    const titleTxt = titleEl ? titleEl.textContent : zone.titleKey;

    // Description : on lit depuis la clé DICT via un attribut data-i18n sur le panneau
    // — méthode simple : on stocke la clé sur panelDesc et on force le re-apply
    panelLetter.textContent = zone.letter;
    panelTitle.textContent  = titleTxt;
    panelDesc.setAttribute('data-i18n', zone.descKey);

    // Déclencher la traduction sur cet élément (reprend la langue courante)
    const lang = document.documentElement.getAttribute('lang') || 'fr';
    const dictData = window.__EXPL_DICT__ || {};
    const desc = (dictData[lang] && dictData[lang][zone.descKey]) || '';
    if (desc) panelDesc.textContent = desc;

    // Afficher
    if (panelEmpty)   panelEmpty.setAttribute('hidden', '');
    if (panelContent) { panelContent.removeAttribute('hidden'); }
  }

  function closePanel() {
    curZone = null;
    hotspots.forEach(h  => h.classList.remove('on'));
    zoneItems.forEach(z => z.classList.remove('on'));
    if (panelEmpty)   panelEmpty.removeAttribute('hidden');
    if (panelContent) panelContent.setAttribute('hidden', '');
  }

  // ── Listeners hotspots (image) ──
  hotspots.forEach(hs => {
    const key = hs.getAttribute('data-expl');
    hs.addEventListener('click',      () => curZone === key ? closePanel() : openPanel(key));
    if (matchMedia('(hover: hover)').matches) {
      hs.addEventListener('mouseenter', () => openPanel(key));
      hs.addEventListener('focus',      () => openPanel(key));
    }
  });

  // ── Listeners zone-list (panneau) ──
  zoneItems.forEach(zi => {
    const key = zi.getAttribute('data-expl');
    zi.addEventListener('click', () => {
      // Si on n'est pas en vue ouverte, y basculer d'abord
      if (curView !== 'open') {
        document.querySelector('.expl-toggle-btn[data-toggle="view"][data-val="open"]')?.click();
      }
      openPanel(key);
    });
    if (matchMedia('(hover: hover)').matches) {
      zi.addEventListener('mouseenter', () => openPanel(key));
    }
  });

  // ── Escape ferme le panneau ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && curZone) closePanel();
  });

  // ── IntersectionObserver — reveal hotspots en cascade ──
  const section = document.getElementById('capot');
  if (section) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        hotspots.forEach((hs, i) => {
          hs.style.opacity = '0';
          hs.style.transform = 'translate(-50%, -50%) scale(.5)';
          hs.style.transition = 'opacity .4s, transform .4s';
          hs.style.transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
          setTimeout(() => {
            hs.style.opacity = '';
            hs.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 300 + i * 90);
        });
        obs.unobserve(e.target);
      });
    }, { threshold: .2 });
    obs.observe(section);
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   FEEDBACK PRIVÉ — FAB + Modal + mailto
   ═══════════════════════════════════════════════════════════════════════════
   · Le message est envoyé via mailto: (client mail natif)
   · Aucun backend, aucun stockage, 100% privé et GitHub-Pages-compatible
   · Fallback : copie dans le presse-papier si mailto est bloqué
   ═══════════════════════════════════════════════════════════════════════════ */
(function initFeedback() {
  const fab    = document.getElementById('fbOpen');
  const modal  = document.getElementById('fbModal');
  const form   = document.getElementById('fbForm');
  if (!fab || !modal || !form) return;

  const status = form.querySelector('.fb-status');
  const submit = form.querySelector('.fb-btn-primary');
  let lastActive = null;

  // Afficher le FAB après un léger scroll (pas dès l'arrivée)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) fab.classList.add('show');
  }, { passive: true });

  function open() {
    lastActive = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const first = form.querySelector('input[type="radio"]');
      if (first) first.focus();
    }, 80);
  }
  function close() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    status.classList.remove('show', 'error');
    status.textContent = '';
    if (lastActive) lastActive.focus();
  }

  fab.addEventListener('click', open);
  modal.querySelectorAll('[data-fb-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const cat = formData.get('cat');
    const msg = (formData.get('message') || '').toString().trim();
    if (!cat || !msg) {
      status.textContent = 'Merci de choisir une catégorie et d\'écrire un message.';
      status.className = 'fb-status show error';
      return;
    }
    submit.disabled = true;

    const subject = `[Portfolio Shalom] ${cat}`;
    const body = `${msg}\n\n---\nCatégorie : ${cat}\nEnvoyé depuis : ${location.href}\nDate : ${new Date().toISOString()}`;
    const mailto = `mailto:shalomalonyo24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Ouvre le client mail
    window.location.href = mailto;

    status.textContent = 'Votre client mail s\'ouvre avec le message prêt. Merci !';
    status.className = 'fb-status show';

    setTimeout(() => {
      submit.disabled = false;
      close();
      form.reset();
    }, 2500);
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   MODAL SCHÉMA AGV (lightbox planche LAMCAR-R)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initSchemaModal() {
  const modal   = document.getElementById('explSchemaModal');
  const trigger = document.getElementById('explSchemaBtn');
  if (!modal || !trigger) return;

  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    // Focus initial : bouton fermer
    const closeBtn = modal.querySelector('.expl-modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    // Attendre la fin de transition avant de cacher complètement
    setTimeout(() => modal.setAttribute('hidden', ''), 360);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  trigger.addEventListener('click', open);

  // Tous les éléments [data-modal-close] ferment la modal (overlay + bouton ×)
  modal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', close);
  });

  // Escape ferme
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();
