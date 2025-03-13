"use client";
import { BsChatTextFill } from "react-icons/bs";
import { useServerMembers } from "@/hooks/useServerMembers";
import { useEffect, useState } from "react";
import { useServerInfo } from "@/hooks/useServerInfo";
import { BsFire } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";

interface GroupProps {
    Name: string;
    LastMessageTime?: number;
    server_id?: string;
}

export default function Group(props: GroupProps) {
    const [memberCount, setMemberCount] = useState<number>(0);
    const { data: member } = useServerMembers(props.server_id || "");
    const { data: info } = useServerInfo(props.server_id || "");
    const [isCoreTime, setIsCoreTime] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (member && member.members) {
            setMemberCount(member.members.length);
        }
    }, [member]);

    useEffect(() => {
        if (!info || !info.start_core_time || !info.end_core_time) return;

        // 現在時刻を取得（24時間表記）
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // 分単位で比較

        // "start_core_time" と "end_core_time" を分単位に変換
        const [startHours, startMinutes] = info.start_core_time.split(":").map(Number);
        const [endHours, endMinutes] = info.end_core_time.split(":").map(Number);
        const startTime = startHours * 60 + startMinutes;
        const endTime = endHours * 60 + endMinutes;

        // 現在時刻が core time の範囲内かどうか判定
        setIsCoreTime(currentTime >= startTime && currentTime <= endTime);
    }, [info]);

    const handleClick = () => {
        localStorage.setItem("previousPath", pathname);
        router.push(`/server/${props.server_id}`);
    };

    return (
        <button onClick={handleClick} className="my-6 flex items-center">
            <div
                className={`bg-main w-[50px] h-[50px] rounded-full mr-4 ${
                    isCoreTime && "border-[1.5px] border-background outline-[3px] outline-main"
                }`}
            ></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">
                    {props.Name}
                    {memberCount > 0 && `(${memberCount})`}
                    {isCoreTime && (
                        <span className="text-[2.3rem] text-main ml-2">
                            <BsFire />
                        </span>
                    )}
                </h2>
                <p
                    className={`text-[1.5rem] flex items-center ${
                        props.LastMessageTime && props.LastMessageTime < 1440
                            ? "text-main"
                            : "text-warning"
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
