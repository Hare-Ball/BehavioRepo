const create = () => {

    let arr_password = [];
    const li_password_Length = 8;
    const sl_lowercase = "abcdefghijklmnopqrstuvwxyz";
    const sl_uppercase = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const sl_numeric = "0123456789";
    const sl_special = "!”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~";

    const sl_anycharacter = sl_lowercase + sl_uppercase + sl_numeric + sl_special;

    // cycles n times to find each time a new character for the new password
    for (let i = 0; i < li_password_Length; i++) {
        arr_password.push(sl_anycharacter.charAt(Math.floor(Math.random() * sl_anycharacter.length)));
    }
    // writes the content of the array into the password text area
    return arr_password.join('');

}

module.exports.create = create;