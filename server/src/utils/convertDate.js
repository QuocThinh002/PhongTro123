const convertDate = (dateString) => {
    dateString = dateString.split(', ')[1]
    let [time, date] = dateString.split(" ");
    let [hours, minutes] = time.split(":");
    let [day, month, year] = date.split("/");
    let dateObject = new Date(year, month - 1, day, hours, minutes);
    // console.log(dateString)
    // console.log(dateObject)
    return dateObject;
}

export default convertDate;