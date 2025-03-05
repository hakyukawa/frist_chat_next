import Rank from "@/components/common/Rank";
import Group from "@/components/common/Group";
import { IoIosArrowForward } from "react-icons/io";

interface Demo {
    user_id: number;
    user_name: string;
    email: string;
    password: string;
    rank: number;
    points: number;
}

export default function Home() {
    const demo: Demo = {
        user_id: 12345,
        user_name: "example_user",
        email: "example@example.com",
        password: "password123",
        rank: 50,
        points: 1500,
    };

    const GroupArray = [
        {
            id: 1,
            GroupMember: ["user1", "user2"],
            GroupName: "餃子",
            LastMessageTime: 30,
        },
        {
            id: 2,
            GroupMember: ["user3", "user4", "user5"],
            GroupName: "トマト",
            LastMessageTime: 60,
        },
        {
            id: 3,
            GroupMember: ["user6", "user7", "user8", "user9"],
            GroupName: "みかん",
            LastMessageTime: 90,
        },
        {
            id: 4,
            GroupMember: ["user10", "user11", "user12"],
            GroupName: "コーラ",
            LastMessageTime: 300,
        },
    ];

    const friendArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const friendIcons = (key: number) => {
        return (
            <div
                key={key}
                className="w-[24px] h-[24px] bg-main border-[3px] border-background rounded-full"
            ></div>
        );
    };

    return (
        <div className="p-[16px]">
            <div className="flex items-center justify-between">
                <div className="flex flex-col justify-between h-[100px]">
                    <h1 className="text-[2rem] font-semibold">{demo.user_name}</h1>
                    <p className="text-[#757575] text-[1.4rem]">@{demo.user_id}</p>
                    <Rank rank={demo.rank} points={demo.points} rankFontSize="1.8rem" />
                </div>
                <div className="w-[70px] h-[70px] bg-main rounded-full"></div>
            </div>
            <button className="rounded-[8px] border border-main h-[50px] flex items-center justify-between p-4 text-[1.6rem] font-semibold">
                フレンド
                <div className="text-subText text-[2rem] flex items-center">
                    {friendArray.slice(0, 4).map((friend, index) => friendIcons(index))}
                    <IoIosArrowForward />
                </div>
            </button>

            <div>
                <div className="flex justify-between my-5">
                    <h2 className="text-[1.8rem] font-semibold">メッセージ</h2>
                    <button>
                        <p className="flex items-center text-[#757575] text-[1.3rem]">
                            すべて見る
                            <IoIosArrowForward color="#757575" />
                        </p>
                    </button>
                </div>

                {GroupArray.slice(0, 3).map((group) => (
                    <Group
                        key={group.id}
                        GroupName={group.GroupName}
                        NumberOfPerson={group.GroupMember.length}
                        LastMessageTime={group.LastMessageTime}
                    />
                ))}
            </div>
        </div>
    );
}
