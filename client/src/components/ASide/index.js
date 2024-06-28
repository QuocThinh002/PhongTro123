import { useEffect } from "react";
import SubLink from "../SubLink";
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRanges } from '../../store/actions/priceRange'
import { useSearchParams } from "react-router-dom";

const ASide = () => {
    const { priceRanges } = useSelector(state => state.priceRange);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getPriceRanges())
    }, [])

    const onPriceRangeChange = (priceMin, priceMax) => {
        const currentParams = Object.fromEntries([...searchParams])
        
        if (!priceMin) delete currentParams.priceMin;
        else currentParams.priceMin = priceMin;

        if (!priceMax) delete currentParams.priceMax;
        else currentParams.priceMax = priceMax;

        setSearchParams(currentParams)
    }

    return (<>
        <div className="flex flex-col gap-4">
            <SubLink onPriceRangeChange={onPriceRangeChange} title={'Xem theo giá'} priceRanges={priceRanges}  />
            <SubLink onPriceRangeChange={onPriceRangeChange} title={'Xem theo giá'} priceRanges={priceRanges}  />
            <SubLink onPriceRangeChange={onPriceRangeChange} title={'Xem theo giá'} priceRanges={priceRanges}  />
            <SubLink onPriceRangeChange={onPriceRangeChange} title={'Xem theo giá'} priceRanges={priceRanges}  />
        </div>
    </>)
}

export default ASide;