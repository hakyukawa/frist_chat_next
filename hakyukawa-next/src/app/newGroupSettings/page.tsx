"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import Link from "next/link";
import { useParams } from "next/navigation";
>>>>>>> 5abef5c ([update]バリデーションを実装)
import { useRouter } from "next/navigation";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import SubmitButton from "@/components/common/SubmitButton";
import { useState, useCallback, useEffect } from "react";
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

<<<<<<< HEAD
=======
// const friendIcons = (key: number) => (
//     <div
//         key={key}
//         className="w-[24px] h-[24px] bg-main border-[3px] border-background rounded-full"
//     ></div>
// );

>>>>>>> 5abef5c ([update]バリデーションを実装)
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
<<<<<<< HEAD
    const router = useRouter();
=======
    const params = useParams();
    const server_id = params.server_id;
>>>>>>> 5abef5c ([update]バリデーションを実装)
    const router = useRouter();
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] =
        useState<ReplayOptionData>(defaultReplayOptionData);
    const [serverData, setServerData] = useState<ServerData | undefined>(undefined);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [valodationErroeDialogOpen, setValidationErrorDialogOpen] = useState(false);

    const handleReplayOptionChange = useCallback((data: ReplayOptionData) => {
        setReplayOptionData(data);
    }, []);

    // 時間を分に変換するヘルパー関数
    const timeToMinutes = useCallback((timeString: string): number => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }, []);

    // 時間の検証を行う関数
    const validateTimes = useCallback(
        (data: ReplayOptionData): string | null => {
            // コアタイムが3時間（180分）を超えているかをチェック
            const coreTimeStart = timeToMinutes(data.start_core_time);
            const coreTimeEnd = timeToMinutes(data.end_core_time);

            let coreTimeDuration: number;
            if (coreTimeEnd >= coreTimeStart) {
                coreTimeDuration = coreTimeEnd - coreTimeStart;
            } else {
                // 日をまたぐ場合（例: 22:00～01:00）
                coreTimeDuration = 24 * 60 - coreTimeStart + coreTimeEnd;
            }

            if (coreTimeDuration > 180) {
                return "コアタイムは3時間を超えることができません。";
            }

            // 返信不要時間帯とコアタイムの重複チェック
            const noReplyStart = timeToMinutes(data.start_at);
            const noReplyEnd = timeToMinutes(data.end_at);

            // 返信不要時間帯が日をまたぐかどうかを考慮
            let noReplyRangeOverlapsCore = false;

            if (noReplyStart <= noReplyEnd) {
                // 返信不要時間帯が同じ日の場合
                if (
                    coreTimeStart <= coreTimeEnd &&
                    !(noReplyEnd < coreTimeStart || noReplyStart > coreTimeEnd)
                ) {
                    noReplyRangeOverlapsCore = true;
                } else if (
                    coreTimeStart > coreTimeEnd &&
                    !(
                        (noReplyEnd < coreTimeStart && noReplyEnd < coreTimeEnd) ||
                        (noReplyStart > coreTimeStart && noReplyStart > coreTimeEnd)
                    )
                ) {
                    noReplyRangeOverlapsCore = true;
                }
            } else {
                // 返信不要時間帯が日をまたぐ場合
                if (coreTimeStart <= coreTimeEnd) {
                    if (!(coreTimeEnd < noReplyStart && coreTimeStart > noReplyEnd)) {
                        noReplyRangeOverlapsCore = true;
                    }
                } else {
                    // 両方とも日をまたぐ場合は、必ず重複がある
                    noReplyRangeOverlapsCore = true;
                }
            }

            if (noReplyRangeOverlapsCore) {
                return "返信不要の時間帯とコアタイムが重複しています。";
            }

            return null;
        },
        [timeToMinutes]
    );

    // API データを更新
    useEffect(() => {
        // 時間の検証
        const error = validateTimes(replayOptionData);
        setValidationError(error);

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
    }, [groupName, replayOptionData, validateTimes]);

    const { loading: serverLoading, fetchData: fetchServerData } = useApi<
        { status: number; message: string },
        ServerData
    >(`http://localhost:3001/api/v1/auth/server/`, "POST", serverData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 検証エラーがある場合は送信しない
        if (validationError) {
            console.log("エラー:", validationError);
            setValidationErrorDialogOpen(true);
            return;
        }

        try {
            await fetchServerData();
<<<<<<< HEAD
            router.push(`/server/GroupList`);
=======
>>>>>>> 5abef5c ([update]バリデーションを実装)
            router.push(`/server/GroupList`);
        } catch (error) {
            console.error("サーバー更新エラー:", error);
        }
    };

    return (
        <>
            <Dialog
                open={valodationErroeDialogOpen}
                onClose={() => setValidationErrorDialogOpen(false)}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#2e2f34",
                    },
                }}
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

<<<<<<< HEAD
            <Header backPage backPageLink={`/server/GroupList`} backPageText="グループ新規作成" />
            <div className="p-[16px]">
                <GroupInfo groupName={groupName} setGroupName={setGroupName} />
=======
            <Header
                backPage
                backPageLink={`/server/${server_id}`}
                backPageText="グループ新規作成"
            />
            <Header backPage backPageLink={`/server/GroupList`} backPageText="グループ新規作成" />
            <div className="p-[16px]">
                <GroupInfo groupName={groupName} setGroupName={setGroupName} />
                {/* <Link
                    href="/friendList"
                    passHref
                    className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                >
                    メンバー
                    <div className="text-subText text-[2rem] flex items-center">
                        {member?.members.slice(0, 4).map((member, index) => friendIcons(index))} 
                        <IoIosArrowForward />
                    </div>
                </Link>
>>>>>>> 5abef5c ([update]バリデーションを実装)
                <NoticeOption />
                <ReplayOption onDataChange={handleReplayOptionChange} />

                <form onSubmit={handleSubmit}>
                    <div>
                        <SubmitButton
                            buttonValue={serverLoading ? "作成中..." : "グループを作成"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
