import { memo } from 'react';

const Button = (props) => {
    const { onClick, text, textColor, bgColor, iconLeft, iconRight, width, hoverColor} = props;
    // console.log(props)
    return (<>  
        <button type="button" onClick={onClick} className={`p-2 ${textColor || ''} ${bgColor || ''} ${width || ''} ${hoverColor || ''} outline-none rounded-md flex items-center justify-center gap-1 font-semibold`}>
            {iconLeft && <span>{iconLeft}</span>}
            {text && <span>{text}</span>}
            {iconRight && <span>{iconRight}</span>}
        </button>
    </>)
}

export default memo(Button);