"use client";

import Header from "@/components/common/Header";
import { useParams } from "next/navigation";

export default function CreateChannel() {
    const params = useParams();
    const server_id = params.server_id;

    return (
        <>
            <Header
                backPage
                backPageLink={`/server/${server_id}`}
                backPageText="トークルーム新規作成"
            />
            <div>ああああ</div>
        </>
    );
}
