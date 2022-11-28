const validEmail = (email) => {
    const regEx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return email.match(regEx) ? true : false;
};

const validatePassword = (password, confirmPassword) => {
    console.log(password);
    console.log(confirmPassword);
    if (!password) {
        return false;
    }
    if (!confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
};

const checkLength = (value, len) => {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
};

const validImgUrl = (url) => {
    const urlPattern =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (typeof url === 'object') {
        return urlPattern.test(url.value);
    } else {
        return urlPattern.test(url);
    }
};

// function isValidAvatar(url) {
//     async function checkAvatar(url) {
//         try {
//             const response = await fetch(url, { method: 'HEad' });
//             return response.ok;
//         } catch (error) {
//             console.log('error');
//         }
//         return checkAvatar(url);
//     }
// }

export { validEmail, validatePassword, checkLength, validImgUrl };
