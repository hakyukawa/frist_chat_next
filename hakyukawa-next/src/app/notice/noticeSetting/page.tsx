import React from "react";
import Header from "@/components/common/Header";
import NoticeOption from "@/components/common/option/NoticeOption";

export default function Noticesetting () {
    return (
        <div>
            <Header backPage backPageLink="/" backPageText="通知設定" />
            <div className="p-4">
                <NoticeOption />
            </div>
            
        </div>
    );
}  

