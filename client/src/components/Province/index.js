import { memo } from "react";
import { location } from '../../utils/constant'
import ProvinceItem from "../ProvinceItem";


const Province = () => {
    return (<>
        <div className="mb-5">
            <h2 className="text-xl text-center font-semibold mb-2">Khu vực nổi bật</h2>
            {location && <div className="flex gap-5">
                {location.map(item => (
                    <ProvinceItem name={item.name} image={item.image} key={item.id} />
                ))}
            </div>}
        </div>
    </>)
}

export default memo(Province);