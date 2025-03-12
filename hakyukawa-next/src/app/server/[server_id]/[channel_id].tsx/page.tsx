"use client";

import Header from "@/components/common/Header";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useChannels } from "@/hooks/useChannels";

interface Channel {
    channel_id: string;
    channel_name: string;
}

export default function Message() {
    const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

    const pathname = usePathname();
    const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
    const manualServerId = pathSegments.length > 1 ? pathSegments[1] : "";
    const manualChannelId = pathSegments.length > 2 ? pathSegments[2] : "";

    const params = useParams();
    const server_id = (params.server_id as string) || manualServerId || "";

    const channel_id = manualChannelId;

    const { data: channel } = useChannels(server_id || "");

    useEffect(() => {
        if (channel && channel.data && channel_id) {
            console.log("Searching for channel with ID:", channel_id);
            console.log("Available channels:", channel.data);

            const foundChannel = channel.data.find((ch) => ch.channel_id === channel_id);

            if (foundChannel) {
                console.log("Channel found:", foundChannel);
                setCurrentChannel(foundChannel);
            } else {
                console.log("No matching channel found");
            }
        }
    }, [channel, channel_id]);

    return (
        <>
            <Header
                backPage
                backPageLink={`/server/${server_id}`}
                backPageText={currentChannel ? currentChannel.channel_name : "Server"}
                search
            />
            {currentChannel ? (
                <div>
                    <h2>{currentChannel.channel_name}チャンネルのメッセージ</h2>
                </div>
            ) : (
                <div>チャンネルが見つかりませんでした</div>
            )}
        </>
    );
}
