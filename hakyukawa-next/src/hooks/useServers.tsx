import useApi from "@/hooks/useApi";

interface ServerData {
    server_id: string;
    server_name: string;
}

interface ServerResponse {
    status: number;
    message: string;
    data: ServerData[];
}

export function useServers() {
    return useApi<ServerResponse>("http://localhost:3001/api/v1/auth/server/", "GET");
}
