"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import Link from "next/link";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import { IoIosArrowForward } from "react-icons/io";
import SubmitButton from "@/components/common/SubmitButton";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import useApi from "@/hooks/useApi";

interface ReplayOptionData {
    start_at: string;
    end_at: string;
    start_core_time: string;
    end_core_time: string;
    weeks: {
        date: string;
        isSelected: boolean;
    }[];
    until_replay: string;
}

interface ServerData {
    server_name: string;
    icon_url: string;
    until_reply: string;
    start_at: string;
    end_at: string;
    weeks: string[];
    start_core_time: string;
    end_core_time: string;
}

const friendArray = [
    { id: 1, friendName: "friend1", LastMessageTime: 30 },
    { id: 2, friendName: "friend2", LastMessageTime: 60 },
    { id: 3, friendName: "friend3", LastMessageTime: 90 },
    { id: 4, friendName: "friend4", LastMessageTime: 300 },
];

const friendIcons = (key: number) => (
    <div
        key={key}
        className="w-[24px] h-[24px] bg-main border-[3px] border-background rounded-full"
    ></div>
);

export default function NewGroupList() {
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] = useState<ReplayOptionData | null>(null);
    const router = useRouter();

    const handleReplayOptionChange = useCallback((data: ReplayOptionData) => {
        setReplayOptionData(data);
        console.log("ReplayOptionData updated", data); // データ更新時に確認
    }, []);

    const formatTime = (time: string): string => {
        // すでに HH:MM:SS 形式の場合は、そのまま返す
        if (time && /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(time)) {
            return time;
        }

        // HH:MM 形式の場合は、秒を追加
        if (time && /^\d{1,2}:\d{1,2}$/.test(time)) {
            const [hours, minutes] = time.split(":").map(Number);
            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
        }

        // デフォルトケース
        return "00:00:00";
    };

    // API に送るデータを作成
    const buildRequestData = (): ServerData => {
        const defaultData: ReplayOptionData = {
            start_at: "00:00",
            end_at: "00:00",
            start_core_time: "00:00",
            end_core_time: "00:00",
            weeks: [],
            until_replay: "",
        };

        const options = replayOptionData || defaultData;

        return {
            server_name: groupName || "default_name",
            icon_url: "https://example.com/icon.png",
            until_reply: formatTime(options.until_replay),
            start_at: formatTime(options.start_at),
            end_at: formatTime(options.end_at),
            start_core_time: formatTime(options.start_core_time),
            end_core_time: formatTime(options.end_core_time),
            weeks: options.weeks.filter((week) => week.isSelected).map((week) => week.date),
        };
    };

    const { loading, fetchData } = useApi<{ status: number; message: string }, ServerData>(
        "http://localhost:3001/api/v1/auth/server/",
        "POST",
        buildRequestData(),
        {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchData();
        router.push("/GroupList");
    };

    return (
        <>
            <Header backPage backPageLink="/GroupList" backPageText="グループ新規作成" />
            <div className="p-[16px]">
                <GroupInfo groupName={groupName} setGroupName={setGroupName} />
                <Link
                    href="/friendList"
                    passHref
                    className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                >
                    メンバー
                    <div className="text-subText text-[2rem] flex items-center">
                        {friendArray.slice(0, 4).map((friend, index) => friendIcons(index))}
                        <IoIosArrowForward />
                    </div>
                </Link>
                <NoticeOption />
                <ReplayOption onDataChange={handleReplayOptionChange} />
                <form onSubmit={handleSubmit}>
                    <SubmitButton buttonValue={loading ? "作成中..." : "グループを作成"} />
                </form>
            </div>
        </>
    );
}
