const convertPrice = (priceString) => {
    let [price, unit] = priceString.split(' ')
    price = parseFloat(price)
        
    price *= unit === 'đồng/tháng'? 1E3:1E6
    return parseInt(price)
}

export default convertPrice;