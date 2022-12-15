import { SIGN_UP_URL } from './settings/api';
import {
  validEmail,
  validatePassword,
  checkLength,
  validImgUrl,
} from './utils/validation';

const form = document.querySelector('#signUp-form');
const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstNameError');
const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailNotValid = document.querySelector('#emailNotValid');
const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const confirmPassword = document.querySelector('#confirmpassword');
const confirmpasswordError = document.querySelector('#confirmpasswordError');
const passwordErrorNotMatch = document.querySelector('#passwordErrorNotMatch');
const avatar = document.querySelector('#avatar');
const avatarError = document.querySelector('#avatarError');
const errorSignupUser = document.querySelector('#generalError');

async function signUp(url, data) {
  try {
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      location.href = './index.html';
    } else {
      const err = await response.json();
      const message = `${err.errors[0].message}`;
      throw new Error(message);
    }
  } catch (err) {
    errorSignupUser.innerHTML = `${err}`;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFirstName = false;
  if (checkLength(firstName.value, 1) === true) {
    firstNameError.classList.add('hidden');
    isFirstName = true;
  } else {
    firstNameError.classList.remove('hidden');
  }

  let isEmail = false;
  if (checkLength(email.value, 1)) {
    emailError.classList.add('hidden');
    isEmail = true;
  } else {
    emailError.classList.remove('hidden');
  }

  let isEmailValid = false;
  if (checkLength(email.value, 1) && validEmail(email.value) === true) {
    emailNotValid.classList.add('hidden');
    isEmailValid = true;
  } else if (checkLength(email.value, 1) && validEmail(email.value) === false) {
    emailNotValid.classList.remove('hidden');
  }

  let isPassword = false;
  if (checkLength(password.value, 8)) {
    passwordError.classList.add('hidden');
    isPassword = true;
  } else {
    passwordError.classList.remove('hidden');
  }

  let isConfirmPassword = false;
  if (checkLength(confirmPassword.value, 8)) {
    confirmpasswordError.classList.add('hidden');
    isConfirmPassword = true;
  } else {
    confirmpasswordError.classList.remove('hidden');
  }

  let isPasswordMatch = false;
  isPasswordMatch = validatePassword(password.value, confirmPassword.value);
  if (isPasswordMatch) {
    passwordErrorNotMatch.classList.add('hidden');
    isPasswordMatch = true;
  } else {
    passwordErrorNotMatch.classList.remove('hidden');
  }

  let isAvatarValid = false;
  isAvatarValid = validImgUrl(avatar.value) || avatar.value === '';
  if (isAvatarValid) {
    avatarError.classList.add('hidden');
  } else {
    avatarError.classList.remove('hidden');
  }

  const isFormValid =
    isFirstName &&
    isEmail &&
    isEmailValid &&
    isPassword &&
    isConfirmPassword &&
    isPasswordMatch &&
    isAvatarValid;

  if (isFormValid) {
    const userData = {
      name: firstName.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };
    signUp(SIGN_UP_URL, userData);
  }
});
