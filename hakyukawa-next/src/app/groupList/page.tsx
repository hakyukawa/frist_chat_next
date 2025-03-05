import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";

export default function groupList() {
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

    return (
        <>
            <Header backPage backPageLink="/home" backPageText="グループ" addGroup setting />
            <div className="p-4">
                <Search />
                {GroupArray.map((group) => (
                    <Group
                        key={group.id}
                        type="group"
                        Name={group.GroupName}
                        NumberOfPerson={group.GroupMember.length}
                        LastMessageTime={group.LastMessageTime}
                    />
                ))}
            </div>
        </>
    );
}
