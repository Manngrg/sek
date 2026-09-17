document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close mobile menu after tapping a nav link
    header.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Site videos: respect reduced motion, fall back gracefully ---- */
  var siteVideos = document.querySelectorAll('.hero-video, .story-video, .page-background-video, .chef-spotlight-video');
  siteVideos.forEach(function (siteVideo) {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      siteVideo.removeAttribute('autoplay');
      siteVideo.pause();
    }
    // If the clip hasn't been added yet (or fails to load), hide the <video>
    // so the poster color / scrim still reads as an intentional dark hero.
    siteVideo.addEventListener('error', function () {
      siteVideo.style.display = 'none';
    });
  });


  var menuTabs = document.querySelectorAll('.menu-tab');
  var menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-cat');

      menuTabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      menuPanels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-panel') === target);
      });
    });
  });

  /* ---- Drinks sub-tabs (soft / beer / hard) ---- */
  var drinkTabs = document.querySelectorAll('.drink-tab');
  var drinkPanels = document.querySelectorAll('.drink-panel');

  drinkTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-drink');

      drinkTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      drinkPanels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-drinkpanel') === target);
      });
    });
  });

});
