"use client";

import { useParams } from "next/navigation";

export default function ServerPage() {
    const params = useParams();
    const server_id = params.server_id;

    return (
        <div>
            <h1>Server ID: {server_id}</h1>
            {/* サーバーに関連する内容 */}
        </div>
    );
}
