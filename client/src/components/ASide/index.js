import { useEffect } from "react";
import SubLink from "./subLink";
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRanges } from '../../store/actions/priceRange'
import { getAcreageRanges } from "../../store/actions/acreageRange";
import { useSearchParams } from "react-router-dom";
import NewPost from "../NewPost";
import { getNewPosts } from "../../store/actions/post";

const ASide = () => {
    const { priceRanges } = useSelector(state => state.priceRange);
    const { acreageRanges } = useSelector(state => state.acreageRange);
    const { newPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getPriceRanges())
        dispatch(getAcreageRanges())
        dispatch(getNewPosts())
    }, [])

    const onPriceRangeChange = (priceMin, priceMax) => {
        const currentParams = Object.fromEntries([...searchParams])
        delete currentParams.page;
        
        if (!priceMin) delete currentParams.priceMin;
        else currentParams.priceMin = priceMin;

        if (!priceMax) delete currentParams.priceMax;
        else currentParams.priceMax = priceMax;

        setSearchParams(currentParams)
    }

    const onAcreageRangeChange = (acreageMin, acreageMax) => {
        const currentParams = Object.fromEntries([...searchParams])
        delete currentParams.page;
        
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
            <NewPost  title={'Tin mới đăng'} data={newPosts} />
        </div>
    </>)
}

export default ASide;