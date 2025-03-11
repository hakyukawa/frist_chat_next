"use client";

import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";
import { useServers } from "@/hooks/useServers";
import { useState } from "react";

export default function GroupList() {
    const { data: group, error: groupError, loading: groupLoading } = useServers();
    const [searchQuery, setSearchQuery] = useState("");

    if (groupLoading) return <p>読み込み中...</p>;
    if (groupError) return <p className="text-red-500">{groupError}</p>;

    const filteredGroups = group?.data.filter((user) =>
        user.server_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Header backPage backPageLink="/home" backPageText="グループ" addGroup setting />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filteredGroups && filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <Group
                            key={group.server_id}
                            type="group"
                            Name={group.server_name}
                            server_id={group.server_id}
                        />
                    ))
                ) : (
                    <p>該当するサーバーが見つかりません</p>
                )}
            </div>
        </>
    );
}
