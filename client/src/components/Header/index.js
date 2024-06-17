import { useCallback } from "react";
import Button from "../Button";
import { FaArrowRightToBracket, FaUserPlus, FaHeart, FaPlus, FaUser, FaRightFromBracket } from 'react-icons/fa6';
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../routes/path";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Header = () => {

    const dataDisplay = {
        logo: 'https://phongtro123.com/images/logo-phongtro.svg'
    }
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, [navigate])



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
                {isLoggedIn && <Button text='Yêu thích' iconLeft={< FaHeart />} hoverColor='hover:bg-blue-100' />}
                <Button text='Yêu thích' iconLeft={< FaHeart />} hoverColor='hover:bg-blue-100' />
                {!isLoggedIn && <>
                    <Button onClick={() => goLogin(true)} text='Đăng nhập' iconLeft={<FaArrowRightToBracket />} hoverColor='hover:bg-blue-100' />
                    <Button onClick={() => goLogin(false)} text='Đăng ký' iconLeft={<FaUserPlus />} hoverColor='hover:bg-blue-100' />
                </>}
                {isLoggedIn && <>
                    <Button onClick={() => dispath(actions.logout())} text='Đăng xuất' iconLeft={<FaRightFromBracket />}  hoverColor='hover:bg-blue-100' />
                    <Button text='Quản lý tài khoản' iconLeft={<FaUser />}  hoverColor='hover:bg-blue-100' />
                </>}
                <Button text='Đăng ký miễn phí' iconRight={<FaPlus />} bgColor='bg-secondary2' textColor='text-white' hoverColor='hover:bg-red-600' />
            </div>
        </div>
    </>)
}

export default Header;