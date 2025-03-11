"use client";

import useApi from "@/hooks/useApi";

interface Friend {
    user_id: string;
    user_name: string;
    icon_url: string | null;
}

interface FriendResponse {
    status: number;
    message: string;
    users: Friend[];
    error: string | null;
}

export function useFriends() {
    return useApi<FriendResponse>("http://localhost:3001/api/v1/auth/user/friendship", "GET");
}
