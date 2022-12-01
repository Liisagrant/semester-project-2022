const validEmail = (email) => {
    const regEx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return !!email.match(regEx);
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
    }
    return true;
};

const checkLength = (value, len) => {
    if (value.trim().length >= len) {
        return true;
    }
    return false;
};

const validImgUrl = (url) => {
    const urlPattern =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (typeof url === 'object') {
        return urlPattern.test(url.value);
    }
    return urlPattern.test(url);
};

const validDate = (date, value) => {
    const date_regex =
        /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date.value)) {
        return false;
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

export { validEmail, validatePassword, checkLength, validImgUrl, validDate };
