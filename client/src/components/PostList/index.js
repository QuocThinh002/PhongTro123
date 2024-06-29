import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'

import Button from "../Button";
import PostItem from "./PostItem";
import Pagination from "../Pagination";

import { getPosts } from "../../store/actions/post";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
    const { count, posts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = +searchParams.get('page') || 1
    const limit = +searchParams.get('limit') || 4;
    const numPages = parseInt(count / limit + 0.5);
    const priceMin = +searchParams.get('priceMin');
    const priceMax = +searchParams.get('priceMax');
    const acreageMin = +searchParams.get('acreageMin');
    const acreageMax = +searchParams.get('acreageMax');

    useEffect(() => {
        dispatch(getPosts({ currentPage, limit, priceMin, priceMax, acreageMin, acreageMax }))
    }, [currentPage, limit, priceMin, priceMax, acreageMin, acreageMax])

    const onPageChange = (page) => {
        const currentParams = Object.fromEntries([...searchParams]);
        currentParams.page = page;
        setSearchParams(currentParams)
    }

    return (<>
        <div className="w-full">
            <div className="w-full bg-white border-2 rounded-lg overflow-hidden">
                <div className="px-4 pt-2">
                    <h3 className="text-xl font-medium mb-2">Tổng {posts.length || 0} kết quả</h3>
                    <div className="flex gap-3 mb-2 text-sm  border-b-black">
                        <Button text='Mặc định' bgColor='bg-primary' />
                        <Button text='Mới nhất' bgColor='bg-primary' />
                    </div>
                </div>
                <div className="">
                    {posts && posts.map((post) => (
                        <PostItem key={post?.id} post={post} />
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <Pagination
                    numPages={numPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    </>)
}
export default PostList;