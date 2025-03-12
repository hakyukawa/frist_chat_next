import React from "react";
import Header from "@/components/common/Header";
import Search from "@/components/common/Search";
import User from "@/components/common/option/User";
import DeleteButton from "@/components/common/option/DeleteButton";

function Blocklist () {
    const blickUsersArray = [
        {id:1, userName: "ユーザー1", userId:"user01"},
        {id:2, userName: "ユーザー2", userId:"user02"},
        {id:3, userName: "ユーザー3", userId:"user03"},
    ];

    return(
        <div>
            <Header  backPage backPageLink="/config" backPageText="ブロックリスト"/>
            <div className="p-4">
                <Search />
                <div className="pt-[20px]">
                    <form action="" method="POST">
                        {blickUsersArray.map((users) => (
                            <div key={users.id} className="flex justify-between">
                                <User 
                                    key={users.id}
                                    userName={users.userName}
                                    userId={users.userId}
                                />
                                <div className="flex justify-center items-center">
                                    <DeleteButton
                                        buttonValue="ブロック済"
                                        className="px-[7px] py-[2px] border border-red-500 rounded-[40px] text-[14px] text-red-500 font-semibold"
                                    />
                                </div>
                            </div>
                        ))} 
                    </form>
                    
                </div>
                   
            </div>
        </div>
    );
}
export default Blocklist;