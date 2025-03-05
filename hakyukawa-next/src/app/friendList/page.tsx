import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";

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
                <Search />
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
