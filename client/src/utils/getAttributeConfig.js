
export const address = (address) => {
    address = address.split(', ');
    address = address.slice(address.length - 2, address.length).join(', ')
    // console.log(address)
    return address
}

export const description = (description) => {
    description = description.replace(/>|<|\*/g, '')
    // console.log('first: ', description)
    description = JSON.parse(description)
    // console.log('second', description)
    return description;
}