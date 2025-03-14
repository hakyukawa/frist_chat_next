"use client";

import useApi from "@/hooks/useApi";

interface ChannelResponse {
    message: string;
    channel_id: string;
    channelName: string;
    erroe: string | null;
}

export function useCreateChannels() {
    return useApi<ChannelResponse>(`http://localhost:3001/api/v1/auth/server/channel/`, "POST");
}
