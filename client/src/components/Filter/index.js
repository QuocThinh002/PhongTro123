import Button from "../Button";
import FilterItem from "./FilterItem";

import { FaHotel, FaAngleRight, FaLocationDot, FaFilterCircleDollar, FaCrop } from 'react-icons/fa6'
import {FaSearch} from 'react-icons/fa'

const Filter = () => {
    return (<>
        <div className="w-full flex gap-2 p-2 bg-white rounded-lg  shadow">
            <FilterItem text='Phòng trọ, nhà trọ' iconLeft={<FaHotel/>} iconRight={<FaAngleRight/>} />
            <FilterItem text='Toàn quốc'  iconLeft={<FaLocationDot/>} iconRight={<FaAngleRight/>} />
            <FilterItem text='Chọn giá'  iconLeft={<FaFilterCircleDollar/>} iconRight={<FaAngleRight/>}/>
            <FilterItem text='Chọn diện tích'  iconLeft={<FaCrop/>} iconRight={<FaAngleRight/>}/>
            <Button text='Tìm kiếm' iconLeft={<FaSearch/>} bgColor='bg-secondary1' textColor='text-white' width='w-1/5' />
        </div>
    </>)
}
export default Filter;