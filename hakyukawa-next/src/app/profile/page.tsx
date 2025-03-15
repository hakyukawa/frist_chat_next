"use client";

import Header from "@/components/common/Header";
import Rank from "@/components/common/Rank";
import SeeAll from "@/components/common/SeeAll";
import Item from "@/components/common/Item";
import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useItemContext } from "@/context/ItemContext";
import Image from "next/image";

export default function Profile() {
    const { data: user } = useProfile();
    const { itemList, setItemList } = useItemContext();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const ownedItems = itemList.filter((item) => item.have);

    // const [name, setName] = useState<string>("");
    // useEffect(() => {
    //     setName(user?.user_name || "");
    // }, [user?.user_name]);

    // localStorage の値を useEffect で取得する
    useEffect(() => {
        if (typeof window !== "undefined") {
            setSelectedImage(localStorage.getItem("selectedItemImage") || null);
        }
    }, []);

    const handleItemClick = (index: number, image: string) => {
        console.log(`クリックされた画像: ${image}`);
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedItemImage", image);
        }
        setSelectedImage(image);
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
                    <div className="flex justify-center items-center relative w-[85px] h-[85px] rounded-full">
                        <div className="bg-border w-[70px] h-[70px] mx-[11px] my-[10px] rounded-full absolute"></div>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="iconOrnament"
                                width={85}
                                height={85}
                                className="absolute top-0 left-0"
                            />
                        )}
                    </div>
                    {user && (
                        <div className="m-auto">
                            <Rank
                                user_rank={user.user_rank}
                                user_points={user.user_point}
                                rankFontSize="2rem"
                            />
                            <div className="flex justify-between text-[1.5rem]">
                                <p>所持ポイント</p>
                                <p className="font-semibold">{user.user_point}</p>
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
                    {ownedItems.slice(0, 3).map((item, index) => (
                        <Item
                            key={index}
                            image={item.image}
                            name={item.name}
                            selected={item.selected}
                            onClick={() => handleItemClick(index, item.image)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
