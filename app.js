/* Elegant Rescues — interactions */
(function(){
  "use strict";

  /* ---- sticky nav shadow ---- */
  var nav = document.querySelector('.nav');
  function onScroll(){
    if(!nav) return;
    nav.setAttribute('data-scrolled', window.scrollY > 12 ? '1' : '0');
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---- scroll reveal (resilient: pins final state if transitions are frozen) ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  function pin(el){
    /* If the transition genuinely ran (foreground browser) opacity is already 1
       and this is a no-op snap. If the context froze transitions (backgrounded
       iframe / capture / print) this forces the visible end-state. */
    if(getComputedStyle(el).opacity !== '1'){
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }
  function markIn(el){
    if(el.classList.contains('in')) return;
    el.classList.add('in');
    setTimeout(function(){ pin(el); }, 950);
  }
  function revealInView(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for(var i=0;i<reveals.length;i++){
      var el = reveals[i];
      if(el.classList.contains('in')) continue;
      var r = el.getBoundingClientRect();
      if(r.top < vh * 0.92 && r.bottom > 0){ markIn(el); }
    }
  }
  var ticking = false;
  function onRevealScroll(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){ revealInView(); ticking = false; });
  }
  window.addEventListener('scroll', onRevealScroll, { passive:true });
  window.addEventListener('resize', onRevealScroll, { passive:true });
  revealInView();
  window.addEventListener('load', revealInView);
  /* blanket safety: nothing stays hidden, and any frozen transition gets pinned */
  setTimeout(function(){ reveals.forEach(function(el){ el.classList.add('in'); pin(el); }); }, 1600);

  /* ---- before / after sliders ---- */
  function initBA(el){
    var pos = 50;
    function set(p){
      pos = Math.max(0, Math.min(100, p));
      el.style.setProperty('--pos', pos + '%');
    }
    function fromEvent(clientX){
      var r = el.getBoundingClientRect();
      set(((clientX - r.left) / r.width) * 100);
    }
    var dragging = false;
    el.addEventListener('pointerdown', function(e){
      dragging = true;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      fromEvent(e.clientX);
    });
    el.addEventListener('pointermove', function(e){
      if(!dragging) return;
      fromEvent(e.clientX);
    });
    function stop(){ dragging = false; }
    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);
    el.addEventListener('pointerleave', function(){ /* keep position */ });
    /* keyboard a11y */
    el.setAttribute('tabindex','0');
    el.setAttribute('role','slider');
    el.setAttribute('aria-label','Drag to compare before and after');
    el.addEventListener('keydown', function(e){
      if(e.key==='ArrowLeft'){ set(pos-4); e.preventDefault(); }
      else if(e.key==='ArrowRight'){ set(pos+4); e.preventDefault(); }
    });
    set(50);
  }
  document.querySelectorAll('[data-ba]').forEach(initBA);

  /* ---- mobile menu ---- */
  var navEl = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var navLinks = document.getElementById('navLinks');
  function setMenu(open){
    if(!navEl || !toggle) return;
    navEl.setAttribute('data-open', open ? '1' : '0');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if(toggle){
    toggle.addEventListener('click', function(){
      setMenu(navEl.getAttribute('data-open') !== '1');
    });
  }
  if(navLinks){
    navLinks.addEventListener('click', function(e){
      if(e.target.closest('a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function(e){
    if(navEl && navEl.getAttribute('data-open') === '1' && !e.target.closest('.nav')) setMenu(false);
  });
  window.addEventListener('resize', function(){ if(window.innerWidth > 880) setMenu(false); }, { passive:true });

  /* ---- year ---- */
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
