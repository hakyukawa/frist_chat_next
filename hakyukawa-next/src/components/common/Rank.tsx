interface RankProps {
    user_rank: number;
    user_points: number;
    rankFontSize: string;
}

export default function Rank(props: RankProps) {
    const progress = props.user_points / 5000;

    const rankBarWidth = 220 * progress;

    return (
        <div className="w-[223px]">
            <h2 style={{ fontSize: props.rankFontSize }}>
                Rank.<span className="font-semibold">{props.user_rank}</span>
            </h2>
            <div className="relative rouded-full">
                <div className="absolute -top-[5px] left-0 h-[7px] rounded-[8px] w-[220px] bg-[#d9d9d9]"></div>
                <div
                    className="absolute -top-[5px] left-0 h-[7px] rounded-[8px] bg-main"
                    style={{ width: `${rankBarWidth}px` }}
                ></div>
            </div>
            <p className="text-main text-[1.3rem]">{props.user_points}/5000</p>
        </div>
    );
}
