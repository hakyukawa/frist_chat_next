import styles from "@/styles/componentStyles/common/Rank.module.scss";
import clsx from "clsx";
interface RankProps {
    rank: number;
    points: number;
}

export default function Rank(props: RankProps) {
    return (
        <div className={styles.rankWrap}>
            <h2>
                Rank.<span>{props.rank}</span>
            </h2>
            <div className={styles.rankBarWrap}>
                <div className={clsx(styles.rankGrayBar, styles.rankBars)}></div>
                <div className={clsx(styles.rankBlueBar, styles.rankBars)}></div>
            </div>
            <p>{props.points}/5000</p>
        </div>
    );
}
