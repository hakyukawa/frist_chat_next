"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useServerMembers } from "@/hooks/useServerMembers";
import { useServers } from "@/hooks/useServers";
import { useChannels } from "@/hooks/useChannels";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Header from "@/components/common/Header";

export default function ServerSelect() {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const server_id = params.server_id;
    const [previousPath, setPreviousPath] = useState<string | null>(null);
    const [memberCount, setMemberCount] = useState<number>(0);
    const { data: group } = useServers();
    const { data: member } = useServerMembers(`${server_id}`);
    const { data: channel } = useChannels(`${server_id}`);

    useEffect(() => {
        const prevPath = localStorage.getItem("previousPath");
        if (prevPath) {
            setPreviousPath(prevPath);
        }
    }, []);

    useEffect(() => {
        if (member && member.members) {
            setMemberCount(member.members.length);
        }
    }, [member]);

    const filteredGroup = group?.data.find((item) => item.server_id === server_id);

    // console.log(memberCount, filteredGroup, member, channel, previousPath);

    const handleClick = (channelId: string) => {
        return () => {
            localStorage.setItem("previousPath", pathname);
            router.push(`/server/${server_id}/${channelId}`);
        };
    };

    return (
        <>
            <Header
                backPage
                backPageLink={`${previousPath}`}
                backPageText={`${filteredGroup?.server_name}(${memberCount})`}
                setting
                settingLink={`/server/${server_id}/setting`}
            />

            <div className="flex flex-col">
                {channel &&
                    channel.data.map((channel) => {
                        return (
                            <div
                                key={channel.channel_id}
                                className="px-[16px] py-[13px] text-[1.8rem] border-b border-border"
                            >
                                <button onClick={handleClick(channel.channel_id)}>
                                    {channel.channel_name}
                                </button>
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
