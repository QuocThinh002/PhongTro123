import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const Pagination = (props) => {
    const { numPages, currentPage, onPageChange } = props; 
    const sizeLeft = 4; // => size = 2 * sizeLeft + 1

    const getPageRange = (currentPage) => {
        const range = [];
        if (currentPage <= sizeLeft) currentPage = sizeLeft + 1;
        if (currentPage > numPages - sizeLeft) currentPage = numPages - sizeLeft;

        const start = Math.max(1, currentPage - sizeLeft);
        const end = Math.min(numPages, currentPage + sizeLeft);
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="flex items-center justify-center"> 
            {currentPage > (sizeLeft+1) && <span
                onClick={() => onPageChange(1)}
                className='px-4 h-10 mr-4 rounded-none shadow  cursor-pointer bg-white  inline-flex items-center justify-center'
            ><FaAnglesLeft /></span>}
            
            {getPageRange(currentPage).map(page => (
                <span
                    key={page} 
                    onClick={() => onPageChange(page)}
                    className={`
                        px-4 h-10 leading-10 rounded-none shadow font-medium cursor-pointer
                        ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white '}
                    `}
                >{page}</span>
            ))}
            
            {currentPage < (numPages - sizeLeft) && <span
                onClick={() => onPageChange(numPages)} 
                className=' px-4 h-10 ml-4 rounded-none shadow  cursor-pointer bg-white inline-flex items-center justify-center'
            ><FaAnglesRight /></span>}
            
        </div>
    );
};

export default Pagination;
