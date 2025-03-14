"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiMinusCircle } from "react-icons/fi";

function Groupmember() {
    const [searchQuery, setSearchQuery] = useState("");

    const owner_id = "hakyukawa-test";

    //テスト用グループメンバー
    const [users, setUsers] = useState([
        { id: 1, userName: "hakyukawa", userId: "hakyukawa-test" },
        { id: 2, userName: "ユーザー2", userId: "user02" },
        { id: 3, userName: "ユーザー3", userId: "user03" },
        { id: 4, userName: "ユーザー6", userId: "testuser01" },
        { id: 5, userName: "ユーザー4", userId: "user04" },
        { id: 6, userName: "ユーザー5", userId: "user05" },
    ]);
    const groupName = `はきゅかわメンバー`;

    //検索フィルタリング
    const filterUsers = users.filter((user) => {
        return (
            user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.userId.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    //ユーザー削除関数
    const deleteUser = (userId: string) => {
        setUsers((preUsers) => preUsers.filter((user) => user.userId !== userId));
        console.log("ユーザーを削除しました");
    };

    return (
        <div>
            <Header
                backPage
                backPageLink="/newGroupSettings"
                backPageText={`${groupName} (${users.length})`}
                addFriend
                addFriendLink="/groupMember/addMember"
            />
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filterUsers.map((users) => (
                    <div key={users.id} className="flex justify-between">
                        <User userName={users.userName} userId={users.userId} />
                        {users.userId === owner_id ? (
                            <div className="flex justify-center items-center ">
                                <p className="bg-main p-[5px] rounded-[40px] text-background font-bold">
                                    オーナー
                                </p>
                            </div>
                        ) : (
                            <button
                                onClick={() => deleteUser(users.userId)}
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
