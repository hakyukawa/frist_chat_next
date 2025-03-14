"use client";

import React from "react";
import Header from "@/components/common/Header";
// import { useProfile } from "@/hooks/useProfile";
// import { useItems } from "@/hooks/useItems";

export default function PointExchange() {
    const nowPoint = 1300;
    // const { data: user } = useProfile();
    // const { data: item } = useItems();

    return (
        <div>
            <Header backPage backPageLink="/home" backPageText="ポイント引き換え" />
            <div className="p-4">
                <div className="border border-main rounded-[10px]">
                    <div className="text-center py-4">
                        <p className="text-[1.3rem] font-semibold">所持ポイント</p>
                        <p className="text-[2.7rem] text-main font-extrabold">
                            {nowPoint}
                            <span className="text-[20px]">pt</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
