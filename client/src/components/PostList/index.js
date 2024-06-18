import Button from "../Button";
import PostItem from "./PostItem";

const PostList = (props) => {
    const { posts } = props;
    return (<>
        <div className="w-full bg-white border-2  rounded-lg">
            <div className="px-4 pt-2">
                <h3 className="text-xl font-medium mb-2">Tổng {'???'} kết quả</h3>
                <div className="flex gap-3 mb-2 text-sm  border-b-black">
                    <Button text='Mặc định' bgColor='bg-primary' />
                    <Button text='Mới nhất' bgColor='bg-primary' />
                </div>
            </div>
            <div className="">
                {posts && posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    </>)
}
export default PostList;