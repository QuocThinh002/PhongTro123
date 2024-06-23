import Button from '../Button'
import { FaPhone} from 'react-icons/fa6'

const MetaRow = (props) => {
    const { user, star } = props;
    
    return (<>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div className='h-10 w-10 rounded-full overflow-hidden'>
                    <img
                        src={user?.avatar || (window.location.origin + '/assets/image/non_avatar.png')}
                        alt={user?.fullName}
                        className='object-cover'
                    />
                </div>  
                <span className='ml-1 font-medium text-lg'>{user?.fullName}</span>
            </div>
            {(star || null) && <div className='flex items-center gap-4'>
                <Button bgColor='bg-secondary1 text-white' text={user?.phone} iconLeft={<FaPhone />} />
                <img
                    src={window.location.origin + '/assets/image/icon_zalo.png'}
                    alt='zalo'
                    className='w-10 h-10 cursor-pointer rounded-lg'
                />
            </div>}
        </div>
    </>)
}

export default MetaRow;