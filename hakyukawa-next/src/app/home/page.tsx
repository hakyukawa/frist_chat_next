import Rank from "@/components/common/Rank";
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

    return (
        <div className={styles.container}>
            <h1>{demo.user_name}</h1>
            <p className={styles.userId}>@{demo.user_id}</p>
            <Rank rank={demo.rank} points={demo.points} />
        </div>
    );
}
