interface RankProps {
    rank: number;
    points: number;
}

export default function Rank(props: RankProps) {
    return (
        <div>
            <h1>Rank.{props.rank}</h1>
            <div></div>
            <p>{props.points}/5000</p>
        </div>
    );
}
