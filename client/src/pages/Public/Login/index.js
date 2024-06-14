import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';

const Login = () => {
    return (<>
        <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md'>
            <h3 className='font-semibold text-2xl mb-2'>Đăng nhập</h3>
            <div className='w-full flex flex-col gap-4 mb-5'>
                <InputForm type='text' label='SỐ ĐIỆN THOẠI' id='phone' />
                <InputForm type='password' label='MẬT KHẨU' id='password' />
            </div>
            <Button dataButton={{ text: 'Đăng nhập', bgColor: 'bg-secondary1', textColor: 'text-white', width: 'w-full' }} />
            <div className='mt-3 flex items-center justify-between'>
                <span className='text-[blue] hover:text-[orange] cursor-pointer'>Bạn quên mật khẩu?</span>
                <span className='text-[blue] hover:text-[orange] cursor-pointer'>Tạo tài khoản mới</span>
            </div>
        </div>
    </>)
}

export default Login;