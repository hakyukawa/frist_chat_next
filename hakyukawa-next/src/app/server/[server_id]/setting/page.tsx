"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import Link from "next/link";
import { useParams } from "next/navigation";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import { IoIosArrowForward } from "react-icons/io";
import SubmitButton from "@/components/common/SubmitButton";
import { useState, useCallback, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { useServerMembers } from "@/hooks/useServerMembers";
import { useServerInfo } from "@/hooks/useServerInfo";

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
    const params = useParams();
    const server_id = params.server_id;
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] =
        useState<ReplayOptionData>(defaultReplayOptionData);
    const [serverData, setServerData] = useState<ServerData | undefined>(undefined);

    const { data: member } = useServerMembers(`${server_id}`);
    const { data: info } = useServerInfo(`${server_id}`);

    const handleReplayOptionChange = useCallback((data: ReplayOptionData) => {
        setReplayOptionData(data);
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
    }, [groupName, replayOptionData]);

    const { loading: serverLoading, fetchData: fetchServerData } = useApi<
        { status: number; message: string },
        ServerData
    >(`http://localhost:3001/api/v1/auth/server/${server_id}`, "PUT", serverData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // console.log(serverData);
            await fetchServerData();
        } catch (error) {
            console.error("サーバー更新エラー:", error);
        }
    };

    const deleteClick = () => {
        console.log("削除");
    };

    return (
        <>
            <Header
                backPage
                backPageLink={`/server/${server_id}`}
                backPageText="グループ新規作成"
            />
            <div className="p-[16px]">
                <GroupInfo
                    name={info?.server_name}
                    groupName={groupName}
                    setGroupName={setGroupName}
                />
                <Link
                    href="/friendList"
                    passHref
                    className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                >
                    メンバー
                    <div className="text-subText text-[2rem] flex items-center">
                        {member?.members.slice(0, 4).map((friend, index) => friendIcons(index))}
                        <IoIosArrowForward />
                    </div>
                </Link>
                <NoticeOption />
                <ReplayOption data={info ?? undefined} onDataChange={handleReplayOptionChange} />
                <form onSubmit={handleSubmit}>
                    <SubmitButton buttonValue={serverLoading ? "保存中..." : "保存"} />
                </form>
                <div className="border-t border-border mt-5 flex justify-center">
                    <button onClick={deleteClick} className="py-[14px] w-full">
                        <p className="text-[#ff2f2f] text-[1.4rem]">グループを削除する</p>
                    </button>
                </div>
            </div>
        </>
    );
}
