import React,{useState} from "react";
import { IoEyeOff,IoEye } from "react-icons/io5";

interface Statusprops {
    label?: string;
    subText?: string;
    inputName?: string;
    formData?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function PasswordForm ({label,inputName,formData,onChange,error}:Statusprops){
    const [showPassword,setShowPassword] = useState(false);
    return(
        <div className="py-[10px] relative">
            <label className="text-[14px] text-subText font-semibold">{label}</label>
            <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"} 
                    name={inputName} 
                    value={formData?? ""}  // formData.newUserId が undefined でない場合のみ取得
                    onChange={onChange} 
                    pattern ="^[a-zA-Z0-9]+$"
                    className={`w-full text-[20px] font-light border-b-2 ${error ? 'border-red-500' : 'border-main'} pr-10 `}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[50%] transform -translate-y-[50%] text-gray-500"
                >
                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
            </div>
            {error &&<p className="text-red-500 text-xs text-[11px] py-[10px]">{error}</p>}
            
        </div>
    )
}
export default PasswordForm;