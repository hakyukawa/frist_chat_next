"use client";
import { BsChatTextFill } from "react-icons/bs";

interface GroupProps {
    Name: string;
    LastMessageTime: number;
    NumberOfPerson?: number;
    type: string;
}

export default function Group(props: GroupProps) {
    function handleGroupClick() {
        console.log(`${props.Name}をクリックしました`);
    }

    return (
        <button onClick={handleGroupClick} className="my-5 flex items-center">
            <div className="bg-main w-[46px] h-[46px] rounded-full mr-4"></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">
                    {props.Name}
                    {props.type == "group" && `(${props.NumberOfPerson})`}
                </h2>
                <p className="text-[1.5rem] text-main flex items-center">
                    <BsChatTextFill />
                    受信
                    {props.LastMessageTime < 60
                        ? `${props.LastMessageTime}分前`
                        : `${Math.floor(props.LastMessageTime / 60)}時間前`}
                </p>
            </div>
        </button>
    );
}
