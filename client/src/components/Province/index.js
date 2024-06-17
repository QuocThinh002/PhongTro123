import { memo } from "react";
import {location} from '../../utils/constant'
import ProvinceItem from "../ProvinceItem";

const Province = () => {
    return (<>
        <div>
            <h2 className="text-xl">Khu vực nổi bật</h2>
            {location && location.map(item => (
                <ProvinceItem name={item.name} image={item.image} key={item.id} />
            ))}
        </div>
    </>)
}

export default memo(Province);