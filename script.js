(function(){
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobileNav');
  if(!toggle || !panel) return;

  toggle.addEventListener('click', function(){
    var isOpen = panel.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // close the panel automatically if a link inside it is clicked
  panel.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      panel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // close it if the window gets resized back to desktop while open
  window.addEventListener('resize', function(){
    if(window.innerWidth > 900 && panel.classList.contains('is-open')){
      panel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();