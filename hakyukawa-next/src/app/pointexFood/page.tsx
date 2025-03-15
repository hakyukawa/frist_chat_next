"use client";

import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/footer";
import ChangeItem from "@/components/common/ChangeItem";
import { useItemContext } from "@/context/ItemContext";
import { useProfile } from "@/hooks/useProfile";

export default function PointexChange() {
    const { data: profile } = useProfile();
    const userPoint = profile?.user_point;
    const { itemList } = useItemContext();

    const foodItem = itemList.filter((item) => !item.have && item.genre === "food");

    return (
        <div>
            <Header backPage backPageLink="/pointexChange" backPageText="ポイント引き換え" />
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
                        <p className="text-[1.4rem] font-semibold">食べ物</p>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        {foodItem.map((item, index) => (
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
