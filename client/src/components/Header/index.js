import { useCallback } from "react";
import Button from "../Button";
import { FaFileCirclePlus, FaFileLines, FaArrowRightToBracket, FaUserPlus, FaHeart, FaPlus, FaUserLarge, FaRightFromBracket, FaList } from 'react-icons/fa6';
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
    const user = undefined
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
            <div className="flex items-center gap-2">
                {isLoggedIn && <div>
                    <div className='flex items-center flex-1'>
                        <div className='w-8 h-8 rounded-full overflow-hidden'>
                            <img
                                src={user?.avatar || (window.location.origin + '/assets/image/non_avatar.png')}
                                alt={user?.fullName}
                                className='object-cover'
                            />
                        </div>
                        <span className='ml-1 font-medium'>{user?.fullName || 'Full Văn Name'}</span>
                    </div>
                </div>}
                <Button text='Yêu thích' iconLeft={< FaHeart color='red' size={20} />} hoverColor='hover:bg-gray-200' />
                {!isLoggedIn && <>
                    <Button onClick={() => goLogin(true)} text='Đăng nhập' iconLeft={<FaArrowRightToBracket size={20} />} hoverColor='hover:bg-gray-200' />
                    <Button onClick={() => goLogin(false)} text='Đăng ký' iconLeft={<FaUserPlus size={20} />} hoverColor='hover:bg-gray-200' />
                </>}
                {isLoggedIn && <>
                    <div className="relative  group  ">
                        <Button text='Quản lý tài khoản' iconLeft={<FaList  size={20} />} hoverColor='hover:bg-gray-200' />
                        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 z-50 bg-white py-2 px-3 shadow rounded  whitespace-nowrap">
                                <Button onClick={() => dispath(actions.logout())} text='Đăng tin cho thuê' iconLeft={<FaFileCirclePlus color='blue' size={20} /> } addClass='hover:text-secondary2'/>
                                <Button onClick={() => dispath(actions.logout())} text='Quản lý tin đăng' iconLeft={<FaFileLines color='orange' size={20} /> } addClass='hover:text-secondary2'/>
                                <Button onClick={() => dispath(actions.logout())} text='Tin đã lưu' iconLeft={<FaHeart color='red' size={20} /> } addClass='hover:text-secondary2'/>
                                <Button onClick={() => dispath(actions.logout())} text='Thông tin cá nhân' iconLeft={<FaUserLarge color='black' size={20} /> } addClass='hover:text-secondary2'/>
                                <Button onClick={() => dispath(actions.logout())} text='Đăng xuất' iconLeft={<FaRightFromBracket size={20} /> } addClass='hover:text-secondary2'/>
                        </div>
                    </div>



                </>}
                <Button text='Đăng ký miễn phí' iconRight={<FaPlus />} bgColor='bg-secondary2' textColor='text-white' hoverColor='hover:bg-red-600' />
            </div>
        </div>
    </>)
}

export default Header