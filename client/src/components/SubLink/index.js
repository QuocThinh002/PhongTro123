import { FaAngleRight } from 'react-icons/fa6'

const SubLink = (props) => {
    const { priceRanges, title, onPriceRangeChange } = props;

    return (<>
        <div className='px-5 pt-3 pb-4 bg-white border-2 rounded-lg overflow-hidden'>
            <h3 className="text-lg font-medium">{title}</h3>
            <div className="flex flex-wrap w-full">
                {priceRanges && (priceRanges.map(priceRange => (
                    <span
                        className="w-1/2 flex items-center gap-1 cursor-pointer hover:text-secondary1"
                        key={priceRange.id}
                        onClick={() => onPriceRangeChange(priceRange.priceMin, priceRange.priceMax)}
                    >
                        <FaAngleRight />
                        <span>{priceRange.title}</span>
                    </span>
                )))}
            </div>
        </div>
    </>)
}

export default SubLink;