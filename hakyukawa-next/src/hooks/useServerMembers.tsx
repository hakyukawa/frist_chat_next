// hooks/useGroupMembers.ts
import useApi from "@/hooks/useApi";

interface ServerMember {
    user_id: string;
    user_name: string;
}

interface ServerMemberResponse {
    status: number;
    message: string;
    owner: string;
    members: ServerMember[];
}

export function useServerMembers(server_id: string) {
    return useApi<ServerMemberResponse>(
        `http://localhost:3001/api/v1/auth/server/members/${server_id}`,
        "GET"
    );
}
