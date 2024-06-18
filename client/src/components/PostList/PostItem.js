import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { apiGetImage } from '../../services/image';
import { apiGetAttributes } from '../../services/attribute';
import * as getAttributeConfig from '../../utils/getAttributeConfig'
import MetaRow from './MetaRow';

const PostItem = (props) => {
    const { post } = props;
    const [imageUrl, setImageUrl] = useState(['']);
    const [attributes, setAttributes] = useState({})
    const star = (parseInt(post.star) || 1);

    const level = [
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

    const handleGetImage = async (imgId) => {
        try {
            const response = await apiGetImage(imgId);
            const imageString = response?.data?.data?.image || '[]';
            const images = JSON.parse(imageString)
            // console.log(images)
            return images;
        } catch (error) {
            console.error('Error fetching image:', error);
            return [''];
        }
    };

    const handleGetAttributes = async (attributesId) => {
        try {
            const response = await apiGetAttributes(attributesId)
            const data = response?.data?.data || {}
            return data;
        } catch (error) {
            console.error('Error fetching attributes:', error);
            return {};
        }
    }

    useEffect(() => {
        const fetchImage = async () => {
            const image = await handleGetImage(post.imagesId);
            // console.log(image)
            setImageUrl(image);
        };
        fetchImage();
    }, []);

    useEffect(() => {
        const fetchAttributes = async () => {
            const data = await handleGetAttributes(post.attributesId);
            // console.log(data)
            setAttributes(data)
        }
        fetchAttributes()
    }, [])


    return (
        <div className={` ${star === 5 ? 'bg-outstanding' : 'bg-white'}  border-t-[1px]  ${level[star - 1].borderColor} bg-orange-50 flex gap-4 p-3`}>
            <div className="w-2/5 h-[240px] relative">
                <img
                    src={imageUrl[0]}
                    alt={post.title}
                    className="w-full h-full object-cover rounded"
                />
                {imageUrl.length > 0 && <span className='absolute bottom-1 left-2 px-1.5 bg-black text-white rounded text-sm'>{imageUrl.length} ảnh</span>}
                <span className='absolute bottom-1 right-2 text-white'><FaHeart size={20} /></span>
            </div>
            <div className=' w-3/5'>
                <div className=' line-clamp-2'>
                    {star && <span className=" mr-2">
                        {[...Array(star)].map((_, index) => (
                            <span className="inline-block text-yellow-400" key={index}><FaStar size={18} /></span>
                        ))}
                        <span className={`${level[star - 1].textColor} ${star > 1 ? 'uppercase' : 'normal-case'} ml-2 text-lg font-bold`}>{post.title}</span>
                    </span>}

                </div>
                <div className="mt-1">
                    <span className='text-textColor text-lg font-bold'>{attributes.price}</span>
                    <span className='ml-3'>{attributes.acreage}</span>
                    <span className='float-right text-gray-500'>{attributes.published}</span>
                </div>
                <div className='mb-1'>
                    {getAttributeConfig.address(post.address)}
                </div>
                <div className="line-clamp-3 text-gray-500 text-sm mb-4">{getAttributeConfig.description(post.description)}</div>
                <div className='px-4'>
                <MetaRow userId={post.userId} />
                </div>
            </div>
        </div>
    );
};

export default PostItem;
