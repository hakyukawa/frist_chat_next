"use client";
import { BsChatTextFill } from "react-icons/bs";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import { useEffect, useState } from "react";

interface GroupProps {
    Name: string;
    LastMessageTime?: number;
    type: string;
    server_id?: string;
}

export default function Group(props: GroupProps) {
    const [memberCount, setMemberCount] = useState<number>(0);
    const { data } = useGroupMembers(props.server_id || "");

    if (data) {
        console.log(data);
    }

    useEffect(() => {
        if (data && data.members) {
            setMemberCount(data.members.length);
        }
    }, [data]);

    function handleGroupClick() {
        console.log(`${props.Name}をクリックしました`);
    }

    return (
        <button onClick={handleGroupClick} className="my-6 flex items-center">
            <div className="bg-main w-[46px] h-[46px] rounded-full mr-4"></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">
                    {props.Name}
                    {props.type === "group" && memberCount > 0 && `(${memberCount})`}
                </h2>
                <p className="text-[1.5rem] text-main flex items-center">
                    <BsChatTextFill style={{ marginRight: "5px" }} />
                    <span style={{ marginRight: "5px" }}>受信</span>
                    {props.LastMessageTime && props.LastMessageTime < 60
                        ? `${props.LastMessageTime}分前`
                        : props.LastMessageTime
                        ? `${Math.floor(props.LastMessageTime / 60)}時間前`
                        : ""}
                </p>
            </div>
        </button>
    );
}
