"use client";

import { GoPersonAdd } from "react-icons/go";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import Search from "@/components/common/Search";

interface HeaderProps {
    backPage?: boolean;
    backPageText?: string;
    backPageLink?: string;
    core?: boolean;
    addFriend?: boolean;
    addGroup?: boolean;
    notice?: boolean;
    search?: boolean;
    setting?: boolean;
}

export default function Header(props: HeaderProps) {
    const [serch, setSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header
            className={`p-4 text-[20px] ${
                props.core && "bg-gradient-to-r from-[#F8644A] to-[#FE950F]"
            }`}
        >
            <div className={`flex justify-between items-center `}>
                <div className="flex items-center font-semibold">
                    {props.backPage && props.backPageLink && (
                        <Link href={props.backPageLink}>
                            <IoIosArrowBack size="25px" style={{ marginRight: "5px" }} />
                        </Link>
                    )}
                    {props.backPageText && (
                        <p style={{ marginRight: "5px" }}>{props.backPageText}</p>
                    )}
                    {props.core && <BsFire />}
                </div>
                <div className="flex text-[26px]">
                    {props.addFriend && <GoPersonAdd />}
                    {props.addGroup && <AiOutlineUsergroupAdd style={{ marginLeft: "8px" }} />}
                    {props.notice && <GoBell style={{ marginLeft: "8px" }} />}
                    {props.search && (
                        <button className="ml-[8px]" onClick={() => setSearch((prev) => !prev)}>
                            {!serch ? <IoIosSearch /> : <BsX />}
                        </button>
                    )}
                    {props.setting && (
                        <button>
                            <IoSettingsOutline style={{ marginLeft: "8px" }} />
                        </button>
                    )}
                </div>
            </div>
            <div className={`mt-4 ${serch ? "block" : "hidden"}`}>
                {serch && (
                    <Search white searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                )}
            </div>
        </header>
    );
}
