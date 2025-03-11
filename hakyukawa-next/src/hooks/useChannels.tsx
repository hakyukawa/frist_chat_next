"use client";

import useApi from "@/hooks/useApi";

interface ChannelResponse {
    status: number;
    message: string;
    data: Channel[];
}

interface Channel {
    channel_id: string;
    channel_name: string;
}

export function useChannels(server_id: string) {
    return useApi<ChannelResponse>(
        `http://localhost:3001/api/v1/auth/server/channel/${server_id}`,
        "GET"
    );
}
