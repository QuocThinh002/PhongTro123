import { useCallback } from "react";
import Button from "../Button";
import { FaArrowRightToBracket, FaUserPlus, FaHeart, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../routes/path";


const Header = () => {

    const dataDisplay = {
        logo: 'https://phongtro123.com/images/logo-phongtro.svg'
    }
    const navigate = useNavigate();
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, [navigate])

    const buttons = [
        { text: 'Yêu thích', iconLeft: < FaHeart />, hoverColor: 'hover:bg-blue-100' },
        { onClick: () => goLogin(true), text: 'Đăng nhập', iconLeft: <FaUserPlus />, hoverColor: 'hover:bg-blue-100' },
        { onClick: () => goLogin(false), text: 'Đăng ký', iconLeft: <FaArrowRightToBracket />, hoverColor: 'hover:bg-blue-100' },
        { text: 'Đăng ký miễn phí', iconRight: <FaPlus />, bgColor: 'bg-secondary2', textColor: 'text-white', hoverColor: 'hover:bg-red-600' }
    ]


    return (<>
        <div className="w-1100 flex items-center justify-between mx-auto">
            <Link to={'/'}>
                <div className="logo w-[240px] h-[70px]">
                    <img
                        src={dataDisplay.logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>
            <div className="flex gap-2">
                {buttons.map((button, index) => (<Button dataButton={button} key={index} />))}
            </div>
        </div>
    </>)
}

export default Header;