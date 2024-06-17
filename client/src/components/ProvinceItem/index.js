
import { Link } from 'react-router-dom'

const ProvinceItem = (props) => {
    const { name, image } = props;
    console.log(image)
    return (<>
        <Link to='/thay-link-nhe'>
            <div className="shadow bg-white rounded-lg overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-[220px] h-[110px] object-cover"
                />
                <h2 className="text-sm font-bold text-blue-700 text-center py-2">{name}</h2>
            </div>
        </Link>
    </>)
}
export default ProvinceItem;