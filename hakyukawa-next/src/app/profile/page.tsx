"use client";
import Header from "@/components/common/Header";
import Rank from "@/components/common/Rank";
import SeeAll from "@/components/common/SeeAll";
import Item from "@/components/common/Item";
import { useState } from "react";

interface ItemType {
    name: string;
    selected: boolean;
}

const InputField = (label: string) => {
    return (
        <div className="text-[1.3rem] mt-3">
            <p className="text-subText">{label}</p>
            <input type="text" className="rounded-[10px] py-3 px-5 w-full border border-border" />
        </div>
    );
};

export default function Profile() {
    const [itemList, setItemList] = useState<ItemType[]>([
        { name: "アイテム1", selected: true },
        { name: "アイテム2", selected: false },
        { name: "アイテム3", selected: false },
        { name: "アイテム4", selected: false },
    ]);

    const handleItemClick = (index: number) => {
        setItemList(
            itemList.map((item, i) => ({
                ...item,
                selected: i === index,
            }))
        );
    };

    return (
        <>
            <Header backPage backPageLink="/home" backPageText="プロフィール" />
            <div className="p-[16px]">
                <div className="p-[18px] border border-main rounded-[10px] flex">
                    <div className="bg-main w-[70px] h-[70px] rounded-full"></div>
                    <div className="m-auto">
                        <Rank rank={2} points={3000} rankFontSize="2rem" />
                        <div className="flex justify-between text-[1.5rem]">
                            <p>所持ポイント</p>
                            <p className="font-semibold">{3000}</p>
                        </div>
                        {InputField("ユーザー名")}
                        {InputField("ID")}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <h2 className="text-[1.4rem] font-semibold">所持アイテム一覧</h2>
                    <SeeAll url="/itemList" />
                </div>

                <div className="flex flex-wrap justify-between">
                    {itemList.slice(0, 3).map((item, index) => (
                        <Item
                            key={index}
                            name={item.name}
                            selected={item.selected}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
