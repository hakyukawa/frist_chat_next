import { BsChatTextFill } from "react-icons/bs";
import styles from "@/styles/componentStyles/common/Group.module.scss";

interface GroupProps {
    GroupName: string;
    LastMessageTime: number;
    NumberOfPerson: number;
}

export default function Group(props: GroupProps) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}></div>
            <div>
                <h2 className={styles.groupName}>
                    {props.GroupName}
                    {props.NumberOfPerson >= 2 && `(${props.NumberOfPerson})`}
                </h2>
                <p className={styles.receptionTime}>
                    <BsChatTextFill />
                    受信
                    {props.LastMessageTime < 60
                        ? `${props.LastMessageTime}分前`
                        : `${Math.floor(props.LastMessageTime / 60)}時間前`}
                </p>
            </div>
        </div>
    );
}
