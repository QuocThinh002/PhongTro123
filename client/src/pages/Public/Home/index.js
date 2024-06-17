import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";

const Home = () => {
    return (<>
        <div className="m-auto h-full">
            
            <Header />
            <Navigation />
            <div className="w-1100 mx-auto flex flex-col items-center justify-start">
                <Outlet />
            </div>
        </div>
    </>)
}

export default Home;