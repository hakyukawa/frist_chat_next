"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ItemType {
    name: string;
    selected: boolean;
    image: string;
    point: number;
    genre: string;
    have: boolean;
}

interface ItemContextType {
    itemList: ItemType[];
    setItemList: (items: ItemType[]) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: ReactNode }) {
    const [itemList, setItemList] = useState<ItemType[]>([
        {
            name: "ロイヤル",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor001.svg",
            have: false,
        },
        {
            name: "リボン",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor002.svg",
            have: false,
        },
        {
            name: "うし",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor008.svg",
            have: false,
        },
        {
            name: "パンダ",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor009.svg",
            have: false,
        },
        {
            name: "ひつじ",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor010.svg",
            have: true,
        },
        {
            name: "猫耳",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor011.svg",
            have: true,
        },
        {
            name: "地球",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor012.svg",
            have: true,
        },
        {
            name: "土星",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor013.svg",
            have: true,
        },
        {
            name: "虹",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor014.svg",
            have: true,
        },
        {
            name: "雪",
            genre: "normal",
            selected: false,
            point: 200,
            image: "/img/iconDecor015.svg",
            have: true,
        },
        {
            name: "ナポリタン",
            genre: "food",
            selected: false,
            point: 200,
            image: "img/iconDecor003.svg",
            have: false,
        },
        {
            name: "ラーメン",
            genre: "food",
            selected: false,
            point: 200,
            image: "img/iconDecor004.svg",
            have: false,
        },
        {
            name: "たこ焼き",
            genre: "food",
            selected: false,
            point: 200,
            image: "img/iconDecor005.svg",
            have: false,
        },
        {
            name: "寿司",
            genre: "food",
            selected: false,
            point: 200,
            image: "img/iconDecor006.svg",
            have: false,
        },
        {
            name: "天ぷら",
            genre: "food",
            selected: false,
            point: 200,
            image: "img/iconDecor007.svg",
            have: false,
        },
    ]);

    return (
        <ItemContext.Provider value={{ itemList, setItemList }}>{children}</ItemContext.Provider>
    );
}

export function useItemContext() {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error("useItemContext must be used within an ItemProvider");
    }
    return context;
}
