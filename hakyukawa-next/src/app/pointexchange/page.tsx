import React from "react";
import Header from "@/components/common/Header";

export default function Pointexchange () {

    const nowPoint = 13300;

    return(
        <div>
            <Header backPage backPageLink="/home" backPageText="ポイント引き換え" />
            <div className="p-4">
                <div className="border border-main rounded-[10px]">
                    <div className="text-center">
                        <p className="text-[13px]">所持ポイント</p>
                        <p className="text-[27px] font-extrabold">{nowPoint}<span className="text-[20px]">pt</span></p>
                    </div>  
                </div>
            </div>
        </div>
    )

    
}