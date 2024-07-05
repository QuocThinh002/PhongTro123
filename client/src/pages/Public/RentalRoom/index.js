import Filter from "../../../components/Filter";
import CategoryHeader from "../../../components/CategoryHeader";
import Province from "../../../components/Province";
import PostList from "../../../components/PostList";
import ASide from "../../../components/ASide";
import WhyUs from "../../../components/WhyUs";

const RentalRoom = () => {
    return (<>
        <Filter />
        <CategoryHeader />
        <Province />
        <div className=" w-full flex items-start gap-4 mb-10">
            <div className="w-[70%]">
                <PostList />
            </div>
            <div className="w-[30%]">
                <ASide />
            </div>
        </div>
        <WhyUs />
    </>)
}

export default RentalRoom;