import Button from "../Button";
import FilterItem from "./FilterItem";

import { FaHotel, FaAngleRight, FaLocationDot, FaFilterCircleDollar, FaCrop } from 'react-icons/fa6'
import {FaSearch} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPriceRanges } from "../../store/actions/priceRange";
import { getAcreageRanges } from "../../store/actions/acreageRange";

const Filter = () => {
    const { priceRanges } = useSelector(state => state.priceRange);
    const { acreageRanges } = useSelector(state => state.acreageRange);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPriceRanges())
        dispatch(getAcreageRanges())
    }, [])

    return (<>
        <div className="w-full flex gap-2 p-2 bg-white rounded-lg  shadow">
            <FilterItem text='Phòng trọ, nhà trọ' iconLeft={<FaHotel/>} iconRight={<FaAngleRight/>} />
            <FilterItem text='Toàn quốc'  iconLeft={<FaLocationDot/>} iconRight={<FaAngleRight/>} />
            <FilterItem text='Chọn giá' iconLeft={<FaFilterCircleDollar />} iconRight={<FaAngleRight />} data={priceRanges} />
            <FilterItem text='Chọn diện tích' iconLeft={<FaCrop />} iconRight={<FaAngleRight />} data={acreageRanges} />
            <Button text='Tìm kiếm' iconLeft={<FaSearch/>} bgColor='bg-secondary1' textColor='text-white' width='w-1/5' />
        </div>
    </>)
}
export default Filter;