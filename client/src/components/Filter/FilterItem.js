import { memo } from "react";

const FilterItem = (props) => {
    const { text, iconLeft, iconRight } = props;
    return (<>
        <div className="w-1/5 rounded-md bg-primary flex items-center justify-between px-2 cursor-pointer">
            <div className="flex items-center gap-2">
                {iconLeft}
                {text}
            </div>
            <div>
                {iconRight}
            </div>
        </div>
    </>)
}

export default memo(FilterItem);