import { FaAngleRight, FaXmark } from 'react-icons/fa6'

const SubLink = (props) => {
    const { data, title, onRangeChange, min, max } = props;

    return (<>
        <div className='px-5 pt-3 pb-4 bg-white border-2 rounded-lg overflow-hidden'>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div className="flex flex-wrap w-full ">
                {data && (data.map(item => (
                    <span
                        className={`w-1/2 flex items-center gap-1 cursor-pointer hover:text-hover ${(item.min == min && item.max == max) ? 'bg-secondary1 text-white rounded hover:text-white' : ''}`}
                        key={item.id}
                        onClick={() => onRangeChange(item.min, item.max)}
                    >
                        
                        {(item.min == min && item.max == max) ?  <FaXmark color='white' opacity={0} />:<FaAngleRight color='gray' />} 
                        <span>{item.title}</span> 
                    </span>
                )))}
            </div>
        </div>
    </>)
}

export default SubLink;