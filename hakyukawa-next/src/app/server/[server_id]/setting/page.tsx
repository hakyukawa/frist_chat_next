"use client";

import Header from "@/components/common/Header";
import GroupInfo from "@/components/common/GroupInfo";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import ReplayOption from "@/components/common/GroupOptions/ReplayOption";
import { IoIosArrowForward } from "react-icons/io";
import SubmitButton from "@/components/common/SubmitButton";
import { useState, useCallback, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { Dialog } from "@mui/material";
import { Avatar, AvatarGroup } from "@mui/material";
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
    until_replay: string;
    start_at: string;
    end_at: string;
    weeks: string[];
    start_core_time: string;
    end_core_time: string;
}

const friendIcons = (key: number) => {
    return (
        <Avatar
            key={key}
            sx={{
                width: 24,
                height: 24,
                bgcolor: "orange",
                border: "2px solid #2e2f34 !important",
            }}
        >
            <div></div>
        </Avatar>
    );
};

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
    const router = useRouter();
    const params = useParams();
    const server_id = params.server_id;
    const [groupName, setGroupName] = useState<string>("");
    const [replayOptionData, setReplayOptionData] =
        useState<ReplayOptionData>(defaultReplayOptionData);
    const [serverData, setServerData] = useState<ServerData | undefined>(undefined);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [valodationErroeDialogOpen, setValidationErrorDialogOpen] = useState(false);

    // useApiを使用してデータを取得
    const { data: member } = useServerMembers(`${server_id}`);

    const { data: info } = useServerInfo(`${server_id}`);

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
            until_replay: replayOptionData.until_replay,
            start_at: replayOptionData.start_at,
            end_at: replayOptionData.end_at,
            start_core_time: replayOptionData.start_core_time,
            end_core_time: replayOptionData.end_core_time,
            weeks: replayOptionData.weeks,
        };

        setServerData(newServerData);
    }, [groupName, replayOptionData, validateTimes]);

    // useApiを使用してサーバーデータを更新
    const { loading: serverLoading, fetchData: fetchServerData } = useApi<
        { status: number; message: string },
        ServerData
    >(`http://localhost:3001/api/v1/auth/server/${server_id}`, "PUT");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 検証エラーがある場合は送信しない
        if (validationError) {
            console.log("エラー:", validationError);
            setValidationErrorDialogOpen(true);
            return;
        }

        try {
            // serverDataを引数として渡す
            await fetchServerData(serverData);
            router.push(`/server/${server_id}`);
        } catch (error) {
            console.error("サーバー更新エラー:", error);
        }
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const deleteClick = () => {
        console.log("削除");
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

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#2e2f34",
                    },
                }}
            >
                <div className="bg-background text-white p-[16px] rounded-[20px]">
                    <div className="text-center border-b border-border">
                        <p className="text-[1.5rem] font-bold ">本当に削除しますか？</p>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="text-[1.2rem] text-subText">
                            「グループを削除」をタップするとグループデータ、メッセージ内容が全て削除されます。
                            <br />
                            <span className="text-warning">
                                削除されたグループは復旧できません。
                            </span>
                        </div>
                        <button
                            onClick={handleDeleteDialogClose}
                            className="w-[200px] h-[40px] border border-warning text-[1.5rem] font-semibold rounded-[40px] mt-5"
                        >
                            <p className="text-warning">グループを削除する</p>
                        </button>
                    </div>
                </div>
            </Dialog>
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
                    href={`/server/${server_id}/groupMember`}
                    passHref
                    className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                >
                    メンバー
                    <div className="text-subText text-[2rem] flex items-center">
                        <AvatarGroup max={4}>
                            {member?.members.slice(0, 4).map((member, index) => friendIcons(index))}
                        </AvatarGroup>
                        <IoIosArrowForward />
                    </div>
                </Link>
                <NoticeOption />
                <ReplayOption data={info ?? undefined} onDataChange={handleReplayOptionChange} />

                <form onSubmit={handleSubmit}>
                    <div>
                        <SubmitButton buttonValue={serverLoading ? "保存中..." : "保存"} />
                    </div>
                </form>
                <div className="border-t border-border mt-5 flex justify-center">
                    <button onClick={handleDeleteDialogOpen} className="py-[14px] w-full">
                        <p className="text-warning text-[1.4rem]">グループを削除する</p>
                    </button>
                </div>
            </div>
        </>
    );
}
