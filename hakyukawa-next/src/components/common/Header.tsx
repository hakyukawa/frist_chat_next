import { GoPersonAdd } from "react-icons/go";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import Link from "next/link";

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
    return (
        <header className="flex p-4 justify-between items-center text-[20px]">
            <div className="flex items-center font-semibold">
                {props.backPage && props.backPageLink && (
                    <Link href={props.backPageLink}>
                        <IoIosArrowBack size="25px" style={{ marginRight: "5px" }} />
                    </Link>
                )}
                {props.backPageText && <p style={{ marginRight: "5px" }}>{props.backPageText}</p>}
                {props.core && <BsFire />}
            </div>
            <div className="flex text-[26px]">
                {props.addFriend && <GoPersonAdd />}
                {props.addGroup && <AiOutlineUsergroupAdd style={{ marginLeft: "8px" }} />}
                {props.notice && <GoBell style={{ marginLeft: "8px" }} />}
                {props.search && <IoIosSearch style={{ marginLeft: "8px" }} />}
                {props.setting && <IoSettingsOutline style={{ marginLeft: "8px" }} />}
            </div>
        </header>
    );
}
