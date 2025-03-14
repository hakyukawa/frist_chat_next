"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiMinusCircle } from "react-icons/fi";
import { useServerMembers } from "@/hooks/useServerMembers";
import { useServerInfo } from "@/hooks/useServerInfo";
import { useParams } from "next/navigation";

function Groupmember() {
    const params = useParams();
    const server_id = params.server_id;
    const [searchQuery, setSearchQuery] = useState("");
    const { data: member } = useServerMembers(`${server_id}`);
    const { data: serverInfo } = useServerInfo(`${server_id}`);
    const owner_id = member?.owner || ""; // ownerをAPIレスポンスから取得

    // 検索フィルタリング
    const filteredMembers =
        member?.members.filter((memberItem) => {
            return (
                memberItem.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                memberItem.user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }) || [];

    // ユーザー削除関数
    const deleteUser = (userId: string) => {
        // ここにユーザー削除のAPIコールなどを実装
        console.log("ユーザーを削除しました: ", userId);
    };

    return (
        <div>
            <Header
                backPage
                backPageLink={`/server/${server_id}/setting`}
                backPageText={`${serverInfo?.server_name || "グループ"} (${
                    member?.members.length || 0
                })`}
                addFriend
                addFriendLink={`/server/${server_id}/groupMember/addMember`}
            />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filteredMembers.map((memberItem) => (
                    <div key={memberItem.user_id} className="flex justify-between">
                        <User userName={memberItem.user_name} userId={memberItem.user_id} />
                        {memberItem.user_id === owner_id ? (
                            <div className="flex justify-center items-center">
                                <p className="bg-main p-[5px] rounded-[40px] text-background font-bold">
                                    オーナー
                                </p>
                            </div>
                        ) : (
                            <button
                                onClick={() => deleteUser(memberItem.user_id)}
                                type="button"
                                className="flex justify-center items-center"
                            >
                                <FiMinusCircle size={26} className="text-main" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Groupmember;
