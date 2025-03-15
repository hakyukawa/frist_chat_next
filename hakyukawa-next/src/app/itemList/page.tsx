"use client";

import Header from "@/components/common/Header";
import Item from "@/components/common/Item";
import { FaStar } from "react-icons/fa6";
import { useItemContext } from "@/context/ItemContext";
import Link from "next/link";

export default function ItemList() {
    const { itemList, setItemList } = useItemContext();

    // `have` が true のアイテムだけを取得
    const ownedItems = itemList.filter((item) => item.have);

    const handleItemClick = (selectedItem: string) => {
        console.log(`クリックされた画像: ${selectedItem}`);
        localStorage.setItem("selectedItemImage", selectedItem);

        setItemList(
            itemList.map((item) => ({
                ...item,
                selected: item.image === selectedItem,
            }))
        );
    };

    return (
        <>
            <Header backPage backPageLink="/profile" backPageText="所持アイテム一覧" />
            <div className="p-[16px] flex flex-col items-center">
                <div className="flex flex-wrap justify-between">
                    {ownedItems.map((item) => (
                        <Item
                            key={item.image}
                            image={item.image}
                            name={item.name}
                            selected={item.selected}
                            onClick={() => handleItemClick(item.image)}
                        />
                    ))}
                </div>
                <Link
                    href="/pointexChange"
                    className="w-[250px] h-[50px] rounded-[40px] mx-[auto] border border-main mt-5 text-[1.5rem] !text-main font-semibold flex items-center justify-center"
                >
                    <FaStar size="18px" className="mr-4" />
                    <p>ポイント引き換え所</p>
                </Link>
            </div>
        </>
    );
}
