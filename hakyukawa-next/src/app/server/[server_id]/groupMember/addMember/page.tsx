"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiPlusCircle } from "react-icons/fi";
import { useFriends } from "@/hooks/useFriends";
import { useParams } from "next/navigation";
import { useServerMembers } from "@/hooks/useServerMembers";

function Addmember() {
function Addmember() {
    const [searchQuery, setSearchQuery] = useState("");
    const params = useParams();
    const server_id = params.server_id;
    const { data: member } = useServerMembers(`${server_id}`);
    const { data: friends } = useFriends();

    // フレンドのデータを使用するように変更
    const filterSearch =
        friends?.users?.filter((user) => {
            return (
                user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }) || [];

    const addUser = (userId: string) => {
        // ここではfriendsのデータから削除するロジックを実装できます
        // 実際の実装では、サーバーにメンバーを追加するAPIを呼び出すでしょう
        console.log("ユーザーを追加しました:", userId);
    };

    return (
    return (
        <div>
            <Header backPage backPageLink="/groupMember" backPageText="メンバーを追加" />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filterSearch.map((user) => (
                    <div key={user.user_id} className="flex justify-between">
                        <User userName={user.user_name} userId={user.user_id} />
                        <button
                            onClick={() => addUser(user.user_id)}
                            type="button"
                            className="flex justify-center items-center"
                        >
                            <FiPlusCircle size={26} className="text-main" />
                        </button>
                    </div>
                ))}
                ))}
            </div>
        </div>
    );
}

export default Addmember;

