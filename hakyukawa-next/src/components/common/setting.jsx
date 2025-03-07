import React from "react";

function Setting (props) {
    return(
            <div className="p-[16px]">
                <form onSubmit={props.onsubmit} action="" method="POST">
                    <div className="py-[10px]">
                        <p className="text-[14px] text-subText font-semibold">現在</p>
                        <p className="text-[18px] text-subText font-light">{props.nowuserid}</p>
                    </div>
                    <div className="py-[10px]">
                        <p className="text-[14px] text-subText font-semibold">{`新しい${props.title}`}</p>
                        <input type="text" name="newUserId" value={props.value} onChange={props.onchange} error={props.error} className={`w-full text-[20px] font-light border-b-2 ${props.error ? 'border-red-500' : 'border-main'} `}/>
                        {props.error &&<p className="text-red-500 text-xs text-[11px] py-[10px]">{props.error}</p>}
                    </div>
                    <div className="p-[15px]">
                        <input 
                            type="submit"
                            value={props.submitvalue}
                            className={`bg-border border-none rounded-[40px] w-full p-[10px] text-[15px] ${
                                Object.values(props.formdata).every(value =>  value.trim() !== "") && Object.keys(props.errors).length === 0 ? "bg-main" :
                                Object.values(props.formdata).every(value =>  value.trim() !== "") && Object.keys(props.errors).length > 0 
                                ? "bg-main" : "bg-border"
                            }`}
                        />
                    </div>
                    
                </form>
            </div>
    );
}

export default Setting;