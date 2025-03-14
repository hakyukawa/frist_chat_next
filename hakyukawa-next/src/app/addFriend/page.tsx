"use client";

import Header from "@/components/common/Header";
import { useState, useEffect } from "react";
import { HiOutlineQrcode } from "react-icons/hi";

export default function AddFriend() {
    const [previousPath, setPreviousPath] = useState<string | null>(null);
    useEffect(() => {
        const prevPath = localStorage.getItem("previousPath");
        if (prevPath) {
            setPreviousPath(prevPath);
        }
    }, []);
    return (
        <div>
            <Header backPage backPageLink={`${previousPath}`} backPageText="フレンド追加" />
            <div className="p-[16px]">
                <div className="flex items-center flex-col">
                    <button className="w-[250px] h-[50px] flex items-center justify-center border border-main rounded-[40px]">
                        <p className="flex items-center justify-center text-main text-[1.5rem] font-semibold">
                            <HiOutlineQrcode size="20px" style={{ marginRight: "5px" }} />
                            QRコードをスキャン
                        </p>
                    </button>
                </div>
                <div className="flex flext-col items-start mt-10">
                    <p className="text-[1.8rem] font-semibold">知り合いかも</p>
                </div>
            </div>
        </div>
    );
}
