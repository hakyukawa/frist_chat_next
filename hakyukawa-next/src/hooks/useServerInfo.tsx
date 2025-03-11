"use client";

import useApi from "@/hooks/useApi";

interface ServerInfoResponse {
    status: number;
    message: string;
    server_id: string;
    server_name: string;
    icon_url: string | null;
    until_replay: string;
    start_at: string;
    end_at: string;
    weeks: string[];
    start_core_time: string;
    end_core_time: string;
    isOwner: boolean;
    created_at: string;
}

export function useServerInfo(server_id: string) {
    return useApi<ServerInfoResponse>(
        `http://localhost:3001/api/v1/auth/server/${server_id}`,
        "GET"
    );
}
