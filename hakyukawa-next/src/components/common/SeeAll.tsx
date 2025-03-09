import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function SeeAll(props: { url: string }) {
    return (
        <Link href={props.url}>
            <p className="text-subText flex items-center text-[1.3rem]">
                すべて見る
                <IoIosArrowForward />
            </p>
        </Link>
    );
}
