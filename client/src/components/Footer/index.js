import {FaTriangleExclamation} from 'react-icons/fa6'


const Footer = () => {
    
    return (<>
        <div className="p-2 border-t font-medium flex items-center justify-center gap-2 bg-white">
            <div className='text-red-600 flex gap-1'><FaTriangleExclamation color="red" size={24} /> Lưu ý: </div>
            <p>Đây là project học tập clone website <a href="https://phongtro123.com/" target="_blank"  rel="noopener noreferrer" className="text-blue-600">phongtro123.com</a>
            , không phải website thật.</p>
        </div>
    </>)
}

export default Footer;