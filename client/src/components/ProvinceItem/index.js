
const ProvinceItem = (props) => {
    const { name, image } = props;
    console.log(image)
    return (<>
        <div>
            <img src={image} alt={name} />
        </div>
        <div>
            <h2>{name}</h2>
        </div>
    </>)
}
export default ProvinceItem;