import Button from '../Button'
import { FaPhone, FaRegUser } from 'react-icons/fa6'
import {apiGetUser} from '../../services/user'
import { useEffect, useState } from 'react';

const MetaRow = (props) => {
    const { userId } = props;
    const [user, setUser] = useState({});

    const handleGetUser = async (userId) => {
        const response = await apiGetUser(userId);
        return response?.data?.user
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await handleGetUser(userId);
            setUser(response)
        }
        fetchUser()
    }, [])
    
    return (<>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div className='h-10 w-10 rounded-full'>
                    {user.avatar && <img
                        src={user.avatar}
                        alt='image'
                        className=''
                    />}
                    {!user.avatar && <FaRegUser size={40} />}
                </div>  
                <span className='ml-1 font-medium text-lg'>{user.fullName}</span>
            </div>
            <div className='flex items-center gap-4'>
                <Button bgColor='bg-secondary1 text-white' text={user.phone} iconLeft={<FaPhone />} />
                <img
                    src={window.location.origin + '/assets/image/icon_zalo.png'}
                    className='w-10 h-10 cursor-pointer rounded-lg'
                />
            </div>
        </div>
    </>)
}

export default MetaRow;