"use client";

import React from "react";
import Header from "@/components/common/Header";
import SeeAll from "@/components/common/SeeAll";
import ChangeItem from "@/components/common/ChangeItem";
import Footer from "@/components/common/footer";
import { useProfile } from "@/hooks/useProfile";

export default function PointexChange() {
    const { data: profile } = useProfile();
    const userPoint = profile?.user_point;

    const normalItem = [
        {
            name: "ロイヤル",
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
            name: "土星",
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
