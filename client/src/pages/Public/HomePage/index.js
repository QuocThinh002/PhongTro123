import Filter from "../../../components/Filter";
import CategoryHeader from "../../../components/CategoryHeader";
import Province from "../../../components/Province";
import PostList from "../../../components/PostList";
import ASide from "../../../components/ASide";


const HomePage = () => {

    return (<>
        <Filter />
        <CategoryHeader />
        <Province />
        <div className=" w-full flex items-start gap-4">
            <div className="w-[70%]">
                <PostList />
            </div>
            <div className="w-[30%]">
                <ASide />
            </div>
        </div>
    </>)
}

export default HomePage;