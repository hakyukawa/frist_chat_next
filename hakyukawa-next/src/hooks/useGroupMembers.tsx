// hooks/useGroupMembers.ts
import useApi from "@/hooks/useApi";

interface GroupMember {
    user_id: string;
    user_name: string;
}

interface GroupMemberResponse {
    status: number;
    message: string;
    owner: string;
    members: GroupMember[];
}

export function useGroupMembers(server_id: string) {
    return useApi<GroupMemberResponse>(
        `http://localhost:3001/api/v1/auth/server/members/${server_id}`,
        "GET"
    );
}
