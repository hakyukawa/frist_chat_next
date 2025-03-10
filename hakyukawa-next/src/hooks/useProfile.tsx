import useApi from "@/hooks/useApi";

interface UserResponse {
    status: string;
    message: string;
    user_id: string;
    user_name: string;
    icon_url: string | null;
    user_rank: number;
    user_point: number;
    error: string | null;
}

export function useProfile() {
    return useApi<UserResponse>("http://localhost:3001/api/v1/auth/user/profile", "GET");
}
