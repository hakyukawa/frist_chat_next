"use client";

import React from "react";
import Header from "@/components/common/Header";
import ChangeItem from "@/components/common/ChangeItem";

export default function PointexChange() {
    const nowPoint = 1300;

    const normalItem = [
        {
            name: "アイテム名",
            point: 200,
            image: "/img/iconDecor001.svg",
        },
        {
            name: "リボン",
            point: 200,
            image: "/img/iconDecor002.svg",
        },
        {
            name: "うし",
            point: 200,
            image: "/img/iconDecor008.svg",
        },
        {
            name: "パンダ",
            point: 200,
            image: "/img/iconDecor009.svg",
        },
        {
            name: "ひつじ",
            point: 200,
            image: "/img/iconDecor010.svg",
        },
        {
            name: "猫耳",
            point: 200,
            image: "/img/iconDecor011.svg",
        },
        {
            name: "地球",
            point: 200,
            image: "/img/iconDecor012.svg",
        },
        {
            name: "アイテム名",
            point: 200,
            image: "/img/iconDecor013.svg",
        },
        {
            name: "虹",
            point: 200,
            image: "/img/iconDecor014.svg",
        },
        {
            name: "雪",
            point: 200,
            image: "/img/iconDecor015.svg",
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
                        <p className="text-[1.4rem] font-semibold">通常</p>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        {normalItem.map((item, index) => (
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
