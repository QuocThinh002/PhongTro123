import { useCallback } from "react";
import Button from "../Button";
import { FaArrowRightToBracket, FaUserPlus, FaHeart, FaPlus } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { path } from "../../routes/path";


const Header = () => {

    const dataDisplay = {
        logo: 'https://phongtro123.com/images/logo-phongtro.svg'
    }
    const navigate = useNavigate();
    const goLogin = useCallback(() => {
        navigate(path.LOGIN);
    }, [])

    const buttons = [
        { text: 'Yêu thích', iconLeft: < FaHeart /> },
        { onClick: goLogin, text: 'Đăng nhập', iconLeft: <FaUserPlus /> },
        { text: 'Đăng ký', iconLeft: <FaArrowRightToBracket /> },
        { text: 'Đăng ký miễn phí', iconRight: <FaPlus />, bgColor: 'bg-secondary2', textColor: 'text-white' }
    ]


    return (<>
        <div className="w-1100 flex items-center justify-between mx-auto">
            <div className="logo w-[240px] h-[70px]">
                <img
                    src={dataDisplay.logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex gap-2">
                {buttons.map((button, index) => (<Button dataButton={button} key={index} />))}
            </div>
        </div>
    </>)
}

export default Header;