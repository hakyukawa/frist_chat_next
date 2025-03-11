import React from "react";
import Header from "@/components/common/Header";
import User from "@/components/common/option/User";
import SubmitButton from "@/components/common/SubmitButton";

function Deleteuser () {
    const nowUser = "hakyukawa"
    const nowID ="hakyukawa-test"
    return(
        <div>   
            <Header backPage backPageLink="/" backPageText="アカウントを削除する" />
            <div className="p-4">
                <User 
                    userName={nowUser}
                    userId={nowID}
                />
                <p className="text-[15px] font-light">アカウントが削除されます</p>
                <p className="text-[12px] font-nomal">「アカウント削除」をタップするとデータが全て削除され、ログインができなくなります。<br />
                <span className="text-red-500">削除されたアカウントは復旧できません。</span></p>
            </div>
            
        </div>
    );
}

export default Deleteuser;