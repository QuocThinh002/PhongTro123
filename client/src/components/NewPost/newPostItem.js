import convertPriceUnit from "../../utils/convertPriceUnit";
import timeAgo from "../../utils/timeAgo";
import { levelStar } from "../../utils/constant";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const NewPostItem = (props) => {
    const { newPost } = props;
    const imagesUrl = JSON.parse(newPost?.images?.image);
    const star = parseInt(newPost?.star);


    return (<>
        <Link to={`post/${newPost.id}`}>
            <div className="flex shadow rounded">
                <div className="w-[65px] aspect-square mr-3">
                    <img
                        src={imagesUrl[0] || (window.location.origin + '/assets/image/non_image.png')}
                        alt={newPost.title}
                        className='w-full h-full object-cover rounded'
                    />

                </div>
                <div className="flex-1 ">
                    <span className=" line-clamp-2">
                    {[...Array(star)].map((_, index) => (
                            <span className="inline-block text-yellow-400" key={index}><FaStar  size={14} /></span>
                        ))}
                    <span className={`${levelStar[star].textColor} ${star >= 2 ? 'uppercase ml-1' : 'normal-case'} text-sm font-medium`}>{newPost?.title}</span>

                    </span>
                    <div className="flex justify-between">
                        <span className="text-textColor font-medium text-sm" >{convertPriceUnit(newPost.attributes.price)}/tháng</span>
                        <span className="text-sm mr-1">{timeAgo(newPost.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    </>)
}

export default NewPostItem