"use client";
import Header from "@/components/common/Header";
import Rank from "@/components/common/Rank";
import SeeAll from "@/components/common/SeeAll";
import Item from "@/components/common/Item";
import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";

interface ItemType {
    name: string;
    selected: boolean;
}

export default function Profile() {
    const { data: user } = useProfile();
    const [name, setName] = useState<string>("");
    const [itemList, setItemList] = useState<ItemType[]>([
        { name: "アイテム1", selected: true },
        { name: "アイテム2", selected: false },
        { name: "アイテム3", selected: false },
        { name: "アイテム4", selected: false },
    ]);

    useEffect(() => {
        setName(user?.user_name || "");
    }, [user?.user_name]);

    useEffect(() => {}, [name]);

    const handleItemClick = (index: number) => {
        setItemList(
            itemList.map((item, i) => ({
                ...item,
                selected: i === index,
            }))
        );
    };
    console.log(user);

    return (
        <>
            <Header backPage backPageLink="/home" backPageText="プロフィール" />
            <div className="p-[16px]">
                <div className="p-[18px] border border-main rounded-[10px] flex">
                    <div className="bg-main w-[70px] h-[70px] rounded-full"></div>
                    {user && (
                        <div className="m-auto">
                            <Rank
                                user_rank={user.user_rank}
                                user_points={user.user_point}
                                rankFontSize="2rem"
                            />
                            <div className="flex justify-between text-[1.5rem]">
                                <p>所持ポイント</p>
                                <p className="font-semibold">{3000}</p>
                            </div>

                            <div className="text-[1.3rem] mt-3">
                                <p className="text-subText">ユーザー名</p>
                                <input
                                    type="text"
                                    value={user.user_name}
                                    readOnly
                                    className="rounded-[10px] py-3 px-5 w-full border border-border"
                                />
                            </div>
                            <div className="text-[1.3rem] mt-3">
                                <p className="text-subText">ID</p>
                                <input
                                    type="text"
                                    value={user.user_id}
                                    readOnly
                                    className="rounded-[10px] py-3 px-5 w-full border border-border"
                                />
                            </div>
                        </div>
                    )}
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
