const logo = document.querySelector('.logo-container');
const nav = document.querySelector('.nav-header');

document.addEventListener('DOMContentLoaded', function() {
  function changeNavPosition() {
    if (window.pageYOffset > 0) {
      logo.style.position = 'fixed';
      logo.style.marginTop = '0';
      nav.style.position = 'fixed'
      nav.style.marginTop = '0';
      nav.style.width = `${window.innerWidth - logo.offsetWidth}px`;
    }
    
    if (window.pageYOffset === 0) {
      logo.style.position = 'relative';
      logo.style.marginTop = '50px';
      nav.style.width = '100%';
      nav.style.position = 'relative'
      nav.style.marginTop = '22px';
    }
  }
  
  document.addEventListener('scroll', changeNavPosition)
})
