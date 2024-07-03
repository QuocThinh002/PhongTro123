import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import AnnounceClone from "../../../components/AnnounceClone";

const Home = () => {
    return (<>
        <div className="m-auto">
            <AnnounceClone />
            <Header />
            <div className='sticky top-[-1px] z-40'>
                <Navigation />
            </div>
            <div className="w-1100 mx-auto flex flex-col items-center justify-start">
                <Outlet />
            </div>
            <div className="mt-6">
                <Footer />
            </div>
        </div>
    </>)
}

export default Home;