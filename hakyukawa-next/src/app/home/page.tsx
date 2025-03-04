import Rank from "@/components/common/Rank";
import Group from "@/components/common/Group";
import styles from "@/styles/appStyles/home.module.scss";
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

    return (
        <div className={styles.container}>
            <div className={styles.userInfoWrap}>
                <div className={styles.userInfo}>
                    <h1>{demo.user_name}</h1>
                    <p className={styles.userId}>@{demo.user_id}</p>
                    <Rank rank={demo.rank} points={demo.points} rankFontSize="1.8rem" />
                </div>
                <div className={styles.icon}></div>
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
    );
}
