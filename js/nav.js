const mobileMenuBtn = document.querySelector('#Mobile-menu-btn');
const mobielMenu = document.querySelector('.mobile-menu');
const xclose = document.querySelector('#x');
const menu = document.querySelector('#menu');

mobileMenuBtn.addEventListener('click', () => {
  mobielMenu.classList.toggle('hidden');
  xclose.classList.toggle('hidden');
  menu.classList.toggle('hidden');
});
