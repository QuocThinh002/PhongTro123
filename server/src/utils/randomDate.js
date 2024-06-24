// Hàm trừ ngày từ một đối tượng Date
function subtractDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

// Hàm trừ phút từ một đối tượng Date
function subtractMinutes(date, minutes) {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - minutes);
    return result;
}

// Hàm trừ tháng từ một đối tượng Date
function subtractMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() - months);
    return result;
}

// Hàm ngẫu nhiên để chọn số ngày, phút, và tháng cần trừ
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Hàm để trừ ngày, phút, và tháng ngẫu nhiên
function subtractRandomDate(date) {
    const days = getRandomInt(7); // Trừ từ 0 đến 29 ngày
    const minutes = getRandomInt(24 * 60); // Trừ từ 0 đến 59 phút
    // const months = getRandomInt(12); // Trừ từ 0 đến 11 tháng

    let result = subtractDays(date, days);
    result = subtractMinutes(result, minutes);
    // result = subtractMonths(result, months);

    return {
        originalDate: date,
        newDate: result,
        subtractedDays: days,
        subtractedMinutes: minutes,
        // subtractedMonths: months
    };
}

export default subtractRandomDate;