import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import Link from "next/link";
import NoticeOption from "@/components/common/NoticeOption";
import ReplayOption from "@/components/common/ReplayOption";
import { IoIosArrowForward } from "react-icons/io";

const friendArray = [
    { id: 1, friendName: "friend1", LastMessageTime: 30 },
    { id: 2, friendName: "friend2", LastMessageTime: 60 },
    { id: 3, friendName: "friend3", LastMessageTime: 90 },
    { id: 4, friendName: "friend4", LastMessageTime: 300 },
];

const friendIcons = (key: number) => {
    return (
        <div
            key={key}
            className="w-[24px] h-[24px] bg-main border-[3px] border-background rounded-full"
        ></div>
    );
};

export default function newGroupList() {
    return (
        <>
            <Header backPage backPageLink="/groupList" backPageText="グループ新規作成" />
            <div className="p-4">
                <GroupInfo />
                <Link
                    href="/friendList"
                    passHref
                    className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                >
                    メンバー
                    <div className="text-subText text-[2rem] flex items-center">
                        {friendArray.slice(0, 4).map((friend, index) => friendIcons(index))}
                        <IoIosArrowForward />
                    </div>
                </Link>
                <NoticeOption />
                <ReplayOption />
            </div>
        </>
    );
}
