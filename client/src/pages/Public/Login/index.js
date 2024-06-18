import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import * as actions from '../../../store/actions'

import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const flag = (location.state?.flag != null) ? location.state?.flag : true;
    const [isLogin, setIsLogin] = useState(flag);
    const [payload, setPayload] = useState({ phone: '', password: '', fullName: '' })
    const [invalidFields, setInvalidFields] = useState([])


    useEffect(() => {
        setIsLogin(flag);
    }, [flag])

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn])

    const handleSubmit = async () => {
        let newPayload = isLogin ? {phone: payload.phone, password: payload.password }: payload;
        const errors = validate(newPayload); // Validate before proceeding
        
        if (errors === 0) {
            if (isLogin) {
                dispatch(actions.login(newPayload));
            } else {
                dispatch(actions.register(newPayload));
            }
        }
    };

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: "* Cậu gì đó ơi, trường này không được bỏ trống nha!"
                }])
                ++invalids;
            }
        })
        
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: "Mật khẩu phải có ít nhất 6 ký tự!"
                        }])
                        ++invalids;
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: "Số điện thoại không hợp lệ!"
                        }])
                        ++invalids;
                    }
                    break;
            
                default:
                    break;
            }
        })
        return invalids;
    }

    return (<>
        <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md'>
            <h3 className='font-bold text-2xl mb-2'>{isLogin ? 'Đăng nhập':'Tạo tài khoản mới' }</h3>
            <div className='w-full flex flex-col gap-4 mb-5'>
                {!isLogin && <InputForm type='text' label='HỌ TÊN' id='fullName' value={payload.fullName} setValue={setPayload} typeSetValue='fullName' invalidFields={invalidFields}  setInvalidFields={setInvalidFields}/>}
                <InputForm type='text' label='SỐ ĐIỆN THOẠI' id='phone' value={payload.phone} setValue={setPayload} typeSetValue='phone' invalidFields={invalidFields}  setInvalidFields={setInvalidFields}/>
                <InputForm type='password' label='MẬT KHẨU' id='password' value={payload.password} setValue={setPayload} typeSetValue='password' invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
            </div>
            <Button onClick={handleSubmit} text= {isLogin ?  'Đăng nhập':'Tạo tài khoản'} bgColor= 'bg-secondary1' textColor= 'text-white' width= 'w-full' hoverColor= 'hover:bg-blue-700' />
            <div className='mt-3 flex items-center justify-between'>
                {isLogin ? <>
                    <span className='text-[blue] hover:text-orange-500 cursor-pointer'>Bạn quên mật khẩu?</span>
                    <span onClick={() => {setIsLogin(false); setPayload({ phone: '', password: '', fullName: '' })}} className='text-[blue] hover:text-orange-500 cursor-pointer'>Tạo tài khoản mới</span>
                </> : <>
                    <span>Bạn đã có tài khoản? <span onClick={() => {setIsLogin(true); setPayload({ phone: '', password: '', fullName: '' })}} className='text-[blue] hover:text-orange-500 cursor-pointer'>Đăng nhập ngay!</span></span>
                </>}
            </div>
        </div>
    </>)
}

export default Login;