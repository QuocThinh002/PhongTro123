
const generateCode = (len) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digit = "0123456789";
    let result = "";
    for (let i = 0; i < len - 1; ++i) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    result += digit.charAt(Math.floor(Math.random() * digit.length));
    return result;
}

export default generateCode;