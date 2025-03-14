import useApi from "@/hooks/useApi";

interface ItemResponse {
    status: number;
    message: string;
    item: item[];
}

interface item {
    item_id: number;
    item_name: string;
    item_type: number;
    item_point: number;
    description: string;
    image_url: string;
    created_at: string;
}

export function useItems() {
    return useApi<ItemResponse>("http://localhost:3001/api/v1/auth/item", "GET");
}
