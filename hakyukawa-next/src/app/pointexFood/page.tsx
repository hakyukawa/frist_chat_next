"use client";

import React from "react";
import Header from "@/components/common/Header";
import ChangeItem from "@/components/common/ChangeItem";

export default function PointexChange() {
    const nowPoint = 1300;

    const foodItem = [
        {
            name: "ナポリタン",
            point: 200,
            image: "img/iconDecor003.svg",
        },
        {
            name: "ラーメン",
            point: 200,
            image: "img/iconDecor004.svg",
        },
        {
            name: "たこ焼き",
            point: 200,
            image: "img/iconDecor005.svg",
        },
        {
            name: "寿司",
            point: 200,
            image: "img/iconDecor006.svg",
        },
        {
            name: "天ぷら",
            point: 200,
            image: "img/iconDecor007.svg",
        },
    ];

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
        </div>
    );
}
