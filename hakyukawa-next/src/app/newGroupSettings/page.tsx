"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import { useRouter } from "next/navigation";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import SubmitButton from "@/components/common/SubmitButton";
import { useState, useCallback } from "react";
import useApi from "@/hooks/useApi";
import { Dialog } from "@mui/material";

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

const defaultReplayOptionData: ReplayOptionData = {
    start_at: "00:00:00",
    end_at: "00:00:00",
    start_core_time: "00:00:00",
    end_core_time: "00:00:00",
    weeks: [],
    until_replay: "00:00:00",
};

export default function NewGroupList() {
    const router = useRouter();
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] =
        useState<ReplayOptionData>(defaultReplayOptionData);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [validationErrorDialogOpen, setValidationErrorDialogOpen] = useState(false);

    const handleReplayOptionChange = useCallback((data: ReplayOptionData) => {
        setReplayOptionData(data);
    }, []);

    const { loading: serverLoading, fetchData: fetchServerData } = useApi<
        { status: number; message: string },
        ServerData
    >("http://localhost:3001/api/v1/auth/server/", "POST");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

        if (validationError) {
            setValidationErrorDialogOpen(true);
            return;
        }

        try {
            await fetchServerData(newServerData);
            router.push(`/GroupList`);
        } catch (error) {
            console.error("サーバー更新エラー:", error);
        }
    };

    return (
        <>
            <Dialog
                open={validationErrorDialogOpen}
                onClose={() => setValidationErrorDialogOpen(false)}
                sx={{ "& .MuiPaper-root": { backgroundColor: "#2e2f34" } }}
            >
                <div className="bg-background text-white p-[16px] rounded-[20px]">
                    <div className="text-center border-b border-border">
                        <p className="text-[1.5rem] font-bold ">エラー</p>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <p className="text-[1.2rem] text-warning">{validationError}</p>
                        <button
                            onClick={() => setValidationErrorDialogOpen(false)}
                            className="w-[200px] h-[40px] border border-main text-[1.5rem] font-semibold rounded-[40px] mt-5"
                        >
                            <p className="text-main">閉じる</p>
                        </button>
                    </div>
                </div>
            </Dialog>

            <Header backPage backPageLink={`/server/GroupList`} backPageText="グループ新規作成" />
            <div className="p-[16px]">
                <GroupInfo groupName={groupName} setGroupName={setGroupName} />
                <NoticeOption />
                <ReplayOption onDataChange={handleReplayOptionChange} />
                <form onSubmit={handleSubmit}>
                    <SubmitButton buttonValue={serverLoading ? "作成中..." : "グループを作成"} />
                </form>
            </div>
        </>
    );
}
