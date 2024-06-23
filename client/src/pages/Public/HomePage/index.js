import Filter from "../../../components/Filter";
import CategoryHeader from "../../../components/CategoryHeader";
import Province from "../../../components/Province";
import PostList from "../../../components/PostList";


const HomePage = () => {

    return (<>
        <Filter />
        <CategoryHeader  />
        <Province />
        <div className=" w-full flex items-start gap-4">
            <PostList />
            <div className="border border-violet-600 aside w-[30%]">
                side right  
            </div>
        </div>
    </>)
}

export default HomePage;