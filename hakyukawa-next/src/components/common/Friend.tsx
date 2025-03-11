"use client";
import { BsChatTextFill } from "react-icons/bs";

interface GroupProps {
    Name: string;
    LastMessageTime?: number;
    server_id?: string;
}

export default function Group(props: GroupProps) {
    return (
        <button className="my-6 flex items-center">
            <div className="bg-main w-[50px] h-[50px] rounded-full mr-4"></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">{props.Name}</h2>
                <p
                    className={`text-[1.5rem] flex items-center ${
                        props.LastMessageTime && props.LastMessageTime < 1440
                            ? "text-main"
                            : "text-[#FF2F2F]"
                    }`}
                >
                    <BsChatTextFill style={{ marginRight: "5px" }} />
                    <span style={{ marginRight: "5px" }}>受信</span>
                    {props.LastMessageTime
                        ? props.LastMessageTime < 60
                            ? `${props.LastMessageTime}分前`
                            : props.LastMessageTime < 1440
                            ? `${Math.floor(props.LastMessageTime / 60)}時間前`
                            : `${Math.floor(props.LastMessageTime / 1440)}日前`
                        : ""}
                </p>
            </div>
        </button>
    );
}
