function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

const convertPriceUnit = (price) => {
    if (price < 1E6) {
        return formatCurrency(price) + ' đồng';
    } else if (price < 1E9) {
        return formatCurrency((price / 1E6).toFixed(2)) + ' triệu';
    } else {
        return formatCurrency((price / 1E9).toFixed(2)) + ' tỷ';
    }
};

export default convertPriceUnit;
