import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import * as actions from '../../../store/actions'

import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const flag = (location.state?.flag != null) ? location.state?.flag : true;
    const [isLogin, setIsLogin] = useState(flag);
    const [payload, setPayload] = useState({phone: '', password: '', fullName: ''})

    useEffect(() => {
        setIsLogin(flag);
    }, [flag])

    const handleSubmit = async () => {
        dispatch(actions.register(payload))
    }

    return (<>
        <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md'>
            <h3 className='font-bold text-2xl mb-2'>{isLogin ? 'Đăng nhập':'Tạo tài khoản mới' }</h3>
            <div className='w-full flex flex-col gap-4 mb-5'>
                {!isLogin && <InputForm type='text' label='HỌ TÊN' id='fullname' value={payload.fullName} setValue={setPayload} typeSetValue='fullName' />}
                <InputForm type='text' label='SỐ ĐIỆN THOẠI' id='phone' value={payload.phone} setValue={setPayload} typeSetValue='phone' />
                <InputForm type='password' label='MẬT KHẨU' id='password' value={payload.password} setValue={setPayload} typeSetValue='password' />
            </div>
            <Button dataButton={{ onClick: handleSubmit, text:  (isLogin ?  'Đăng nhập':'Tạo tài khoản'), bgColor: 'bg-secondary1', textColor: 'text-white', width: 'w-full', hoverColor: 'hover:bg-blue-700' }} />
            <div className='mt-3 flex items-center justify-between'>
                {isLogin ? <>
                    <span className='text-[blue] hover:text-[orange] cursor-pointer'>Bạn quên mật khẩu?</span>
                    <span onClick={() => setIsLogin(false)} className='text-[blue] hover:text-[orange] cursor-pointer'>Tạo tài khoản mới</span>
                </> : <>
                    <span>Bạn đã có tài khoản? <span onClick={() => setIsLogin(true)} className='text-[blue] hover:text-[orange] cursor-pointer'>Đăng nhập ngay!</span></span>
                </>}
            </div>
        </div>
    </>)
}

export default Login;