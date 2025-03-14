"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ItemType {
    name: string;
    selected: boolean;
    image: string;
}

interface ItemContextType {
    itemList: ItemType[];
    setItemList: (items: ItemType[]) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: ReactNode }) {
    const [itemList, setItemList] = useState<ItemType[]>([
        { name: "ひつじ", selected: true, image: "/img/iconDecor010.svg" },
        { name: "猫耳", selected: false, image: "/img/iconDecor011.svg" },
        { name: "地球", selected: false, image: "/img/iconDecor012.svg" },
        { name: "アイテム4", selected: false, image: "/img/iconDecor013.svg" },
        { name: "虹", selected: false, image: "/img/iconDecor014.svg" },
        { name: "雪", selected: false, image: "/img/iconDecor015.svg" },
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
