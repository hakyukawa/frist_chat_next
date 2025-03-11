"use client";

import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";
import { useFriends } from "@/hooks/useFriends";
import { useState } from "react";

export default function FriendList() {
    const { data: friend, error: friendError, loading: friendLoading } = useFriends();
    const [searchQuery, setSearchQuery] = useState("");

    if (friendLoading) return <p>読み込み中...</p>;
    if (friendError) return <p className="text-red-500">{friendError}</p>;

    const filteredFriends = friend?.users.filter((user) =>
        user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(friend);
    return (
        <>
            <Header backPage backPageLink="/home" backPageText="フレンド" addFriend setting />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filteredFriends && filteredFriends.length > 0 ? (
                    filteredFriends.map((user) => (
                        <Group key={user.user_id} type="friend" Name={user.user_name} />
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">該当するフレンドが見つかりません</p>
                )}
            </div>
        </>
    );
}
