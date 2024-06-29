import { useEffect } from "react";
import SubLink from "./subLink";
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRanges } from '../../store/actions/priceRange'
import { getAcreageRanges } from "../../store/actions/acreageRange";
import { useSearchParams } from "react-router-dom";

const ASide = () => {
    const { priceRanges } = useSelector(state => state.priceRange);
    const { acreageRanges } = useSelector(state => state.acreageRange);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getPriceRanges())
        dispatch(getAcreageRanges())
    }, [])

    const onPriceRangeChange = (priceMin, priceMax) => {
        const currentParams = Object.fromEntries([...searchParams])
        
        if (!priceMin) delete currentParams.priceMin;
        else currentParams.priceMin = priceMin;

        if (!priceMax) delete currentParams.priceMax;
        else currentParams.priceMax = priceMax;

        setSearchParams(currentParams)
    }

    const onAcreageRangeChange = (acreageMin, acreageMax) => {
        const currentParams = Object.fromEntries([...searchParams])
        
        if (!acreageMin) delete currentParams.acreageMin;
        else currentParams.acreageMin = acreageMin;

        if (!acreageMax) delete currentParams.acreageMax;
        else currentParams.acreageMax = acreageMax;

        setSearchParams(currentParams)
    }

    return (<>
        <div className="flex flex-col gap-4">
            <SubLink onRangeChange={onPriceRangeChange} title={'Xem theo giá'} data={priceRanges}  />
            <SubLink onRangeChange={onAcreageRangeChange} title={'Xem theo diện tích'} data={acreageRanges}  />
            <SubLink onRangeChange={onPriceRangeChange} title={'Xem theo giá'} data={priceRanges}  />
            <SubLink onRangeChange={onPriceRangeChange} title={'Xem theo giá'} data={priceRanges}  />
        </div>
    </>)
}

export default ASide;