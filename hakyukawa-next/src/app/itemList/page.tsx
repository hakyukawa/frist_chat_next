"use client";

import Header from "@/components/common/Header";
import Item from "@/components/common/Item";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";

interface ItemType {
    name: string;
    selected: boolean;
}

export default function ItemList() {
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
            <Header backPage backPageLink="/profile" backPageText="所持アイテム一覧" />
            <div className="p-[16px] flex flex-col items-center">
                <div className="flex flex-wrap justify-between">
                    {itemList.map((item, index) => (
                        <Item
                            key={index}
                            name={item.name}
                            selected={item.selected}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
                <button className="w-[250px] h-[50px] rounded-[40px] mx-[auto] border border-main mt-5 text-[1.5rem] !text-main font-semibold flex items-center justify-center">
                    <FaStar size="18px" className="mr-4" />
                    <p>ポイント引き換え所</p>
                </button>
            </div>
        </>
    );
}
