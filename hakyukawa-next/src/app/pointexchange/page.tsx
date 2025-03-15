"use client";

import React from "react";
import Header from "@/components/common/Header";
import SeeAll from "@/components/common/SeeAll";
import ChangeItem from "@/components/common/ChangeItem";
import Footer from "@/components/common/footer";
import { useProfile } from "@/hooks/useProfile";
import { useItemContext } from "@/context/ItemContext";

export default function PointexChange() {
    const { data: profile } = useProfile();
    const userPoint = profile?.user_point;
    const { itemList } = useItemContext();

    // haveがfalseでgenreがnormalのアイテムを取得
    const normalItem = itemList.filter((item) => !item.have && item.genre === "normal");

    // haveがfalseでgenreがfoodのアイテムを取得
    const foodItem = itemList.filter((item) => !item.have && item.genre === "food");

    return (
        <div>
            <Header backPage backPageLink="/home" backPageText="ポイント引き換え" />
            <div className="p-[16px] pb-[80px]">
                <div className="border border-main rounded-[10px]">
                    <div className="text-center py-4">
                        <p className="text-[1.3rem] font-semibold">所持ポイント</p>
                        <p className="text-[2.7rem] text-main font-extrabold">
                            {userPoint}
                            <span className="text-[20px]">pt</span>
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-[1.4rem] font-semibold">通常</p>
                        <SeeAll url="/pointexNormal" />
                    </div>
                    <div className="flex justify-between">
                        {normalItem.slice(0, 3).map((item, index) => (
                            <ChangeItem
                                key={index}
                                name={item.name}
                                point={item.point}
                                image={item.image}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-[1.4rem] font-semibold">食べ物</p>
                        <SeeAll url="/pointexFood" />
                    </div>
                    <div className="flex justify-between">
                        {foodItem.slice(0, 3).map((item, index) => (
                            <ChangeItem
                                key={index}
                                name={item.name}
                                point={item.point}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
