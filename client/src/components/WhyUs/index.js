import {FaItalic, FaStar} from 'react-icons/fa6'
import Button from '../Button';

const WhyUs = () => {

    return (<>
        <div className="w-full text-center bg-white border-2 rounded-lg p-10">
            <h3  className="text-lg font-bold mb-4">Tại sao lại chọn PhongTro123.com?</h3>
            <p className='text-gray-600'>
                Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: cho thuê phòng trọ, nhà trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho thuê mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
            </p>
            <div className='flex items-center justify-evenly mt-4'>
                <div>
                    <div className="text-lg font-bold">116.998+</div>
                    <div>Thành viên</div>
                </div>
                <div>
                    <div className="text-lg font-bold">103.348+</div>
                    <div>Tin đăng</div>
                </div>
                <div>
                    <div className="text-lg font-bold">300.000+</div>
                    <div>Lượt truy cập/tháng</div>
                </div>
                <div>
                    <div className="text-lg font-bold">2.500.000+</div>
                    <div>Lượt xem/tháng</div>
                </div>
            </div>
            <h3 className="text-lg font-bold mt-8">Chi phí thấp, hiệu quả tối đa</h3>
            <div className='flex items-center justify-center text-yellow-300 gap-2 mb-4'>
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
            </div>
            <p  className='text-gray-600'>
            "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."
            </p>
            <h3 className="text-lg font-bold mt-5">Bạn đang có phòng trọ / căn hộ cho thuê?</h3>
            <span>Không phải lo tìm người cho thuê, phòng trống kéo dài</span>
            <div className='flex justify-center my-4' >
            <Button text="Đăng tin ngay" bgColor="bg-secondary2" textColor='text-white' />
            </div>
        </div>
    </>)
}

export default WhyUs;