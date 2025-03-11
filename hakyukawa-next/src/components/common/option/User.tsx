import React from "react";


interface userState {
    userName?: string;
    userId?: string;
}

function  User({userName,userId}:userState) {

    return(
        <div className="flex py-[10px]">
            <div className="bg-main w-[46px] h-[46px] rounded-full mr-4"></div>
            <div>
                <h2 className="text-[1.8rem] flex items-center">{userName}</h2>
                <p className="text-[15px] text-subText">{userId}</p>
            </div>
        </div>
    );
}

export default User;