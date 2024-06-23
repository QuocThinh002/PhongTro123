import { FaStar, FaHeart } from 'react-icons/fa6';
import * as getAttributeConfig from '../../utils/getAttributeConfig'
import MetaRow from './MetaRow';
import {Link} from 'react-router-dom'

const PostItem = (props) => {
    const { post } = props;
    const imagesUrl = JSON.parse(post?.images?.image);
    const star = parseInt(post?.star);

    const level = [
        {
            textColor: 'text-one',
            borderColor: 'border-one',
        },
        {
            textColor: 'text-one',
            borderColor: 'border-one',
        },
        {
            textColor: 'text-two',
            borderColor: 'border-two'
        },
        {
            textColor: 'text-three',
            borderColor: 'border-three'
        },
        {
            textColor: 'text-four',
            borderColor: 'border-four'
        },
        {
            textColor: 'text-five',
            borderColor: 'border-five'
        }
    ]



    return (
        <div className={` ${star === 5 ? 'bg-outstanding' : 'bg-white'}  border-t-[1px]  ${level[star].borderColor} bg-orange-50 flex items-center  gap-4 p-3`}>
            <div className={`${star === 5 ? 'w-2/5' : 'w-[28%]'} aspect-[4/3] relative `}>
                <Link
                    to={`post/${post.id}`}
                >
                    <img
                        src={imagesUrl[0] || (window.location.origin + '/assets/image/non_image.png')}
                        alt={post?.title}
                        className="w-full h-full object-cover rounded"
                    />
                    {(imagesUrl || []).length > 0 && <span className='absolute bottom-1 left-2 px-1.5 bg-black text-white rounded text-sm'>{imagesUrl.length} ảnh</span>}
                </Link>
                <span className='absolute bottom-1 right-2 text-white cursor-pointer'><FaHeart size={20} /></span>
            </div>
            <div className='flex-1'>
                <div className=' line-clamp-2'>
                    <span>
                        {[...Array(star)].map((_, index) => (
                            <span className="inline-block text-yellow-400" key={index}><FaStar size={18} /></span>
                        ))}
                        <Link to={`post/${post.id}`}>
                        <span className={`${level[star].textColor} ${star >= 2 ? 'uppercase' : 'normal-case'} ${star ? 'ml-2 text-lg font-bold' : 'font-medium'} `}>{post?.title}</span>
                        </Link>
                    </span>

                </div>
                <div className="mt-1">
                    <span className='text-textColor text-lg font-bold'>{post?.attributes?.price}</span>
                    <span className='ml-3'>{post?.attributes?.acreage}</span>
                    <span className='float-right text-gray-500'>{post?.attributes?.published}</span>
                </div>
                <div className='mb-1'>
                    {getAttributeConfig.address(post?.address)}
                </div>
                <div className={`${star === 5 ? 'line-clamp-3' : 'line-clamp-2'} text-gray-500 mb-4`}>{getAttributeConfig.description(post?.description)}</div>
                <div className='px-4'>
                    <MetaRow user={post?.user} star={star} />
                </div>
            </div>
        </div>
    );
};

export default PostItem;
