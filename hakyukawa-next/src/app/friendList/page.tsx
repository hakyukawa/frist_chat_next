"use client";

import Header from "@/components/common/Header";
import Group from "@/components/common/Group";
import Search from "@/components/common/Search";
import { useFriends } from "@/hooks/useFriends";

export default function FriendList() {
    const { data: friend, error: friendError, loading: friendLoading } = useFriends();

    if (friendLoading) return <p>読み込み中...</p>;
    if (friendError) return <p className="text-red-500">{friendError}</p>;

    console.log(friend);
    return (
        <>
            <Header backPage backPageLink="/home" backPageText="フレンド" addFriend setting />
            <div className="p-4">
                <Search />
                {friend
                    ? friend.users.map((friend) => (
                          <Group key={friend.user_id} type="friend" Name={friend.user_name} />
                      ))
                    : null}
            </div>
        </>
    );
}
