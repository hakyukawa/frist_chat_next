import styles from "@/styles/componentStyles/common/Rank.module.scss";
import clsx from "clsx";
interface RankProps {
    rank: number;
    points: number;
}

export default function Rank(props: RankProps) {
    const progress = props.points / 5000;

    const rankBarWidth = 220 * progress;
    console.log(rankBarWidth);

    return (
        <div className={styles.rankWrap}>
            <div>
                <h2>
                    Rank.<span>{props.rank}</span>
                </h2>
                <div className={styles.rankBarWrap}>
                    <div className={clsx(styles.rankGrayBar, styles.rankBars)}></div>
                    <div
                        className={clsx(styles.rankBlueBar, styles.rankBars)}
                        style={{ width: `${rankBarWidth}px` }}
                    ></div>
                </div>
                <p>{props.points}/5000</p>
            </div>
            <div className={styles.icon}></div>
        </div>
    );
}
