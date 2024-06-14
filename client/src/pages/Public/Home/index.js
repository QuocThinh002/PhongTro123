import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";

const Home = () => {
    return (<>
        <div className="m-auto h-full">
            
                <Header />
            <Navigation />
            <div className="w-full flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    </>)
}

export default Home;