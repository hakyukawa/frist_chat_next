import useApi from "@/hooks/useApi";

interface GroupData {
    server_id: string;
    server_name: string;
}

interface GroupResponse {
    status: number;
    message: string;
    data: GroupData[];
}

export function useGroups() {
    return useApi<GroupResponse>("http://localhost:3001/api/v1/auth/server/", "GET");
}
