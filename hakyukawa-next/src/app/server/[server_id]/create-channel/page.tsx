"use client";

import Header from "@/components/common/Header";
import { useParams, useRouter } from "next/navigation";
import SubmitButton from "@/components/common/SubmitButton";
import NoticeOption from "@/components/common/GroupOptions/NoticeOption";
import { useState } from "react";
import useApi from "@/hooks/useApi";

interface ChannelResponse {
    message: string;
    channel_id: string;
    channelName: string;
    error: string | null;
}

export default function CreateChannel() {
    const router = useRouter();
    const params = useParams();
    const server_id = params.server_id;
    const [validate, setValidate] = useState<boolean>(false);
    const [channelName, setChannelName] = useState<string>("");

    const { error: createError, fetchData } = useApi<ChannelResponse>(
        "http://localhost:3001/api/v1/auth/server/channel/",
        "POST"
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!channelName.trim()) {
            setValidate(true);
            return;
        } else {
            setValidate(false);
        }

        try {
            await fetchData({
                server_id: server_id,
                channel_name: channelName,
            });

            if (!createError) {
                router.push(`/server/${server_id}`);
            }
        } catch (error) {
            console.error("チャンネル作成エラー:", createError || error);
        }
    };

    return (
        <>
            <Header
                backPage
                backPageLink={`/server/${server_id}`}
                backPageText="トークルーム新規作成"
            />
            <div className="p-[16px]">
                <div className="border border-main rounded-[10px] px-[17px] py-[26px]">
                    <p className="text-subText text-[1.3rem]">トークルーム名</p>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="border border-border w-full rounded-[10px] px-[10px] py-[5px] text-[1.3rem]"
                    />
                    {validate && channelName === "" && (
                        <p className="text-warning text-[1.3rem] mt-[10px]">
                            トークルーム名を入力してください
                        </p>
                    )}
                </div>
                <div className="mt-8">
                    <NoticeOption />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <SubmitButton buttonValue="作成" />
            </form>
        </>
    );
}
