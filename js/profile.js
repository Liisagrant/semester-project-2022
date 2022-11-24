const updateBtn = document.querySelector('#updateBtn');
const form = document.querySelector('#updateProfile-form');
const modalBg = document.querySelector('#modal-background');
const updateBtnform = document.querySelector('#updateBtnForm');
const cancelBtnform = document.querySelector('#cancelBtnForm');

updateBtn.addEventListener('click', (e) => {
    modalBg.classList.remove('hidden');
});

cancelBtnform.addEventListener('click', (e) => {
    modalBg.classList.add('hidden');
});
