"use client";

import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";
import { useGroups } from "@/hooks/useGroups";

export default function GroupList() {
    const { data: group, error: groupError, loading: groupLoading } = useGroups();

    if (groupLoading) return <p>読み込み中...</p>;
    if (groupError) return <p className="text-red-500">{groupError}</p>;

    return (
        <>
            <Header backPage backPageLink="/home" backPageText="グループ" addGroup setting />
            <div className="p-4">
                <Search />
                {group
                    ? group.data
                          .slice(0, 3)
                          .map((group) => (
                              <Group
                                  key={group.server_id}
                                  type="group"
                                  Name={group.server_name}
                                  server_id={group.server_id}
                              />
                          ))
                    : null}
            </div>
        </>
    );
}
