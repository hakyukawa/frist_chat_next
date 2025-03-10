interface Statusprops{
    label?: string;
    subText?: string;
    inputName?: string;
    formData?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



function InputForm ({label,subText,inputName,formData,onChange,error}:Statusprops){
    return(
        <div className="py-[10px]">
            <div className="flex items-center">
            <label className="text-[14px] text-subText font-semibold">{label}</label>
            {/* {error && <p className="text-red-500 text-xs text-[11px] px-[10px]">{error}</p>} */}
            </div>
            
            {!error && subText &&(
            <p className="text-[11px]">{subText}</p>
            )}
            <input 
                type="text" 
                name={inputName} 
                value={formData?? ""}  // formData.newUserId が undefined でない場合のみ取得
                onChange={onChange} 
                className={`w-full text-[20px] font-light border-b-2 ${error ? 'border-red-500' : 'border-main'} `}
            />
            {error &&<p className="text-red-500 text-xs text-[11px] py-[10px]">{error}</p>}
        </div>
    )
}
export default InputForm;