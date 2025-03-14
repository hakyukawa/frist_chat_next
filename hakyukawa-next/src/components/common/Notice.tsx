import React from "react";

interface Noticeprops {
    messages?: string;
    userId?: string;
    lastNoticeTime?: number;
    
}
export default function Notice(props:Noticeprops) {  
    return(
        <div className="flex py-[10px]">
            <div className="bg-main w-[46px] h-[46px] rounded-full mr-4"></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">{props.messages}</h2>

                <p className="text-[15px] text-subText">
                    {props.lastNoticeTime 
                        ? props.lastNoticeTime < 60 
                        ?`${props.lastNoticeTime}分前`
                        : props.lastNoticeTime < 1440
                        ?`${Math.floor(props.lastNoticeTime /60)}時間前`
                        :`${Math.floor(props.lastNoticeTime /1440)}日前`
                    : ""}
                </p>
            </div>
        </div>
    )
}