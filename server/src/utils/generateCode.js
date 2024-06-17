const crypto = require('crypto');

const codeCache = new Map(); // Bộ lưu trữ kết quả

function generateCode(first, len) {
    if (codeCache.has(first)) {
        return codeCache.get(first); // Trả về kết quả đã lưu trong cache
    }

    const hash = crypto.createHash('md5');
    hash.update(first);
    const second = hash.digest('hex').slice(0, len).toUpperCase();

    codeCache.set(first, second); // Lưu kết quả vào cache
    return second;
}

export default generateCode;