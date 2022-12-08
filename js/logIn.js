import { LOG_IN_URL } from './settings/api';
import { validEmail, checkLength } from './utils/validation';
import { saveUser, saveToken } from './utils/storage';

const logInForm = document.querySelector('#logInForm');

const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailNotValid = document.querySelector('#emailNotValid');

const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const generalError = document.querySelector('#generalError');

if (logInForm) {
  logInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let isEmail = false;
    if (checkLength(email.value, 0)) {
      emailError.classList.add('hidden');
      isEmail = true;
    } else {
      emailError.classList.remove('hidden');
    }

    let isEmailValid = false;
    if (checkLength(email.value, 0) && validEmail(email.value) === true) {
      emailNotValid.classList.add('hidden');
      isEmailValid = true;
    } else if (
      checkLength(email.value, 0) &&
      validEmail(email.value) === false
    ) {
      emailNotValid.classList.remove('hidden');
    }

    let isPassword = false;
    if (checkLength(password.value, 8)) {
      passwordError.classList.add('hidden');
      isPassword = true;
    } else {
      passwordError.classList.remove('hidden');
    }

    const isFormValid = isEmail && isEmailValid && isPassword;
    if (isFormValid) {
      const userData = {
        email: email.value,
        password: password.value,
      };

      const LOGIN_USER_URL_ENDPOINT = `${LOG_IN_URL}`;

      (async function logInUser() {
        const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          saveToken(data.accessToken);

          const userToSave = {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            credits: data.credits,
          };

          saveUser(userToSave);
          location.href = './homepage.html';
        } else {
          const err = await response.json();
          const message = `${err.errors[0].message}`;
          throw new Error(message);
        }
      })().catch((err) => {
        generalError.innerHTML = `${err}`;
      });
    } else {
      console.log('This did absoloutely not work');
    }
  });
}
