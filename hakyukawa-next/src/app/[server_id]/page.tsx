"use client";

import { useParams } from "next/navigation";
import { useServerMembers } from "@/hooks/useServerMembers";
import { useServers } from "@/hooks/useServers";
import { useChannels } from "@/hooks/useChannels";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Header from "@/components/common/Header";

export default function ServerPage() {
    const params = useParams();
    const server_id = params.server_id;

    const [memberCount, setMemberCount] = useState<number>(0);
    const { data: group } = useServers();
    const { data: member } = useServerMembers(`${server_id}`);
    const { data: channel } = useChannels(`${server_id}`);

    useEffect(() => {
        if (member && member.members) {
            setMemberCount(member.members.length);
        }
    }, [member]);

    const filteredGroup = group?.data.find((item) => item.server_id === server_id);

    console.log(memberCount, filteredGroup, member, channel);

    return (
        <>
            <Header
                backPage
                backPageLink="/home"
                backPageText={`${filteredGroup?.server_name}(${member?.members.length})`}
                setting
            />

            <div className="flex flex-col">
                {channel &&
                    channel.data.map((channel) => {
                        return (
                            <div
                                key={channel.channel_id}
                                className="px-[16px] py-[13px] text-[1.8rem] border-b border-border"
                            >
                                <p>{channel.channel_name}</p>
                            </div>
                        );
                    })}
                <p className="flex items-center justify-end text-main text-[14px] text-right px-[16px] py-[13px] font-semibold">
                    トークルームを作成
                    <FaPlus style={{ marginLeft: "5px" }} />
                </p>
            </div>
        </>
    );
}
