import { BsFire } from "react-icons/bs";

interface ReplayTimeHeadlineProps {
    label: string;
}

export default function ReplayTimeHeadline(props: ReplayTimeHeadlineProps) {
    return (
        <div
            className="bg-gradient-to-r text-background from-[#F8644A] to-[#FE950F] h-[27px] w-[162px] text-[14px] font-semibold flex items-center pl-[14px]"
            style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)" }}
        >
            <BsFire />
            <p className="!ml-[5px]">{props.label}</p>
        </div>
    );
}
