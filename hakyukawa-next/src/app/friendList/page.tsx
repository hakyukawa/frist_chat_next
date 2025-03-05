import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import { IoIosSearch } from "react-icons/io";

const friendArray = [
    { id: 1, friendName: "friend1", LastMessageTime: 30 },
    { id: 2, friendName: "friend2", LastMessageTime: 60 },
    { id: 3, friendName: "friend3", LastMessageTime: 90 },
    { id: 4, friendName: "friend4", LastMessageTime: 300 },
];

export default function friendList() {
    return (
        <>
            <Header backPage backPageLink="/home" backPageText="フレンド" addFriend setting />
            <div className="p-4">
                <div className="p-3 w-full border border-border rounded-[10px] flex items-center text-[1.3rem]">
                    <IoIosSearch size="20px" style={{ marginRight: "5px" }} />
                    <input type="text" className="w-full  rounded-md" placeholder="検索" />
                </div>

                {friendArray.map((friend) => (
                    <Group
                        key={friend.id}
                        type="friend"
                        Name={friend.friendName}
                        LastMessageTime={friend.LastMessageTime}
                    />
                ))}
            </div>
        </>
    );
}
