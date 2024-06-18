import Filter from "../../../components/Filter";
import CategoryHeader from "../../../components/CategoryHeader";
import Province from "../../../components/Province";
import PostList from "../../../components/PostList";
import { useEffect, useState } from "react";
import {apiGetPosts} from '../../../services/post'


const HomePage = () => {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await apiGetPosts();
            const posts = response?.data?.posts || [];
            setPosts(posts)
        }
        fetchPosts()
    }, [])

    return (<>
        <Filter />
        <CategoryHeader  />
        <Province />
        <div className=" w-full flex gap-4">
            <PostList posts={posts} />
            <div className="border border-violet-600 aside w-[30%]">
                side right  
            </div>
        </div>
    </>)
}

export default HomePage;