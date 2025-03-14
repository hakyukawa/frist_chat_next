"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiPlusCircle } from "react-icons/fi";
import { useFriends } from "@/hooks/useFriends";
import { useParams } from "next/navigation";
import { useServerMembers } from "@/hooks/useServerMembers";
import useApi from "@/hooks/useApi";

function Addmember() {
    const [searchQuery, setSearchQuery] = useState("");
    const params = useParams();
    const server_id = params.server_id;
    const { data: member } = useServerMembers(`${server_id}`);
    const { data: friends } = useFriends();

    const { error, loading, fetchData } = useApi(
        "http://localhost:3001/api/v1/auth/server/notmember",
        "POST"
    );

    // すでにメンバーにいるユーザーの user_id を取得
    const memberUserIds = new Set(member?.members?.map((m) => m.user_id) || []);

    // フレンドの中からメンバーにいないユーザーをフィルタリング
    const filterSearch =
        friends?.users?.filter((user) => {
            const isAlreadyMember = memberUserIds.has(user.user_id);
            return (
                !isAlreadyMember &&
                (user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.user_name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }) || [];

    const addUser = (userId: string) => {
        fetchData({
            server_id,
            user_id: userId,
        });
    };

    return (
        <div>
            <Header
                backPage
                backPageLink={`/server/${server_id}/groupMember`}
                backPageText="メンバーを追加"
            />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {loading && <p>追加中...</p>}
                {error && <p className="text-red-500">エラー: {error}</p>}
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
            </div>
        </div>
    );
}

export default Addmember;
