import { IoGift } from "react-icons/io5";
import { IoGiftOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaComments } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();

    return (
        <div className="flex justify-between items-center fixed bottom-0 bg-[#404147] px-[110px] w-full h-[80px]">
            <Link href="/pointexChange">
                <div
                    className={`${
                        ["/pointexChange", "/pointexFood", "/pointexNormal"].includes(pathname)
                            ? "text-main"
                            : "text-subText"
                    } text-[32px]`}
                >
                    {["/pointexChange", "/pointexFood", "/pointexNormal"].includes(pathname) ? (
                        <IoGift />
                    ) : (
                        <IoGiftOutline />
                    )}
                </div>
            </Link>
            <Link href="/home">
                <div
                    className={`${pathname === "/home" ? "text-main" : "text-subText"} text-[32px]`}
                >
                    {pathname === "/home" ? <IoHome /> : <IoHomeOutline />}
                </div>
            </Link>
            <Link href="/GroupList">
                <div
                    className={`${
                        pathname === "/GroupList" ? "text-main" : "text-subText"
                    } text-[32px]`}
                >
                    {pathname === "/GroupList" ? <FaComments /> : <FaRegComments />}
                </div>
            </Link>
        </div>
    );
}
