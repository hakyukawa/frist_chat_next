"use client"
import React ,{useState} from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiPlusCircle } from "react-icons/fi";

function Addmember () {
    const [searchQuery, setSearchQuery] = useState("");

    //テスト用ユーザー
    const [users,setUsers] = useState([
            {id:1, userName: "ユーザー1", userId:"user01"},
            {id:2, userName: "はきゅかわさん", userId:"hakyukawasan"},
            {id:3, userName: "餃子", userId:"user03"},
            {id:4, userName: "ユーザー2", userId:"user11"},
            {id:5, userName: "ユーザー3", userId:"user45"},
            {id:6, userName: "ユーザー4", userId:"user66"},
            {id:7, userName: "ユーザー5", userId:"user72"},
        ]); 

    const filterSearch = users.filter((user) =>{
        return user.userId.toLowerCase().includes(searchQuery.toLowerCase()) || user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    });

    const addUser = (userId:string) =>{
        setUsers((preUsers) => preUsers.filter(user => user.userId !== userId));
        console.log("ユーザーを追加しました");
    }

    return(
        <div>
            <Header backPage backPageLink="/groupMember" backPageText="メンバーを追加"/>
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
                {filterSearch.map((users) => (
                    <div key={users.id} className="flex justify-between">
                        <User 
                            userName={users.userName}
                            userId={users.userId}
                        />
                        <button onClick={() => addUser(users.userId)} type="button" className="flex justify-center items-center ">
                            <FiPlusCircle size={26} className="text-main"/>
                        </button>
                    </div>
                ))} 
            </div>
        </div>
    );
}

export default Addmember;