import { memo } from "react";

const InputForm = (props) => {
    const {label, id, type, value, setValue, typeSetValue} = props
    return (<>
        <div>
            <label htmlFor={id} className="text-sm">{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => setValue(prev => ({...prev, [typeSetValue]: e.target.value}))}
                className="w-full text-xl font-bold bg-[#e8f0fe] py-2 px-3 rounded-md outline-none"
            />
        </div>
    </>)
}

export default memo(InputForm);