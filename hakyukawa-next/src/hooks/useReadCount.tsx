"use client";

import useApi from "@/hooks/useApi";

interface ChannelResponse {
    status: number;
    message: string;
    unread_count: number;
    most_recent_message_time: string;
    unread_first_message_time: string;
    until_replay: string;
    until_replay_minutes: number;
    time_passed: number;
    minutes_remaining: number;
    is_expired: boolean;
}

export function useReadCount(server_id: string) {
    return useApi<ChannelResponse>(`http://localhost:3001/api/v1/server/count/${server_id}`, "GET");
}
