import { GoPersonAdd } from "react-icons/go";
import { GoBell } from "react-icons/go";
import { TbSettings } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsFire } from "react-icons/bs";

interface HeaderProps {
    setting?: boolean;
    addFriend?: boolean;
    addGroup?: boolean;
    notice?: boolean;
    search?: boolean;
    core?: boolean;
    backPage?: boolean;
    backPageText?: string;
}

export default function Header(props: HeaderProps) {
    return (
        <header className="flex justify-between items-center p-4">
            <div className="flex items-center">
                {props.backPage && <IoIosArrowBack />}
                {props.backPageText && <p>{props.backPageText}</p>}
                {props.core && <BsFire />}
            </div>
            <div>
                {props.addFriend && <GoPersonAdd />}
                {props.addGroup && <AiOutlineUsergroupAdd />}
                {props.notice && <GoBell />}
                {props.search && <IoSearch />}
                {props.setting && <TbSettings />}
            </div>
        </header>
    );
}
