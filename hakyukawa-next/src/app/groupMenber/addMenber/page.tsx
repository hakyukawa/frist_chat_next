"use client"
import React ,{useState} from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import Search from "@/components/common/Search";
import { FiPlusCircle } from "react-icons/fi";

function Addmenber () {
    const [searchQuery, setSearchQuery] = useState("");

    const UsersArray = [
        {id:1, userName: "ユーザー1", userId:"user01"},
        {id:2, userName: "はきゅかわさん", userId:"hakyukawasan"},
        {id:3, userName: "餃子", userId:"user03"},
        {id:4, userName: "ユーザー11", userId:"user11"},
        {id:5, userName: "ユーザー45", userId:"user45"},
        {id:6, userName: "ユーザー66", userId:"user66"},
        {id:7, userName: "ユーザー72", userId:"user72"},
        {id:8, userName: "ユーザー79", userId:"user79"},
        {id:9, userName: "ユーザー94", userId:"user94"},
    ];

    const filterSearch = UsersArray.filter((user) =>{
        return user.userId.toLowerCase().includes(searchQuery.toLowerCase()) || user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    });

    const handleClick = () =>{
        console.log("メンバーを追加しました！");
    }

    return(
        <div>
            <Header backPage backPageLink="/groupMenber" backPageText="メンバーを追加"/>
            <div className="p-4">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
                {filterSearch.map((users) => (
                    <div key={users.id} className="flex justify-between">
                        <User 
                            userName={users.userName}
                            userId={users.userId}
                        />
                        <button onClick={handleClick} type="button" className="flex justify-center items-center ">
                            <FiPlusCircle size={26} className="text-main"/>
                        </button>
                    </div>
                ))} 
            </div>
        </div>
    );
}

export default Addmenber;