import { memo } from "react";

const FilterItem = (props) => {
    const { data, text, iconLeft, iconRight } = props;
    return (<>
        <div className="w-1/5 rounded-md bg-primary flex items-center justify-between px-2 cursor-pointer relative">
            <div className="flex items-center gap-2">
                {iconLeft}
                {text}
            </div>
            <div>
                {iconRight}
            </div>
            <div className="absolute top-full left-0 right-0 bg-primary rounded-b">
                {data && data.map(item => (
                    <li className={'px-2'} >{item.title}</li>
                ))}
            </div>
        </div>
    </>)
}

export default memo(FilterItem);