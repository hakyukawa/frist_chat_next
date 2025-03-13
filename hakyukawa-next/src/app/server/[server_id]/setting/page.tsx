"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import Link from "next/link";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import { IoIosArrowForward } from "react-icons/io";
import SubmitButton from "@/components/common/SubmitButton";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useApi from "@/hooks/useApi";

interface ReplayOptionData {
    start_at: string;
    end_at: string;
    start_core_time: string;
    end_core_time: string;
    weeks: string[];
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

// interface ChannelData {
//     channel_name: string;
// }

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

// デフォルトのReplayOptionData
const defaultReplayOptionData: ReplayOptionData = {
    start_at: "00:00:00",
    end_at: "00:00:00",
    start_core_time: "00:00:00",
    end_core_time: "00:00:00",
    weeks: [],
    until_replay: "00:00:00",
};

export default function NewGroupList() {
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] =
        useState<ReplayOptionData>(defaultReplayOptionData);
    const [serverData, setServerData] = useState<ServerData | undefined>(undefined);
    // const [channelData, setChannelData] = useState<ChannelData | undefined>(undefined);

    const router = useRouter();
    const handleReplayOptionChange = useCallback((data: ReplayOptionData) => {
        setReplayOptionData(data);
        console.log("ReplayOptionData updated", data);
    }, []);

    // API データを更新
    useEffect(() => {
        // サーバーデータを構築
        const newServerData: ServerData = {
            server_name: groupName || "default_name",
            icon_url: "https://example.com/icon.png",
            until_reply: replayOptionData.until_replay,
            start_at: replayOptionData.start_at,
            end_at: replayOptionData.end_at,
            start_core_time: replayOptionData.start_core_time,
            end_core_time: replayOptionData.end_core_time,
            weeks: replayOptionData.weeks,
        };

        setServerData(newServerData);
        // setChannelData({ channel_name: "general" });
    }, [groupName, replayOptionData]);

    const { loading: serverLoading, fetchData: fetchServerData } = useApi<
        { status: number; message: string },
        ServerData
    >("http://localhost:3001/api/v1/auth/server/", "POST", serverData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // データをすでにuseApiフックに渡しているので、引数なしで呼び出す
            await fetchServerData();
            // await fetchChannelData();
            router.push("/GroupList");
        } catch (error) {
            console.error("サーバー作成エラー:", error);
            // エラー処理（必要に応じてUI表示など）
        }
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
                    <SubmitButton buttonValue={serverLoading ? "作成中..." : "グループを作成"} />
                </form>
            </div>
        </>
    );
}
