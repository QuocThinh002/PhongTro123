import { memo, useState } from "react";
import { FaLock, FaUnlockKeyhole } from 'react-icons/fa6'

const InputForm = (props) => {
    const { label, id, type, value, setValue, typeSetValue, invalidFields, setInvalidFields } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRemoveInvalid = () => {
        const newInvalid = invalidFields?.filter(invalidField => invalidField?.name !== typeSetValue)
        setInvalidFields(newInvalid)
    }

    return (<>
        <div>
            <label htmlFor={id} className="text-sm">{label}</label>
            <div className={type === 'password' ? "relative":""}>
                <input
                    className="w-full text-xl font-bold bg-[#e8f0fe] py-2 px-3 rounded-md outline-none"
                    type={type !== 'password' ? type : (showPassword ? 'text' : type)}
                    id={id}
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [typeSetValue]: e.target.value }))}
                    onFocus={() => handleRemoveInvalid()}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaUnlockKeyhole /> : <FaLock />}
                </button>
                {invalidFields.length > 0 && invalidFields.some(item => item.name === typeSetValue)
                    && <small className="text-red-500 italic">{invalidFields.find(invalidField => invalidField.name === typeSetValue)?.message}</small>}

            </div>
        </div>
    </>)
}

export default memo(InputForm);