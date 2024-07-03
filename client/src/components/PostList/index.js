import { useEffect, useState} from "react";
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
    const limit = +searchParams.get('limit') || 20;
    const numPages = Math.ceil(count / limit);
    const priceMin = +searchParams.get('priceMin');
    const priceMax = +searchParams.get('priceMax');
    const acreageMin = +searchParams.get('acreageMin');
    const acreageMax = +searchParams.get('acreageMax');
    const orderBy = searchParams.get('orderBy')

    useEffect(() => {
        dispatch(getPosts({ currentPage, limit, priceMin, priceMax, acreageMin, acreageMax, orderBy }))
    }, [currentPage, limit, priceMin, priceMax, acreageMin, acreageMax, orderBy])

    const onPageChange = (page) => {
        const currentParams = Object.fromEntries([...searchParams]);
        currentParams.page = page;
        setSearchParams(currentParams)
    }

    const onOrderByChange = (orderBy) => {
        let currentParams = Object.fromEntries([...searchParams]);
        if (orderBy) currentParams.orderBy = orderBy;
        else currentParams = {}
        setSearchParams(currentParams)
    }

    return (<>
        <div className="w-full">
            <div className="w-full bg-white border-2 rounded-lg overflow-hidden">
                <div className="px-4 pt-2">
                    <h3 className="text-xl font-medium mb-2">Tổng {count || 0} kết quả</h3>
                    <div className="flex gap-3 mb-2 text-sm  border-b-black">
                        <Button
                            onClick={() => onOrderByChange()}
                            text='Mặc định'
                            bgColor={searchParams.get('orderBy') === null ? 'bg-secondary1 text-white' :'bg-primary hover:bg-blue-100'}
                        />
                        <Button
                            onClick={() => onOrderByChange('createdAt-desc')}
                            text='Mới nhất'
                            bgColor={searchParams.get('orderBy') === 'createdAt-desc' ? 'bg-secondary1 text-white' : 'bg-primary hover:bg-blue-100'}
                        />
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